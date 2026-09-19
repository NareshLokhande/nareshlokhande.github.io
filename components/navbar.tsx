'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { RESUME_URL, SECTIONS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type SectionId = (typeof SECTIONS)[number]['id'];

const none = () => null;
const noSubscribe = () => () => {};

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

/** Last section whose top has scrolled past the fixed bar; null above the first one. */
function activeSectionId(): SectionId | null {
  const y = window.scrollY + 96;
  let current: SectionId | null = null;
  for (const { id } of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  }
  return current;
}

export function Navbar() {
  const isHome = usePathname() === '/';
  const active = useSyncExternalStore(
    isHome ? subscribeScroll : noSubscribe,
    isHome ? activeSectionId : none,
    none,
  );
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    // The menu only exists below md; close it if the viewport grows (e.g. a tablet rotates).
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Outside the header: its backdrop-blur would make it the containing block for fixed children. */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
        />
      )}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            {SITE_NAME}
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-6 md:flex">
              <nav aria-label="Primary">
                <ul className="flex items-center gap-6">
                  {SECTIONS.map(({ id, label }) => (
                    <li key={id}>
                      <Link
                        href={`/#${id}`}
                        aria-current={active === id ? 'true' : undefined}
                        className={cn(
                          'text-sm hover:text-foreground',
                          active === id
                            ? 'text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button asChild variant="outline" size="sm">
                <a href={RESUME_URL} download>
                  <Download />
                  Resume
                </a>
              </Button>
            </div>

            <ThemeToggle />

            <Button
              ref={toggleRef}
              type="button"
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Menu"
          inert={!open}
          className={cn(
            'overflow-y-auto border-t border-border bg-background md:hidden motion-safe:transition-[max-height,visibility] motion-safe:duration-200',
            open ? 'visible max-h-[calc(100dvh-4rem)]' : 'invisible max-h-0',
          )}
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  onClick={close}
                  aria-current={active === id ? 'true' : undefined}
                  className={cn(
                    'block py-2.5 text-base hover:text-foreground',
                    active === id ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={RESUME_URL}
                download
                onClick={close}
                className="flex items-center gap-2 py-2.5 text-base text-muted-foreground hover:text-foreground"
              >
                <Download className="size-4" />
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
