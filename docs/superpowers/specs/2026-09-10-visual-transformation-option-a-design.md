# Visual Transformation Spec: Option A (Ultra-Minimalist Linear Grid)

## Goal
Deliver a dramatic, instantly noticeable visual overhaul of the portfolio to give it an executive, high-end Linear/Vercel developer feel.

## Visual Design Strategy
1. **Hero Overhaul (`src/components/sections/hero.tsx`):**
   - High-impact headline: "Backend Architect & Full-Stack Engineer" with crisp white typography and subtle emerald gradient accent on role.
   - Clean status pill: `Available for backend & cloud infrastructure roles`.
   - Stripped away cluttered metrics box & heavy portrait cards on mobile; unified focus on clean statement + CTAs.
   - Background: Deep obsidian background (`zinc-950`) with an ultra-soft top gradient spotlight (`emerald-500/10`).

2. **Selected Work Grid Overhaul (`src/components/sections/selected-work.tsx`):**
   - Replace single-column list rows with a 2-column large visual grid (`grid md:grid-cols-2 gap-6`).
   - Cards: Elevated dark surfaces (`bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300`).
   - Distinctive project headers, prominent tech stack badges, direct GitHub/Demo action buttons.

3. **Technical Expertise & About Grid (`src/components/sections/technical-expertise.tsx`):**
   - Clean 3-column category grid cards (`zinc-900/50 border border-zinc-800/80 hover:border-zinc-700`).
   - Distinctive skill chips with clean tech icons.

4. **Navbar Refinement (`src/components/navbar.tsx`):**
   - Sleek glassmorphism header with clean text brand logo `"MD ASHIKUR RAHMAN"` + green status indicator.
