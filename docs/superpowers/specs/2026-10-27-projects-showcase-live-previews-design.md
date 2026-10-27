# Interactive Projects Showcase with Live Website Previews on Hover — Design Specification

**Date:** 2026-10-27  
**Author:** MD Ashikur Rahman Puspo & Pair Assistant  
**Status:** Approved  
**Target:** Frontend (`/Users/md.ashikurrahmanpuspo/Desktop/MyPortfolio/frontend`)

---

## 1. Executive Summary

This feature introduces an interactive **Projects Showcase** section on the portfolio's home page (`/`), elevating the portfolio with a miniature browser window experience. When visitors hover over or focus on a project card, a live, interactive preview of the actual deployed website smoothly reveals itself inside a styled browser container with window controls and a domain URL bar.

The feature showcases all seven of the author's deployed production applications with zero layout shift, lazy loading, hover-intent debouncing, and graceful fallbacks for sites with restrictive embedding policies (`X-Frame-Options: DENY`).

---

## 2. Project Registry & Data Specifications

All project data will be centralized in `src/data/showcase-projects.ts` with explicit typing.

### 2.1 The 7 Projects

1. **Marketrix**
   - **URL:** `https://marketrix-xi.vercel.app/marketplace`
   - **Domain:** `marketrix-xi.vercel.app`
   - **Description:** Professional market intelligence workspace for founders to brief research needs, compare expert reports, and connect with vetted analysts.
   - **Tech Stack:** Next.js, TypeScript, Tailwind CSS, Spring Boot
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

2. **Expense Tracker** (TakaTrack)
   - **URL:** `https://expense-tracker-3eh1j64an-puspos-projects.vercel.app`
   - **Domain:** `expense-tracker...vercel.app`
   - **Description:** Real-time personal finance platform with category analytics, budget goals, and multi-device cloud synchronization.
   - **Tech Stack:** Next.js, Spring Boot, MySQL, JWT, Docker
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

3. **Shelf to Tales**
   - **URL:** `https://shelf-to-tales-rho.vercel.app`
   - **Domain:** `shelf-to-tales-rho.vercel.app`
   - **Description:** Community bookstore platform to discover, read, curate collections, and share books with a community of passionate readers.
   - **Tech Stack:** Next.js, React, TypeScript, Tailwind CSS
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

4. **Uptime Monitoring**
   - **URL:** `https://uptime-monitoring-orcin.vercel.app`
   - **Domain:** `uptime-monitoring-orcin.vercel.app`
   - **Description:** High-availability endpoint and service monitoring platform providing real-time ping analytics, uptime tracking, and instant alerts.
   - **Tech Stack:** React, Vite, Framer Motion, Java, Tailwind CSS
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

5. **Ecommare Medi** (PharmaCare)
   - **URL:** `https://ecommare-medi-frontend.vercel.app`
   - **Domain:** `ecommare-medi-frontend.vercel.app`
   - **Description:** Certified online pharmacy and healthcare platform with prescription verification, authentic medicine catalog, and express delivery.
   - **Tech Stack:** Next.js, Spring Boot, MySQL, Docker, Tailwind CSS
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

6. **Stay Mate**
   - **URL:** `https://stay-mate-puspos-projects.vercel.app`
   - **Domain:** `stay-mate-puspos-projects.vercel.app`
   - **Description:** Verified rental room and roommate matching platform featuring profile verification, smart search filters, and in-app messaging.
   - **Tech Stack:** Next.js, TypeScript, Spring Boot, MySQL, JWT
   - **canEmbed:** `true` (Verified HTTP 200, no X-Frame-Options or CSP frame-ancestors block)

7. **DevForge**
   - **URL:** `https://devforge.puspo.online`
   - **Domain:** `devforge.puspo.online`
   - **Description:** Fast, browser-based developer utilities suite — JSON formatting, JWT decoding, UUID generation, timestamp conversion, and regex testing with zero latency.
   - **Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Developer Tools
   - **canEmbed:** `false` (Host sends `X-Frame-Options: DENY`; receives specialized high-fidelity Branded Browser Card fallback)

---

## 3. Architecture & Component Hierarchy

The components will be organized under `src/components/showcase/`:

```
src/
  data/
    showcase-projects.ts         # Project registry & types
  components/
    showcase/
      projects-showcase.tsx      # Section container, heading, 3-column responsive grid
      project-card.tsx           # Card wrapper with hover/focus state & accessibility
      browser-window.tsx         # Browser toolbar chrome (window dots, domain pill, viewport)
      live-preview-iframe.tsx    # Lazy iframe loader with scale transform & loading spinner
      blocked-embed-card.tsx     # High-fidelity fallback card for X-Frame-Options blocked sites
```

