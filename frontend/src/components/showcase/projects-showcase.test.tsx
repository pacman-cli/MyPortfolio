import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectsShowcase } from './projects-showcase'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('ProjectsShowcase Section', () => {
  it('renders section header with correct title', () => {
    render(<ProjectsShowcase />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Interactive Projects Showcase/i })
    ).toBeDefined()
  })

  it('renders all 7 project cards in grid', () => {
    render(<ProjectsShowcase />)
    SHOWCASE_PROJECTS.forEach((project) => {
      expect(screen.getByTestId(`project-card-${project.id}`)).toBeDefined()
    })
  })

  it('renders section element with id="projects" and scroll-mt-24', () => {
    const { container } = render(<ProjectsShowcase />)
    const section = container.querySelector('section#projects')
    expect(section).toBeDefined()
    expect(section?.classList.contains('scroll-mt-24')).toBe(true)
  })

  it('renders category badge, subtitle, and link to case studies', () => {
    render(<ProjectsShowcase />)
    expect(screen.getByText(/Interactive Applications/i)).toBeDefined()
    expect(
      screen.getByText(/Hover over any card to launch an interactive live preview/i)
    ).toBeDefined()
    const link = screen.getByRole('link', { name: /View Case Studies & Architecture/i })
    expect(link.getAttribute('href')).toBe('/projects')
  })

  it('renders responsive 3-column grid container', () => {
    const { container } = render(<ProjectsShowcase />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeDefined()
    expect(grid?.className).toContain('grid-cols-1')
    expect(grid?.className).toContain('md:grid-cols-2')
    expect(grid?.className).toContain('lg:grid-cols-3')
  })
})
