import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/lib/testimonials';
import { Quote } from 'lucide-react';

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What People Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Selected feedback from people I&apos;ve worked with.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 transition-all hover:shadow-md"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
