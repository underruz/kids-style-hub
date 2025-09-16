import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SITE_CONFIG } from '@/lib/constants';

export const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь была бы логика подписки на рассылку
    alert('Спасибо за подписку!');
  };

  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Информация о компании */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-h3 font-serif font-semibold text-gradient"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">LS</span>
              </div>
              <span>LittleStyle</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Стильная и качественная детская одежда для малышей. 
              Мы создаем комфортные и безопасные вещи, которые дарят радость детям и спокойствие родителям.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <a href={SITE_CONFIG.links.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={SITE_CONFIG.links.telegram} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Навигация */}
          <div className="space-y-4">
            <h3 className="font-semibold">Каталог</h3>
            <div className="space-y-2">
              <Link to="/girls" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Девочки
              </Link>
              <Link to="/boys" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Мальчики  
              </Link>
              <Link to="/newborn" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Новорожденные
              </Link>
              <Link to="/collections" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Коллекции
              </Link>
              <Link to="/sale" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Распродажа
              </Link>
            </div>
          </div>

          {/* Помощь покупателю */}
          <div className="space-y-4">
            <h3 className="font-semibold">Покупателям</h3>
            <div className="space-y-2">
              <Link to="/delivery" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Доставка и оплата
              </Link>
              <Link to="/returns" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Возврат и обмен
              </Link>
              <Link to="/size-guide" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Таблица размеров
              </Link>
              <Link to="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                Частые вопросы
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-smooth">
                О нас
              </Link>
            </div>
          </div>

          {/* Контакты и подписка */}
          <div className="space-y-4">
            <h3 className="font-semibold">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+7 (999) 999-99-99</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@littlestyle.ru</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Пн-Вс: 9:00-21:00</span>
              </div>
            </div>

            {/* Подписка на рассылку */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Подпишитесь на новости</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Ваш email"
                  className="text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  Подписаться
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Узнавайте первыми о новинках и акциях
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 LittleStyle. Все права защищены.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              Создано с <Heart className="h-3 w-3 mx-1 fill-current text-primary" /> для детей
            </span>
          </div>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};