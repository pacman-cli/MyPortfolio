# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Two independent packages — no monorepo tooling. Each has its own README with deployment and env-var details:

| Dir | Stack | Entry |
|---|---|---|
| `frontend/` | Next.js 16.2 (App Router), React 19, TS 5, Tailwind 3, Vitest | `src/app/layout.tsx` |
| `backend/` | Spring Boot 4, Java 17, Maven, MySQL (H2 in tests), Lombok | `BackendApplication.java` |

## CodeGenome knowledge graph (MCP) — mandatory

The repo contains a `.genome/` CodeGenome architectural knowledge graph. Root `AGENTS.md`, `.windsurfrules`, `.cursor/rules/watcher-knowledge-graph.mdc`, and `.github/copilot-instructions.md` all mandate:

1. When `.genome/watcher.db` exists, **MUST use CodeGenome MCP tools** for codebase/architecture/dependency/symbol queries whenever available (this session has no CodeGenome MCP tools connected — if you have them, use them instead of grep).
2. Fallback order: native MCP tools → local HTTP endpoint `http://127.0.0.1:7331/mcp` → `.genome/graph.json` or `.genome/exports/*.md` → standard text search.
3. After modifying code files, remind the user to run `codegenome analyze` (or `codegenome evolve --live`) to keep the graph fresh.

## Frontend commands (`cd frontend`)

```bash
npm install                          # install deps
npm run dev                          # next dev on :3000
npm run lint                         # eslint (flat config + eslint-config-next)
npm run test                         # vitest (jsdom, globals)
npm run test -- src/lib/utils.test.ts  # run a single test file
npm run test -- -t "fetchJson"       # run tests matching a name
npm run coverage                     # vitest run --coverage (text/json/html)
npm run build                        # next build (Vercel target)
npm run preview                      # OpenNext Cloudflare build + local preview
npm run deploy                       # OpenNext Cloudflare build + deploy to Workers
npm run cf-typegen                   # regenerate cloudflare-env.d.ts from wrangler.jsonc
```

## Backend commands (`cd backend`)

```bash
./mvnw spring-boot:run               # dev server (see port note below)
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev   # show-sql + DEBUG logging
./mvnw test                          # tests use H2 in-memory — no MySQL needed
./mvnw clean package -DskipTests     # build jar
```

MySQL only needed for full-stack local dev (`docker run -d --name portfolio-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=portfolio_db -p 3307:3306 mysql:8.0`).

**Port note:** backend defaults to `:8080`, but the frontend dev proxy targets `:8082` — start the backend on 8082 for dev (`PORT=8082 ./mvnw spring-boot:run`) or set `BACKEND_URL=http://localhost:8080`.

## API proxy (frontend → backend)

`src/app/` proxies `/api/v1/*` to Spring Boot via Next.js rewrites (`frontend/next.config.ts:34-41`):

- Dev: `http://localhost:8082` (note **8082**, not 8080)
- Prod (Docker): `http://portfolio-backend:8080`
- Override with `BACKEND_URL` env var

`/api/gallery` and `/api/health` in `src/app/api/` are Next.js route handlers, not proxied.

## Frontend architecture

### App Router pages (`src/app/`)

- `layout.tsx` — root layout: fonts (Inter + Plus Jakarta Sans), JSON-LD Person/WebSite/WebPage schemas, Google AdSense script, ThemeProvider, Navbar, Footer slot, WebMCPProvider, CookieConsent, cursor follower.
- `page.tsx` — home: server component, fetches blogs + projects, dynamically imports below-the-fold sections with `next/dynamic` + `<SectionSkeleton />` fallbacks.
- Route segments: `about-me/`, `blog/`, `blog/[slug]/`, `projects/`, `gallery/`, `resume/`, `links/`.
- Route handlers: `api/gallery/route.ts` (Google Drive proxy), `api/health/route.ts`.
- Special files: `robots.ts` (Content Signals), `sitemap.ts`, `opengraph-image.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx`, `not-found.tsx`.

### Components (`src/components/`)

- `navbar.tsx`, `footer.tsx` — top-level chrome.
- `theme-provider.tsx` — wraps `next-themes` with `attribute="class"` + system default.
- `webmcp-provider.tsx` — browser-side MCP tool registration (navigator.modelContext).
- `seo/` — JSON-LD helpers and SEO components.
- `gallery/` — gallery-specific UI (lightbox, grid).
- `sections/` — one file per home-page section (`hero.tsx`, `about.tsx`, `technical-expertise.tsx`, `selected-work.tsx`, `certifications.tsx`, `recent-blogs.tsx`, `github-activity.tsx`, `journey-timeline.tsx`, `closing-section.tsx`, `contact.tsx`, plus hero sub-panels).
- `ui/` — shadcn-style primitives (Radix UI + cva) and bespoke animations (`glowing-effect.tsx`, `gooey-text-morphing.tsx`, `scramble-text.tsx`, `typing-animation.tsx`, `cursor-follower.tsx`, `mermaid-diagram.tsx`, etc.).
- `ads/` — Adsterra monetization components (social bar, popunder).

### Data fetching (`src/lib/`)

