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
    expect(urls).toContain('https://expense-tracker-seven-chi-92.vercel.app/')
    expect(urls).toContain('https://shelf-to-tales-rho.vercel.app')
    expect(urls).toContain('https://uptime-monitoring-orcin.vercel.app')
    expect(urls).toContain('https://ecommare-medi-frontend.vercel.app')
    expect(urls).toContain('https://stay-mate-puspos-projects.vercel.app')
    expect(urls).toContain('https://devforge.puspo.online')
  })

  it('marks embed-restricted projects as non-embeddable and others as embeddable', () => {
    const nonEmbeddableIds = ['devforge', 'stay-mate', 'shelf-to-tales']
    nonEmbeddableIds.forEach((id) => {
      const proj = SHOWCASE_PROJECTS.find((p) => p.id === id)
      expect(proj).toBeDefined()
      expect(proj?.canEmbed).toBe(false)
    })

    const embeddable = SHOWCASE_PROJECTS.filter((p) => !nonEmbeddableIds.includes(p.id))
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
