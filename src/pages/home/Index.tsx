import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EditorialSection } from '@/components/home/EditorialSection';
import { Newsletter } from '@/components/home/Newsletter';
import { SITE_CONFIG } from '@/lib/constants';

const Index = () => {
  return (
    <>
      <Helmet title="LittleStyle - Качественная детская одежда">
        <meta 
          name="description" 
          content="Стильная и качественная детская одежда для малышей. Безопасные материалы, удобные модели, доступные цены. Доставка по всей России." 
        />
        <meta name="keywords" content="детская одежда, одежда для детей, детский магазин, качественная одежда" />
        <link rel="canonical" href={SITE_CONFIG.url} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${SITE_CONFIG.name} - Качественная детская одежда`} />
        <meta property="og:description" content="Стильная и качественная детская одежда для малышей" />
        <meta property="og:image" content={SITE_CONFIG.ogImage} />
        <meta property="og:url" content={SITE_CONFIG.url} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_CONFIG.name} - Качественная детская одежда`} />
        <meta name="twitter:description" content="Стильная и качественная детская одежда для малышей" />
        <meta name="twitter:image" content={SITE_CONFIG.ogImage} />
      </Helmet>

      <div className="space-y-0">
        {/* Главная карусель */}
        <section className="container px-4 md:px-6 py-8">
          <HeroCarousel />
        </section>

        {/* Сетка категорий */}
        <CategoryGrid />

        {/* Популярные товары */}
        <FeaturedProducts />

        {/* Редакционный блок */}
        <EditorialSection />

        {/* Подписка на рассылку */}
        <Newsletter />
      </div>
    </>
  );
};

export default Index;