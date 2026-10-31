# Mobile Touch Previews & Showcase Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a touch-optimized mobile preview bottom sheet drawer (`MobilePreviewSheet`) and an inline `[ 👁️ Preview ]` action trigger on mobile project cards (`ProjectCard`) so mobile and tablet visitors can interactively preview projects directly inside the portfolio.

**Architecture:** A Framer Motion-powered slide-up bottom sheet with gesture drag-to-dismiss (`drag="y"`), backdrop blur, and body scroll locking that hosts the existing `LivePreviewIFrame` / `BlockedEmbedCard` components. `ProjectCard` is enhanced with a mobile-only quick-action pill (`block md:hidden`) that triggers the sheet without conflicting with standard external link navigation. State is coordinated in `ProjectsShowcase`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 3, Framer Motion, Lucide React (`Eye`, `X`, `ExternalLink`, `Lock`), Vitest, Testing Library.

---

## File Structure

| Action | Path | Purpose |
|---|---|---|
| **Create** | `src/components/showcase/mobile-preview-sheet.tsx` | Slide-up bottom sheet component with backdrop blur, drag dismiss, browser chrome header, live iframe/mock viewport, and action footer. |
| **Create** | `src/components/showcase/mobile-preview-sheet.test.tsx` | Unit tests for drawer open/close, drag dismiss, escape key handler, backdrop click, body scroll locking, and iframe rendering. |
| **Modify** | `src/components/showcase/project-card.tsx` | Add mobile `[ 👁️ Preview ]` trigger pill and `onPreview` callback while preserving standard card click navigation. |
| **Modify** | `src/components/showcase/project-card.test.tsx` | Add tests verifying the mobile preview button and callback behavior. |
| **Modify** | `src/components/showcase/projects-showcase.tsx` | Integrate `mobilePreviewProject` state and render `<MobilePreviewSheet />`. |
| **Modify** | `src/components/showcase/projects-showcase.test.tsx` | Add integration tests verifying opening and closing the mobile preview sheet. |

---

### Task 1: Create `MobilePreviewSheet` Component & Tests

**Files:**
- Create: `src/components/showcase/mobile-preview-sheet.test.tsx`
- Create: `src/components/showcase/mobile-preview-sheet.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/mobile-preview-sheet.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MobilePreviewSheet } from './mobile-preview-sheet'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('MobilePreviewSheet Component', () => {
  const project = SHOWCASE_PROJECTS[0] // Marketrix (canEmbed: true)
  const blockedProject = SHOWCASE_PROJECTS[6] // DevForge (canEmbed: false)

  beforeEach(() => {
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders nothing when project is null or undefined', () => {
    const { container } = render(
      <MobilePreviewSheet project={null} onClose={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders dialog with title, domain, close button, and live preview iframe when project is provided', () => {
    render(<MobilePreviewSheet project={project} onClose={vi.fn()} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.getAttribute('aria-label')).toContain(project.title)

    // Domain display
    expect(screen.getByText(project.displayDomain)).toBeDefined()

    // Title
    expect(screen.getByText(project.title)).toBeDefined()

    // Status pill
    expect(screen.getByText('Online')).toBeDefined()

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close preview/i })
    expect(closeBtn).toBeDefined()

    // Live preview iframe container
    const iframe = screen.getByTestId(`live-preview-iframe-${project.id}`)
    expect(iframe).toBeDefined()

    // External visit button in footer
    const visitLink = screen.getByRole('link', { name: /Open Live Website/i })
    expect(visitLink.getAttribute('href')).toBe(project.url)
    expect(visitLink.getAttribute('target')).toBe('_blank')
    expect(visitLink.getAttribute('rel')).toContain('noopener')
  })

  it('renders BlockedEmbedCard when project.canEmbed is false', () => {
    render(<MobilePreviewSheet project={blockedProject} onClose={vi.fn()} />)

    expect(screen.getByTestId(`blocked-embed-card-${blockedProject.id}`)).toBeDefined()
  })

  it('locks document.body overflow when open and unlocks on unmount', () => {
    const { unmount } = render(
      <MobilePreviewSheet project={project} onClose={vi.fn()} />
    )
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    const closeBtn = screen.getByRole('button', { name: /Close preview/i })
    fireEvent.click(closeBtn)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop overlay is clicked', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    const backdrop = screen.getByTestId('mobile-preview-backdrop')
    fireEvent.click(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders all tech stack tags inside footer area', () => {
    render(<MobilePreviewSheet project={project} onClose={vi.fn()} />)

    project.techStack.forEach((tech) => {
      expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1)
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/mobile-preview-sheet.test.tsx`
Expected: FAIL (Cannot find module './mobile-preview-sheet')

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/components/showcase/mobile-preview-sheet.tsx
'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Lock } from 'lucide-react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { LivePreviewIFrame } from './live-preview-iframe'

