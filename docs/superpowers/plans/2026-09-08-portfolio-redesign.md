# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio website into a clean, simple, and gorgeous Modern Minimalist (Linear style) portfolio.

**Architecture:** Update theme tokens and Tailwind styling for dark/light modes, streamline Hero into a high-impact single section, polish navbar/footer, refine project and experience cards, and verify all visual and functional tests.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 3, Vitest.

---

### Task 1: Refine Theme Tokens & Background Aesthetics

**Files:**
- Modify: `src/app/globals.css:1-60`
- Test: `src/lib/utils.test.ts`

- [ ] **Step 1: Write test for theme utility class concatenation**

Open `src/lib/utils.test.ts` and add test for theme class merge helper:

```ts
it("merges linear-style background and border classes cleanly", () => {
  expect(cn("bg-zinc-950 border-zinc-800", "p-4")).toBe("bg-zinc-950 border-zinc-800 p-4");
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npm run test -- src/lib/utils.test.ts`
Expected: PASS

- [ ] **Step 3: Update `globals.css` with clean zinc variables**

In `src/app/globals.css`, refine CSS variables for dark/light mode background and borders to use crisp zinc color tokens:

```css
:root {
  --background: 240 5% 98%;
  --foreground: 240 10% 4%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 4%;
  --border: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 6%;
  --card-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

- [ ] **Step 4: Run tests**

Run: `npm run test`
Expected: PASS (All 40 tests)

- [ ] **Step 5: Commit changes**

```bash
git add src/app/globals.css src/lib/utils.test.ts
git commit -m "style: update theme CSS variables to crisp zinc tokens"
```

---

### Task 2: Redesign Floating Navbar & Navigation Chrome

**Files:**
- Modify: `src/components/navbar.tsx`
- Test: `src/components/navbar.test.tsx` (Create if missing or update)

- [ ] **Step 1: Write test for Navbar active states & brand label**

Create or update `src/components/navbar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "@/components/navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders brand link and main navigation", () => {
    render(<Navbar />);
    expect(screen.getByText(/puspo/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify status**

Run: `npm run test -- src/components/navbar.test.tsx`
Expected: PASS

- [ ] **Step 3: Update `Navbar` with polished glassmorphism header**

Update `src/components/navbar.tsx` header wrapper class to:
`sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/75 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/75`

- [ ] **Step 4: Run tests**

Run: `npm run test -- src/components/navbar.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/components/navbar.tsx src/components/navbar.test.tsx
git commit -m "feat(ui): polish floating navbar glassmorphism and borders"
```

---

### Task 3: Overhaul Hero Section into Minimalist Focal Hero

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/components/ui/availability-badge.tsx`
- Test: `src/components/sections/hero.test.tsx`

- [ ] **Step 1: Write test for single focal Hero section**

Create `src/components/sections/hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "@/components/sections/hero";

describe("Hero Section", () => {
  it("renders main headline and availability status", () => {
    render(<Hero />);
    expect(screen.getByText(/available for/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify failure/status**

Run: `npm run test -- src/components/sections/hero.test.tsx`

- [ ] **Step 3: Refine Hero layout and visual hierarchy**

In `src/components/sections/hero.tsx`, consolidate cluttered side panels into a streamlined, high-impact hero grid:
- Position `AvailabilityBadge` at top.
- High-contrast Plus Jakarta Sans title: "Building scalable backend architectures & modern web applications."
- Subtitle: Clean description of backend (Spring Boot, Java) & frontend (Next.js, TypeScript) expertise.
- Two action buttons: Primary glow CTA ("View Selected Work") + Secondary outline CTA ("Contact Me").

- [ ] **Step 4: Run test to verify pass**

Run: `npm run test -- src/components/sections/hero.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/components/sections/hero.tsx src/components/sections/hero.test.tsx
git commit -m "feat(ui): overhaul hero section into clean minimalist focal hero"
```

---

### Task 4: Polish Selected Work / Projects Section Cards

**Files:**
- Modify: `src/components/sections/selected-work.tsx`
- Test: `src/components/sections/selected-work.test.tsx`

- [ ] **Step 1: Add test for Selected Work cards**

Create `src/components/sections/selected-work.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SelectedWork from "@/components/sections/selected-work";

describe("SelectedWork Section", () => {
  it("renders section heading", () => {
    render(<SelectedWork projects={[]} />);
    expect(screen.getByText(/selected work/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify**

Run: `npm run test -- src/components/sections/selected-work.test.tsx`
Expected: PASS

- [ ] **Step 3: Refine card styles in `selected-work.tsx`**

Update project card containers with Linear-style `border-zinc-800` borders, subtle scale hover effects, and clean tech pills (`bg-zinc-800/50 text-zinc-300 text-xs px-2.5 py-1 rounded-full`).

- [ ] **Step 4: Run tests**

Run: `npm run test`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/components/sections/selected-work.tsx src/components/sections/selected-work.test.tsx
git commit -m "style(ui): polish project cards with linear grid aesthetic"
```

---

### Task 5: Final Build & Test Verification

**Files:**
- Test all components and execute production build check.

- [ ] **Step 1: Run full Vitest test suite**

Run: `npm run test`
Expected: All tests PASS.

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`
Expected: Zero lint errors.

- [ ] **Step 3: Run Next.js production build**

Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 4: Commit build check confirmation**

```bash
git add .
git commit -m "chore: verify redesign build and test suite completion"
```
