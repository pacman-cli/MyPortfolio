# Project Case Study Enhancement

## Objective
Improve the individual project case study pages (`/projects/[slug]`) to provide deeper insight into each project through enriched data, new sections, and polished visuals.

## Changes

### 1. Types (`frontend/src/types/index.ts`)
- Add `keyFeatures: { title: string; description: string }[]` to `Project` interface

### 2. Data (`frontend/src/lib/projects.ts`)
- Add `keyFeatures` (3-4 per project with title + description)
- Convert `architecture` from comma-separated strings to Mermaid diagram syntax
- Fill `java-learning` and `business-analytics` with full case study data (problemStatement, challenges, solutions, results, keyFeatures)

### 3. Page Sections (`frontend/src/app/projects/[slug]/page.tsx`)

New section order (changed sections bolded):

1. **Header** — tech badges, name, longDescription, GitHub stat cards (stars/forks/updated) — *unchanged*
2. **Key Features** — new 2x2 grid of glass feature cards with Lucide icons
3. **Problem Statement** — enhanced glass card, red accent, blockquote styling
4. **Architecture** — Mermaid diagram rendered from `architecture` field; fallback to text prose
5. **Database Design** — Mermaid ER diagram rendered from `databaseDesign` field
6. **Tech Stack** — existing badge grid — *unchanged*
7. **Challenges & Solutions** — existing paired cards, enhanced with solution tags — *unchanged*
8. **Results & Metrics** — existing checklist + GitHub stat counters — *unchanged*
9. **Related Blog Posts** — new section linking blog posts by slug using existing blog API
10. **CTA** — "Want to see more?" with All Projects + Blog Posts links — *unchanged*

### 4. New Section: Key Features
- 2x2 responsive grid wrapping to 1-col on mobile
- Each card: Lucide icon (map by feature title), title, description
- Glass styling with accent border

### 5. New Section: Architecture
- Check if `architecture` starts with Mermaid pattern (`graph`/`flowchart`/`sequenceDiagram`/`erDiagram`)
- If yes: render existing `<Mermaid>` component (reused from blog)
- If no: render as prose in glass card

### 6. New Section: Database Design
- Same pattern as Architecture — Mermaid or prose
- `erDiagram` syntax for entity relationships

### 7. New Section: Related Blog Posts
- If `relatedBlogSlugs` exists and non-empty
- Fetch blog posts by slug, render as horizontal card list
- Each card: title, excerpt preview, "Read →" link

## Files to Modify
- `frontend/src/types/index.ts` — add `keyFeatures` field
- `frontend/src/lib/projects.ts` — enrich all 6 projects
- `frontend/src/app/projects/[slug]/page.tsx` — add sections 2, 4, 5, 9

## Non-Goals
- No new external dependencies
- No new npm packages
- No backend changes
- No new routes or pages
