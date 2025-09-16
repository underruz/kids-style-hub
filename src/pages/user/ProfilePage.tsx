import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Package, MapPin, Settings, LogOut, Heart, ShoppingBag, Instagram, MessageCircle, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { SITE_CONFIG } from '@/lib/constants';

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const { items: cartItems, total } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    socialMedia: {
      instagram: user?.socialMedia?.instagram || '',
      telegram: user?.socialMedia?.telegram || '',
      whatsapp: user?.socialMedia?.whatsapp || '',
      vk: user?.socialMedia?.vk || '',
    }
  });

  // Мок данные для заказов
  const mockOrders = [
    {
      id: 'LS2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 4500,
      items: [
        { name: 'Платье "Маленькая принцесса"', qty: 1, price: 2490 },
        { name: 'Комплект "Солнечный день"', qty: 1, price: 1890 },
      ],
    },
    {
      id: 'LS2024-002', 
      date: '2024-01-20',
      status: 'processing',
      total: 3200,
      items: [
        { name: 'Кардиган "Мягкое облако"', qty: 1, price: 3200 },
      ],
    },
  ];

  const statusLabels = {
    processing: { label: 'Обрабатывается', variant: 'secondary' as const },
    shipped: { label: 'Отправлен', variant: 'default' as const },
    delivered: { label: 'Доставлен', variant: 'secondary' as const },
    cancelled: { label: 'Отменен', variant: 'destructive' as const },
  };

  const handleSave = () => {
    if (user) {
      updateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      socialMedia: {
        instagram: user?.socialMedia?.instagram || '',
        telegram: user?.socialMedia?.telegram || '',
        whatsapp: user?.socialMedia?.whatsapp || '',
        vk: user?.socialMedia?.vk || '',
      }
    });
    setIsEditing(false);
  };

  // Если пользователь не авторизован, показываем форму входа
  if (!user) {
    return (
      <>
        <Helmet title="Вход в личный кабинет - LittleStyle">
          <meta name="description" content="Войдите в личный кабинет для управления заказами и профилем" />
        </Helmet>

        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-h2 font-serif">Вход в личный кабинет</CardTitle>
                <p className="text-muted-foreground">
                  Войдите, чтобы управлять заказами и профилем
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" placeholder="password" />
                </div>
                <Button className="w-full">Войти</Button>
                <p className="text-sm text-muted-foreground text-center">
                  Для демонстрации используйте: user@example.com / password
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet title="Личный кабинет - LittleStyle">
        <meta name="description" content="Управление профилем, заказами и избранным" />
      </Helmet>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 font-serif font-semibold mb-2">
                Личный кабинет
              </h1>
              <p className="text-muted-foreground">
                Добро пожаловать, {user.name}!
              </p>
            </div>
            
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>

          {/* Краткая статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center p-4">
                <Package className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Заказов</p>
                  <p className="text-xl font-semibold">{mockOrders.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <Heart className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">В избранном</p>
                  <p className="text-xl font-semibold">{wishlistItems.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <ShoppingBag className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">В корзине</p>
                  <p className="text-xl font-semibold">₽{total.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Вкладки */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                Заказы
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="social">
                <Users className="mr-2 h-4 w-4" />
                Соц.сети
              </TabsTrigger>
              <TabsTrigger value="addresses">
                <MapPin className="mr-2 h-4 w-4" />
                Адреса
              </TabsTrigger>
            </TabsList>

            {/* История заказов */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>История заказов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Заказ {order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={statusLabels[order.status as keyof typeof statusLabels].variant}>
                            {statusLabels[order.status as keyof typeof statusLabels].label}
                          </Badge>
                          <p className="font-semibold mt-1">
                            ₽{order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.qty}</span>
                            <span>₽{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Профиль */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Информация профиля</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Редактировать
                      </Button>
                    ) : (
                      <div className="space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Отмена
                        </Button>
                        <Button onClick={handleSave}>
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Статус аккаунта</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                        {user.isAdmin ? 'Администратор' : 'Покупатель'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Социальные сети */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Социальные сети</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Редактировать
                      </Button>
                    ) : (
                      <div className="space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Отмена
                        </Button>
                        <Button onClick={handleSave}>
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Укажите ваши социальные сети для получения персональных предложений и новостей
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center space-x-2">
                        <Instagram className="h-4 w-4" />
                        <span>Instagram</span>
                      </Label>
                      <Input
                        id="instagram"
                        placeholder="@ваш_профиль"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telegram" className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Telegram</span>
                      </Label>
                      <Input
                        id="telegram"
                        placeholder="@ваш_профиль"
                        value={formData.socialMedia.telegram}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialMedia: { ...formData.socialMedia, telegram: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>WhatsApp</span>
                      </Label>
                      <Input
                        id="whatsapp"
                        placeholder="+7 999 999-99-99"
                        value={formData.socialMedia.whatsapp}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialMedia: { ...formData.socialMedia, whatsapp: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vk" className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>VKontakte</span>
                      </Label>
                      <Input
                        id="vk"
                        placeholder="vk.com/ваш_профиль"
                        value={formData.socialMedia.vk}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialMedia: { ...formData.socialMedia, vk: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Адреса */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Адреса доставки</CardTitle>
                    <Button variant="outline">
                      Добавить адрес
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {user.addresses.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Нет сохраненных адресов</h3>
                      <p className="text-muted-foreground mb-4">
                        Добавьте адрес для быстрого оформления заказов
                      </p>
                      <Button>Добавить адрес</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{address.name}</h4>
                            {address.isDefault && (
                              <Badge variant="secondary">По умолчанию</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {address.street}, {address.city}, {address.zipCode}, {address.country}
                          </p>
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="ghost" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;