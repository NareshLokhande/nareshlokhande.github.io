import { Contact } from '@/components/contact';
import { Experience } from '@/components/experience';
import { Hero } from '@/components/hero';
import { HowIWork } from '@/components/how-i-work';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import {
  EMAIL_URL,
  EMPLOYER,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL,
  TWITTER_URL,
} from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Software Engineer',
  url: SITE_URL,
  email: `mailto:${EMAIL_URL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL, TWITTER_URL],
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  knowsAbout: [
    'Java',
    'Spring Boot',
    'REST API design',
    'Spring Security',
    'Hibernate multi-tenancy',
    'SQL Server',
    'PostgreSQL',
    'Liquibase',
    'Azure App Service',
  ],
  worksFor: { '@type': 'Organization', name: EMPLOYER.name, url: EMPLOYER.url },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'C-DAC Mumbai' },
    { '@type': 'CollegeOrUniversity', name: 'PCCOE Pune' },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <main id="main">
        <Hero />
        <Work />
        <HowIWork />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
