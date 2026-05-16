# Glassmorphism & Animation Redesign

**Date:** 2026-05-16
**Status:** Draft
**Goal:** Apply subtle glassmorphism cards, simplify animations, and refine typography across 7 targets while keeping existing layout architecture.

---

## 1. Shared Foundation

### 1.1 Glass Utility Classes

Defined once in `src/app/globals.css`:

```css
.glass {
  @apply bg-card/40 backdrop-blur-xl border border-border/30 shadow-sm;
}
.glass-hover {
  @apply hover:bg-card/60 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300;
}
```

Every card container across all targets uses `glass` as base, with `glass-hover` for interactive ones. This replaces ad-hoc patterns like `bg-card/50 backdrop-blur-sm`, `bg-muted/30 rounded-2xl border`, `bg-muted/50 border rounded-xl`.

### 1.2 Shared Animation Pattern

- **No continuous animations** (no floating, pulsing, rotation)
- All scroll-triggered via framer-motion `whileInView` with `viewport={{ once: true }}`
- Direction: `opacity: 0, y: 16 → opacity: 1, y: 0`
- Stagger: `0.06 * index` delay per sibling
- Transition: `type: 'spring', stiffness: 100, damping: 18`

### 1.3 Shared Hover Pattern

Left gradient accent bar on hover (already used in blog cards + selected-work):

```tsx
<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top" />
```

---

## 2. About Section (homepage)

**File:** `src/components/sections/about.tsx`

### Changes
- **Remove:** floating portrait animation (`y: [0, -6, 0, 6, 0]`, `rotate` sway)
- **Remove:** pulsing decorative blurs (`scale`, `opacity` keyframes)
- **Remove:** card rotation entrance (`rotate: -2/2`)
- **Remove:** alternating slide directions (`cardEntrance('left'/'right')`)
- **Remove:** `rotate-3 hover:rotate-0` on portrait container
- **Simplify:** stats entrance — replace spring scale with simple fade-up
- **Simplify:** cards — all fade `y: 20 → 0`, no direction variation
- **Replace:** `bg-card/50 backdrop-blur-sm` → `glass` on all 3 cards
- **Keep:** image grayscale hover (already subtle)
- **Keep:** outer `Reveal` for section header
- **Keep:** badge + bio link

### Animation code pattern (per card):
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.06, type: 'spring', stiffness: 100, damping: 18 }}
  viewport={{ once: true }}
