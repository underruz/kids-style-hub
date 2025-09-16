import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/data/mockProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { SITE_CONFIG } from '@/lib/constants';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  // Поиск товаров
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(debouncedQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const popularQueries = [
    'платье для девочки',
    'комбинезон мальчик', 
    'боди новорожденный',
    'летние вещи',
    'зимняя одежда',
  ];

  const recentQueries = JSON.parse(localStorage.getItem('littlestyle-search-history') || '[]').slice(0, 3);

  return (
    <>
      <Helmet title={query ? `Поиск: "${query}" - LittleStyle` : 'Поиск - LittleStyle'}>
        <meta 
          name="description" 
          content={query ? `Результаты поиска по запросу "${query}"` : 'Поиск товаров в каталоге детской одежды'} 
        />
      </Helmet>

      <div className="container px-4 md:px-6 py-8 space-y-6">
        {/* Поиск */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-h1 font-serif font-semibold mb-2">Поиск товаров</h1>
            <p className="text-muted-foreground">
              Найдите идеальную одежду для ваших малышей
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Поиск по товарам, категориям..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Результаты поиска */}
        {query.trim() && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Результаты поиска {query && (
                  <>
                    по запросу <span className="text-primary">"{query}"</span>
                  </>
                )}
              </h2>
              <p className="text-muted-foreground">
                Найдено: {searchResults.length}
              </p>
            </div>

            <ProductGrid products={searchResults} />
          </div>
        )}

        {/* Пустой результат */}
        {query.trim() && searchResults.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Ничего не найдено</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              По вашему запросу "{query}" ничего не найдено. 
              Попробуйте изменить запрос или воспользуйтесь популярными запросами ниже.
            </p>
          </div>
        )}

        {/* Популярные запросы или история поиска */}
        {(!query.trim() || searchResults.length === 0) && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* История поиска */}
            {recentQueries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Недавние запросы</h3>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((recentQuery: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(recentQuery)}
                    >
                      {recentQuery}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Популярные запросы */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Популярные запросы</h3>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((popularQuery) => (
                  <Button
                    key={popularQuery}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(popularQuery)}
                  >
                    {popularQuery}
                  </Button>
                ))}
              </div>
            </div>

            {/* Категории */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Или выберите категорию</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/girls"
                  className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
                >
                  <h4 className="font-semibold mb-2">Девочки</h4>
                  <p className="text-sm text-muted-foreground">
                    Платья, комплекты, аксессуары
                  </p>
                </Link>
                <Link 
                  to="/boys"
                  className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
                >
                  <h4 className="font-semibold mb-2">Мальчики</h4>
                  <p className="text-sm text-muted-foreground">
                    Футболки, шорты, костюмы
                  </p>
                </Link>
                <Link 
                  to="/newborn"
                  className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
                >
                  <h4 className="font-semibold mb-2">Новорожденные</h4>
                  <p className="text-sm text-muted-foreground">
                    Боди, слипы, комплекты
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;