# Full Website Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a simple, light, gorgeous Airy Modern Minimalist website by consolidating home sections into 5 clear zones and stripping heavy visual noise.

**Architecture:** Consolidate `page.tsx` home structure, update global CSS styling, refine section components with generous vertical spacing (`py-24 md:py-32`) and soft background ambient gradients.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 3, Vitest.

---

### Task 1: Consolidate Home Page Section Layout

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx` (create if missing)

- [ ] **Step 1: Write test for consolidated home page layout**

Create `src/app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Home from "@/app/page"

vi.mock("@/lib/api", () => ({
  getBlogSummaries: async () => [],
}))

vi.mock("@/lib/projects", () => ({
  getProjects: async () => [],
}))

describe("Home Page Component", () => {
  it("renders main container element", async () => {
    const Component = await Home()
    render(Component)
    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify status**

Run: `npm run test -- src/app/page.test.tsx`
Expected: PASS

- [ ] **Step 3: Update `src/app/page.tsx` to 5 consolidated zones**

Update `src/app/page.tsx` to group home sections cleanly:

```tsx
import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { getBlogSummaries } from '@/lib/api'
import { getProjects } from '@/lib/projects'
import dynamic from 'next/dynamic'

const SectionSkeleton = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
  </div>
)

const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About), { ssr: true, loading: () => <SectionSkeleton /> })
const TechnicalExpertise = dynamic(() => import('@/components/sections/technical-expertise').then(mod => mod.TechnicalExpertise), { ssr: true, loading: () => <SectionSkeleton /> })
const SelectedWork = dynamic(() => import('@/components/sections/selected-work').then(mod => mod.SelectedWork), { ssr: true, loading: () => <SectionSkeleton /> })
const JourneyTimeline = dynamic(() => import('@/components/sections/journey-timeline').then(mod => mod.JourneyTimeline), { ssr: true, loading: () => <SectionSkeleton /> })
const RecentBlogs = dynamic(() => import('@/components/sections/recent-blogs').then(mod => mod.RecentBlogs), { ssr: true, loading: () => <SectionSkeleton /> })
const ClosingSection = dynamic(() => import('@/components/sections/closing-section').then(mod => mod.ClosingSection), { ssr: true, loading: () => <SectionSkeleton /> })

export default async function Home() {
  const blogs = await getBlogSummaries()
  const projects = await getProjects()

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      <Hero />
      <div className="space-y-16 md:space-y-24">
        <About />
        <TechnicalExpertise />
        <SelectedWork projects={projects} />
        <JourneyTimeline />
        <RecentBlogs blogs={blogs} />
        <ClosingSection />
      </div>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `npm run test -- src/app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "refactor(home): consolidate page layout into 5 airy minimalist zones"
```

---

### Task 2: Strip Heavy Visual Overlays from Hero

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Test: `src/components/sections/hero.test.tsx`

- [ ] **Step 1: Update `src/components/sections/hero.tsx` background atmosphere**

Remove grid patterns and replace background container with soft ambient radial glows:

```tsx
{/* Subtle Airy Background Atmosphere */}
<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
</div>
```

- [ ] **Step 2: Run test to verify**

Run: `npm run test -- src/components/sections/hero.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit changes**

```bash
git add src/components/sections/hero.tsx
git commit -m "style(hero): replace grid patterns with soft ambient radial glow"
```

---

### Task 3: Build & Lint Verification

**Files:**
- Test all components and execute production build check.

- [ ] **Step 1: Run full Vitest test suite**

Run: `npm run test`
Expected: All tests PASS.

- [ ] **Step 2: Run ESLint**

Run: `npx eslint src/`
Expected: Zero lint errors.

- [ ] **Step 3: Run Next.js build**

Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 4: Commit build check confirmation**

```bash
git add .
git commit -m "chore: verify full website transformation build and test suite"
```
