# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Two independent packages — no monorepo tooling:

| Dir | Stack | Entry |
|---|---|---|
| `frontend/` | Next.js 16.2 (App Router), React 19, TS 5, Tailwind 3, Vitest | `src/app/layout.tsx` |
| `backend/` | Spring Boot 4, Java 17, Maven, MySQL (H2 in tests), Lombok | `BackendApplication.java` |

The `frontend/` directory is the primary frontend working directory; `backend/` is a sibling package.

## CodeGenome knowledge graph (MCP) — mandatory

The repo contains a `.genome/` CodeGenome architectural knowledge graph (`watcher.db` exists in the repo root). Directives from `.cursor/rules/watcher-knowledge-graph.mdc`, `.windsurfrules`, and `.github/copilot-instructions.md`:

1. When `.genome/watcher.db` exists, **MUST use CodeGenome MCP access** for codebase/architecture/dependency/symbol queries whenever available.
2. Fallback order: native CodeGenome MCP tools → local HTTP MCP endpoint `http://127.0.0.1:7331/mcp` → `.genome/graph.json` or `.genome/exports/*.md` → standard text search.
3. After modifying code files, remind the user to run `codegenome analyze` or start `codegenome evolve --live` to keep the graph fresh.

## Frontend commands (`cd frontend`)

```bash
npm install                                        # install deps
npm run dev                                        # next dev on :3000
npx eslint src                                     # lint src (avoids OOM from root unbundled scripts)
npm run test                                       # run all tests with vitest
npm run test -- src/app/api/preview-proxy/route.test.ts # run a single test file
npm run test -- -t "fetchJson"                     # run tests matching test name
npm run coverage                                   # vitest run --coverage
npm run build                                      # production build (Turbopack + Vercel target)
npm run preview                                    # OpenNext Cloudflare build + local preview
npm run deploy                                     # OpenNext Cloudflare build + deploy to Workers
npm run cf-typegen                                 # regenerate cloudflare-env.d.ts from wrangler.jsonc
```

*Note on linting:* Root contains unbundled artifacts; run `npx eslint src` (or `npm run lint -- src`) to avoid Node.js JavaScript heap out-of-memory errors.

## Backend commands (`cd backend`)

```bash
./mvnw spring-boot:run                             # dev server on :8080
PORT=8082 ./mvnw spring-boot:run                   # dev server on :8082 (matches frontend dev rewrite proxy)
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev # show-sql + DEBUG logging
./mvnw clean test                                  # run tests (clean prevents stale target/ compiler mismatch)
./mvnw test -Dtest=BlogControllerTest              # run a single test class
./mvnw test -Dtest=BlogControllerTest#getBlogBySlug_ReturnsBlog # run a single test method
./mvnw clean package -DskipTests                   # build jar
```

*Database note:* Tests run on in-memory H2 — no MySQL required. For local full-stack dev with MySQL:
`docker run -d --name portfolio-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=portfolio_db -p 3307:3306 mysql:8.0`

## API proxy (frontend → backend)

`next.config.ts` rewrites `/api/v1/:path*` to Spring Boot:
- Dev default: `http://localhost:8082` (override by running backend with `PORT=8082` or setting `BACKEND_URL`)
- Prod (Docker): `http://portfolio-backend:8080`
- Override with `BACKEND_URL` environment variable (no trailing slash)

`/api/gallery`, `/api/health`, and `/api/preview-proxy` are Next.js App Router route handlers, not proxied.

## Architecture & data flow

### App Router routes (`frontend/src/app/`)

- `layout.tsx` — root layout: fonts (Inter + Plus Jakarta Sans), unified Schema.org JSON-LD `@graph` (Person, WebSite, WebPage, SiteNavigation), ThemeProvider (`next-themes`), Navbar with animated avatar logo, CookieConsent, and WebMCPProvider.
- `page.tsx` — home page composing Hero, About, TechnicalExpertise, ProjectsShowcase, JourneyTimeline, RecentBlogs, ClosingSection, and Footer.
- `projects/`, `projects/[slug]` — projects directory and detailed case studies with Mermaid architecture diagrams.
- `blog/`, `blog/[slug]` — technical articles rendered with `react-markdown`, `remark-gfm`, `react-syntax-highlighter`, and Mermaid diagrams.
- `about-me/`, `gallery/`, `resume/`, `links/` — dedicated route pages.
- `api/gallery/route.ts` — Google Drive photos proxy with pagination (`pageToken`).
- `api/health/route.ts` — synthetic health check probing `.well-known` endpoints, `auth.md`, and gallery API.
- `api/preview-proxy/route.ts` — secure server-side preview proxy:
  - Fetches target external URLs and overrides framing restrictions (`frame-ancestors 'self'`).
  - Injects `<base href>` for relative assets.
  - Automatically detects broken Vercel deployments, SSO login walls, and network timeouts.
  - Returns tailored high-fidelity responsive mock previews for featured showcase apps (`DevForge`, `StayMate`, `TakaTrack`, `ShelfToTales`).

### Showcase & live hover previews (`frontend/src/components/showcase/`)

