# AGENTS.md

Portfolio site for MD Ashikur Rahman Puspo.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config) |
| `npm test` | Vitest (watch mode) |
| `npm run coverage` | Vitest + coverage |
| `npx vitest run src/lib/utils.test.ts` | Single test |

`vitest` runs in watch mode by default. Use `vitest run` for CI.

## Architecture

- **App Router** with static data layer — blogs and projects are hardcoded TS arrays in `src/lib/`. Only GitHub API is external (ISR, 1hr revalidation).
- **Homepage** uses `next/dynamic` with skeleton placeholders for below-the-fold sections (see `src/app/page.tsx`). Cursor follower lazy-loaded separately.
- **Backend proxy**: Next.js rewrites `/api/v1/*` to Spring Boot at `BACKEND_URL` env var (defaults: `http://localhost:8082` dev, `http://portfolio-backend:8080` prod).
- **SEO**: `constructMetadata()` in `src/lib/seo.ts` — standardized per-page Metadata objects. JSON-LD structured data in root layout. Dynamic OG image at `src/app/opengraph-image.tsx`.

## Key paths

- `src/lib/site.ts` — site config, social profiles, navigation
- `src/lib/projects.ts` — project data (single source of truth)
- `src/lib/api.ts` — blog data (static, markdown content inline)
- `src/lib/github.ts` — GitHub API client (`GITHUB_USERNAME = 'pacman-cli'`)
- `src/lib/seo.ts` — `constructMetadata()` helper
- `src/lib/data/skills.tsx` — skills/tech-stack data
- `src/lib/blur.ts` — image blur hash utilities
- `src/types/index.ts` — shared TS types
- `src/test/setup.tsx` — Vitest setup (mocks `next/dynamic`, framer-motion)
- `src/hooks/useActiveSection.ts` — scroll-based active section detection

## Conventions

- No emojis in code, comments, or docs
- Immutability — never mutate objects or arrays
- Functional components, `const` over `let`
- Type safety for all props and data
- `console.error` in error handlers is acceptable; no `console.log` in production code
- Files: 200-400 lines typical, 800 max
- Path alias `@/*` -> `./src/*`

## Config quirks

- **Dark mode**: `class`-based via next-themes. CSS custom properties in HSL format (shadcn/ui pattern).
- **Fonts**: Inter (body), Plus Jakarta Sans (heading) via `next/font/google`. CSS vars `--font-body`, `--font-heading`.
- **Images**: AVIF + WebP with quality tiers [75, 88, 90, 92]. Remote patterns for unsplash, github.com, drive.google.com.
- **`@tailwindcss/typography`** plugin for prose styles (blog content).
- ESLint: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` (flat config). Ignores `.next/`, `out/`, `build/`.
- **Google AdSense**: hardcoded script in root layout (`ca-pub-5094804024850501`).
- **Env vars**: `NEXT_PUBLIC_SITE_URL` (SEO), `BACKEND_URL` (API proxy)
- No prettier, no husky, no commit hooks.
- `next.config.ts` has cache headers for static assets (1yr immutable) and `stale-while-revalidate=86400` for pages.
- `vercel.json` has security headers and asset caching.
