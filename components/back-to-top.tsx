'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="secondary"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full shadow-lg transition-all duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
