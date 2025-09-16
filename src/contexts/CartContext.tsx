import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '@/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => 
          item.productId === action.payload.productId && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === existingItem.id
            ? { ...item, qty: item.qty + action.payload.qty }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.productId}-${action.payload.size}-${action.payload.color}-${Date.now()}`,
        };
        newItems = [...state.items, newItem];
      }

      const total = newItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.qty, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.qty, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, qty: Math.max(0, action.payload.qty) }
          : item
      ).filter(item => item.qty > 0);

      const total = newItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.qty, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const items = action.payload;
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

      return { items, total, itemCount };
    }

    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    null as unknown as CartState,
    () => {
      try {
        const saved = localStorage.getItem('littlestyle-cart');
        const items: CartItem[] = saved ? JSON.parse(saved) : [];
        const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
        const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
        return { items, total, itemCount };
      } catch (e) {
        console.error('Error initializing cart from localStorage:', e);
        return { items: [], total: 0, itemCount: 0 };
      }
    }
  );


  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('littlestyle-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success('Товар добавлен в корзину');
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success('Товар удален из корзины');
  };

  const updateQuantity = (id: string, qty: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Корзина очищена');
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};