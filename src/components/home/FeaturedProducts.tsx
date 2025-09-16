import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/mockProducts';

export const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section className="py-12 md:py-16 bg-gradient-soft">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-h2 font-serif font-semibold mb-2">
              Популярные товары
            </h2>
            <p className="text-muted-foreground">
              Выбор покупателей и рекомендации наших стилистов
            </p>
          </div>
          
          <Button 
            variant="outline" 
            asChild
            className="hidden md:flex"
          >
            <Link to="/collections">
              Смотреть все
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={featuredProducts} />

        {/* Мобильная кнопка */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/collections">
              Смотреть все товары
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};