'use client';

import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/clipboard';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CopyButton({
  text,
  label = 'Copy',
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={async () =>
        setState((await copyToClipboard(text)) ? 'copied' : 'failed')
      }
    >
      {state === 'copied' ? <Check /> : <Copy />}
      <span aria-live="polite">
        {state === 'copied'
          ? 'Copied'
          : state === 'failed'
            ? 'Copy failed'
            : label}
      </span>
    </Button>
  );
}
