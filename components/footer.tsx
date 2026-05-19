'use client';

import { Download, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  TWITTER_URL,
} from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Naresh Lokhande</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer building production Next.js & Spring Boot
              platforms on Azure.
            </p>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#home"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#how-i-develop"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  How I Develop
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex gap-4">
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <a
                href={`mailto:${EMAIL_URL}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Naresh Lokhande. All rights reserved. Built with
            Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
