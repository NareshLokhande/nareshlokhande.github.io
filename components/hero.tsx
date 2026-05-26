'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
} from '@/lib/constants';

export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Hi, I&apos;m{' '}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Naresh Lokhande
          </span>
        </h1>

        <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
          Full Stack Developer — production Next.js & Spring Boot platforms on
          Azure
        </p>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Currently building education and tutoring platforms at BITCOLLAGE. I
          focus on microservices, clean API contracts, and shipping reliable
          software end-to-end.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
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
            className="w-full sm:w-auto"
          >
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
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
          <Link
            href={EMAIL_URL}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="animate-bounce text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
