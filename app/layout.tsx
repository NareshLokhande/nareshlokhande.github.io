import { BackToTop } from '@/components/back-to-top';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
  TWITTER_URL,
} from '@/lib/constants';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Naresh Lokhande',
    'Backend Software Engineer',
    'Spring Boot',
    'Azure',
    'REST APIs',
    'Microservices',
    'Java',
    'SQL Server',
    'Liquibase',
    'JWT',
    'Portfolio',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Backend Software Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/favicon.svg' }],
  },
  category: 'technology',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Backend Software Engineer',
  url: SITE_URL,
  email: `mailto:${EMAIL_URL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL, TWITTER_URL],
  knowsAbout: [
    'REST API design',
    'Spring Boot',
    'Java',
    'Microservices',
    'Azure',
    'SQL Server',
    'Liquibase',
    'Authentication & RBAC',
    'Workflow systems',
    'Audit logging',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'BITCOLLAGE Consulting Services LLP',
    url: 'https://www.bitcollageconsulting.com/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/*
          Plausible analytics — privacy-friendly, no cookies, no consent banner needed.
          Sign up at https://plausible.io and add `nareshlokhande.github.io` as a site.
          If you prefer a different provider (Google Analytics, Umami, Vercel Analytics),
          swap the Script tag below.
        */}
        <Script
          defer
          data-domain="nareshlokhande.github.io"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
          </TooltipProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
