export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: 'girls' | 'boys' | 'newborn';
  sizes: string[];
  colors: string[];
  isNew: boolean;
  isSale: boolean;
  featured: boolean;
  stock: number;
  sku: string;
  tags: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  slug: 'girls' | 'boys' | 'newborn';
  description: string;
  image: string;
  featured: boolean;
  count: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar?: string;
  addresses: Address[];
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface EditorialBlock {
  id: string;
  title: string;
  description: string;
  icon: string;
}