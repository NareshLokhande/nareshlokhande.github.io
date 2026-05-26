'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { testimonials } from '@/lib/testimonials';
import type { CarouselApi } from '@/components/ui/carousel';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Testimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || prefersReducedMotion || isHovered || testimonials.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [api, prefersReducedMotion, isHovered]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What People Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Selected feedback from people I&apos;ve worked with.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: testimonials.length > 1,
            }}
            className="mx-auto w-full max-w-4xl"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/2"
                >
                  <Card className="h-full border-border/50 transition-all hover:shadow-md">
                    <CardContent className="flex h-full flex-col gap-6 pt-6">
                      <Quote
                        className="h-8 w-8 text-primary/40"
                        aria-hidden="true"
                      />
                      <p className="flex-1 text-base leading-relaxed text-muted-foreground italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="border-t border-border/40 pt-4">
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                          {testimonial.organization && (
                            <span> · {testimonial.organization}</span>
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {testimonials.length > 1 && (
              <>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </>
            )}
          </Carousel>
          </div>

          {testimonials.length > 1 && (
            <div
              className="mt-6 flex justify-center gap-2"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    selectedIndex === index
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
