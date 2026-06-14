# AGENTS.md

## Repo layout

Two independent packages — no monorepo tooling.

| Dir | Stack | Entry |
|---|---|---|
| `frontend/` | Next.js 16, React 19, TS 5, Tailwind 3 | `src/app/layout.tsx` |
| `backend/` | Spring Boot 4, Java 17, Maven | `BackendApplication.java` |

## Commands

### Frontend (`cd frontend`)

```bash
npm install          # install deps
npm run dev          # http://localhost:3000
npm run lint         # eslint (flat config, eslint-config-next)
npm run test         # vitest (jsdom, globals)
npm run coverage     # vitest run --coverage
npm run build        # production build
npm run preview      # OpenNext Cloudflare build + local preview
npm run deploy       # OpenNext Cloudflare build + deploy to Workers
```

### Backend (`cd backend`)

```bash
./mvnw spring-boot:run                    # run dev (port 8080)
./mvnw test                               # run tests (H2 in-memory, no MySQL needed)
./mvnw clean package -DskipTests          # build jar
```

MySQL only needed for local full-stack. Tests use H2 — no DB setup required.

## API proxy

Frontend proxies `/api/v1/*` to backend via Next.js rewrites (`next.config.ts:34-41`):
- Dev: `http://localhost:8082` (note: **8082**, not 8080 — the backend defaults to 8080 but the rewrite target is 8082)
- Prod: `http://portfolio-backend:8080` (Docker service name)

Override with `BACKEND_URL` env var.

## Testing

- **Frontend**: Vitest + Testing Library. Test setup mocks `next/dynamic` and `framer-motion`. Place test files alongside source as `*.test.ts` / `*.test.tsx`.
- **Backend**: JUnit 5 + MockMvc. Tests use `@SpringBootTest` + `@AutoConfigureMockMvc` with H2 in-memory DB. Repository is injected for data seeding.

## Cloudflare Workers deployment

Frontend uses OpenNext adapter (`@opennextjs/cloudflare`) for Cloudflare Workers.

- Config: `frontend/wrangler.jsonc` (Worker name: `puspo-portfolio`)
- OpenNext config: `frontend/open-next.config.ts`
- Build: `npm run deploy` runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`
- Set `BACKEND_URL` in Cloudflare dashboard (Workers & Pages → Settings → Environment variables)
- `.open-next/` is a build artifact — gitignored

## Key conventions

- Frontend uses `@/*` path alias → `./src/*`
- Dark mode via `class` strategy (Tailwind) + CSS variables (shadcn/ui pattern)
- Backend uses Lombok — no manual getters/setters/constructors
- Backend `spring.jpa.hibernate.ddl-auto=update` in dev — schema auto-migrated
- Backend `application-dev.properties` activates with `spring.profiles.active=dev`
- No CI/CD workflows in repo
- `docker-compose.yml` is gitignored — not in version control
