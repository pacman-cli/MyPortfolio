# Mobile Touch Previews & Showcase Polish — Design Specification

**Date:** 2026-10-31  
**Author:** MD Ashikur Rahman Puspo & Pair Assistant  
**Status:** Approved  
**Target:** Frontend (`/Users/md.ashikurrahmanpuspo/Desktop/MyPortfolio/frontend`)

---

## 1. Executive Summary

The desktop portfolio features a cursor-following live preview (`CursorFloatingPreview`) where hovering over any project card smoothly displays an interactive iframe preview or tailored mock application. However, on mobile and touch devices (`< md`), hovering does not exist and previews are hidden.

This specification details the architecture, component design, interaction flows, accessibility guarantees, and testing strategy for introducing **Mobile Touch Live Previews** via a sleek bottom sheet drawer (`MobilePreviewSheet`) triggered by an inline quick-action pill on mobile cards.

---

## 2. Goals & Success Criteria

1. **Mobile Parity**: Mobile visitors (`< md`) can preview projects directly on the portfolio without having to navigate away to third-party domains.
2. **Accessible Interaction**: Retain the standard external link navigation on main card clicks while providing an independent, accessible touch trigger for the preview sheet (no invalid nested interactive elements like `<button>` inside `<a>`).
3. **Smooth Fluid Gestures**: Bottom sheet drawer powered by Framer Motion with drag-to-dismiss (`drag="y"`), spring animations, backdrop blur, and body scroll lock.
4. **Seamless Fallbacks**: Reuses existing `LivePreviewIFrame`, `/api/preview-proxy`, and `BlockedEmbedCard` components without duplication.
5. **Zero Test Regressions**: Full Vitest test coverage for the new component, updated card actions, and showcase integration.

---

## 3. Architecture & Component Hierarchy

### 3.1 Component Tree

```text
ProjectsShowcase (src/components/showcase/projects-showcase.tsx)
│
├── ProjectCard (src/components/showcase/project-card.tsx)
│   ├── Primary Card Link Area (navigates to project.url in new tab)
│   │   ├── Project index (01, 02...) & status pill ("Online")
│   │   ├── Title & Description
│   │   └── Tech Stack tag list
│   └── Action Cluster
│       ├── Mobile "Preview" Pill Button (class: block md:hidden)
│       │   └── [Eye icon] "Preview" -> onClick: triggers onPreviewClick(project)
│       └── External Link Icon (ArrowUpRight, class: mt-1)
│
├── CursorFloatingPreview (src/components/showcase/cursor-floating-preview.tsx)
│   └── Desktop only (class: hidden md:block)
│
└── MobilePreviewSheet (src/components/showcase/mobile-preview-sheet.tsx)
    ├── Backdrop Overlay (framer-motion opacity fade, click to dismiss)
    └── Slide-Up Drawer Panel (framer-motion y-translation, drag="y" handle)
        ├── Drawer Handle Bar (visual pill indicator)
        ├── Header Bar (traffic lights / domain pill / close button)
        ├── Preview Viewport (LivePreviewIFrame or BlockedEmbedCard)
        └── Sticky Action Footer ("Open Live Website ↗")
```

### 3.2 State Management in `ProjectsShowcase`

* `activeProject: ShowcaseProject | null` — tracks currently hovered project on desktop (for `CursorFloatingPreview`).
* `mobilePreviewProject: ShowcaseProject | null` — tracks the project opened in the mobile bottom sheet (for `MobilePreviewSheet`).
* `isHovering: boolean` — controls visibility of the floating desktop preview.

---

## 4. Component Details & Interactions

### 4.1 Refactoring `ProjectCard` (`src/components/showcase/project-card.tsx`)

