import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { toast } from 'sonner';

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  // Загрузка избранного из localStorage при инициализации
  useEffect(() => {
    const savedWishlist = localStorage.getItem('littlestyle-wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        setItems(wishlistData);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Сохранение избранного в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('littlestyle-wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems(prev => [...prev, product]);
      toast.success('Товар добавлен в избранное');
    }
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Товар удален из избранного');
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Избранное очищено');
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};