import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockCategories } from '@/data/mockCategories';
import { cn } from '@/lib/utils';

export const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-h2 font-serif font-semibold mb-4">
            Выберите категорию
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Качественная детская одежда для каждого возраста. 
            Найдите идеальные вещи для ваших малышей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {mockCategories.map((category, index) => (
            <Card 
              key={category.id}
              className={cn(
                "group overflow-hidden hover:shadow-hover transition-all duration-300 border-border/50 hover:border-primary/20",
                "animate-fade-up",
                `animation-delay-${index * 100}`
              )}
            >
              <Link to={`/${category.slug}`}>
                <CardContent className="p-0">
                  {/* Изображение категории */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                    
                    {/* Счетчик товаров */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-dark">
                        {category.count} товаров
                      </div>
                    </div>
                  </div>

                  {/* Информация о категории */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-h3 font-serif font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-4"
                    >
                      Смотреть коллекцию
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};