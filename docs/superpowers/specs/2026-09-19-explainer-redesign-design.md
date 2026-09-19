# Portfolio redesign: interactive pattern explainers

Date: 2026-09-19
Status: approved in brainstorming, pending spec review

## Why

1. **Confidentiality.** The case-study pages name clients and describe the internals of BITCOLLAGE and client systems (class names, request flows, code re-created from employer code). The site must stay at resume level.
2. **Too much reading.** Visitors have to read to understand anything. The site should let them see backend behaviour instead.

## Decisions

| Question | Decision |
|---|---|
| Work detail | Resume level only. No client names, no internal names or flows, no code derived from employer code. |
| Centrepiece | Three interactive explainers of generic patterns from the resume. |
| Explainers | Schema-per-tenant routing, schedule changes that keep history, OTP verification state machine. |
| Layout | Live hero (layout A): tenant routing in the first screen, impact numbers, then the other two explainers. |
| Look | Colour-coded systems: white paper with a dot grid, Archivo, colour that carries meaning. |

## Content

### Removed

- `/projects/*` pages, the Work section, and `lib/projects.ts`.
- The How I work section (its evidence linked to the removed projects).
- The clinic website project (frontend work, the only remaining named client).
- All client names: 24Tutors, the EdTech client, the clinic.

### Home page, in order

1. **Hero.** "Backend engineer, Mumbai". Headline: "I build backends that keep tenant data isolated, schedules consistent and sign-ups secure." One-line stack: Java, Spring Boot, SQL Server, PostgreSQL, Azure. Buttons: "See how it works" (to `#patterns`) and "Resume". Right side: the tenant-routing explainer.
2. **Impact numbers** (from the resume): "~30%" more development efficiency through reusable design patterns; "~40%" less manual coordination with role-based scheduling; "1000+" active users on an education platform.
3. **Patterns** (`#patterns`): schedule-history and OTP explainers, side by side on desktop, stacked on phones. Each has a title and one caption line.
4. **Experience** (`#experience`): Software Engineer, BITCOLLAGE Consulting Services LLP, January 2025 to present. Five or six resume-level bullets without client names. Education below.
5. **Skills** (`#skills`): same groups as now, restyled.
6. **Contact** (`#contact`): email, copy button, Web3Forms form, as now.

Navigation: Patterns, Experience, Skills, Contact, Resume, theme toggle.

### Framing rule

Each explainer is titled and captioned as the general pattern ("How schema-per-tenant routing works"). The only claim about the owner is resume level: "I've built multi-tenant SaaS, scheduling workflows and OTP verification in production." Diagrams use invented names (tenants acme, globex, initech; teachers Asha and Ben) and textbook behaviour.

## Explainer behaviour

Shared rules:

- The initial state is server-rendered, so the diagram is visible without JavaScript.
- Controls are `<button>`s with `aria-pressed` where they toggle. One caption line under each diagram is an `aria-live="polite"` region describing what just happened.
- Diagrams are built in HTML and CSS, not SVG, so they reflow on narrow screens and their text is read directly by screen readers; decorative marks are `aria-hidden`.
- Nothing animates by itself except one short run on page load (explainer 1 only). With `prefers-reduced-motion: reduce`, state changes are instant and the load run is skipped.
- Every colour is paired with a label or shape; colour is never the only signal.
- On narrow screens each diagram reflows vertically instead of shrinking.

### 1. Schema-per-tenant routing (hero)

- Controls: tenant buttons acme (amber), globex (violet), initech (green).
- Steps on click: request packet in the tenant's colour → `TenantContextFilter` → resolver → `setSchema(tenant)` → the tenant's schema box lights up with "3 records, all <tenant>" → release: the connection returns to the pool, its schema label changes to `public`, and the tenant context clears.
- Caption per step, for example "Tenant read from the JWT claim", "Connection reset to public before returning to the pool".
- On load it plays once for acme, then waits.

### 2. Schedule changes that keep history

- Ten sessions over two weeks for one class, a "today" marker after session 5. Past sessions were taught by Asha (violet).
- Mode toggle: "Naive update" / "Keep history". Button: "Reassign to Ben" (green). Button: "Reset".
- Naive: all ten sessions turn to Ben; the attendance report shows the error in red ("Ben taught 5 sessions he never ran").
- Keep history: only sessions 6 to 10 turn to Ben; the report stays correct (Asha 5 taught, Ben 5 scheduled).

### 3. OTP verification state machine

- States as nodes: Sent, Verified, Expired, Locked. Current state highlighted in its colour; the edge just taken is highlighted.
- The demo displays the code it sent. A six-digit input submits a guess.
- Correct code → Verified. Wrong code → attempts + 1; third wrong code → Locked. "Skip ahead 5 minutes" → Expired. "Resend" → Sent with a new code and attempts reset.
- Verified, Expired and Locked accept no further guesses until Resend.

## Visual system

- **Type:** Archivo for everything (headlines 800 with slightly tight tracking, body 400, UI 600) via `next/font`. IBM Plex Mono only for identifiers and codes inside diagrams. IBM Plex Serif and Plex Sans are removed.
- **Base:** white paper, ink `#16181D`, muted text with at least 4.5:1 contrast. Primary buttons are solid ink; colour is reserved for meaning.
- **Semantic colours:** amber `#D98A00` (acme), violet `#6D4AE0` (globex, Asha), green `#178A5B` (initech, Ben, Verified), red `#C2410C` (errors, Locked). Text on or in these colours must meet 4.5:1; use darker text tones where needed.
- **Dot grid:** only on explainer canvases (including the hero's).
- **Dark mode:** deep slate background `#15181E`, lighter tones of the same four colours, contrast checked.
- **Shape:** 6px radius on diagram nodes and buttons, 1.5px strokes, hairline section dividers.

## Implementation

- `components/explainers/`: one client component per explainer (SVG, React state, CSS transitions, no animation library). Each explainer's state logic is a pure reducer in its own module, separate from rendering.
- The reducer modules import nothing (no `@/` alias, no React), and use only erasable TypeScript (no enums, namespaces or parameter properties), so Node can run them directly with type stripping. The test file imports them with explicit `.ts` extensions; `tsconfig.json` gets `"allowImportingTsExtensions": true` (valid because it already has `noEmit`).
- Everything else stays a server component.
- Delete `app/projects/`, `components/{project-detail,work,how-i-work,flow}.tsx`, `lib/projects.ts`.
- Update `lib/constants.ts` `SECTIONS`, the navbar and footer, `app/sitemap.ts` (home only), `app/page.tsx` JSON-LD.
- Regenerate `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico` (ink mark with an amber accent) and `public/og-image.png` in the new style.
- Update README and CLAUDE.md.
- No new dependencies.

## Verification

- `npm test`: Node 24's built-in test runner (`node --test`, native TypeScript type stripping) over one test file covering the three reducers:
  - tenant routing ends with the connection on `public` and the context cleared;
  - naive reassignment changes past sessions, history-preserving reassignment does not;
  - OTP verifies on the right code, locks on the third wrong code, expires after the skip, and resend resets attempts.
- `npm run lint` and `npm run build` pass. CI runs `npm test` before building.
- Browser pass: light, dark, 390px and 1440px widths, keyboard only, reduced motion. Lighthouse accessibility, best practices and SEO at 100.

## Delivery

Separate commits on the `redesign` branch: explainer logic and tests; explainer components; page restructure and content removal; visual system; assets and docs. Nothing is pushed.
