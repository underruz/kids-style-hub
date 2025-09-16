import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { CATEGORIES } from '@/lib/constants';
import { SearchModal } from './SearchModal';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      navigate('/profile');
    } else {
      // В реальном приложении здесь был бы модал входа
      navigate('/profile');
    }
  };

  const navItems = [
    { name: 'Девочки', path: '/girls' },
    { name: 'Мальчики', path: '/boys' },
    { name: 'Новорожденные', path: '/newborn' },
    { name: 'Коллекции', path: '/collections' },
    { name: 'Распродажа', path: '/sale' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Логотип */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-h3 font-serif font-semibold text-gradient transition-smooth hover:scale-105"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">LS</span>
            </div>
            <span className="hidden sm:inline">LittleStyle</span>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Иконки действий */}
          <div className="flex items-center space-x-2">
            {/* Поиск */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Избранное */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative"
            >
              <Link to="/wishlist">
                <Heart className="h-4 w-4" />
                {wishlistItems.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground border-0 flex items-center justify-center leading-none"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Профиль */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Личный кабинет</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Мои заказы</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Выйти
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleAuthAction}>
                      Войти
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAuthAction}>
                      Регистрация
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Корзина */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative"
            >
              <Link to="/cart">
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground border-0 flex items-center justify-center leading-none"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Мобильное меню */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSearchOpen(true)}
                    className="justify-start"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Поиск
                  </Button>
                  
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-smooth"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Модальное окно поиска */}
      <SearchModal 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
      />
    </>
  );
};