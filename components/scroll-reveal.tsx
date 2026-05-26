'use client';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const visible = prefersReducedMotion || hasEnteredView;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        !prefersReducedMotion && 'transition-all duration-700 ease-out',
        !prefersReducedMotion &&
          !visible &&
          'translate-y-6 opacity-0',
        !prefersReducedMotion &&
          visible &&
          'translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-4',
        className,
      )}
      style={visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
