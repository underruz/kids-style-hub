import { Category } from '@/types';
import girlsImage from '@/assets/categories/girls.jpg';
import boysImage from '@/assets/categories/boys.jpg';
import newbornImage from '@/assets/categories/newborn.jpg';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Девочки',
    slug: 'girls',
    description: 'Нежная и стильная одежда для маленьких принцесс. Платья, комплекты, аксессуары - всё для создания волшебного образа.',
    image: girlsImage,
    featured: true,
    count: 124,
  },
  {
    id: '2',
    name: 'Мальчики',
    slug: 'boys',
    description: 'Удобная и практичная одежда для активных мальчишек. Качественные материалы, стильные решения, комфорт в движении.',
    image: boysImage,
    featured: true,
    count: 96,
  },
  {
    id: '3',
    name: 'Новорожденные',
    slug: 'newborn',
    description: 'Мягкая и безопасная одежда для самых маленьких. Органические ткани, гипоаллергенные материалы, максимальная забота.',
    image: newbornImage,
    featured: true,
    count: 78,
  },
];

export const getCategoryBySlug = (slug: string) => mockCategories.find(c => c.slug === slug);