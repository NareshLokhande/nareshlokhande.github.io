import { cn } from '@/lib/utils';

/**
 * Two-column section: title (and optional intro) in the label column,
 * content on the right. Stacks on small screens.
 */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('border-t border-border py-14 sm:py-20', className)}
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div>
          <h2 id={titleId} className="text-2xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
