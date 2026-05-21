# MyPortfolio

Personal portfolio website of **MD Ashikur Rahman Puspo** (Puspo) — a Backend Engineer from Dhaka, Bangladesh. Showcases projects, technical blog articles, certifications, skills, resume, and photo gallery.

**Live:** [puspo.online](https://puspo.online)

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Java 17 | Runtime |
| Spring Boot 4.0 | REST API framework |
| MySQL 8.0 | Production database |
| H2 | Test database |
| Spring Data JPA + Hibernate | ORM |
| Jakarta Validation | Input validation |
| Lombok | Boilerplate reduction |
| Resend HTTP API | Email (contact form) |
| JUnit 5 + MockMvc | Testing |
| Maven | Build |
| Docker | Containerization |

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16.2 (App Router) | React framework |
| TypeScript 5 | Language |
| Tailwind CSS 3.4 | Styling |
| Radix UI | Accessible UI primitives |
| Framer Motion 12 | Animations |
| Lucide + React Icons | Icons |
| React Markdown + Syntax Highlighter | Blog content rendering |
| Mermaid | Architecture diagrams |
| next-themes | Dark/light mode |
| Zod 4 | Form validation |
| Vitest + Testing Library | Testing |
| ESLint 9 | Linting |

---

## Project Structure

```
MyPortfolio/
├── backend/                         # Spring Boot API
│   ├── src/main/java/com/portfolio/backend/
│   │   ├── config/                  # CORS, DataSeeder, GlobalExceptionHandler
│   │   ├── controller/              # Blog, Project, Contact, Health endpoints
│   │   ├── dto/                     # BlogDTO, ProjectDTO, PagedResponse
│   │   ├── model/                   # Blog, Project, ContactMessage entities
│   │   ├── repository/              # JPA repositories
│   │   ├── service/                 # Business logic + Resend email integration
│   │   └── util/                    # DtoConverter
│   └── src/test/                    # Controller integration tests
│
├── frontend/                        # Next.js App Router
│   ├── src/
│   │   ├── app/                     # Pages (home, blog, projects, gallery, about, resume)
│   │   ├── components/              # navbar, footer, sections, gallery, ui, seo
│   │   ├── hooks/                   # Custom hooks (useActiveSection)
│   │   ├── lib/                     # API clients, utils, data, animations
│   │   └── types/                   # TypeScript interfaces
│   └── src/test/                    # Vitest setup
│
├── docker-compose.yml               # Full-stack deployment
└── README.md
```

---

## Features

- **Hero Section** — Animated intro with avatar, portrait panel, status indicators
- **About Me** — Professional bio with categorized skill groups (Languages, Backend, Database, Frontend, DevOps, Tools)
- **Projects** — 6 case studies with tech stack, links, and descriptions
- **Blog** — Technical articles with markdown, syntax highlighting, and Mermaid diagrams
- **Photo Gallery** — Google Drive integration with lightbox viewer
- **Dark/Light Mode** — System-preference-aware theme toggle
- **Contact Form** — Submissions saved to DB and emailed via Resend
- **Resume** — View and download from Google Drive
- **SEO** — JSON-LD structured data, dynamic sitemap, Open Graph cards
- **Performance** — ISR (3600s revalidation), image optimization, dynamic imports

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/blogs?page=0&size=10` | Paginated blog list |
| GET | `/api/v1/blogs/{slug}` | Single blog post |
| GET | `/api/v1/projects?page=0&size=10` | Paginated project list |
| GET | `/api/v1/projects/{slug}` | Single project |
| POST | `/api/v1/contact` | Submit contact form |

---

## Getting Started

### Prerequisites

- Java 17
- Node.js 20
- Docker (for MySQL or full-stack)
- Maven (wrapper included)

### Backend

```bash
# Start MySQL
docker run -d --name portfolio-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=portfolio_db \
  -p 3307:3306 mysql:8.0

# Run
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run test       # Vitest
npm run build      # Production build
```

### Docker (full stack)

```bash
docker compose up -d
```

---

## Environment Variables

### Backend

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | Server port |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://mysql:3306/portfolio_db?...` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | DB username |
| `DB_PASSWORD` | `root` | DB password |
| `RESEND_API_KEY` | — | Resend API key for emails |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` | Sender address |
| `RECIPIENT_EMAIL` | `puspopuspo520@gmail.com` | Contact form recipient |

### Frontend

| Variable | Description |
|---|---|
| `BACKEND_URL` | Backend proxy target |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `GOOGLE_DRIVE_API_KEY` | Google Drive API key |
| `GOOGLE_DRIVE_FOLDER_ID` | Gallery photo folder ID |

---

## Deployment

- **Frontend** — [Vercel](https://vercel.com) with `BACKEND_URL` env
- **Backend** — [Railway](https://railway.app) or [Render](https://render.com) with MySQL add-on
- **Email** — [Resend](https://resend.com) (free tier: 100 emails/day)
- **Gallery** — Google Drive API

---

## License

MIT
