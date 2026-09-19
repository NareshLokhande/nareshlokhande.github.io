# Naresh Lokhande — Portfolio

Personal site of a backend engineer. Next.js 16 (App Router) exported to static HTML and served from GitHub Pages.

Live site: https://nareshlokhande.github.io

## What is on the site

- Home page: hero, Work, How I work, Experience, Skills, Contact
- One case-study page per project at `/projects/<slug>/`
- Light and dark theme (`next-themes`)
- Contact form posting to [Web3Forms](https://web3forms.com) from the browser
- Resume PDF, sitemap, robots, Open Graph image

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, a handful of shadcn/ui primitives (`button`, `badge`, `input`, `label`, `textarea`, `spinner`), lucide-react icons.

## Where content lives

| Content | File |
|---------|------|
| Projects and case studies | `lib/projects.ts` |
| Name, links, employer, location, section list | `lib/constants.ts` |
| Experience and education | `components/experience.tsx` |
| Skills | `components/skills.tsx` |
| How I work | `components/how-i-work.tsx` |
| Resume PDF | `public/Naresh_Lokhande_Backend_SDE.pdf` |

Adding an entry to `lib/projects.ts` gives it a page, metadata and a sitemap entry.

## Scripts

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # static export to out/
npm run lint     # ESLint
npm run preview  # serve out/ locally (run build first)
```

Node version is in `.nvmrc`.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form |

Locally, put it in `.env.local`. In CI, set it as a GitHub Actions secret (Settings, Secrets and variables, Actions). Without it the form shows a message with an email link instead of sending.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run lint`, `npm run build`, then publishes `out/` to the `gh-pages` branch. Pushing to `main` deploys the live site.
