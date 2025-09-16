import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Heart, ShoppingBag, Star, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductById, getFeaturedProducts } from '@/data/mockProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : null;
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const discountPercentage = product?.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Рекомендуемые товары
  const recommendedProducts = getFeaturedProducts().filter(p => p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <>
        <Helmet title="Товар не найден - LittleStyle">
          <meta name="description" content="Запрашиваемый товар не найден" />
        </Helmet>
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-h1 font-serif font-semibold">Товар не найден</h1>
            <p className="text-muted-foreground">Запрашиваемый товар не существует или был удален</p>
            <Button asChild>
              <Link to="/">Вернуться в каталог</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    if (!selectedColor) {
      alert('Пожалуйста, выберите цвет');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImageIndex],
      qty: quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <Helmet title={`${product.name} - LittleStyle`}>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={product.tags.join(', ')} />
        <link rel="canonical" href={`https://littlestyle.ru/product/${product.id}`} />
      </Helmet>

      <div className="container px-4 md:px-6 py-8">
        {/* Хлебные крошки */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span>•</span>
          <Link to={`/${product.category}`} className="hover:text-primary capitalize">
            {product.category === 'girls' ? 'Девочки' : 
             product.category === 'boys' ? 'Мальчики' : 'Новорожденные'}
          </Link>
          <span>•</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            {/* Основное изображение */}
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Миниатюры */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-lg bg-muted transition-all",
                      selectedImageIndex === index 
                        ? "ring-2 ring-primary ring-offset-2" 
                        : "hover:ring-1 hover:ring-border"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Заголовок и рейтинг */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.isNew && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Новинка
                  </Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>
              
              <h1 className="text-h1 font-serif font-semibold mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "text-warning fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} отзывов)
                </span>
              </div>

              <p className="text-muted-foreground">Артикул: {product.sku}</p>
            </div>

            {/* Цена */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">₽{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₽{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <Separator />

            {/* Описание */}
            <div>
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Выбор цвета */}
            <div>
              <h3 className="font-semibold mb-3">Цвет</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-all",
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <h3 className="font-semibold mb-3">Размер</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Количество */}
            <div>
              <h3 className="font-semibold mb-3">Количество</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Добавить в корзину
              </Button>

              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Heart className={cn("mr-2 h-5 w-5", isWishlisted && "fill-current text-destructive")} />
                {isWishlisted ? 'Удалить из избранного' : 'В избранное'}
              </Button>
            </div>

            {/* Информация о доставке */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm">Бесплатная доставка от ₽3,000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span className="text-sm">Обмен и возврат в течение 14 дней</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">Гарантия качества материалов</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Детальная информация */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="care">Уход</TabsTrigger>
            <TabsTrigger value="delivery">Доставка</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Детали товара</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Материал:</span>
                    <span>100% органический хлопок</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Категория:</span>
                    <span className="capitalize">
                      {product.category === 'girls' ? 'Девочки' : 
                       product.category === 'boys' ? 'Мальчики' : 'Новорожденные'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Страна производства:</span>
                    <span>Турция</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Сезон:</span>
                    <span>Всесезонная</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Уход за изделием</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Машинная стирка при температуре 30°C</li>
                  <li>• Использовать мягкие моющие средства</li>
                  <li>• Не отбеливать</li>
                  <li>• Сушить в горизонтальном положении</li>
                  <li>• Гладить при низкой температуре</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Доставка и возврат</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Способы доставки:</h4>
                    <ul className="space-y-1">
                      <li>• Курьерская доставка (1-2 дня) - ₽300</li>
                      <li>• Пункт выдачи (2-4 дня) - ₽150</li>
                      <li>• Почта России (5-10 дней) - ₽200</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Возврат и обмен:</h4>
                    <p>Возврат и обмен товаров производится в течение 14 дней с момента получения заказа при соблюдении условий возврата.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Рекомендуемые товары */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-h2 font-serif font-semibold mb-6">Вам может понравиться</h2>
            <ProductGrid products={recommendedProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;