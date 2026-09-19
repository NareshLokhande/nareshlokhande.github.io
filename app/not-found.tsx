import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-4 pt-24 sm:px-6 lg:px-8"
    >
      <h1 className="text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        That address does not exist here. The work list is on the home page.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go to the home page</Link>
      </Button>
    </main>
  );
}
