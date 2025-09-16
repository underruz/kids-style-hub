import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { SITE_CONFIG } from '@/lib/constants';

const AdminLogin = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@littlestyle.ru');
  const [password, setPassword] = useState('password');
  const [submitting, setSubmitting] = useState(false);

  if (user?.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) navigate('/admin/dashboard');
  };

  return (
    <>
      <Helmet title="Вход в админ-панель - LittleStyle">
        <meta name="description" content="Авторизация администратора" />
      </Helmet>
      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h1 className="text-h2 font-serif font-semibold text-center">Админ-панель</h1>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={submitting || isLoading}>
                  Войти
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;