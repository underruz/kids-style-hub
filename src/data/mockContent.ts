import { HeroSlide, EditorialBlock } from '@/types';

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Новая коллекция "Весенние мечты"',
    description: 'Откройте мир нежности и комфорта с нашей новой весенней коллекцией для малышей',
    image: '/src/assets/hero-1.jpg',
    ctaText: 'Смотреть коллекцию',
    ctaLink: '/collections',
  },
  {
    id: '2',
    title: 'Скидки до 40% на зимние товары',
    description: 'Успейте приобрести теплую и уютную одежду по специальным ценам',
    image: '/src/assets/hero-2.jpg',
    ctaText: 'К распродаже',
    ctaLink: '/sale',
  },
  {
    id: '3',
    title: 'Органические ткани для новорожденных',
    description: 'Безопасность и комфорт вашего малыша - наш главный приоритет',
    image: '/src/assets/hero-3.jpg',
    ctaText: 'Узнать больше',
    ctaLink: '/newborn',
  },
];

export const editorialBlocks: EditorialBlock[] = [
  {
    id: '1',
    title: 'Качество материалов',
    description: 'Мы используем только натуральные и сертифицированные ткани, безопасные для детской кожи.',
    icon: 'Shield',
  },
  {
    id: '2',
    title: 'Безопасность превыше всего',
    description: 'Все наши изделия проходят строгий контроль качества и соответствуют европейским стандартам.',
    icon: 'Heart',
  },
  {
    id: '3',
    title: 'Экологичность',
    description: 'Мы заботимся о будущем наших детей, используя экологически чистые материалы и упаковку.',
    icon: 'Leaf',
  },
];