/** A request or data flow drawn as a vertical trace: one node per step, top to bottom. */
export function Flow({
  steps,
  caption,
}: {
  steps: readonly string[];
  caption?: React.ReactNode;
}) {
  return (
    <figure>
      <ol className="ml-1 border-l border-border pl-5">
        {steps.map((step) => (
          <li key={step} className="relative py-1.5">
            <span
              aria-hidden
              className="absolute top-1/2 -left-[20.5px] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            />
            <code className="inline-block rounded-sm border border-border bg-card px-2 py-1 font-mono text-[13px] leading-snug break-words text-foreground">
              {step}
            </code>
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
