export const SITE_URL = 'https://nareshlokhande.github.io';
export const SITE_NAME = 'Naresh Lokhande';
export const SITE_TITLE = 'Naresh Lokhande — Backend Software Engineer';
export const SITE_DESCRIPTION =
  'Backend-focused Software Engineer building modular backend systems and REST APIs with Java and Spring Boot, with experience in scheduling workflows, authentication, and audit-ready services.';
export const TWITTER_HANDLE = '@nareshlokhande_';

export const GITHUB_URL = 'https://github.com/naresh-lokhande/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nareshlokhande/';
export const TWITTER_URL = 'https://x.com/nareshlokhande_';
export const EMAIL_URL = 'nareshlokhande.dev@gmail.com';
export const RESUME_URL = '/Naresh_Lokhande_Backend_SDE.pdf';

// Organization configurations
export interface Organization {
  name: string;
  logo?: string; // URL or path to organization logo
  website?: string; // Organization website URL
}

export const organizations: Record<string, Organization> = {
  BITCOLLAGE: {
    name: 'BITCOLLAGE Consulting Services LLP',
    logo: 'https://www.bitcollageconsulting.com/wp-content/uploads/2024/01/bitcollage-logo.png',
    website: 'https://www.bitcollageconsulting.com/',
  },
  // Add more organizations here as needed
  // Example:
  // 'SHIVANI_BATRA_CLINIC': {
  //   name: 'Shivani Batra Clinic',
  //   logo: '/path/to/logo.png',
  //   website: 'https://example.com',
  // },
};

// Helper function to get organization data
export function getOrganization(key: string): Organization | undefined {
  return organizations[key];
}
