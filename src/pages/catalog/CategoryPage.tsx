import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { mockProducts, getCategoryProducts, getFeaturedProducts, getSaleProducts } from '@/data/mockProducts';
import { getCategoryBySlug } from '@/data/mockCategories';
import { SITE_CONFIG } from '@/lib/constants';
import { Product } from '@/types';

interface CategoryPageProps {
  category?: 'girls' | 'boys' | 'newborn';
  featured?: boolean;
  sale?: boolean;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, featured = false, sale = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Получаем параметры из URL
  const sortBy = searchParams.get('sort') || 'popular';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const selectedSizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
  const selectedColors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const isNew = searchParams.get('new') === 'true';
  const isOnSale = searchParams.get('sale') === 'true';

  // Получаем товары в зависимости от типа страницы
  const baseProducts = useMemo(() => {
    if (featured) return getFeaturedProducts();
    if (sale) return getSaleProducts();
    if (category) return getCategoryProducts(category);
    return mockProducts;
  }, [category, featured, sale]);

  // Применяем фильтры
  const filteredProducts = useMemo(() => {
    let products = baseProducts;

    // Фильтр по цене
    if (minPrice !== undefined) {
      products = products.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      products = products.filter(p => p.price <= maxPrice);
    }

    // Фильтр по размерам
    if (selectedSizes.length > 0) {
      products = products.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Фильтр по цветам
    if (selectedColors.length > 0) {
      products = products.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }

    // Фильтр новинки
    if (isNew) {
      products = products.filter(p => p.isNew);
    }

    // Фильтр скидки
    if (isOnSale) {
      products = products.filter(p => p.isSale);
    }

    return products;
  }, [baseProducts, minPrice, maxPrice, selectedSizes, selectedColors, isNew, isOnSale]);

  // Применяем сортировку
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      default: // popular
        return products.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [filteredProducts, sortBy]);

  // Функция для обновления параметров URL
  const updateSearchParams = (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  // Определяем заголовок страницы
  const getPageInfo = () => {
    if (featured) {
      return {
        title: 'Рекомендуемые товары',
        description: 'Лучшие товары, отобранные нашими стилистами специально для вас',
        count: baseProducts.length,
      };
    }
    if (sale) {
      return {
        title: 'Распродажа',
        description: 'Качественная детская одежда со скидками до 50%',
        count: baseProducts.length,
      };
    }
    if (category) {
      const categoryData = getCategoryBySlug(category);
      return {
        title: categoryData?.name || 'Каталог',
        description: categoryData?.description || 'Качественная детская одежда',
        count: categoryData?.count || baseProducts.length,
      };
    }
    return {
      title: 'Каталог',
      description: 'Вся коллекция детской одежды LittleStyle',
      count: baseProducts.length,
    };
  };

  const pageInfo = getPageInfo();

  return (
    <>
      <Helmet title={`${pageInfo.title} - LittleStyle`}>
        <meta name="description" content={pageInfo.description} />
        <link rel="canonical" href={`https://littlestyle.ru/${category || (featured ? 'collections' : (sale ? 'sale' : 'catalog'))}`} />
      </Helmet>

      <div className="container px-4 md:px-6 py-8 space-y-6">
        {/* Хлебные крошки и заголовок */}
        <div className="space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Главная</span>
            <span className="mx-2">•</span>
            <span>{pageInfo.title}</span>
          </div>
          
          <div>
            <h1 className="text-h1 font-serif font-semibold mb-2">{pageInfo.title}</h1>
            <p className="text-muted-foreground text-lg">{pageInfo.description}</p>
          </div>
        </div>

        {/* Панель управления */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Найдено товаров: {sortedProducts.length}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Сортировка */}
            <Select value={sortBy} onValueChange={(value) => updateSearchParams('sort', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                <SelectItem value="newest">Сначала новинки</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="name">По алфавиту</SelectItem>
              </SelectContent>
            </Select>

            {/* Фильтры (мобильная версия) */}
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters
                    searchParams={searchParams}
                    onUpdateParams={updateSearchParams}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Боковая панель с фильтрами (десктоп) */}
          <aside className="hidden lg:block space-y-6">
            <ProductFilters
              searchParams={searchParams}
              onUpdateParams={updateSearchParams}
            />
          </aside>

          {/* Товары */}
          <div className="lg:col-span-3">
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;