export interface MobilePreviewSheetProps {
  project?: ShowcaseProject | null
  onClose: () => void
}

export const MobilePreviewSheet: React.FC<MobilePreviewSheetProps> = ({
  project,
  onClose,
}) => {
  // Lock body scroll while sheet is open
  useEffect(() => {
    if (!project) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end">
        {/* Backdrop overlay */}
        <motion.div
          data-testid="mobile-preview-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Slide-up Drawer Panel */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Live preview of ${project.title}`}
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
          className="relative z-10 w-full max-h-[85vh] h-[75vh] bg-card/95 border-t border-border/80 rounded-t-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
        >
          {/* Top Drag Handle Indicator */}
          <div className="pt-2.5 pb-1 flex justify-center">
            <span className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Browser Chrome Header */}
          <div className="px-4 py-2 border-b border-border/60 flex items-center justify-between gap-3 shrink-0">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 w-14 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Address bar pill */}
            <div className="flex-1 max-w-[220px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md bg-background/80 border border-border/50 text-[11px] font-mono text-muted-foreground truncate">
              <Lock className="w-3 h-3 text-emerald-500 shrink-0" aria-hidden="true" />
              <span className="truncate">{project.displayDomain}</span>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Details Bar */}
          <div className="px-4 py-2 bg-muted/30 border-b border-border/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>Online</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
              <span className="font-semibold text-foreground truncate">{project.title}</span>
            </div>
          </div>

          {/* Preview Viewport */}
          <div className="flex-1 relative w-full overflow-hidden bg-black/90">
            <LivePreviewIFrame
              previewItem={project}
              isVisible={true}
              fillHeight={true}
            />
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-card border-t border-border/60 flex flex-col gap-2 shrink-0">
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Open website CTA */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Open Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/mobile-preview-sheet.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/mobile-preview-sheet.tsx src/components/showcase/mobile-preview-sheet.test.tsx
git commit -m "feat(showcase): create MobilePreviewSheet component with gesture support and tests

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Enhance `ProjectCard` with Mobile Preview Action

**Files:**
- Modify: `src/components/showcase/project-card.tsx`
- Modify: `src/components/showcase/project-card.test.tsx`

- [ ] **Step 1: Write failing tests for mobile preview trigger**

Update `src/components/showcase/project-card.test.tsx`:
```typescript
  it('renders a mobile-only preview button with Eye icon', () => {
    render(<ProjectCard project={project} index={0} />)

    const previewBtn = screen.getByRole('button', { name: new RegExp(`Preview ${project.shortTitle || project.title}`, 'i') })
    expect(previewBtn).toBeDefined()
    expect(previewBtn.className).toContain('md:hidden')
  })

  it('triggers onPreview callback and prevents navigation when mobile preview button is clicked', () => {
    const onPreview = vi.fn()
    render(<ProjectCard project={project} index={0} onPreview={onPreview} />)

    const previewBtn = screen.getByRole('button', { name: new RegExp(`Preview ${project.shortTitle || project.title}`, 'i') })
    fireEvent.click(previewBtn)

    expect(onPreview).toHaveBeenCalledTimes(1)
    expect(onPreview).toHaveBeenCalledWith(project)
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/project-card.test.tsx`
Expected: FAIL (Unable to find role="button")

- [ ] **Step 3: Update `ProjectCard` implementation**

