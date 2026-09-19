'use client';

import { cn } from '@/lib/utils';
import { useEffect, useReducer } from 'react';
import { ExplainerShell } from './shell';
import {
  initialRouting,
  isRunning,
  RECORDS,
  routingCaption,
  routingReducer,
  TENANTS,
  type RoutingState,
  type Stage,
  type Tenant,
} from './tenant-routing-model';
import { TONES, type Tone } from './tones';

const TENANT_TONE: Record<Tenant, Tone> = { acme: 'amber', globex: 'violet', initech: 'green' };
const STEP_MS = 900;
const ORDER: Stage[] = ['request', 'filter', 'context', 'connection', 'query', 'released'];

/** Whether the request has got as far as `step`. */
function reached(stage: Stage, step: Stage): boolean {
  return stage !== 'idle' && ORDER.indexOf(stage) >= ORDER.indexOf(step);
}

/** Rows the current stage is acting on. Release touches the context and the connection. */
function isActive(stage: Stage, step: Stage): boolean {
  if (stage === 'released') return step === 'context' || step === 'connection';
  return stage === step;
}

function rows({ stage, tenant, context, connectionSchema }: RoutingState) {
  return [
    {
      step: 'request' as const,
      label: 'Request',
      value: reached(stage, 'request') ? `token: tenant=${tenant}` : 'waiting',
    },
    {
      step: 'filter' as const,
      label: 'TenantContextFilter',
      value: reached(stage, 'filter') ? `reads ${tenant}` : 'idle',
    },
    { step: 'context' as const, label: 'TenantContext', value: context ?? 'empty' },
    { step: 'connection' as const, label: 'Connection', value: `schema = ${connectionSchema}` },
  ];
}

export function TenantRouting() {
  const [state, dispatch] = useReducer(routingReducer, initialRouting);
  const tone = TONES[TENANT_TONE[state.tenant]];
  const released = state.stage === 'released';

  // One demo request on load, skipped for visitors who prefer reduced motion. The reducer
  // drops it once the visitor has sent a request, so it never overrides a click.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => dispatch({ type: 'demo' }), 600);
    return () => clearTimeout(timer);
  }, []);

  // Walk the request through its stages, one step at a time.
  useEffect(() => {
    if (!isRunning(state)) return;
    const timer = setTimeout(() => dispatch({ type: 'advance' }), STEP_MS);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <ExplainerShell
      caption={routingCaption(state)}
      controls={
        <>
          <span className="text-sm text-muted-foreground">Send a request as</span>
          {TENANTS.map((tenant) => {
            const t = TONES[TENANT_TONE[tenant]];
            const pressed = state.stage !== 'idle' && state.tenant === tenant;
            return (
              <button
                key={tenant}
                type="button"
                aria-pressed={pressed}
                onClick={() => dispatch({ type: 'send', tenant })}
                className={cn(
                  'rounded-md border-[1.5px] px-2.5 py-1 font-mono text-sm motion-safe:transition-colors',
                  pressed ? t.fill : cn('bg-card', t.border, t.text),
                )}
              >
                {tenant}
              </button>
            );
          })}
        </>
      }
    >
      <ol className="ml-1.5 border-l-[1.5px] border-input pl-5">
        {rows(state).map(({ step, label, value }) => {
          const lit = reached(state.stage, step) && !released;
          return (
            <li key={step} className="relative py-0.5">
              <span
                aria-hidden
                className={cn(
                  'absolute top-1/2 -left-[20.75px] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] motion-safe:transition-colors',
                  lit ? cn(tone.dot, tone.border) : 'border-input bg-card',
                )}
              />
              <div
                className={cn(
                  'flex flex-wrap items-baseline justify-between gap-x-3 rounded-md px-2 py-1.5 motion-safe:transition-colors',
                  isActive(state.stage, step) && tone.soft,
                )}
              >
                <span className="font-mono text-[13px]">{label}</span>
                <span className={cn('font-mono text-[13px]', lit ? tone.text : 'text-muted-foreground')}>
                  {value}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <ul aria-label="Tenant schemas" className="mt-4 grid grid-cols-3 gap-2">
        {TENANTS.map((tenant) => {
          const t = TONES[TENANT_TONE[tenant]];
          const hit = state.result === tenant;
          const live = hit && state.stage === 'query';
          return (
            <li
              key={tenant}
              className={cn(
                'rounded-md border-[1.5px] px-2 py-2 motion-safe:transition-colors',
                live ? t.fill : hit ? cn('bg-card', t.border) : 'border-dashed border-input bg-card',
              )}
            >
              <span className={cn('block text-xs', !live && 'text-muted-foreground')}>schema</span>
              <span
                className={cn(
                  'block font-mono text-sm font-medium',
                  !live && (hit ? t.text : 'text-muted-foreground'),
                )}
              >
                {tenant}
              </span>
              <span className={cn('mt-1 block text-xs', !live && (hit ? t.text : 'text-muted-foreground'))}>
                {hit ? `${RECORDS[tenant]} rows returned` : 'not touched'}
              </span>
            </li>
          );
        })}
      </ul>
    </ExplainerShell>
  );
}
