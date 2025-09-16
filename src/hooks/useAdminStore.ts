import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';
import { getAllProducts } from '@/data/mockProducts';
import { toast } from 'sonner';

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderItem { productId: string; qty: number; price: number; }
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  customerId: string;
  createdAt: string;
}

export interface Customer {
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

const LS_PRODUCTS = 'littlestyle-admin-products';
const LS_ORDERS = 'littlestyle-admin-orders';
const LS_CUSTOMERS = 'littlestyle-admin-customers';

export const useAdminStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const prod = localStorage.getItem(LS_PRODUCTS);
      if (prod) {
        setProducts(JSON.parse(prod));
      } else {
        // Инициализируем товарами по умолчанию, если их нет
        const defaultProducts = getAllProducts();
        setProducts(defaultProducts);
        localStorage.setItem(LS_PRODUCTS, JSON.stringify(defaultProducts));
      }
    } catch {
      const defaultProducts = getAllProducts();
      setProducts(defaultProducts);
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(defaultProducts));
    }
    try {
      const ord = localStorage.getItem(LS_ORDERS);
      setOrders(ord ? JSON.parse(ord) : []);
    } catch {
      setOrders([]);
    }
    try {
      const cust = localStorage.getItem(LS_CUSTOMERS);
      setCustomers(cust ? JSON.parse(cust) : []);
    } catch {
      setCustomers([]);
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem(LS_CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  // Products CRUD
  const addProduct = (p: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const id = crypto.randomUUID();
    const newProduct: Product = { ...p, id, rating: 5, reviewCount: 0 };
    setProducts(prev => [newProduct, ...prev]);
    toast.success('Товар добавлен');
  };
  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
    toast.success('Товар обновлён');
  };
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Товар удалён');
  };

  // Orders
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
    toast.success('Статус заказа обновлён');
  };

  const stats = useMemo(() => {
    const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
    return {
      products: products.length,
      orders: orders.length,
      customers: customers.length,
      revenue,
    };
  }, [products, orders, customers]);

  return {
    products,
    orders,
    customers,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  };
};