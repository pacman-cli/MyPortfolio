# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for MD Ashikur Rahman Puspo. Next.js 16 App Router, React 19, Tailwind CSS v3, Framer Motion, Radix UI. Deployed on Vercel.

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint (flat config, eslint-config-next)
npm run test         # Vitest (watch mode)
npm run coverage     # Vitest with coverage
```

Run single test file: `npx vitest run src/lib/utils.test.ts`

## Architecture

**App Router** with static data layer — blogs and projects are hardcoded TypeScript arrays in `src/lib/`, not fetched at runtime. GitHub data is the only external API (ISR, 1hr revalidation). Backend proxy via Next.js rewrites `/api/v1/*` to Spring Boot at `BACKEND_URL` env var (defaults: `http://localhost:8082` dev, `http://portfolio-backend:8080` prod).

**Homepage** assembles sections via `next/dynamic` with skeleton placeholders for below-the-fold sections (see `src/app/page.tsx`). Cursor follower lazy-loaded separately.

**SEO**: `constructMetadata()` in `src/lib/seo.ts` — standardized per-page Metadata objects. JSON-LD structured data in root layout. Dynamic OG image at `src/app/opengraph-image.tsx`.

**Key paths:**
- `src/lib/site.ts` — site config, social profiles, navigation, `absoluteUrl()`
- `src/lib/seo.ts` — `constructMetadata()` for standardized Next.js Metadata
- `src/lib/api.ts` — blog data (static array with full markdown)
- `src/lib/projects.ts` — project data store (single source of truth)
- `src/lib/github.ts` — GitHub API client (profile + repos, `GITHUB_USERNAME = 'pacman-cli'`)
- `src/lib/data/skills.tsx` — skills/tech-stack data
- `src/lib/blur.ts` — image blur hash utilities
- `src/types/index.ts` — shared TS types
- `src/components/sections/` — page-level section components
- `src/components/ui/` — reusable UI primitives (shadcn/ui patterns)
- `src/components/seo/json-ld.tsx` — structured data components
- `src/hooks/useActiveSection.ts` — scroll-based active section detection
- `src/test/setup.tsx` — Vitest setup (mocks `next/dynamic`, `framer-motion`)

## Rules

- No emojis in code, comments, or documentation
- Immutability — never mutate objects or arrays
- Functional components, prefer `const` over `let`
- Type safety for all props and data
- `console.error` in error handlers is acceptable; no `console.log` in production code
- Files: 200-400 lines typical, 800 max
- Path alias `@/*` -> `./src/*`

## Testing

Vitest + React Testing Library, jsdom environment, globals enabled. Setup file mocks `next/dynamic` and `framer-motion`. Path alias `@/*` → `./src/*`.

## Config Notes

- Dark mode: `class`-based (next-themes). CSS custom properties in HSL format (shadcn/ui convention)
- Fonts: Inter (body), Plus Jakarta Sans (heading) via `next/font/google`. CSS vars `--font-body`, `--font-heading`
- Images: AVIF + WebP with quality tiers [75, 88, 90, 92]. Remote patterns for unsplash, github.com, drive.google.com
- `@tailwindcss/typography` plugin for prose styles (blog content)
- ESLint flat config: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores `.next/`, `out/`, `build/`
- Google AdSense script in root layout (`ca-pub-5094804024850501`)
- Env vars: `NEXT_PUBLIC_SITE_URL` (SEO canonical), `BACKEND_URL` (API proxy target), `GOOGLE_DRIVE_API_KEY` + `GOOGLE_DRIVE_FOLDER_ID` (gallery photos, server-side only)
- No prettier, no husky, no commit hooks
- `next.config.ts`: cache headers for static assets (1yr immutable), `stale-while-revalidate=86400` for pages, `optimizePackageImports` for lucide-react/react-icons/framer-motion
- `vercel.json`: security headers (nosniff, DENY framing, strict referrer) + asset caching
