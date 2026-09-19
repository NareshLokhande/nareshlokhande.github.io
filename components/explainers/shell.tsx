import { cn } from '@/lib/utils';

/** Frame shared by the explainers: controls and diagram on a dot-grid canvas, then a live caption. */
export function ExplainerShell({
  controls,
  caption,
  children,
  className,
}: {
  controls: React.ReactNode;
  caption: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>
      <div className="dot-grid p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">{controls}</div>
        <div className="mt-5">{children}</div>
      </div>
      <figcaption
        aria-live="polite"
        className="min-h-[calc(3lh+1.5rem)] border-t border-border px-4 py-3 text-sm leading-snug sm:min-h-[calc(2lh+1.5rem)] sm:px-5"
      >
        {caption}
      </figcaption>
    </figure>
  );
}
