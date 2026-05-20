# Portfolio Backend

Spring Boot 4.0 API for [puspo.online](https://puspo.online). Provides blog posts,
projects, and contact form endpoints consumed by the Next.js frontend.

## Architecture

```
Frontend (Vercel)  →  Backend (Railway/Render)  →  MySQL (Railway/Aiven)
                              ↓
                       Resend API (email)
```

- All `GET /api/v1/blogs*` and `GET /api/v1/projects*` endpoints use ISR (3600s revalidate)
- `POST /api/v1/contact` sends email via Resend HTTP API (not SMTP)
- Database tables auto-created via `spring.jpa.hibernate.ddl-auto=update`
- Seed data (4 blogs, 6 projects) inserted automatically on first startup
- GitHub: [pacman-cli/portfolio](https://github.com/pacman-cli/portfolio)

---

## Deploy to Railway (Recommended — Free Tier)

Railway offers the simplest free-tier path because it provides MySQL as a
first-class plugin alongside Dockerfile-based deployment.

### Prerequisites

- [Railway account](https://railway.app/login) (GitHub OAuth)
- [Railway CLI](https://docs.railway.app/develop/cli) (optional, for `railway login`)
- A Resend API key from [resend.com](https://resend.com) (free tier: 100 emails/day)

### Step 1: Create a Railway Project

```bash
# Option A: Via CLI
railway login
railway init

# Option B: Via Dashboard
# 1. Go to https://railway.app/dashboard
# 2. Click "New Project" → "Deploy from GitHub"
# 3. Select your repo (set root directory to "backend")
```

### Step 2: Add MySQL Plugin

```bash
# Via CLI
railway add mysql

# Via Dashboard
# 1. In your project, click "New" → "Database" → "Add MySQL"
# 2. Wait for provisioning (30–60 seconds)
```

Railway will provide a `MYSQL_URL` connection string. It looks like:
```
mysql://root:randompassword@mysql.railway.internal:3306/railway
```

### Step 3: Set Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://{host}:{port}/{db}?useSSL=true&requireSSL=true&serverTimezone=UTC` | Yes |
| `SPRING_DATASOURCE_USERNAME` | `root` | Yes |
| `SPRING_DATASOURCE_PASSWORD` | From MySQL plugin credentials | Yes |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` from Resend | Yes |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` | Yes |
| `RECIPIENT_EMAIL` | Your email address to receive contact form messages | Yes |
| `JAVA_OPTS` | `-Xmx256m -Xms128m` (optional, Railway default is fine) | No |

**How to derive `SPRING_DATASOURCE_URL` from `MYSQL_URL`:**

Railway's `MYSQL_URL` format:
```
mysql://root:PASSWORD@mysql.railway.internal:3306/railway
```

Convert to JDBC format:
```
jdbc:mysql://mysql.railway.internal:3306/railway?useSSL=true&requireSSL=true&serverTimezone=UTC
```

Set via CLI:
```bash
railway variables set SPRING_DATASOURCE_URL="jdbc:mysql://mysql.railway.internal:3306/railway?useSSL=true&requireSSL=true&serverTimezone=UTC"
railway variables set SPRING_DATASOURCE_USERNAME=root
railway variables set SPRING_DATASOURCE_PASSWORD=<password-from-mysql-plugin>
railway variables set RESEND_API_KEY=re_xxxxxxxxxxxx
railway variables set RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
railway variables set RECIPIENT_EMAIL=your@email.com
```

### Step 4: Configure Root Directory

Railway must build from the `backend/` directory, not the repo root.

**Via Dashboard:**
1. Go to your service → "Settings" → "Deploy"
2. Set "Root Directory" to `backend`

**Via `railway.json`** (create at repo root):
```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/Dockerfile"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### Step 5: Deploy

```bash
railway up --detach
```

Or push to your connected GitHub branch — Railway auto-deploys.

### Step 6: Verify

```bash
# Get the public URL
railway domain

# Test endpoints
curl https://your-app.up.railway.app/api/v1/blogs
curl https://your-app.up.railway.app/api/v1/projects
curl https://your-app.up.railway.app/api/v1/blogs/llm-deep-thinking
curl https://your-app.up.railway.app/api/v1/projects/takatrack
```

Expected: JSON responses with paginated blog posts and projects.

### Step 7: Connect Frontend (Vercel)

In your Vercel project dashboard, set:

| Variable | Value |
|----------|-------|
| `BACKEND_URL` | `https://your-app.up.railway.app` |

No trailing slash. That's it — Vercel rewrites `/api/v1/*` to your Railway
backend automatically.

---

## Deploy to Render (Alternative)

Render's free tier sleeps after inactivity, so Railway is recommended. Use
Render if you already have a MySQL host (Aiven free tier, etc.).

### Prerequisites

- [Render account](https://render.com)
- MySQL database accessible from Render (Railway MySQL plugin, Aiven free
  MySQL, or PlanetScale free tier)

### Step 1: Create a MySQL Database

**Option A: Railway MySQL (free-ish)**
1. Create a Railway project with the MySQL plugin (steps 1–2 above)
2. Note the `MYSQL_URL` from Railway
3. Set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`,
   `SPRING_DATASOURCE_PASSWORD` on Render

**Option B: Aiven Free MySQL**
1. Go to [aiven.io](https://aiven.io)
2. Create a free MySQL service (limited to 1 free project)
3. Note the host, port, user, password, database name

### Step 2: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `portfolio-backend`
   - **Runtime**: `Docker`
   - **Root Directory**: `backend`
   - **Branch**: `main` (or your branch)
   - **Region**: Choose closest to your users

### Step 3: Set Environment Variables on Render

In Render dashboard → your service → "Environment":

| Variable | Value |
|----------|-------|
| `SPRING_DATASOURCE_URL` | JDBC URL of your MySQL |
| `SPRING_DATASOURCE_USERNAME` | Database user |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` |
| `RECIPIENT_EMAIL` | Your email |
| `PORT` | `10000` (Render expects this) |
| `JAVA_OPTS` | `-Xmx256m -Xms128m` |

### Step 4: Deploy

Click "Create Web Service" or "Manual Deploy" → "Deploy Branch".

Render builds the Docker image and starts the service. First build takes
3–5 minutes (Maven downloads dependencies).

### Step 5: Verify

```bash
curl https://portfolio-backend.onrender.com/api/v1/blogs
curl https://portfolio-backend.onrender.com/api/v1/projects
```

### Step 6: Connect Frontend (Vercel)

Same as Railway — set `BACKEND_URL` in Vercel environment variables:

| Variable | Value |
|----------|-------|
| `BACKEND_URL` | `https://portfolio-backend.onrender.com` |

---

## Environment Variable Reference

| Variable | Used By | Purpose |
|----------|---------|---------|
| `PORT` | Spring Boot | Server port (Railway sets this; Render needs explicit `10000`) |
| `SPRING_DATASOURCE_URL` | Spring Boot | JDBC MySQL connection string |
| `SPRING_DATASOURCE_USERNAME` | Spring Boot | MySQL user |
| `SPRING_DATASOURCE_PASSWORD` | Spring Boot | MySQL password |
| `RESEND_API_KEY` | `ContactServiceImpl` | Resend API key for email delivery |
| `RESEND_FROM_EMAIL` | `ContactServiceImpl` | Sender email (e.g., `Portfolio Contact <onboarding@resend.dev>`) |
| `RECIPIENT_EMAIL` | `ContactServiceImpl` | Where contact form messages are sent |

### Defaults (no env var set)

| Variable | Default |
|----------|---------|
| `PORT` | `8080` |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://mysql:3306/portfolio_db?useSSL=false&...` |
| `SPRING_DATASOURCE_PASSWORD` | `root` |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` |
| `RECIPIENT_EMAIL` | `puspopuspo520@gmail.com` |

---

## Local Development

```bash
# 1. Start MySQL (Docker)
docker run -d --name portfolio-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=portfolio_db \
  -p 3307:3306 mysql:8.0

# 2. Start backend
./mvnw spring-boot:run

# 3. Backend runs on http://localhost:8082
#    Frontend runs on http://localhost:3000 (rewrites /api/v1/* → backend)
```

Or use Docker Compose from repo root:
```bash
docker compose up -d
```

### Profile: dev

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Enables `spring.jpa.show-sql=true` and DEBUG logging.

### Run tests

```bash
./mvnw test
```

Seven integration tests (controllers + context load). Uses H2 in-memory DB.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/blogs?page=0&size=10` | Paginated blog list |
| GET | `/api/v1/blogs/{slug}` | Single blog by slug |
| GET | `/api/v1/projects?page=0&size=10` | Paginated project list |
| GET | `/api/v1/projects/{slug}` | Single project by slug |
| POST | `/api/v1/contact` | Submit contact form |

Full details: `GET /api/v1/blogs` → `{"items": [...], "total": 4, "page": 0, "size": 10, "totalPages": 1}`

---

## Tech Stack

- Java 17, Spring Boot 4.0.0
- MySQL 8.0 (H2 for tests)
- Resend API (email delivery)
- Lombok, Jackson, Jakarta Validation
- Maven wrapper (no local Maven needed)