- `projects-showcase.tsx` — interactive showcase with compact row layout, category tabs, and live status badges.
- `cursor-floating-preview.tsx` — portal-based floating iframe tracking mouse cursor position on hover.
- `live-preview-iframe.tsx` & `blocked-embed-card.tsx` — iframe loader with fallback cards for sites blocking standard embedding.
- Floating cursor previews are active across Projects Showcase, Recent Blogs (Technical Writing & Insights), Footer links, and Social Directory.

### Agent readiness & middleware (`frontend/src/middleware.ts`)

Edge middleware running on all page requests:
1. **Canonical Hostname Redirect**: 301 redirects non-WWW `puspo.online` to `www.puspo.online`.
2. **RFC 9727 API Catalog**: `/.well-known/api-catalog` (`application/linkset+json`).
3. **OAuth & Identity Discovery**: `/.well-known/openid-configuration`, `/.well-known/oauth-authorization-server`, and `/.well-known/oauth-protected-resource` (RFC 9728).
4. **SEP-1649 MCP Server Card**: `/.well-known/mcp/server-card.json`.
5. **Agent Skills Index**: `/.well-known/agent-skills/index.json`.
6. **Robots Content Signals**: `/robots.txt` declaring `Content-Signal: ai-train=no, ai-input=no, search=yes`.
7. **Agent Registration**: `/auth.md`.
8. **Markdown Negotiation**: Returns clean markdown when incoming request specifies `Accept: text/markdown` for any page route.
9. **RFC 8288 Link Headers**: Appends discovery `Link` headers to all page responses.
10. **In-Browser WebMCP**: `src/components/webmcp-provider.tsx` registers client-side tools (`getProfileInfo`, `getProjects`, `getBlogPosts`, `getGalleryPhotos`, `getResume`, `sendContactMessage`, `getSocialLinks`, `getNavigationLinks`) into `navigator.modelContext`.

### Data fetching & resilience (`frontend/src/lib/`)

- `api.ts` — typed wrapper for `/api/v1/blogs*` with pagination. Provides `STATIC_BLOGS` and `STATIC_BLOG_SLUGS` fallback if backend is unreachable at build time.
- `projects.ts` — fetches `/api/v1/projects*`, merges with `STATIC_RICH_DATA`, and gracefully falls back to `getStaticProjects()` when the backend is offline.
- `gallery.ts` — Google Drive API client using `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID`.
- `seo.ts` & `schema.ts` — `constructMetadata()` and structured JSON-LD builders.
- `site.ts` — `siteConfig`, social links, and navigation constants.
- `utils.ts` — `cn()`, `calculateReadTime()`, and `fetchJson()` with default ISR (`revalidate: 3600`).

### Backend architecture (`backend/src/main/java/com/portfolio/backend/`)

- Standard layered Spring Boot 4: `controller/` → `service/` → `repository/` over JPA entities (`Blog`, `Project`, `ContactMessage`).
- `DataSeeder`: Automatically populates 4 blog posts and 6 projects on startup if database is empty.
- `ContactServiceImpl`: Sends contact emails via Resend HTTP API (not SMTP).
- `GlobalExceptionHandler`: Formats validation errors and 404s into standard JSON error objects.
- DTO conversion handled via `util/DtoConverter`.

## Conventions

- Path alias: `@/*` maps to `./src/*` (configured in `tsconfig.json` and `vitest.config.ts`).
- Theme: `class` strategy (Tailwind) powered by `next-themes`. CSS variables in `globals.css`.
- Server vs Client components: Server components by default. Add `"use client"` only for interaction (Framer Motion, event handlers, observers, browser APIs).
- Caching: ISR enabled via `next: { revalidate: 3600 }`. `cacheComponents: true` is configured in `next.config.ts`.
- Barrel imports: `optimizePackageImports` configured for `lucide-react`, `react-icons`, `framer-motion`, `@radix-ui/*`, `react-activity-calendar`.
- Tests: Test files colocated with source as `*.test.ts` / `*.test.tsx`. Vitest setup in `src/test/setup.tsx` mocks `framer-motion` and `next/dynamic`.

## Deployment & environments

- **Frontend → Vercel** (`npm run build`): Production build configured with security headers in `vercel.json` and `next.config.ts`.
- **Frontend → Cloudflare Workers** (`npm run deploy`): OpenNext adapter via `@opennextjs/cloudflare` with config in `wrangler.jsonc`.
- **Backend → Railway / Render**: Containerized via `backend/Dockerfile`. Railway provides direct MySQL plugin; Render requires external database.

### Environment variables

Frontend:
| Variable | Required by | Purpose |
|---|---|---|
| `BACKEND_URL` | runtime | Spring Boot URL (e.g., `https://your-app.up.railway.app`) |
| `NEXT_PUBLIC_SITE_URL` | runtime | Canonical site URL (fallback: `https://www.puspo.online`) |
| `GOOGLE_DRIVE_API_KEY` | runtime | Google Drive API key for photo gallery |
| `GOOGLE_DRIVE_FOLDER_ID` | runtime | Google Drive folder ID for photo gallery |

Backend:
| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` (use `8082` for local frontend proxy) | Server port |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://mysql:3306/portfolio_db?...` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `root` | Database password |
| `RESEND_API_KEY` | — | Resend API key for contact form emails |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` | Email sender |
| `RECIPIENT_EMAIL` | `hello@puspo.online` | Email recipient |
