'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { RESUME_URL, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import * as React from 'react';

const primaryNavItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
] as const;

const exploreNavItems = [
  {
    name: 'Skills',
    href: '#skills',
    id: 'skills',
    description: 'Languages, frameworks, and tools',
  },
  {
    name: 'How I Develop',
    href: '#how-i-develop',
    id: 'how-i-develop',
    description: 'Workflow, practices, and approach',
  },
  {
    name: 'Testimonials',
    href: '#testimonials',
    id: 'testimonials',
    description: 'Feedback from colleagues and collaborators',
  },
] as const;

const sectionIds = [
  ...primaryNavItems.map((item) => item.id),
  ...exploreNavItems.map((item) => item.id),
];

type NavAnchorProps = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
};

function NavAnchor({
  href,
  children,
  isActive,
  onClick,
  className,
}: NavAnchorProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          'absolute bottom-0 left-3 right-3 h-0.5 origin-center rounded-full bg-primary transition-transform duration-300',
          isActive
            ? 'scale-x-100'
            : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('home');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const updateActiveSection = () => {
      const offset = 120;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= window.scrollY + offset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      updateActiveSection();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const exploreIsActive = exploreNavItems.some(
    (item) => item.id === activeSection
  );

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur transition-shadow duration-300 supports-backdrop-filter:bg-background/60',
        scrolled && 'shadow-md shadow-black/5 dark:shadow-black/20'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          onClick={closeMobileMenu}
          className="shrink-0 text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-xl"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0">
              {primaryNavItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink asChild>
                    <NavAnchor
                      href={item.href}
                      isActive={activeSection === item.id}
                    >
                      {item.name}
                    </NavAnchor>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    'h-auto bg-transparent px-3 py-2 text-sm font-medium shadow-none transition-colors hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent',
                    exploreIsActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    {exploreNavItems.map((item) => (
                      <li key={item.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'block rounded-md p-3 transition-colors hover:bg-accent',
                              activeSection === item.id && 'bg-accent/60'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.name}
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-2 flex items-center gap-1 border-l border-border/60 pl-3">
            <Button asChild size="sm" variant="outline">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 transition-transform hover:rotate-12"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="h-9 w-9"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t border-border/40 bg-background transition-[max-height,opacity] duration-300 ease-out md:hidden',
          mobileMenuOpen
            ? 'max-h-[28rem] opacity-100'
            : 'max-h-0 border-t-transparent opacity-0'
        )}
      >
        <div className="space-y-4 px-4 py-4">
          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Main
            </p>
            <div className="flex flex-col">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </p>
            <div className="flex flex-col">
              {exploreNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'rounded-md px-3 py-2.5 transition-colors',
                    activeSection === item.id
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Button asChild className="w-full" variant="outline">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={closeMobileMenu}
            >
              <Download className="mr-2 h-4 w-4" />
              Download resume
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
