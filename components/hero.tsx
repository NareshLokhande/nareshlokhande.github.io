'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
} from '@/lib/constants';
import { copyToClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ROTATING_TAGLINES = [
  'Java, Spring Boot, and REST APIs',
  'Scheduling workflows, OTP auth, and audit logging',
  'Production backend systems on SQL Server and Azure',
];

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % ROTATING_TAGLINES.length);
        setFadeIn(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const ctaClass =
    'transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{' '}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Naresh Lokhande
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p className="mb-2 text-xl text-muted-foreground sm:text-2xl">
            Backend Software Engineer
          </p>
          <p
            className={cn(
              'mx-auto mb-8 min-h-8 max-w-2xl text-lg text-primary/90 sm:text-xl',
              !prefersReducedMotion && 'transition-opacity duration-300',
              !prefersReducedMotion && !fadeIn && 'opacity-0',
              !prefersReducedMotion && fadeIn && 'opacity-100',
            )}
            aria-live="polite"
          >
            {ROTATING_TAGLINES[taglineIndex]}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Backend-focused engineer at BITCOLLAGE, building modular backend
            systems with Java and Spring Boot. I focus on resilient workflows,
            secure authentication, and production-grade API design.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className={cn('w-full sm:w-auto', ctaClass)}>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className={cn('w-full sm:w-auto', ctaClass)}
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn('w-full sm:w-auto', ctaClass)}
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <a
              href={`mailto:${EMAIL_URL}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Copy email address"
              onClick={() =>
                copyToClipboard(EMAIL_URL, 'Email copied to clipboard')
              }
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-16 flex justify-center">
            <a
              href="#about"
              className="animate-bounce text-muted-foreground transition-colors hover:text-foreground motion-reduce:animate-none"
              aria-label="Scroll down"
            >
              <ArrowDown className="h-6 w-6" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
