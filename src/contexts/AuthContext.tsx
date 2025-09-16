import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Мок пользователи для демонстрации
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@littlestyle.ru',
    name: 'Администратор',
    isAdmin: true,
    addresses: [],
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Анна Иванова',
    isAdmin: false,
    addresses: [
      {
        id: '1',
        name: 'Дом',
        street: 'ул. Пушкина, д. 10, кв. 5',
        city: 'Москва',
        zipCode: '101000',
        country: 'Россия',
        isDefault: true,
      },
    ],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем localStorage при инициализации
    const savedUser = localStorage.getItem('littlestyle-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('littlestyle-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = MOCK_USERS.find(u => u.email === email);
      if (mockUser && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('littlestyle-user', JSON.stringify(mockUser));
        toast.success('Вы успешно вошли в систему');
        return true;
      } else {
        toast.error('Неверный email или пароль');
        return false;
      }
    } catch (error) {
      toast.error('Ошибка при входе в систему');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('littlestyle-user');
    toast.success('Вы вышли из системы');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Проверяем, не существует ли уже пользователь с таким email
      const existingUser = MOCK_USERS.find(u => u.email === email);
      if (existingUser) {
        toast.error('Пользователь с таким email уже существует');
        return false;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        isAdmin: false,
        addresses: [],
      };

      setUser(newUser);
      localStorage.setItem('littlestyle-user', JSON.stringify(newUser));
      toast.success('Регистрация прошла успешно');
      return true;
    } catch (error) {
      toast.error('Ошибка при регистрации');
      return false;
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('littlestyle-user', JSON.stringify(updatedUser));
      toast.success('Профиль обновлен');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};