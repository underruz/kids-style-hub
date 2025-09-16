import { CartItem, User } from '@/types';

const LS_ORDERS = 'littlestyle-admin-orders';
const LS_CUSTOMERS = 'littlestyle-admin-customers';

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface AdminOrderItem { productId: string; qty: number; price: number; }
export interface AdminOrder {
  id: string;
  items: AdminOrderItem[];
  total: number;
  status: OrderStatus;
  customerId: string;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  orders: number;
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
}

const readLS = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeLS = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export function createOrderFromCart(items: CartItem[], total: number, user?: User | null): string {
  const orders = readLS<AdminOrder[]>(LS_ORDERS, []);
  const customers = readLS<AdminCustomer[]>(LS_CUSTOMERS, []);

  const customerId = user?.id ?? 'guest';
  const customerEmail = user?.email ?? 'guest@example.com';
  const customerName = user?.name ?? 'Гость';

  const order: AdminOrder = {
    id: crypto.randomUUID(),
    items: items.map(i => ({ productId: i.productId, qty: i.qty, price: i.price })),
    total,
    status: 'new',
    customerId,
    createdAt: new Date().toISOString(),
  };

  // Save order
  const nextOrders = [order, ...orders];
  writeLS(LS_ORDERS, nextOrders);

  // Upsert customer - теперь также сохраняем зарегистрированных пользователей
  let idx = customers.findIndex(c => c.id === customerId);
  if (idx === -1) {
    // Проверяем, есть ли данные пользователя в localStorage
    const userFromStorage = user ? {
      id: customerId,
      name: customerName,
      email: customerEmail,
      orders: 1,
      socialMedia: user.socialMedia || {}
    } : {
      id: customerId,
      name: customerName,
      email: customerEmail,
      orders: 1
    };
    customers.unshift(userFromStorage);
  } else {
    customers[idx] = { 
      ...customers[idx], 
      orders: customers[idx].orders + 1,
      // Обновляем данные пользователя, если они есть
      ...(user && { 
        name: user.name, 
        email: user.email,
        socialMedia: user.socialMedia || customers[idx].socialMedia
      })
    };
  }
  writeLS(LS_CUSTOMERS, customers);

  return order.id;
}
