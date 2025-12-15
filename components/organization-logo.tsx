'use client';

import Image from 'next/image';
import Link from 'next/link';

interface OrganizationLogoProps {
  organization: string;
  logo?: string;
  website?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function OrganizationLogo({
  organization,
  logo,
  website,
  size = 'md',
  className = '',
}: OrganizationLogoProps) {
  // BITCOLLAGE special styling: BIT in red, COLLAGE in green
  if (organization === 'BITCOLLAGE') {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const logoContent = (
      <span
        className={`font-bold tracking-tight ${sizeClasses[size]} ${className}`}
      >
        <span className="text-red-600 dark:text-red-500">BIT</span>
        <span className="text-green-600 dark:text-green-500">COLLAGE</span>
      </span>
    );

    if (website) {
      return (
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          {logoContent}
        </Link>
      );
    }

    return logoContent;
  }

  // For other organizations, use image logo if available
  if (logo) {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const logoElement = (
      <div
        className={`relative shrink-0 overflow-hidden rounded ${sizeClasses[size]}`}
      >
        <Image
          src={logo}
          alt={`${organization} logo`}
          fill
          className="object-contain"
          sizes={size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px'}
        />
      </div>
    );

    if (website) {
      return (
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          {logoElement}
        </Link>
      );
    }

    return logoElement;
  }

  return null;
}
