import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Backend URL & Fallback Environment Handling', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('uses static blogs directly when BACKEND_URL is undefined in production', async () => {
    delete process.env.BACKEND_URL
    process.env.NODE_ENV = 'production'

    const { getBlogs, getBlogBySlug, getBlogSummaries } = await import('@/lib/api')

    const blogs = await getBlogs()
    expect(blogs.length).toBeGreaterThan(0)
    expect(blogs[0].slug).toBe('llm-deep-thinking')

    const blog = await getBlogBySlug('llm-deep-thinking')
    expect(blog).not.toBeNull()
    expect(blog?.title).toContain('LLM Deep Thinking')

    const summaries = await getBlogSummaries()
    expect(summaries.length).toBe(blogs.length)
    expect((summaries[0] as { content?: string }).content).toBeUndefined()
  })

  it('uses static projects directly when BACKEND_URL is undefined in production', async () => {
    delete process.env.BACKEND_URL
    process.env.NODE_ENV = 'production'

    const { getProjects, getProjectBySlug } = await import('@/lib/projects')

    const projects = await getProjects()
    expect(projects.length).toBeGreaterThan(0)
    expect(projects.some((p) => p.slug === 'takatrack')).toBe(true)

    const project = await getProjectBySlug('takatrack')
    expect(project).not.toBeNull()
    expect(project?.name).toContain('TakaTrack')
  })
})
