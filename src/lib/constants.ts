export const SITE_CONFIG = {
  name: 'LittleStyle',
  description: 'Стильная и качественная детская одежда для малышей',
  url: 'https://littlestyle.ru',
  ogImage: 'https://littlestyle.ru/og.jpg',
  links: {
    instagram: 'https://instagram.com/littlestyle',
    telegram: 'https://t.me/littlestyle',
    whatsapp: 'https://wa.me/79999999999',
  },
};

export const CATEGORIES = [
  { slug: 'girls', name: 'Девочки', description: 'Нежная и стильная одежда для маленьких принцесс' },
  { slug: 'boys', name: 'Мальчики', description: 'Удобная и практичная одежда для активных мальчишек' },
  { slug: 'newborn', name: 'Новорожденные', description: 'Мягкая и безопасная одежда для самых маленьких' },
] as const;

export const SIZES = {
  newborn: ['50', '56', '62', '68', '74', '80'],
  kids: ['86', '92', '98', '104', '110', '116', '122', '128', '134', '140'],
} as const;

export const COLORS = [
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Розовый', value: '#FFB6C1' },
  { name: 'Голубой', value: '#87CEEB' },
  { name: 'Желтый', value: '#FFE4B5' },
  { name: 'Зеленый', value: '#A4BE93' },
  { name: 'Серый', value: '#D3D3D3' },
  { name: 'Красный', value: '#FFA07A' },
  { name: 'Синий', value: '#B0C4DE' },
] as const;

export const DELIVERY_OPTIONS = [
  { id: 'courier', name: 'Курьерская доставка', price: 300, days: '1-2' },
  { id: 'pickup', name: 'Пункт выдачи', price: 150, days: '2-4' },
  { id: 'post', name: 'Почта России', price: 200, days: '5-10' },
] as const;

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Банковская карта', icon: 'CreditCard' },
  { id: 'apple', name: 'Apple Pay', icon: 'Apple' },
  { id: 'google', name: 'Google Pay', icon: 'Smartphone' },
  { id: 'cash', name: 'Наложенный платеж', icon: 'Banknote' },
] as const;