* **Markup Structure**:
  Currently, `ProjectCard` wraps everything in an outer `<a href={project.url}>`. Placing an interactive `<button>` inside an `<a>` violates HTML5 / WAI-ARIA standards.
  * Refactor: The root element becomes a `<div data-testid="project-card-{id}">` styled with borders and hover effects.
  * The main text area (index, status, title, description, tags) is wrapped in an inner `<a href={project.url} target="_blank" rel="noopener noreferrer">` that takes up the full width.
  * The top-right actions cluster contains:
    1. A mobile-only `<button type="button" aria-label="Preview {project.title}">` displaying the `Eye` icon and `"Preview"` text. Clicking this stops event propagation and calls `onPreview(project)`.
    2. The `ArrowUpRight` icon linked to the target URL.
* **Props interface**:
  ```typescript
  export interface ProjectCardProps {
    project: ShowcaseProject
    index: number
    onHover?: (project: ShowcaseProject, e: React.MouseEvent) => void
    onLeave?: () => void
    onMouseMove?: (e: React.MouseEvent) => void
    onPreview?: (project: ShowcaseProject) => void
  }
  ```

### 4.2 New Component: `MobilePreviewSheet` (`src/components/showcase/mobile-preview-sheet.tsx`)

* **Drawer Specification**:
  * Position: `fixed inset-x-0 bottom-0 z-50`.
  * Dimensions: `h-[75vh] max-h-[85vh]` with `rounded-t-2xl`.
  * Styling: `bg-card border-t border-border shadow-2xl backdrop-blur-xl flex flex-col`.
* **Motion & Drag Configuration**:
  ```typescript
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
  drag="y"
  dragConstraints={{ top: 0 }}
  dragElastic={0.2}
  onDragEnd={(_e, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose()
    }
  }}
  ```
* **Internal Anatomy**:
  1. **Drag Indicator**: Centered subtle bar (`w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto my-2.5`).
  2. **Header Bar**:
     - Window control dots (red/yellow/green pills).
     - Address pill displaying `project.displayDomain`.
     - Close button (`<button onClick={onClose} aria-label="Close preview"><X className="w-4 h-4" /></button>`).
  3. **Viewport Container**:
     - Flexible scroll/grow area hosting `<LivePreviewIFrame previewItem={project} isVisible={true} />`.
     - Automatically renders `BlockedEmbedCard` if `project.canEmbed === false`.
  4. **Action Footer**:
     - Bottom bar containing `"Open Live Website ↗"` button opening `project.url` in a new tab.

---

## 5. Accessibility & Error Handling

1. **Dialog Accessibility**:
   - `role="dialog"` and `aria-modal="true"`.
   - `aria-label={project ? \`Live preview of \${project.title}\` : 'Project preview'}`.
   - Escape key listener on `window` to close the drawer.
   - Background body scroll locking (`document.body.style.overflow = 'hidden'`) with cleanup in `useEffect`.
2. **Reduced Motion**:
   - Leverages `useReducedMotion()` from `framer-motion` to replace spring slide animations with immediate/opacity transitions.
3. **Resilience**:
   - If an embed times out or fails, `LivePreviewIFrame` falls back gracefully to `BlockedEmbedCard`.

---

## 6. Testing Strategy

1. **`src/components/showcase/mobile-preview-sheet.test.tsx`**:
   - Renders sheet when `project` is non-null.
   - Verifies project title, domain, iframe/mock, and external link are present.
   - Verifies clicking Close button calls `onClose`.
   - Verifies clicking backdrop overlay calls `onClose`.
   - Verifies pressing `Escape` key calls `onClose`.
   - Verifies body scroll locking toggles on mount and unmount.
2. **`src/components/showcase/project-card.test.tsx`**:
   - Verifies mobile preview button is present and accessible.
   - Verifies clicking preview button calls `onPreview` without triggering navigation.
   - Verifies clicking main card links to `project.url`.
3. **`src/components/showcase/projects-showcase.test.tsx`**:
   - Verifies tapping mobile preview opens the sheet.
   - Verifies closing the sheet resets state.
4. **End-to-End Test Suite**:
   - Run `npm run test` across all frontend tests.
   - Run `npm run build` to verify Next.js production compilation.
