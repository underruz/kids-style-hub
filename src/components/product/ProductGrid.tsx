import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 'auto' | 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  className,
  columns = 'auto'
}) => {
  const getGridClassName = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4';
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🛍️</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Товары не найдены
        </h3>
        <p className="text-muted-foreground">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      'grid gap-4 md:gap-6',
      getGridClassName(),
      className
    )}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          className="animate-fade-up"
        />
      ))}
    </div>
  );
};