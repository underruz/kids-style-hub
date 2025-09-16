import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, X, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductById } from '@/data/mockProducts';
import { SITE_CONFIG } from '@/lib/constants';
import { createOrderFromCart } from '@/lib/admin';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const deliveryThreshold = 3000;
  const deliveryCost = total >= deliveryThreshold ? 0 : 300;
  const finalTotal = total + deliveryCost;

  const moveToWishlist = (itemId: string, productId: string) => {
    const product = getProductById(productId);
    if (product) {
      addToWishlist(product);
      removeItem(itemId);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    const orderId = createOrderFromCart(items, finalTotal, user ?? undefined);
    clearCart();
    toast.success(`Заказ #${orderId.slice(0,6)} оформлен`);
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet title="Корзина - LittleStyle">
          <meta name="description" content="Ваша корзина покупок пуста" />
        </Helmet>

        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-h1 font-serif font-semibold">Корзина пуста</h1>
              <p className="text-muted-foreground text-lg">
                Добавьте товары, чтобы оформить заказ
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link to="/">
                  Перейти в каталог
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/wishlist">
                  <Heart className="mr-2 h-4 w-4" />
                  Посмотреть избранное
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet title={`Корзина (${items.length}) - LittleStyle`}>
        <meta name="description" content="Просмотр товаров в корзине и оформление заказа" />
      </Helmet>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 font-serif font-semibold mb-2">
                Корзина
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
              </p>
            </div>
            
            <Button variant="ghost" onClick={clearCart}>
              Очистить корзину
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Товары */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Изображение товара */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md bg-muted"
                        />
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div className="flex-1 min-w-0 pr-4">
                            <h3 className="font-medium text-sm mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                              <Badge variant="outline" className="text-xs">
                                {item.size}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.color}
                              </Badge>
                            </div>
                            <p className="font-semibold text-lg">
                              ₽{item.price.toLocaleString()}
                            </p>
                          </div>

                          {/* Кнопка удаления */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Управление количеством */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.qty - 1)}
                              disabled={item.qty <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-medium">
                              {item.qty}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.qty + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveToWishlist(item.id, item.productId)}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              В избранное
                            </Button>
                            <p className="font-semibold">
                              ₽{(item.price * item.qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Итоги заказа */}
            <div className="space-y-6">
              {/* Промокод */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Промокод</h3>
                  <div className="flex space-x-2">
                    <Input placeholder="Введите промокод" className="flex-1" />
                    <Button variant="outline">Применить</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Итоги */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-medium">Итого</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Товары ({items.reduce((sum, item) => sum + item.qty, 0)})</span>
                      <span>₽{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Доставка</span>
                      <span>
                        {deliveryCost > 0 ? `₽${deliveryCost.toLocaleString()}` : 'Бесплатно'}
                      </span>
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>К оплате</span>
                    <span>₽{finalTotal.toLocaleString()}</span>
                  </div>

                  {total < deliveryThreshold && (
                    <div className="text-sm text-muted-foreground">
                      До бесплатной доставки не хватает{' '}
                      <span className="font-medium text-primary">
                        ₽{(deliveryThreshold - total).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Оформить заказ
                  </Button>

                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Продолжить покупки
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;