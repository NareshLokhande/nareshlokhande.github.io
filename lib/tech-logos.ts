export interface TechLogo {
  name: string;
  logoUrl: string;
}

const techLogos: Record<string, TechLogo> = {
  Java: {
    name: 'Java',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  'Spring Boot': {
    name: 'Spring Boot',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  },
  'Spring Boot 4': {
    name: 'Spring Boot 4',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  },
  'Spring Modulith': {
    name: 'Spring Modulith',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  },
  'Spring Security': {
    name: 'Spring Security',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  },
  'REST APIs': {
    name: 'REST APIs',
    logoUrl: 'https://cdn.simpleicons.org/fastapi/009688',
  },
  'SQL Server': {
    name: 'SQL Server',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
  Azure: {
    name: 'Azure',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  },
  Liquibase: {
    name: 'Liquibase',
    logoUrl: 'https://cdn.simpleicons.org/liquibase/2962FF',
  },
  'Java 21': {
    name: 'Java 21',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  'Hibernate 7.2': {
    name: 'Hibernate 7.2',
    logoUrl: 'https://cdn.simpleicons.org/hibernate/59666C',
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  JWT: {
    name: 'JWT',
    logoUrl: 'https://cdn.simpleicons.org/jsonwebtokens/000000',
  },
  'Google OAuth2': {
    name: 'Google OAuth2',
    logoUrl: 'https://cdn.simpleicons.org/google/4285F4',
  },
  'Next.js': {
    name: 'Next.js',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  React: {
    name: 'React',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  TypeScript: {
    name: 'TypeScript',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    logoUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
};

export function getTechLogo(tech: string): TechLogo | undefined {
  return techLogos[tech];
}
