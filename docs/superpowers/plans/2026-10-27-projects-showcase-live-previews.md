# Interactive Projects Showcase with Live Website Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, interactive Projects Showcase section featuring all seven of the author's deployed applications with live website previews rendered inside responsive miniature browser windows on hover and focus.

**Architecture:** A modular React component architecture in `src/components/showcase/` backed by a centralized typed data registry in `src/data/showcase-projects.ts`. Live previews utilize lazy-loaded iframes scaled from a desktop viewport (1280×800) with hover-intent debouncing, sticky session caching, zero CLS, and a branded fallback card for `DevForge` (which prohibits embedding via `X-Frame-Options: DENY`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 3, Lucide React, Vitest.

## Global Constraints

- **Exact URLs:**
  1. Marketrix: `https://marketrix-xi.vercel.app/marketplace`
  2. Expense Tracker: `https://expense-tracker-3eh1j64an-puspos-projects.vercel.app`
  3. Shelf to Tales: `https://shelf-to-tales-rho.vercel.app`
  4. Uptime Monitoring: `https://uptime-monitoring-orcin.vercel.app`
  5. Ecommare Medi: `https://ecommare-medi-frontend.vercel.app`
  6. Stay Mate: `https://stay-mate-puspos-projects.vercel.app`
  7. DevForge: `https://devforge.puspo.online`
- **Embedding Policy:** DevForge strictly sends `X-Frame-Options: DENY`. Direct iframe embedding MUST NOT be attempted without graceful fallback; `BlockedEmbedCard` must be rendered.
- **Performance:** 0 iframes loaded on initial page load; lazy loading only on hover/focus after 200ms debounce.
- **Layout:** Zero Cumulative Layout Shift (CLS = 0) using aspect ratio locked containers (`aspect-[16/10]`).
- **Safety:** `pointer-events: none` on desktop preview iframes to prevent mouse event trapping.
- **Code Style:** Strict TypeScript, Tailwind CSS utility classes matching existing design tokens, accessible ARIA labels, and Vitest unit tests for every component.

---

### Task 1: Showcase Projects Data Registry & Types

**Files:**
- Create: `src/data/showcase-projects.ts`
- Test: `src/data/showcase-projects.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface ShowcaseProject {
    id: string
    title: string
    shortTitle: string
    description: string
    url: string
    displayDomain: string
    techStack: string[]
    canEmbed: boolean
    highlights?: string[]
  }
  export const SHOWCASE_PROJECTS: ShowcaseProject[]
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/data/showcase-projects.test.ts
import { describe, it, expect } from 'vitest'
import { SHOWCASE_PROJECTS } from './showcase-projects'

describe('SHOWCASE_PROJECTS Registry', () => {
  it('contains exactly 7 deployed projects', () => {
    expect(SHOWCASE_PROJECTS).toHaveLength(7)
  })

  it('contains all required exact URLs', () => {
    const urls = SHOWCASE_PROJECTS.map((p) => p.url)
    expect(urls).toContain('https://marketrix-xi.vercel.app/marketplace')
    expect(urls).toContain('https://expense-tracker-3eh1j64an-puspos-projects.vercel.app')
    expect(urls).toContain('https://shelf-to-tales-rho.vercel.app')
    expect(urls).toContain('https://uptime-monitoring-orcin.vercel.app')
    expect(urls).toContain('https://ecommare-medi-frontend.vercel.app')
    expect(urls).toContain('https://stay-mate-puspos-projects.vercel.app')
    expect(urls).toContain('https://devforge.puspo.online')
  })

  it('marks DevForge as non-embeddable and others as embeddable', () => {
    const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')
    expect(devforge).toBeDefined()
    expect(devforge?.canEmbed).toBe(false)

    const embeddable = SHOWCASE_PROJECTS.filter((p) => p.id !== 'devforge')
    embeddable.forEach((p) => {
      expect(p.canEmbed).toBe(true)
    })
  })

  it('provides verified tech stacks and descriptions for each project', () => {
    SHOWCASE_PROJECTS.forEach((p) => {
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(15)
      expect(p.displayDomain.length).toBeGreaterThan(0)
      expect(p.techStack.length).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/data/showcase-projects.test.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `src/data/showcase-projects.ts`**

```typescript
// src/data/showcase-projects.ts

export interface ShowcaseProject {
  id: string
  title: string
  shortTitle: string
  description: string
  url: string
  displayDomain: string
  techStack: string[]
  canEmbed: boolean
  highlights?: string[]
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'marketrix',
    title: 'Marketrix — Market Intelligence Platform',
    shortTitle: 'Marketrix',
    description:
      'Professional market intelligence workspace for founders to brief research needs, compare expert reports, and connect with vetted analysts.',
    url: 'https://marketrix-xi.vercel.app/marketplace',
    displayDomain: 'marketrix-xi.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Spring Boot'],
    canEmbed: true,
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker — Real-Time Personal Finance',
    shortTitle: 'Expense Tracker',
    description:
      'Personal finance platform with real-time expense logging, savings goal progress tracking, and interactive category breakdowns.',
    url: 'https://expense-tracker-3eh1j64an-puspos-projects.vercel.app',
    displayDomain: 'expense-tracker.vercel.app',
    techStack: ['Next.js', 'Spring Boot', 'MySQL', 'JWT', 'Docker'],
    canEmbed: true,
  },
  {
    id: 'shelf-to-tales',
    title: 'Shelf to Tales — Community Bookstore',
    shortTitle: 'Shelf to Tales',
    description:
      'Community bookstore platform to discover, read, curate collections, and share books with a community of passionate readers.',
    url: 'https://shelf-to-tales-rho.vercel.app',
    displayDomain: 'shelf-to-tales-rho.vercel.app',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    canEmbed: true,
  },
  {
    id: 'uptime-monitoring',
    title: 'Uptime Monitoring — Real-Time Endpoint Health',
    shortTitle: 'Uptime Monitoring',
    description:
      'High-availability service monitoring platform providing real-time ping analytics, uptime tracking, and instant incident alerts.',
    url: 'https://uptime-monitoring-orcin.vercel.app',
    displayDomain: 'uptime-monitoring-orcin.vercel.app',
    techStack: ['React', 'Vite', 'Framer Motion', 'Java', 'Tailwind CSS'],
    canEmbed: true,
  },
  {
    id: 'ecommare-medi',
    title: 'Ecommare Medi — Pharmacy & Healthcare Platform',
    shortTitle: 'Ecommare Medi',
    description:
      'Certified online pharmacy with prescription validation, authentic medicine catalog, and express medical delivery checkout.',
    url: 'https://ecommare-medi-frontend.vercel.app',
    displayDomain: 'ecommare-medi-frontend.vercel.app',
    techStack: ['Next.js', 'Spring Boot', 'MySQL', 'Docker', 'Tailwind CSS'],
    canEmbed: true,
  },
  {
    id: 'stay-mate',
    title: 'Stay Mate — Rental & Roommate Matching',
    shortTitle: 'Stay Mate',
    description:
      'Verified rental room and roommate platform featuring profile verification, dynamic search filters, and in-app messaging.',
    url: 'https://stay-mate-puspos-projects.vercel.app',
    displayDomain: 'stay-mate.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Spring Boot', 'MySQL', 'JWT'],
    canEmbed: true,
  },
  {
    id: 'devforge',
    title: 'DevForge — Instant Developer Utilities Suite',
    shortTitle: 'DevForge',
    description:
      'Fast, browser-based developer utilities — JSON formatting, JWT decoding, UUID generation, timestamp conversion, and regex testing with zero latency.',
    url: 'https://devforge.puspo.online',
    displayDomain: 'devforge.puspo.online',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Developer Tools'],
    canEmbed: false,
    highlights: ['JSON Formatter', 'JWT Inspector', 'UUID Generator', 'Regex Tester'],
  },
]
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/data/showcase-projects.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/showcase-projects.ts src/data/showcase-projects.test.ts
git commit -m "feat(showcase): add 7 showcase projects registry and type definitions"
```

---

### Task 2: Blocked Embed Fallback Component (`BlockedEmbedCard`)

**Files:**
- Create: `src/components/showcase/blocked-embed-card.tsx`
- Test: `src/components/showcase/blocked-embed-card.test.tsx`

**Interfaces:**
- Consumes: `ShowcaseProject` from `src/data/showcase-projects`
- Produces:
  ```typescript
  export const BlockedEmbedCard: React.FC<{ project: ShowcaseProject }>
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/blocked-embed-card.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockedEmbedCard } from './blocked-embed-card'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('BlockedEmbedCard', () => {
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!

  it('renders project title and highlights', () => {
    render(<BlockedEmbedCard project={devforge} />)
    expect(screen.getByText('DevForge')).toBeDefined()
    expect(screen.getByText('JSON Formatter')).toBeDefined()
    expect(screen.getByText('JWT Inspector')).toBeDefined()
  })

  it('renders embed-protection indicator and launch button', () => {
    render(<BlockedEmbedCard project={devforge} />)
    expect(screen.getByText(/Embed Protected/i)).toBeDefined()
    const launchLink = screen.getByRole('link', { name: /Launch DevForge/i })
    expect(launchLink).toBeDefined()
    expect(launchLink.getAttribute('href')).toBe('https://devforge.puspo.online')
    expect(launchLink.getAttribute('target')).toBe('_blank')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/blocked-embed-card.test.tsx`
Expected: FAIL with component not found.

- [ ] **Step 3: Implement `BlockedEmbedCard`**

```tsx
// src/components/showcase/blocked-embed-card.tsx
'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ExternalLink, ShieldCheck, Terminal, Wrench } from 'lucide-react'

export const BlockedEmbedCard: React.FC<{ project: ShowcaseProject }> = ({
  project,
}) => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-card via-card/90 to-background/95 border border-border/60 rounded-b-lg select-none text-left">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Embed Protected by Host</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
            <Terminal className="w-3 h-3" /> Zero Latency
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-foreground tracking-tight">
              {project.shortTitle} Workspace
            </h4>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {project.highlights.map((tool) => (
              <div
                key={tool}
                className="px-2 py-1 rounded bg-muted/40 border border-border/40 text-[10px] font-mono text-muted-foreground/90 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                <span className="truncate">{tool}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">
          Standalone App
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Launch {project.shortTitle}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/blocked-embed-card.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/blocked-embed-card.tsx src/components/showcase/blocked-embed-card.test.tsx
git commit -m "feat(showcase): implement BlockedEmbedCard for embed-restricted sites"
```

---

### Task 3: Mini-Browser Frame Header (`BrowserWindow`)

**Files:**
- Create: `src/components/showcase/browser-window.tsx`
- Test: `src/components/showcase/browser-window.test.tsx`

**Interfaces:**
- Consumes: `ShowcaseProject`
- Produces:
  ```typescript
  export const BrowserWindow: React.FC<{
    project: ShowcaseProject
    isActive: boolean
    onTogglePreview?: () => void
    children: React.ReactNode
  }>
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/browser-window.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserWindow } from './browser-window'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('BrowserWindow', () => {
  const project = SHOWCASE_PROJECTS[0]

  it('renders browser dots, domain pill, and child content', () => {
    render(
      <BrowserWindow project={project} isActive={false}>
        <div data-testid="child-viewport">Viewport Content</div>
      </BrowserWindow>
    )

    expect(screen.getByText(project.displayDomain)).toBeDefined()
    expect(screen.getByTestId('child-viewport')).toBeDefined()
  })

  it('triggers onTogglePreview when preview button is clicked', () => {
    const onToggle = vi.fn()
    render(
      <BrowserWindow project={project} isActive={false} onTogglePreview={onToggle}>
        <div>Viewport</div>
      </BrowserWindow>
    )

    const toggleBtn = screen.getByRole('button', { name: /preview/i })
    fireEvent.click(toggleBtn)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/browser-window.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `BrowserWindow`**

```tsx
// src/components/showcase/browser-window.tsx
'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ExternalLink, Lock, Eye, EyeOff } from 'lucide-react'

interface BrowserWindowProps {
  project: ShowcaseProject
  isActive: boolean
  onTogglePreview?: () => void
  children: React.ReactNode
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  project,
  isActive,
  onTogglePreview,
  children,
}) => {
  return (
    <div className="w-full flex flex-col rounded-t-xl bg-card/90 border border-border/80 overflow-hidden shadow-sm transition-all duration-300 group-hover:border-border">
      {/* Browser Toolbar Chrome */}
      <div className="h-9 px-3 bg-muted/40 border-b border-border/70 flex items-center justify-between gap-2 select-none">
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-1.5 w-14 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-rose-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-amber-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-emerald-500/80 transition-colors" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[200px] sm:max-w-[240px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-md bg-background/80 border border-border/50 text-[11px] font-mono text-muted-foreground truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
          <span className="truncate">{project.displayDomain}</span>
        </div>

        {/* Actions (Touch Toggle + External Link) */}
        <div className="flex items-center gap-1.5 w-14 justify-end shrink-0">
          {onTogglePreview && (
            <button
              type="button"
              onClick={onTogglePreview}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors md:hidden"
              title={isActive ? 'Close Preview' : 'Open Preview'}
              aria-label={isActive ? 'Close live preview' : 'Open live preview'}
            >
              {isActive ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            title="Open in new tab"
            aria-label={`Open ${project.title} in a new tab`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="relative w-full aspect-[16/10] bg-background/95 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/browser-window.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/browser-window.tsx src/components/showcase/browser-window.test.tsx
git commit -m "feat(showcase): implement BrowserWindow header and viewport frame"
```

---

### Task 4: Scaled Lazy Iframe Loader (`LivePreviewIFrame`)

**Files:**
- Create: `src/components/showcase/live-preview-iframe.tsx`
- Test: `src/components/showcase/live-preview-iframe.test.tsx`

**Interfaces:**
- Consumes: `ShowcaseProject`, `BlockedEmbedCard`
- Produces:
  ```typescript
  export const LivePreviewIFrame: React.FC<{
    project: ShowcaseProject
    isActive: boolean
  }>
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/live-preview-iframe.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LivePreviewIFrame } from './live-preview-iframe'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('LivePreviewIFrame', () => {
  const embeddableProject = SHOWCASE_PROJECTS[0]
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!

  it('renders default placeholder state when not active', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={false} />)
    expect(screen.getByText(/Hover to preview/i)).toBeDefined()
  })

  it('renders iframe when active for embeddable project', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={true} />)
    const iframe = screen.getByTitle(`${embeddableProject.title} live preview`)
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('src')).toBe(embeddableProject.url)
  })

  it('renders BlockedEmbedCard when project.canEmbed is false even if active', () => {
    render(<LivePreviewIFrame project={devforge} isActive={true} />)
    expect(screen.getByText(/Embed Protected by Host/i)).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/live-preview-iframe.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `LivePreviewIFrame`**

```tsx
// src/components/showcase/live-preview-iframe.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { BlockedEmbedCard } from './blocked-embed-card'
import { ArrowUpRight, Globe, Loader2, Sparkles } from 'lucide-react'

interface LivePreviewIFrameProps {
  project: ShowcaseProject
  isActive: boolean
}

export const LivePreviewIFrame: React.FC<LivePreviewIFrameProps> = ({
  project,
  isActive,
}) => {
  const [hasLoadedEver, setHasLoadedEver] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [containerWidth, setContainerWidth] = useState(400)
  const containerRef = useRef<HTMLDivElement>(null)

  // Once activated, keep mounted to prevent reloading (sticky session cache)
  useEffect(() => {
    if (isActive && !hasLoadedEver) {
      setHasLoadedEver(true)
    }
  }, [isActive, hasLoadedEver])

  // Measure container width for responsive 1280px scaling
  useEffect(() => {
    if (!containerRef.current) return

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // If project is blocked by X-Frame-Options (e.g. DevForge), render custom card
  if (!project.canEmbed) {
    return <BlockedEmbedCard project={project} />
  }

  const scale = containerWidth > 0 ? containerWidth / 1280 : 0.3125
  const iframeHeight = containerWidth > 0 ? (containerWidth * 10) / 16 / scale : 800

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-background"
    >
      {/* Default Ambient Backdrop (visible when preview is inactive or loading) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${
          isActive && isIframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-card border border-border/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Globe className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground tracking-tight block">
              {project.shortTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-muted/50 border border-border/40 text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground transition-all">
              {isActive && !isIframeLoaded ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
                  <span>Connecting live site...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Hover to preview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Live Iframe: Only mounted if active or cached */}
      {hasLoadedEver && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive && isIframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <iframe
            src={project.url}
            title={`${project.title} live preview`}
            loading="lazy"
            onLoad={() => setIsIframeLoaded(true)}
            className="border-0 bg-white"
            style={{
              width: '1280px',
              height: `${iframeHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/live-preview-iframe.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/live-preview-iframe.tsx src/components/showcase/live-preview-iframe.test.tsx
git commit -m "feat(showcase): implement LivePreviewIFrame with desktop scale transform and lazy caching"
```

---

### Task 5: Interactive Card Component (`ProjectCard`)

**Files:**
- Create: `src/components/showcase/project-card.tsx`
- Test: `src/components/showcase/project-card.test.tsx`

**Interfaces:**
- Consumes: `ShowcaseProject`, `BrowserWindow`, `LivePreviewIFrame`
- Produces:
  ```typescript
  export const ProjectCard: React.FC<{
    project: ShowcaseProject
    index: number
  }>
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/project-card.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ProjectCard } from './project-card'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('ProjectCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const project = SHOWCASE_PROJECTS[0]

  it('renders card with project details, index number, and visit link', () => {
    render(<ProjectCard project={project} index={0} />)
    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText(project.title)).toBeDefined()
    expect(screen.getByText(project.description)).toBeDefined()
    const visitLink = screen.getByRole('link', { name: new RegExp(`Visit ${project.title} live website`, 'i') })
    expect(visitLink.getAttribute('href')).toBe(project.url)
  })

  it('activates preview after hover intent delay', () => {
    render(<ProjectCard project={project} index={0} />)
    const card = screen.getByTestId(`project-card-${project.id}`)

    fireEvent.mouseEnter(card)
    // Before 200ms debounce
    expect(screen.queryByTitle(`${project.title} live preview`)).toBeNull()

    // Fast-forward past 200ms
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(screen.getByTitle(`${project.title} live preview`)).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/project-card.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `ProjectCard`**

```tsx
// src/components/showcase/project-card.tsx
'use client'

import React, { useState, useRef, useCallback } from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { BrowserWindow } from './browser-window'
import { LivePreviewIFrame } from './live-preview-iframe'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: ShowcaseProject
  index: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isActive, setIsActive] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      setIsActive(true)
    }, 200) // 200ms hover-intent delay
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setIsActive(false)
  }, [])

  const handleFocus = useCallback(() => {
    setIsActive(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsActive(false)
  }, [])

  const togglePreview = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

  return (
    <article
      data-testid={`project-card-${project.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`group relative rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:shadow-primary/5 ${
        isActive ? 'ring-1 ring-foreground/20' : ''
      }`}
    >
      <div>
        {/* Miniature Browser Frame */}
        <BrowserWindow
          project={project}
          isActive={isActive}
          onTogglePreview={togglePreview}
        >
          <LivePreviewIFrame project={project} isActive={isActive} />
        </BrowserWindow>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground/80">
                {formattedIndex}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] uppercase tracking-wider">
                Production
              </span>
            </span>

            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online</span>
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 focus:outline-none"
            >
              {project.title}
            </a>
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Tech Badges & Live Site Action */}
      <div className="px-5 pb-5 pt-3 border-t border-border/60 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground">
            {project.displayDomain}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-foreground hover:text-primary transition-colors group/link"
            aria-label={`Visit ${project.title} live website in a new tab`}
          >
            <span>Visit Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/showcase/project-card.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/showcase/project-card.tsx src/components/showcase/project-card.test.tsx
git commit -m "feat(showcase): implement ProjectCard with hover-intent debouncing and accessible controls"
```

---

### Task 6: Showcase Section Container (`ProjectsShowcase`)

**Files:**
- Create: `src/components/showcase/projects-showcase.tsx`
- Test: `src/components/showcase/projects-showcase.test.tsx`

**Interfaces:**
- Consumes: `SHOWCASE_PROJECTS`, `ProjectCard`
- Produces:
  ```typescript
  export const ProjectsShowcase: React.FC
  ```

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/showcase/projects-showcase.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectsShowcase } from './projects-showcase'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('ProjectsShowcase Section', () => {
  it('renders section header with correct title', () => {
    render(<ProjectsShowcase />)
    expect(screen.getByRole('heading', { level: 2, name: /Interactive Projects Showcase/i })).toBeDefined()
  })

  it('renders all 7 project cards in grid', () => {
    render(<ProjectsShowcase />)
    SHOWCASE_PROJECTS.forEach((project) => {
      expect(screen.getByTestId(`project-card-${project.id}`)).toBeDefined()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/showcase/projects-showcase.test.tsx`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `ProjectsShowcase`**

```tsx
// src/components/showcase/projects-showcase.tsx
'use client'

import React from 'react'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'
import { ProjectCard } from './project-card'
import Link from 'next/link'
import { Layers } from 'lucide-react'

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Interactive Applications
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Projects Showcase
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                Hover over any card to launch an interactive live preview of the deployed production website.
              </p>
            </div>

            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors shrink-0 inline-flex items-center gap-1"
            >
              View Case Studies & Architecture &rarr;
            </Link>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
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
git commit -m "feat(showcase): implement ProjectsShowcase section with 3-column responsive grid"
```

---

### Task 7: Homepage Integration & End-to-End Verification

**Files:**
- Modify: `src/app/page.tsx`
- Test: Full Vitest suite & build check

- [ ] **Step 1: Update `src/app/page.tsx` to include `ProjectsShowcase`**

Replace the legacy `<SelectedWork projects={projects} />` call with `<ProjectsShowcase />` on the home page so the interactive showcase takes center stage.

```tsx
// in src/app/page.tsx
import { ProjectsShowcase } from '@/components/showcase/projects-showcase'
// ...
      <div className="space-y-12 md:space-y-20 pb-16">
        <About />
        <TechnicalExpertise />
        <ProjectsShowcase />
        <JourneyTimeline />
        <RecentBlogs blogs={blogs} />
        <ClosingSection />
      </div>
```

- [ ] **Step 2: Run all unit and integration tests**

Run: `npm run test -- run`
Expected: All tests pass.

- [ ] **Step 3: Run TypeScript typecheck and Next.js build**

Run: `npm run build`
Expected: Successful build with zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate interactive ProjectsShowcase with live website previews into homepage"
```
