# Portfolio Redesign Design Spec

## Executive Summary
Transform portfolio into a simple, highly professional, and gorgeous web application using a Modern Minimalist (Linear-style) aesthetic. Focus on visual clarity, refined typography, crisp micro-interactions, and flawless responsive execution.

## Design Aesthetic & Tone
- **Color Palette:**
  - Dark Mode: `zinc-950` background, `zinc-900` elevated cards, `zinc-800` borders, `zinc-100`/`zinc-400` text.
  - Accent Color: Emerald / Sapphire subtle status indicators (`emerald-500` glow).
  - Light Mode: `zinc-50` background, `white` elevated cards, `zinc-200` borders, `zinc-900`/`zinc-600` text.
- **Typography:**
  - Headings: Plus Jakarta Sans (bold, tight tracking `-0.02em`).
  - Body & UI: Inter (clean, high legibility).
  - Code/Terminal: JetBrains Mono.
- **Layout & Structure:**
  - Max container width: `max-w-6xl` for main layout, `max-w-4xl` for focused content.
  - Border style: Crisp 1px borders (`border-zinc-800/80` dark, `border-zinc-200` light).
  - Shadows/Glows: Subtle inner shadows and ultra-soft radial hover glows.

## Architectural Changes & Section Refinement

### 1. Global Navigation & Chrome (`navbar.tsx`, `footer.tsx`)
- Floating glassmorphism navbar (`bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/50`).
- Clean active-section tracking pill.
- Simplified theme toggle and quick links.

### 2. Hero Section (`hero.tsx`)
- Remove cluttered multi-panel grids.
- Single unified focal hero:
  - Availability badge (`emerald-500` live pulse dot + "Available for full-stack & backend engineering").
  - Bold clear headline with subtle gradient text highlight.
  - Concise role description emphasizing Spring Boot, Next.js, and Cloud Infrastructure.
  - Action buttons: "Explore Work" (primary glow button), "Get in Touch" (ghost button with arrow).

### 3. About & Technical Expertise (`about.tsx`, `technical-expertise.tsx`)
- Categorized clean skill pills with icon badges (Backend, Frontend, Database, DevOps, Architecture).
- Metrics/Highlights strip: Years experience, projects delivered, core tech stack.

### 4. Selected Work / Projects (`selected-work.tsx`)
- Modern project cards with subtle image zoom on hover.
- Tech stack tags (`zinc-800` background pill with clean typography).
- Clear action links: Live Demo, GitHub source code.

### 5. Journey / Experience Timeline (`journey-timeline.tsx`)
- Vertical timeline with clean left-axis border and dot indicators.
- Expandable or structured role details without visual noise.

### 6. Recent Blogs & Publications (`recent-blogs.tsx`)
- 3-column clean article cards with read-time indicators, dates, and tag chips.

### 7. Contact & Footer (`contact.tsx`, `closing-section.tsx`, `footer.tsx`)
- Minimalist contact card with direct email copy action and functional quick form.
- Clean copyright, social links, and agent-ready endpoint badges (`/.well-known/`).

## Implementation Plan Strategy
1. Theme & Design Tokens Refinement (`globals.css`, `tailwind.config.ts`).
2. Navbar & Navigation Refinement (`navbar.tsx`).
3. Hero Section Overhaul (`hero.tsx` + subcomponents cleanup).
4. Section Polish: About, Tech Expertise, Projects, Timeline, Blogs, Contact.
5. Verification (Vitest tests, Next build check, visual accessibility).
