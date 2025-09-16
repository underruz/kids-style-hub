import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { mockProducts } from '@/data/mockProducts';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  // Получаем историю поиска из localStorage
  const [searchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('littlestyle-search-history');
    return saved ? JSON.parse(saved) : [];
  });

  // Фильтруем товары по поисковому запросу
  const searchResults = debouncedQuery.length >= 2 
    ? mockProducts.filter(product => 
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const popularQueries = [
    'платье для девочки',
    'комбинезон мальчик',
    'боди новорожденный',
    'летние вещи',
    'зимняя одежда',
  ];

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Сохраняем в историю поиска
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      localStorage.setItem('littlestyle-search-history', JSON.stringify(newHistory));
      
      // Переходим на страницу поиска
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onOpenChange(false);
      setQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-left">Поиск товаров</DialogTitle>
          <DialogDescription className="text-left">
            Найдите нужные товары в нашем каталоге детской одежды
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Поле поиска */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск по товарам..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12"
              autoFocus
            />
          </div>

          {/* Результаты поиска */}
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <h3 className="text-sm font-medium text-muted-foreground">Найденные товары</h3>
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSearch(product.name)}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-smooth text-left"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">₽{product.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* История поиска */}
          {searchHistory.length > 0 && query.length < 2 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                История поиска
              </h3>
              <div className="space-y-1">
                {searchHistory.map((historyQuery, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(historyQuery)}
                    className="w-full text-left p-2 hover:bg-muted rounded-lg transition-smooth text-sm"
                  >
                    {historyQuery}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Популярные запросы */}
          {query.length < 2 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Популярные запросы</h3>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((popularQuery) => (
                  <Button
                    key={popularQuery}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(popularQuery)}
                    className="text-xs"
                  >
                    {popularQuery}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};