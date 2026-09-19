// State for the schema-per-tenant explainer. Imports nothing, so Node can test it directly.

export type Tenant = 'acme' | 'globex' | 'initech';
export const TENANTS: readonly Tenant[] = ['acme', 'globex', 'initech'];

/** Rows each tenant's schema holds, shown when the query runs. */
export const RECORDS: Readonly<Record<Tenant, number>> = { acme: 3, globex: 5, initech: 2 };

export type Stage =
  | 'idle'
  | 'request'
  | 'filter'
  | 'context'
  | 'connection'
  | 'query'
  | 'released';

export interface RoutingState {
  stage: Stage;
  /** Tenant carried by the current (or last) request. */
  tenant: Tenant;
  /** The ThreadLocal TenantContext: set by the filter, cleared on release. */
  context: Tenant | null;
  /** Schema of the borrowed connection. Pooled connections sit on public. */
  connectionSchema: Tenant | 'public';
  /** Tenant whose rows the last query returned. */
  result: Tenant | null;
}

export type RoutingAction = { type: 'send'; tenant: Tenant } | { type: 'advance' };

export const initialRouting: RoutingState = {
  stage: 'idle',
  tenant: 'acme',
  context: null,
  connectionSchema: 'public',
  result: null,
};

export function routingReducer(state: RoutingState, action: RoutingAction): RoutingState {
  if (action.type === 'send') {
    return {
      stage: 'request',
      tenant: action.tenant,
      context: null,
      connectionSchema: 'public',
      result: null,
    };
  }
  switch (state.stage) {
    case 'request':
      return { ...state, stage: 'filter' };
    case 'filter':
      return { ...state, stage: 'context', context: state.tenant };
    case 'context':
      return { ...state, stage: 'connection', connectionSchema: state.tenant };
    case 'connection':
      return { ...state, stage: 'query', result: state.tenant };
    case 'query':
      return { ...state, stage: 'released', connectionSchema: 'public', context: null };
    default:
      return state; // idle and released have nothing to advance to
  }
}

export function isRunning(state: RoutingState): boolean {
  return state.stage !== 'idle' && state.stage !== 'released';
}

export function routingCaption({ stage, tenant }: RoutingState): string {
  switch (stage) {
    case 'idle':
      return 'Pick a tenant to send a request.';
    case 'request':
      return `A request arrives with tenant ${tenant} in its token.`;
    case 'filter':
      return 'TenantContextFilter reads the tenant from the token.';
    case 'context':
      return 'The tenant is stored in a ThreadLocal, for this request only.';
    case 'connection':
      return `The connection provider calls setSchema(${tenant}) on a pooled connection.`;
    case 'query':
      return `The query runs in schema ${tenant} and can only see its ${RECORDS[tenant]} rows.`;
    case 'released':
      return 'Released: the connection is reset to public and the tenant context is cleared.';
  }
}