- `api.ts` — typed wrapper around `/api/v1/blogs*` (pagination + DTO→domain mapping). Exposes `getBlogs`, `getBlogSummaries`, `getBlogBySlug`, plus `STATIC_BLOG_SLUGS` for `generateStaticParams` fallback when the backend is down.
- `projects.ts` — project list (currently static).
- `gallery.ts` — Google Drive API client (`GOOGLE_DRIVE_API_KEY` + `GOOGLE_DRIVE_FOLDER_ID`).
- `github.ts` — GitHub contribution graph fetch.
- `seo.ts` — `constructMetadata()` and JSON-LD builders.
- `site.ts` — `siteConfig`, `SOCIAL_PROFILES`, `SITE_NAVIGATION`, `absoluteUrl()`, `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, fallback `https://www.puspo.online`).
- `utils.ts` — `cn()` (clsx + tailwind-merge), `fetchJson()` (Next fetch with ISR revalidate), `calculateReadTime()`.
- `animations.ts`, `tech-icons.tsx`, `blur.ts` — UI helpers.
- `data/skills.tsx` — categorized skill data (Languages / Backend / Database / Frontend / DevOps / Tools).

### Middleware (`src/middleware.ts`)

Single middleware handling agent-readiness surfaces on every request:

1. `/.well-known/*` — RFC 9727 API catalog (linkset+json), OpenID/OAuth discovery, RFC 9728 OAuth protected resource, MCP server card (SEP-1649), agent skills index.
2. `/robots.txt` — overrides with Content Signals (`ai-train=no, ai-input=no, search=yes`).
3. `/auth.md` — markdown auth metadata for agent registration.
4. `Accept: text/markdown` negotiation — returns markdown for any page route to AI agents.
5. RFC 8288 `Link` header — appended to all page responses.

The matcher excludes `_next/static`, `_next/image`, favicon, profile/og images, ads.txt, BingSiteAuth.xml, and common static extensions.

### Types and hooks

- `src/types/index.ts` — single barrel export for shared interfaces (`Blog`, `Project`, etc.).
- `src/hooks/useActiveSection.ts` — IntersectionObserver-based section tracking for nav highlighting.

## Backend architecture

Standard layered Spring Boot: `controller/` → `service/` → `repository/` over JPA entities (`Blog`, `Project`, `ContactMessage`). Controllers return DTOs (`BlogDTO`, `ProjectDTO`, `PagedResponse`) converted via `util/DtoConverter`. Other highlights:

- `config/DataSeeder` — seeds 4 blogs + 6 projects on first startup.
- `config/GlobalExceptionHandler` — maps validation errors / 404s to consistent error responses.
- `config/WebConfig` — CORS.
- `service/ContactServiceImpl` — sends email via Resend HTTP API (not SMTP).
- Pagination shape: `{"items": [...], "total": 4, "page": 0, "size": 10, "totalPages": 1}`.
- DB schema auto-migrated via `spring.jpa.hibernate.ddl-auto=update`.

## Conventions

- `@/*` path alias → `./src/*` (set in `tsconfig.json`, `vitest.config.ts`).
- Dark mode: `class` strategy (Tailwind) driven by `next-themes`. CSS variables in `src/app/globals.css` (shadcn/ui pattern); tokens read by `tailwind.config.ts`.
- ISR by default: `fetchJson()` uses `next: { revalidate: 3600 }` — pages cache for 1 hour.
- Server components by default. Use `"use client"` only when needed (theme toggle, animations, intersection observers, browser APIs).
- Below-the-fold sections are lazy-loaded via `next/dynamic` with `ssr: true` + `<SectionSkeleton />` fallback.
- `cacheComponents: true` is set in `next.config.ts` — be aware of cache component semantics when changing data-fetching patterns.
- `optimizePackageImports` covers `lucide-react`, `react-icons`, `framer-motion` — import from those barrels directly.
- Test setup (`src/test/setup.tsx`) mocks `next/dynamic` and `framer-motion` (motion components → plain HTML, `useReducedMotion` → `true`). Place tests alongside source as `*.test.ts` / `*.test.tsx`.
- Backend uses Lombok — no manual getters/setters/constructors.

## Deployment

- **Frontend → Vercel** (`npm run build`) — `vercel.json` adds security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) and asset caching.
- **Frontend → Cloudflare Workers** (`npm run deploy`) — OpenNext adapter via `@opennextjs/cloudflare`. Config in `wrangler.jsonc` (Worker `puspo-portfolio`, `nodejs_compat`, assets from `.open-next/assets`). `BACKEND_URL` must be set in the Cloudflare dashboard env vars. `.open-next/` is gitignored.
- **Backend** — Railway (recommended, free MySQL plugin) or Render, built from the `backend/` directory (Dockerfile). Full steps in `backend/README.md`.

## Environment variables

Frontend (no `.env` is checked in; set `NEXT_PUBLIC_*` at build time):

| Variable | Required by | Purpose |
|---|---|---|
| `BACKEND_URL` | runtime | Backend proxy target (overrides dev/prod defaults) |
| `NEXT_PUBLIC_SITE_URL` | runtime | Canonical site URL (used by `SITE_URL`, SEO, JSON-LD) |
| `GOOGLE_DRIVE_API_KEY` | runtime | Gallery API |
| `GOOGLE_DRIVE_FOLDER_ID` | runtime | Gallery folder |

Backend (defaults in `backend/src/main/resources/application.properties`):

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Server port |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://mysql:3306/portfolio_db?...` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | DB username |
| `DB_PASSWORD` | `root` | DB password |
| `RESEND_API_KEY` | — | Resend API key for contact-form email |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` | Sender address |
| `RECIPIENT_EMAIL` | `hello@puspo.online` | Contact form recipient |

## Repo-level facts

- No CI/CD workflows in repo.
- `docker-compose.yml` is gitignored — not in version control.
- Root `AGENTS.md` is the CodeGenome MCP directive (not a command reference); `frontend/CLAUDE.md` (old, gitignored) and the per-package READMEs hold additional detail.
- GitHub: [pacman-cli/portfolio](https://github.com/pacman-cli/portfolio). Live: [puspo.online](https://puspo.online).
