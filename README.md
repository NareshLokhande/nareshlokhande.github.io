# Naresh Lokhande — Portfolio

A modern, responsive portfolio built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Statically exported and deployed to **GitHub Pages**.

Live site: [https://nareshlokhande.github.io](https://nareshlokhande.github.io)

## Features

- Responsive single-page layout with project detail routes (`/projects/[slug]`)
- Dark / light theme (`next-themes`)
- Scroll-reveal section animations (respects `prefers-reduced-motion`)
- Filterable project grid (category + tech stack)
- Skills explorer with tabs and animated proficiency bars
- Testimonials carousel (Embla)
- Contact form via [Web3Forms](https://web3forms.com) (client-side, static-export friendly)
- Copy-to-clipboard actions with toast feedback (Sonner)
- Project detail: sticky tabs, code copy, optional screenshot lightbox

## Tech stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4 · shadcn/ui · Radix UI
- Embla Carousel · Sonner · Lucide icons
- GitHub Actions → `gh-pages` branch

## Project structure

```
app/                 # App Router pages, layout, globals
components/          # Section components + ui primitives
hooks/               # Shared client hooks
lib/                 # Projects data, constants, utilities
public/              # Static assets (resume, icons, OG image)
```

## Getting started

```bash
git clone https://github.com/NareshLokhande/nareshlokhande.github.io.git
cd nareshlokhande.github.io
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

For the contact form in production, set a GitHub Actions secret:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Free access key from [web3forms.com](https://web3forms.com) |

Local development: create `.env.local`:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Without this key, the form shows a friendly error and visitors can still use email links.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint |

## Deployment

Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci` and `npm run build` (with Web3Forms secret)
2. Publish `out/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`

Ensure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is configured under **Settings → Secrets and variables → Actions**.

## Customization

- **Projects**: edit [`lib/projects.ts`](lib/projects.ts)
- **Testimonials**: edit [`lib/testimonials.ts`](lib/testimonials.ts) (empty array hides the section)
- **Site metadata**: [`lib/constants.ts`](lib/constants.ts)
- **Skills**: [`components/skills.tsx`](components/skills.tsx)

## Contact

- **Email**: nareshlokhande.dev@gmail.com
- **GitHub**: [@NareshLokhande](https://github.com/NareshLokhande)
- **LinkedIn**: [nareshlokhande](https://www.linkedin.com/in/nareshlokhande/)
