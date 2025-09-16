import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '@/hooks/useAdminStore';
import { Badge } from '@/components/ui/badge';
import { SITE_CONFIG } from '@/lib/constants';
import { SocialCommunication } from '@/components/admin/SocialCommunication';

const ProductsTab = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = products.find(p => p.id === editingId);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    oldPrice: undefined as number | undefined,
    images: '' as string,
    category: 'girls' as 'girls' | 'boys' | 'newborn',
    sizes: '98,104,110',
    colors: 'бежевый,персиковый',
    isNew: false,
    isSale: false,
    featured: false,
    stock: 10,
    sku: 'SKU-NEW',
    tags: 'одежда,дети',
  });

  const openCreate = () => {
    setEditingId(null);
    setFormOpen(true);
    setForm({
      name: '', description: '', price: 0, oldPrice: undefined, images: '', category: 'girls', sizes: '98,104,110', colors: 'бежевый,персиковый', isNew: false, isSale: false, featured: false, stock: 10, sku: 'SKU-NEW', tags: 'одежда,дети'
    });
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    const p = products.find(x => x.id === id)!;
    setFormOpen(true);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      oldPrice: p.oldPrice,
      images: p.images.join(','),
      category: p.category,
      sizes: p.sizes.join(','),
      colors: p.colors.join(','),
      isNew: p.isNew,
      isSale: p.isSale,
      featured: p.featured,
      stock: p.stock,
      sku: p.sku,
      tags: p.tags.join(','),
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      category: form.category,
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      isNew: form.isNew,
      isSale: form.isSale,
      featured: form.featured,
      stock: Number(form.stock),
      sku: form.sku,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      rating: 5,
      reviewCount: 0,
    };
    if (editingId) {
      updateProduct(editingId, payload as any);
    } else {
      const { rating, reviewCount, ...rest } = payload;
      addProduct(rest as any);
    }
    setFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-h3 font-serif font-semibold">Товары</h3>
        <Button onClick={openCreate}>Добавить товар</Button>
      </div>
      <div className="grid gap-4">
        {products.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img src={p.images[0]} alt={p.name} className="w-20 h-20 rounded-md object-cover bg-muted" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium">{p.name}</span>
                    {p.isNew && <Badge>New</Badge>}
                    {p.isSale && <Badge variant="destructive">Sale</Badge>}
                    {p.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{p.sku} • Остаток: {p.stock}</div>
                  <div className="font-semibold">₽{p.price.toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => openEdit(p.id)}>Редактировать</Button>
                  <Button variant="destructive" onClick={() => deleteProduct(p.id)}>Удалить</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formOpen && (
        <Card>
          <CardContent className="p-4">
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input value={form.name} onChange={e=>setForm(s=>({...s, name: e.target.value}))} required />
              </div>
              <div className="space-y-2">
                <Label>Цена</Label>
                <Input type="number" value={form.price} onChange={e=>setForm(s=>({...s, price: Number(e.target.value)}))} required />
              </div>
              <div className="space-y-2">
                <Label>Старая цена</Label>
                <Input type="number" value={form.oldPrice ?? ''} onChange={e=>setForm(s=>({...s, oldPrice: e.target.value ? Number(e.target.value) : undefined}))} />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Input value={form.category} onChange={e=>setForm(s=>({...s, category: e.target.value as any}))} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Изображения (через запятую)</Label>
                <Input value={form.images} onChange={e=>setForm(s=>({...s, images: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label>Размеры (через запятую)</Label>
                <Input value={form.sizes} onChange={e=>setForm(s=>({...s, sizes: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label>Цвета (через запятую)</Label>
                <Input value={form.colors} onChange={e=>setForm(s=>({...s, colors: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label>Остаток</Label>
                <Input type="number" value={form.stock} onChange={e=>setForm(s=>({...s, stock: Number(e.target.value)}))} />
              </div>
              <div className="space-y-2">
                <Label>Артикул</Label>
                <Input value={form.sku} onChange={e=>setForm(s=>({...s, sku: e.target.value}))} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Теги (через запятую)</Label>
                <Input value={form.tags} onChange={e=>setForm(s=>({...s, tags: e.target.value}))} />
              </div>
              <div className="flex gap-3 md:col-span-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isNew} onChange={e=>setForm(s=>({...s, isNew: e.target.checked}))} /> Новинка</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isSale} onChange={e=>setForm(s=>({...s, isSale: e.target.checked}))} /> Распродажа</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e=>setForm(s=>({...s, featured: e.target.checked}))} /> Витрина</label>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit">Сохранить</Button>
                <Button type="button" variant="outline" onClick={()=>setFormOpen(false)}>Отмена</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const OrdersTab = () => {
  const { orders, updateOrderStatus } = useAdminStore();
  const statuses: Array<{ v: any; label: string }> = [
    { v: 'new', label: 'Новый' },
    { v: 'processing', label: 'В обработке' },
    { v: 'shipped', label: 'Отгружен' },
    { v: 'completed', label: 'Завершён' },
    { v: 'cancelled', label: 'Отменён' },
  ];
  return (
    <div className="grid gap-4">
      {orders.length === 0 && <div className="text-muted-foreground">Заказов пока нет</div>}
      {orders.map(o => (
        <Card key={o.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Заказ #{o.id.slice(0,6)}</div>
                <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()} • ₽{o.total.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <select className="border rounded-md bg-background px-3 py-2" value={o.status} onChange={e=>updateOrderStatus(o.id, e.target.value as any)}>
                  {statuses.map(s => <option key={s.v} value={s.v}>{s.label}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const CustomersTab = () => {
  const { customers } = useAdminStore();
  return (
    <div className="grid gap-4">
      {customers.length === 0 && <div className="text-muted-foreground">Покупателей пока нет</div>}
      {customers.map(c => (
        <Card key={c.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.email}</div>
              </div>
              <Badge variant="secondary">Заказов: {c.orders}</Badge>
            </div>
            {c.socialMedia && Object.values(c.socialMedia).some(value => value) && (
              <div className="flex flex-wrap gap-1">
                {c.socialMedia.instagram && (
                  <Badge variant="outline" className="text-xs">Instagram: {c.socialMedia.instagram}</Badge>
                )}
                {c.socialMedia.telegram && (
                  <Badge variant="outline" className="text-xs">Telegram: {c.socialMedia.telegram}</Badge>
                )}
                {c.socialMedia.whatsapp && (
                  <Badge variant="outline" className="text-xs">WhatsApp: {c.socialMedia.whatsapp}</Badge>
                )}
                {c.socialMedia.vk && (
                  <Badge variant="outline" className="text-xs">VK: {c.socialMedia.vk}</Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const { stats } = useAdminStore();

  if (!user?.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <Helmet title="Админ-панель - LittleStyle">
        <meta name="description" content="Управление товарами, заказами и покупателями" />
      </Helmet>
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-h1 font-serif font-semibold mb-6">Админ-панель</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Товары</div><div className="text-2xl font-bold">{stats.products}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Заказы</div><div className="text-2xl font-bold">{stats.orders}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Покупатели</div><div className="text-2xl font-bold">{stats.customers}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Выручка</div><div className="text-2xl font-bold">₽{stats.revenue.toLocaleString()}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="customers">Покупатели</TabsTrigger>
            <TabsTrigger value="communication">Рассылка</TabsTrigger>
          </TabsList>
          <Separator className="my-4" />
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="orders"><OrdersTab /></TabsContent>
          <TabsContent value="customers"><CustomersTab /></TabsContent>
          <TabsContent value="communication"><SocialCommunication /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;