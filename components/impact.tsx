// Numbers from the resume. Keep them identical to it.
const numbers = [
  {
    value: '~30%',
    label: 'more development efficiency from reusable design patterns and optimised validation',
  },
  { value: '~40%', label: 'less manual coordination with role-based scheduling workflows' },
  { value: '1000+', label: 'active users on an education platform I delivered' },
];

export function Impact() {
  return (
    <section aria-label="Impact" className="border-t border-border">
      <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:gap-10 sm:px-6 lg:px-8">
        {numbers.map(({ value, label }) => (
          <li key={value}>
            <p className="text-5xl font-extrabold tracking-tight tabular-nums">{value}</p>
            <p className="mt-2 max-w-xs text-muted-foreground">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
