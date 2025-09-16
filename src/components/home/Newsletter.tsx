import React from 'react';
import { Instagram, MessageCircle, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Newsletter = () => {
  // EDIT_SOCIAL_LINKS: Измените эти ссылки на ваши социальные сети
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/littlestyle', // EDIT_SOCIAL_LINKS: Замените на вашу ссылку Instagram
      color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
      hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-orange-500'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/littlestyle', // EDIT_SOCIAL_LINKS: Замените на вашу ссылку Telegram
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: Phone,
      url: 'https://wa.me/79999999999', // EDIT_SOCIAL_LINKS: Замените на ваш номер WhatsApp
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700'
    },
    {
      name: 'VK',
      icon: Users,
      url: 'https://vk.com/littlestyle', // EDIT_SOCIAL_LINKS: Замените на вашу ссылку VK
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800'
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <Card className="bg-gradient-warm border-0 text-primary-foreground overflow-hidden relative">
          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          
          <CardContent className="relative p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-h2 font-serif font-semibold mb-3">
                  Следите за нами в социальных сетях
                </h2>
                <p className="text-primary-foreground/90 text-lg">
                  Узнавайте первыми о новых коллекциях, акциях и специальных предложениях
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Button
                      key={index}
                      asChild
                      className={`${social.color} ${social.hoverColor} text-white border-0 aspect-square p-0 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Перейти в ${social.name}`}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <IconComponent className="h-6 w-6 mb-1" />
                          <span className="text-xs font-medium">{social.name}</span>
                        </div>
                      </a>
                    </Button>
                  );
                })}
              </div>

              <p className="text-xs text-primary-foreground/70 mt-6">
                Присоединяйтесь к нашему сообществу и будьте в курсе всех новостей
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};