import React from 'react';
import { Shield, Heart, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { editorialBlocks } from '@/data/mockContent';

const iconMap = {
  Shield,
  Heart, 
  Leaf,
};

export const EditorialSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-h2 font-serif font-semibold mb-4">
            Почему выбирают LittleStyle?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Мы создаем не просто одежду, а заботливо продуманные решения 
            для комфорта и радости ваших детей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {editorialBlocks.map((block, index) => {
            const Icon = iconMap[block.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={block.id}
                className="text-center border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {block.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {block.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};