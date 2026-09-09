# Portfolio Redesign: Phase 2 Section Expansion Spec

## Executive Summary
Refine remaining high-impact home sections (`About`, `Technical Expertise`, `Journey Timeline`) to match the clean Linear-style modern minimalist design tokens established in Phase 1.

## Components Covered
1. **About (`src/components/sections/about.tsx`)**
   - Replace generic `.glass` cards with `bg-white/50 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80`.
   - Streamline image frame styling and stat counters.
2. **Technical Expertise (`src/components/sections/technical-expertise.tsx`)**
   - Use crisp zinc borders on skill category cards and individual skill chips (`bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80`).
3. **Journey Timeline (`src/components/sections/journey-timeline.tsx`)**
   - Refine vertical line timeline to use `border-zinc-200 dark:border-zinc-800` axis with subtle emerald active progress indicators.

## Testing & Quality Strategy
- Vitest suite for component mounting & section title verification.
- ESLint check across all touched files.
- Local preview validation (`npm run dev` / `npm run preview`).
- Production build validation (`npm run build`).
- Cloudflare deployment (`npm run deploy`).
