import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { SITE_CONFIG } from '@/lib/constants';

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach(product => {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qty: 1,
        size: product.sizes[0] || 'OS',
        color: product.colors[0] || 'Стандартный',
      });
    });
    clearWishlist();
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet title="Избранное - LittleStyle">
          <meta name="description" content="Ваш список избранных товаров пуст" />
        </Helmet>

        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-h1 font-serif font-semibold">В избранном пока пусто</h1>
              <p className="text-muted-foreground text-lg">
                Добавляйте товары в избранное, чтобы не потерять их
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link to="/">
                  Перейти в каталог
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/collections">
                  Популярные товары
                </Link>
              </Button>
            </div>

            {/* Советы */}
            <div className="bg-muted rounded-lg p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Как добавить в избранное?</h3>
              <p className="text-sm text-muted-foreground">
                Нажмите на иконку сердечка ❤️ на карточке товара, 
                и он появится в вашем списке избранного.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet title={`Избранное (${items.length}) - LittleStyle`}>
        <meta name="description" content="Ваши избранные товары детской одежды" />
      </Helmet>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 font-serif font-semibold mb-2">
                Избранное
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {items.length > 1 && (
                <Button 
                  variant="outline"
                  onClick={handleAddAllToCart}
                  className="hidden sm:flex"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Все в корзину
                </Button>
              )}
              <Button 
                variant="ghost" 
                onClick={clearWishlist}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить
              </Button>
            </div>
          </div>

          {/* Мобильная кнопка "Все в корзину" */}
          {items.length > 1 && (
            <div className="sm:hidden mb-6">
              <Button 
                variant="outline"
                onClick={handleAddAllToCart}
                className="w-full"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Добавить все в корзину
              </Button>
            </div>
          )}

          {/* Сетка товаров */}
          <ProductGrid products={items} />

          {/* Рекомендации */}
          <div className="mt-12 pt-8 border-t">
            <div className="text-center mb-6">
              <h2 className="text-h2 font-serif font-semibold mb-2">
                Возможно, вам понравится
              </h2>
              <p className="text-muted-foreground">
                Похожие товары из нашего каталога
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link to="/girls">
                  Девочки
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/boys">
                  Мальчики
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/newborn">
                  Новорожденные
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;