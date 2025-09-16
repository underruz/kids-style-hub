import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { COLORS, SIZES } from '@/lib/constants';

interface ProductFiltersProps {
  searchParams: URLSearchParams;
  onUpdateParams: (key: string, value: string | null) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchParams,
  onUpdateParams,
}) => {
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 10000;
  const selectedSizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
  const selectedColors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const isNew = searchParams.get('new') === 'true';
  const isOnSale = searchParams.get('sale') === 'true';

  const handlePriceChange = (values: number[]) => {
    onUpdateParams('minPrice', values[0] > 0 ? values[0].toString() : null);
    onUpdateParams('maxPrice', values[1] < 10000 ? values[1].toString() : null);
  };

  const handleSizeToggle = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    
    onUpdateParams('sizes', newSizes.length > 0 ? newSizes.join(',') : null);
  };

  const handleColorToggle = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...selectedColors, color]
      : selectedColors.filter(c => c !== color);
    
    onUpdateParams('colors', newColors.length > 0 ? newColors.join(',') : null);
  };

  const clearAllFilters = () => {
    onUpdateParams('minPrice', null);
    onUpdateParams('maxPrice', null);
    onUpdateParams('sizes', null);
    onUpdateParams('colors', null);
    onUpdateParams('new', null);
    onUpdateParams('sale', null);
  };

  const hasActiveFilters = minPrice > 0 || maxPrice < 10000 || 
    selectedSizes.length > 0 || selectedColors.length > 0 || isNew || isOnSale;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Фильтры</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Сбросить
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Цена */}
        <div className="space-y-4">
          <h4 className="font-medium">Цена, ₽</h4>
          <div className="px-2">
            <Slider
              value={[minPrice, maxPrice]}
              onValueChange={handlePriceChange}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{minPrice.toLocaleString()}</span>
              <span>{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Размеры */}
        <div className="space-y-3">
          <h4 className="font-medium">Размер</h4>
          <div className="grid grid-cols-3 gap-2">
            {[...SIZES.newborn, ...SIZES.kids].map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => 
                    handleSizeToggle(size, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`size-${size}`}
                  className="text-sm cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Цвета */}
        <div className="space-y-3">
          <h4 className="font-medium">Цвет</h4>
          <div className="space-y-2">
            {COLORS.map((color) => (
              <div key={color.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color.name}`}
                  checked={selectedColors.includes(color.name)}
                  onCheckedChange={(checked) => 
                    handleColorToggle(color.name, checked as boolean)
                  }
                />
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color.value }}
                  />
                  <Label 
                    htmlFor={`color-${color.name}`}
                    className="text-sm cursor-pointer"
                  >
                    {color.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Специальные фильтры */}
        <div className="space-y-3">
          <h4 className="font-medium">Особенности</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new"
                checked={isNew}
                onCheckedChange={(checked) => 
                  onUpdateParams('new', checked ? 'true' : null)
                }
              />
              <Label htmlFor="new" className="text-sm cursor-pointer">
                Новинки
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sale"
                checked={isOnSale}
                onCheckedChange={(checked) => 
                  onUpdateParams('sale', checked ? 'true' : null)
                }
              />
              <Label htmlFor="sale" className="text-sm cursor-pointer">
                Со скидкой
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};