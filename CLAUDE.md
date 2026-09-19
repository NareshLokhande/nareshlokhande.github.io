# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # static export to out/ (also the only type-check step)
npm run lint     # ESLint (next core-web-vitals + typescript configs)
npm run preview  # serve out/ locally; next start does not work with output: export
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`. The build fails if any `/projects/[slug]/` page, `generateStaticParams`, or the slug guard in `components/how-i-work.tsx` breaks. Node version is pinned in `.nvmrc`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which lints, builds, and publishes `out/` to the `gh-pages` branch. Pushing to `main` means deploying to the live site, https://nareshlokhande.github.io. Do not commit or push unless asked.

## Architecture

Personal portfolio: Next.js 16 App Router, React 19, Tailwind v4, and a few shadcn/ui primitives.

**Static export only.** `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, and `images.unoptimized`. Nothing runs on a server: no API routes, server actions, middleware, or ISR. Dynamic routes list every param in `generateStaticParams`. Metadata routes (`app/sitemap.ts`, `app/robots.ts`) export `dynamic = 'force-static'`. The contact form (`components/contact-form.tsx`) posts from the browser to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (`.env.local` locally, a GitHub Actions secret in CI); without the key it shows a message with an email link.

**Trailing slashes.** Because `trailingSlash` is on, every page is written as `out/<path>/index.html` and every internal URL ends with `/`: project links are `/projects/<slug>/`, section links are `/#<id>`, sitemap entries end with `/`. Keep new links in that form; a link without the slash costs a redirect.

**Content lives in `lib/` and a few section components.**
- `lib/projects.ts`: the `projects` array and the `Project` type: `slug`, `title`, `summary`, `context`, `privateSource?`, `github?`, `demo?`, `technologies`, `problem`, `built[]`, `decisions?[]`, `outcome?`, `flow?[]`, `codeSnippets?[]`. Readers: `components/work.tsx` (home list), `components/hero.tsx`, `components/how-i-work.tsx`, `app/projects/[slug]/page.tsx` (with `components/project-detail.tsx`), and `app/sitemap.ts`. A new entry automatically gets a route, metadata, and a sitemap entry.
- **Content must be true of the real systems.** Every claim in the case studies, Experience and Skills traces to the owner's resume or to earlier versions of `lib/projects.ts`. Don't add technical specifics, metrics, dates or design rationale that aren't sourced; ask the owner instead. Client code is private, so snippets are simplified re-creations and must only show behaviour the real code has.
- `lib/constants.ts`: `SITE_*`, social and resume links, `EMAIL_URL`, `LOCATION`, `TIMEZONE`, `EMPLOYER`, and `SECTIONS` (home sections in page order). `SECTIONS` drives both the navbar and the footer, so adding or renaming a section means editing this list and the matching `<Section id>` in `app/page.tsx`.
- `components/experience.tsx`, `components/skills.tsx`, `components/how-i-work.tsx`: their content is inline in the component.
- `components/how-i-work.tsx` has a module-level guard that throws at build time if an evidence link points at a slug missing from `lib/projects.ts`. Renaming a project slug without updating those links fails the build on purpose.

**Layout primitives.** `components/section.tsx` (`<Section id title intro?>`) is the two-column label/content block used for every home section and every project-page block; it renders the `h2`. `components/flow.tsx` (`<Flow steps caption?>`) renders a request or data flow as a vertical trace, one node per step (the hero uses the carbon accounting project's `flow`). `components/icons.tsx` holds brand SVGs (GitHub, LinkedIn, X); generic icons come from lucide-react.

**Server first.** Route files and nearly every component are server components. `'use client'` is limited to `components/navbar.tsx` (scroll spy, mobile menu), `components/theme-toggle.tsx`, `components/contact-form.tsx`, and `components/copy-button.tsx`. Keep client code in the smallest component that needs it.

**UI primitives.** `components/ui/` contains only `button`, `badge`, `input`, `label`, `textarea`, `spinner` (shadcn new-york style, config in `components.json`). Merge classes with `cn()` from `lib/utils.ts`. Theme tokens are CSS variables in `app/globals.css` (`:root` light, `.dark` dark, `@theme inline`); base styles there already make `h1`/`h2`/`h3` serif and set focus-visible outlines. Tailwind v4 has no `tailwind.config` file. The path alias `@/*` maps to the repo root.

**Assets.** Icons are Next.js metadata files under `app/`: `icon.svg`, `apple-icon.png`, `favicon.ico`. The Open Graph image is `public/og-image.png` (1200x630), referenced from `app/layout.tsx` and the project pages. The resume PDF is in `public/`.