In `src/components/showcase/project-card.tsx`:
```typescript
'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ArrowUpRight, Eye } from 'lucide-react'

export interface ProjectCardProps {
  project: ShowcaseProject
  index: number
  onHover?: (project: ShowcaseProject, e: React.MouseEvent) => void
  onLeave?: () => void
  onMouseMove?: (e: React.MouseEvent) => void
  onPreview?: (project: ShowcaseProject) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onHover,
  onLeave,
  onMouseMove,
  onPreview,
}) => {
  const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onPreview?.(project)
  }

  const handlePreviewKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      onPreview?.(project)
    }
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`project-card-${project.id}`}
      onMouseEnter={(e) => onHover?.(project, e)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      className="p-4 rounded-lg border border-border bg-card/50 flex items-start justify-between gap-4 hover:border-foreground/30 transition-colors group block"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1.5">
          <span className="font-semibold text-foreground/80">{formattedIndex}</span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Online</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="text-[11px] truncate">{project.displayDomain}</span>
        </div>

        <h3 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4 mb-1">
          {project.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 mt-1">
        {/* Mobile Preview Button Trigger */}
        <span
          role="button"
          tabIndex={0}
          aria-label={`Preview ${project.shortTitle || project.title}`}
          onClick={handlePreviewClick}
          onKeyDown={handlePreviewKeyDown}
          className="md:hidden inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span>Preview</span>
        </span>

        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
      </div>
    </a>
  )
}

export const ProjectRow = ProjectCard
export const ProjectRowItem = ProjectCard
export type ProjectRowProps = ProjectCardProps
export type ProjectRowItemProps = ProjectCardProps
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- src/components/showcase/project-card.test.tsx src/components/showcase/project-row-item.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/project-card.tsx src/components/showcase/project-card.test.tsx
git commit -m "feat(showcase): add mobile-only preview action button to ProjectCard

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Integrate `MobilePreviewSheet` into `ProjectsShowcase`

**Files:**
- Modify: `src/components/showcase/projects-showcase.tsx`
- Modify: `src/components/showcase/projects-showcase.test.tsx`

- [ ] **Step 1: Write failing tests for mobile preview sheet interaction**

Add to `src/components/showcase/projects-showcase.test.tsx`:
```typescript
  describe('Mobile preview sheet interaction', () => {
    it('opens MobilePreviewSheet when clicking mobile preview button on a card', () => {
      render(<ProjectsShowcase />)

      const targetProject = SHOWCASE_PROJECTS[0]
      const previewBtn = screen.getByRole('button', {
        name: new RegExp(`Preview ${targetProject.shortTitle || targetProject.title}`, 'i'),
      })

      fireEvent.click(previewBtn)

      // Dialog is now open
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeDefined()
      expect(dialog.getAttribute('aria-label')).toContain(targetProject.title)

      // Close button closes the dialog
      const closeBtn = screen.getByRole('button', { name: /Close preview/i })
      fireEvent.click(closeBtn)

      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/projects-showcase.test.tsx`
Expected: FAIL (Cannot find role="dialog")

- [ ] **Step 3: Update `ProjectsShowcase` implementation**

In `src/components/showcase/projects-showcase.tsx`:
```typescript
'use client'

import React, { useState, useCallback } from 'react'
import { SHOWCASE_PROJECTS, type ShowcaseProject } from '@/data/showcase-projects'
import { ProjectCard } from './project-card'
import { CursorFloatingPreview } from './cursor-floating-preview'
import { MobilePreviewSheet } from './mobile-preview-sheet'
import Link from 'next/link'

export const ProjectsShowcase: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null)
  const [mobilePreviewProject, setMobilePreviewProject] = useState<ShowcaseProject | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleRowHover = useCallback((project: ShowcaseProject, e: React.MouseEvent) => {
    setActiveProject(project)
    setCursorPos({ x: e.clientX, y: e.clientY })
    setIsHovering(true)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleRowLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const handleMobilePreview = useCallback((project: ShowcaseProject) => {
    setMobilePreviewProject(project)
  }, [])

  const handleCloseMobilePreview = useCallback(() => {
    setMobilePreviewProject(null)
  }, [])

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {/* Header matching Technical Writing & Insights (RecentBlogs) */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Projects Showcase
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Space-y-3 vertical list of compact project rows */}
          <div className="space-y-3">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHover={handleRowHover}
                onLeave={handleRowLeave}
                onMouseMove={handleMouseMove}
                onPreview={handleMobilePreview}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating preview following cursor on desktop */}
      <CursorFloatingPreview
        project={activeProject}
        cursorPosition={cursorPos}
        isVisible={isHovering}
      />

      {/* Slide-up bottom sheet preview on mobile touch devices */}
      <MobilePreviewSheet
        project={mobilePreviewProject}
        onClose={handleCloseMobilePreview}
      />
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/projects-showcase.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/projects-showcase.tsx src/components/showcase/projects-showcase.test.tsx
git commit -m "feat(showcase): wire up MobilePreviewSheet in ProjectsShowcase

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Full Test Suite & Production Build Verification

**Files:**
- Test all showcase tests and full frontend test suite.

- [ ] **Step 1: Run all showcase test suites**

Run: `npm run test -- src/components/showcase/`
Expected: All test suites PASS

- [ ] **Step 2: Run complete Vitest suite**

Run: `npm run test`
Expected: All tests pass across the repository

- [ ] **Step 3: Run production build check**

Run: `npm run build`
Expected: Next.js Turbopack production build succeeds with 0 errors

- [ ] **Step 4: Commit any remaining changes**

```bash
git commit -m "test(showcase): verify full test suite and production build

Co-Authored-By: Claude <noreply@anthropic.com>"
```