>
```

---

## 3. Certifications Section

**File:** `src/components/sections/certifications.tsx`

### Changes
- **Remove:** `GlowingEffect` component import and usage
- **Remove:** outer `rounded-[1.25rem] border-[0.75px] border-border p-2` wrapper (was for glow)
- **Replace** card inner div: `bg-background` → `glass glass-hover`
- **Add:** left gradient accent bar on hover
- **Keep:** staggered `whileInView` fade-up entrance (`y: 20 → 0`)
- **Keep:** index numbers, skills, "View Credential" text animation

---

## 4. Featured Projects (SelectedWork)

**File:** `src/components/sections/selected-work.tsx`

### Changes
- **Replace:** `rounded-lg hover:bg-muted/30 transition-colors duration-300` → `glass glass-hover rounded-xl`
- **Remove:** `border-b border-border/40` on outer div (glass card handles borders)
- **Keep:** left accent bar, directional entrance, tech icon hover colors, index scale on hover

---

## 5. Recent Blogs Section

**File:** `src/components/sections/recent-blogs.tsx`

### Changes
- **Replace:** `rounded-xl border border-border/40 bg-card/30` → `glass`
- **Replace:** `hover:bg-card/60 hover:border-primary/20 hover:shadow-sm hover:shadow-primary/5` → `glass-hover`
- **Keep:** staggered entrance, left accent bar, image scale on hover

---

## 6. Blog Page (/blog)

**File:** `src/app/blog/page.tsx` + `_components/blog-list.tsx`

### Changes
- **Replace:** `rounded-xl border border-border/40 bg-card/30` → `glass` in blog-list cards
- **Replace:** hover classes → `glass-hover`
- **Keep:** staggered entrance, left accent bar, color-coded tags
- **No changes** to the page layout or header (already redesigned)

---

## 7. Projects Page (/projects)

**File:** `src/app/projects/page.tsx`

### Changes
- Extract project rows into `_components/project-list.tsx` (client component for animations)
- Each row: `glass glass-hover rounded-xl` with left accent bar
- Add staggered entrance (same 0.06 * index pattern)
- Add tech icon hover colors (matching SelectedWork's `getTechIconColor`)
- Add index number scale on hover
- Better header: decorative icon container with `glass`, gradient heading
- **Keep:** server component for page shell, metadata, JSON-LD

---

## 8. About Me Page (/about-me)

**File:** `src/app/about-me/page.tsx`

### Changes
- Extract content sections into `_components/about-content.tsx` (client component for animations)
- Main content `<section>` blocks: `glass glass-hover rounded-xl p-6 md:p-8` with staggered entrance
- Sidebar connect card: `glass glass-hover rounded-xl p-6`
- Image: `rounded-2xl border-2 border-border/30 shadow-lg` (remove plain `shadow-xl border-slate-200`)
- Add left accent bar on hover for content sections
- Scroll-triggered fade-up per section with stagger
- Section headings: consistent `text-2xl font-bold tracking-tight mb-4`
- Better spacing: `space-y-8` between sections

---

## 9. Case Study Page (/projects/[slug])

**File:** `src/app/projects/[slug]/page.tsx`

### Changes
- **No** conversion to client component (keep server for SEO)
- Replace plain section backgrounds with `glass`:
  - Problem statement: `bg-red-500/5 border-red-500/20 rounded-xl p-6` → `glass border-red-500/10`
  - Challenges/solutions: `bg-muted/30 border rounded-xl p-6` → `glass`
  - Results: `bg-emerald-500/5 border-emerald-500/20 rounded-xl p-6` → `glass border-emerald-500/10`
  - Fallback CTA: `bg-muted/20 rounded-2xl border` → `glass`
  - Bottom CTA: `bg-muted/30 rounded-2xl p-8 border` → `glass`
- Add section entrance via a small `"use client"` wrapper component (e.g. `SectionReveal`)
- Tech stack badges: `glass rounded-full` instead of solid bg

---

## 10. Font Hierarchy Refinements

Applied across all touched files:

| Element | Current | Refined |
|---------|---------|---------|
| Section h2/title | `text-3xl font-bold mb-4` | + `tracking-tight` |
| Card heading | `text-xl font-bold mb-2` | + `tracking-tight` |
| Subtitle/description | `text-muted-foreground max-w-md` | `text-muted-foreground/80 leading-7` |
| Meta info | `text-xs text-muted-foreground` | `text-xs text-muted-foreground/60` |
| Index numbers | `font-mono text-xs text-muted-foreground/60` | `font-mono text-xs text-muted-foreground/40` |

---

## 11. Files Changed

| File | Change |
|------|--------|
| `globals.css` | Add `.glass` + `.glass-hover` utilities |
| `about.tsx` | Strip continuous animations, simplify entrance, apply glass |
| `certifications.tsx` | Remove GlowingEffect, apply glass + accent bar |
| `selected-work.tsx` | Apply glass, polish |
| `recent-blogs.tsx` | Apply glass |
| `blog/_components/blog-list.tsx` | Apply glass |
| `projects/page.tsx` | Create project-list client component, glass cards |
| `projects/_components/project-list.tsx` | _New_ — animated project list |
| `about-me/page.tsx` | Create about-content client component, glass sections |
| `about-me/_components/about-content.tsx` | _New_ — animated about content |
| `projects/[slug]/page.tsx` | Apply glass, add section reveal wrapper |

---

## 12. Out of Scope

- No layout restructuring (grid changes, sidebar additions, timeline blocks)
- No new sections or pages
- No font family changes
- No data model changes
- No GlowingEffect refactor (removed, not kept)
