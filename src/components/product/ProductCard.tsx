import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1,
      size: product.sizes[0] || 'OS',
      color: product.colors[0] || 'Стандартный',
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-hover",
      className
    )}>
      <Link to={`/product/${product.id}`} className="block">
        <CardContent className="p-0">
          {/* Изображение товара */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Бейджи */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs font-medium">
                  Новинка
                </Badge>
              )}
              {product.isSale && discountPercentage > 0 && (
                <Badge variant="destructive" className="text-xs font-medium">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Кнопка избранного */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlistToggle}
              className={cn(
                "absolute top-2 right-2 h-8 w-8 rounded-full p-0 transition-all duration-200",
                "bg-background/80 hover:bg-background backdrop-blur-sm",
                isWishlisted && "text-destructive hover:text-destructive"
              )}
            >
              <Heart 
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isWishlisted && "fill-current"
                )} 
              />
            </Button>

            {/* Кнопка быстрой покупки (появляется при наведении) */}
            <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                В корзину
              </Button>
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="p-4 space-y-2">
            {/* Рейтинг */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating)
                        ? "text-warning fill-current"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Название */}
            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Цена */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-foreground">
                ₽{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₽{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Доступные размеры */}
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <Badge
                  key={size}
                  variant="outline"
                  className="text-xs px-2 py-0"
                >
                  {size}
                </Badge>
              ))}
              {product.sizes.length > 4 && (
                <Badge variant="outline" className="text-xs px-2 py-0">
                  +{product.sizes.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};