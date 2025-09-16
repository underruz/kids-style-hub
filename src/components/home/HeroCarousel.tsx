import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/data/mockContent';
import { cn } from '@/lib/utils';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const heroImages = {
  '/src/assets/hero-1.jpg': hero1,
  '/src/assets/hero-2.jpg': hero2,
  '/src/assets/hero-3.jpg': hero3,
};

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Возобновляем автопрокрутку через 10 секунд
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section 
      className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Слайды */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-transform duration-700 ease-in-out",
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            )}
          >
            {/* Фоновое изображение */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-dark/20">
              <img
                src={heroImages[slide.image as keyof typeof heroImages] || slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Контент слайда */}
            <div className="relative h-full flex items-center">
              <div className="container px-4 md:px-6 lg:px-8">
                <div className="max-w-2xl space-y-6 text-white animate-fade-up">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    {slide.description}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={slide.ctaLink}>
                      {slide.ctaText}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Индикаторы */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
};