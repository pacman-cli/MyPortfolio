// src/components/showcase/blocked-embed-card.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockedEmbedCard } from './blocked-embed-card'
import { SHOWCASE_PROJECTS, type ShowcaseProject } from '@/data/showcase-projects'

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
    expect(launchLink.getAttribute('rel')).toContain('noopener')
  })

  it('renders correctly when project has no highlights', () => {
    const projectWithoutHighlights: ShowcaseProject = {
      ...devforge,
      id: 'custom-blocked',
      title: 'Custom Blocked Project',
      shortTitle: 'Custom Blocked',
      highlights: undefined,
    }
    render(<BlockedEmbedCard project={projectWithoutHighlights} />)
    expect(screen.getByText('Custom Blocked')).toBeDefined()
    expect(screen.getByText(/Embed Protected/i)).toBeDefined()
  })
})
