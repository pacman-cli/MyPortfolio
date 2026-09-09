# Full Website Transformation Spec (Airy Modern Minimalist)

## Goal
Transform the entire portfolio into a simple, light, gorgeous, and eye-catching modern website by eliminating visual heavy elements (grid lines, dense borders, repetitive sections) and introducing generous whitespace, soft radial glows, borderless dark surface cards, and refined typography.

## Architecture & Section Consolidation
Consolidate 9 home page sections into 5 focused, high-impact zones:

1. **Hero Zone (`src/components/sections/hero.tsx`)**
   - Clean, high-impact headline ("Building Scalable Backends & Modern Web Applications").
   - Live availability badge with soft emerald pulse.
   - Streamlined CTAs: Primary glow button + ghost contact link.
   - Remove background grid pattern overlays; replace with a soft top-center gradient atmosphere.

2. **About & Stack Zone (`src/components/sections/about.tsx` + `technical-expertise.tsx`)**
   - Integrate Bio summary + Core Tech Stack into a single unified grid.
   - Clean skill chips (`bg-zinc-900/60 text-zinc-300 border border-zinc-800/60`).
   - Remove heavy portrait frames; replace with clean rounded profile layout.

3. **Selected Work Zone (`src/components/sections/selected-work.tsx`)**
   - Clean project rows with subtle hover scaling and borderless dark cards (`bg-zinc-900/30 hover:bg-zinc-900/60`).
   - High contrast tech stack pills and direct GitHub/Demo links.

4. **Timeline & Certifications Zone (`src/components/sections/journey-timeline.tsx`)**
   - Streamlined experience timeline with clean left accent border.
   - Inline certification badges without separate section clutter.

5. **Insights & Contact Zone (`src/components/sections/recent-blogs.tsx` + `closing-section.tsx` + `footer.tsx`)**
   - 3-column minimalist blog summary cards.
   - Direct high-converting contact card with one-click copy email button.
   - Clean, minimal footer chrome.

## Color & Design Tokens
- Background: `zinc-950` (`#09090b`) dark / `zinc-50` (`#fafafa`) light.
- Cards: `zinc-900/40` with `border-zinc-800/50`.
- Text: `zinc-100` primary text, `zinc-400` secondary text.
- Accent: Emerald `emerald-500` status indicator and soft radial ambient glow.
- Spacing: `py-24 md:py-32` vertical padding between sections for maximum airiness.

## Implementation Steps Plan
1. Home page structure update (`src/app/page.tsx`).
2. Global style refinement (`src/app/globals.css`).
3. Hero section light overhaul (`src/components/sections/hero.tsx`).
4. About & Technical Expertise consolidation.
5. Selected Work refinement.
6. Timeline & Insights polish.
7. Verification (Vitest suite, ESLint, Next build, deployment).
