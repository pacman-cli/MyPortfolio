import { describe, it, expect } from 'vitest'
import {
  AI_RESOURCES,
  RESOURCE_CATEGORIES,
  AIResourceItem,
  ResourceCategory,
} from './ai-resources'

describe('AI Resources Registry', () => {
  it('defines valid category definitions with all expected category keys', () => {
    const categoryIds = RESOURCE_CATEGORIES.map((c) => c.id)
    expect(categoryIds).toEqual([
      'all',
      'llm-apis',
      'gpu-compute',
      'programs-startups',
      'coding-assistants',
    ])
  })

  it('contains entries across all major categories with no duplicates', () => {
    expect(AI_RESOURCES.length).toBeGreaterThan(50)

    const ids = AI_RESOURCES.map((r) => r.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(AI_RESOURCES.length)

    const names = AI_RESOURCES.map((r) => r.name.toLowerCase())
    const uniqueNames = new Set(names)
    expect(uniqueNames.size).toBe(AI_RESOURCES.length)
  })

  it('validates each resource conforms to the AIResourceItem schema', () => {
    const validCategories: ResourceCategory[] = [
      'llm-apis',
      'gpu-compute',
      'programs-startups',
      'coding-assistants',
    ]

    AI_RESOURCES.forEach((item: AIResourceItem) => {
      expect(item.id.trim()).not.toBe('')
      expect(item.name.trim()).not.toBe('')
      expect(validCategories).toContain(item.category)
      expect(item.summary.trim()).not.toBe('')
      expect(item.freeTierDetails.trim()).not.toBe('')
      expect(item.signupUrl.startsWith('http')).toBe(true)
      expect(typeof item.noCreditCard).toBe('boolean')
      expect(item.bestUseCases.trim()).not.toBe('')
      expect(Array.isArray(item.tags)).toBe(true)
      expect(item.tags.length).toBeGreaterThan(0)
    })
  })

  it('verifies coding assistants have supported IDEs or models', () => {
    const assistants = AI_RESOURCES.filter((r) => r.category === 'coding-assistants')
    expect(assistants.length).toBe(18)
    assistants.forEach((a) => {
      expect(a.supportedIdes || a.models).toBeDefined()
    })
  })

  it('verifies LLM APIs contain model details', () => {
    const llms = AI_RESOURCES.filter((r) => r.category === 'llm-apis')
    expect(llms.length).toBe(26)
    llms.forEach((l) => {
      expect(l.models || l.rateLimits).toBeDefined()
    })
  })

  it('verifies GPU Compute resources contain hardware or compute details', () => {
    const gpus = AI_RESOURCES.filter((r) => r.category === 'gpu-compute')
    expect(gpus.length).toBe(24)
    gpus.forEach((g) => {
      expect(g.freeTierDetails.length).toBeGreaterThan(0)
    })
  })

  it('verifies Programs & Startups resources contain benefits or eligibility', () => {
    const programs = AI_RESOURCES.filter((r) => r.category === 'programs-startups')
    expect(programs.length).toBe(30)
    programs.forEach((p) => {
      expect(p.benefits || p.eligibility).toBeDefined()
    })
  })
})