### 3.1 Component Breakdown

#### `ProjectsShowcase` (`projects-showcase.tsx`)
- Placed in `src/app/page.tsx` replacing or elevating the home page projects section (`#projects`).
- Features a section title `"Interactive Projects Showcase"`, subtitle, and responsive grid:
  - Desktop (`lg: 1024px+`): 3 columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - Tablet (`md: 768px - 1023px`): 2 columns
  - Mobile (`< 768px`): 1 column

#### `ProjectCard` (`project-card.tsx`)
- Container with dark card background (`bg-card/60 backdrop-blur-sm border border-border/70 hover:border-foreground/30`), rounded corners (`rounded-xl`), and overflow containment.
- Houses the `BrowserWindow` on top, followed by card metadata:
  - Project number (`01`–`07`) and live indicator dot
  - Project title with link to live site
  - Project description (2–3 lines)
  - Verified technology pills
  - Primary action: `"Visit Live Site ↗"` external link

#### `BrowserWindow` (`browser-window.tsx`)
- Simulated browser window header:
  - Three window dots (`w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-red-500/70`, `amber-500/70`, `emerald-500/70`)
  - Domain address pill with lock icon and monospace domain text
  - Quick-launch external link icon
- Viewport area with fixed aspect ratio (`aspect-[16/10]`) guaranteeing zero Cumulative Layout Shift (CLS = 0).

#### `LivePreviewIFrame` (`live-preview-iframe.tsx`)
- **Hover-intent delay:** 200ms debounce prevents accidental loads on cursor skim.
- **Lazy loading:** `iframe` is mounted only once the card is hovered or focused.
- **Sticky session cache:** Once loaded, the iframe element remains mounted in memory so subsequent hovers reveal it instantly without network requests.
- **Desktop scaling calculation:** Renders at `1280px × 800px` internally, scaled via CSS transform:
  ```css
  width: 1280px;
  height: 800px;
  transform: scale(var(--scale));
  transform-origin: top left;
  ```
  where `--scale = cardWidth / 1280`.
- **Event safety:** `pointer-events: none` on desktop ensures cursor scrolling and hover events are never captured by the embedded third-party site.
- **Loading state:** Sleek pulsing skeleton with `"Loading live preview..."` until `onLoad` fires.

#### `BlockedEmbedCard` (`blocked-embed-card.tsx`)
- Specifically designed for `DevForge` (and any future embed-protected sites).
- Renders an interactive miniature developer workstation inside the browser frame:
  - Feature badges: `"JSON Formatter"`, `"JWT Inspector"`, `"UUID Gen"`, `"Regex Tester"`
  - Status chip: `"Live Embed Protected by Host"` with shield icon
  - Direct call-to-action button: `"Launch DevForge App ↗"`

---

## 4. Mobile, Touch & Accessibility

1. **Touch Interaction:**
   - On touch devices without hover, each card shows a `"Tap to Preview"` button in the toolbar.
   - Tapping activates the live preview; an explicit `"Close Preview ✕"` button appears to collapse it.
   - The primary `"Visit Live Site ↗"` button remains immediately tappable at all times.

2. **Keyboard Navigation:**
   - Full keyboard accessibility via `Tab` index.
   - Cards activate preview on `:focus-visible` and dismiss on `:blur`.
   - Descriptive `title` attributes on all iframes (`title={`${project.title} interactive live preview`}`).
   - External links marked with `aria-label`, `target="_blank"`, and `rel="noopener noreferrer"`.

3. **Motion Preferences:**
   - Full support for `@media (prefers-reduced-motion: reduce)`: transitions degrade gracefully to instant opacity switches with zero scaling transforms.

---

## 5. Performance Guarantees

- **Initial Page Load:** 0 iframes loaded at initial page load. Fast LCP and high Lighthouse performance score.
- **Memory Management:** Iframes are constrained and isolated; maximum 1 active preview at any moment.
- **GPU Acceleration:** All transitions use `transform` and `opacity` only (avoiding reflows/paints).
- **Zero CLS:** The aspect-ratio locked browser frame reserves exact pixel dimensions before and after iframe initialization.

---

## 6. Testing Strategy

1. **Unit & Component Testing:**
   - Vitest test suite (`src/components/showcase/project-card.test.tsx` and `projects-showcase.test.tsx`):
     - Renders all 7 projects with correct titles, domains, descriptions, and tech stacks.
     - Simulates hover-intent and verifies lazy iframe activation.
     - Verifies `BlockedEmbedCard` renders for `DevForge`.
     - Verifies mobile tap toggle and keyboard focus accessibility.
2. **Build & Typecheck:**
   - `npm run lint` and `npm run test` pass with 100% success.
   - Next.js build passes cleanly with zero errors.
