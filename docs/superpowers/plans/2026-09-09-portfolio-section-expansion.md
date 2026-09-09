# Phase 2 Section Expansion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine About, Technical Expertise, and Journey Timeline sections to fit the minimalist zinc design system.

**Architecture:** Update Tailwind component wrappers, border tokens, and chip backgrounds.

---

### Task 1: Refine About Section
- Modify `src/components/sections/about.tsx`
- Add `src/components/sections/about.test.tsx`

### Task 2: Refine Technical Expertise Section
- Modify `src/components/sections/technical-expertise.tsx`
- Add `src/components/sections/technical-expertise.test.tsx`

### Task 3: Refine Journey Timeline Section
- Modify `src/components/sections/journey-timeline.tsx`
- Add `src/components/sections/journey-timeline.test.tsx`

### Task 4: Local Preview & Build Verification
- Execute `npm run test`, `npx eslint src/`, `npm run build`

### Task 5: Cloudflare Deployment
- Execute `npm run deploy` to publish update to Cloudflare Workers
