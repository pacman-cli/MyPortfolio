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
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!

  it('renders card with project details, index number, and visit link', () => {
    render(<ProjectCard project={project} index={0} />)
    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText(project.title)).toBeDefined()
    expect(screen.getByText(project.description)).toBeDefined()
    expect(screen.getAllByText(project.displayDomain)).toHaveLength(2)

    const visitLink = screen.getByRole('link', {
      name: new RegExp(`Visit ${project.title} live website`, 'i'),
    })
    expect(visitLink.getAttribute('href')).toBe(project.url)
    expect(visitLink.getAttribute('target')).toBe('_blank')
    expect(visitLink.getAttribute('rel')).toContain('noopener')
  })

  it('formats index correctly when index is 9 (displays "10")', () => {
    render(<ProjectCard project={project} index={9} />)
    expect(screen.getByText('10')).toBeDefined()
  })

  it('renders all tech stack badges', () => {
    render(<ProjectCard project={project} index={0} />)
    project.techStack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeDefined()
    })
  })

  it('activates preview after hover intent delay (200ms)', () => {
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

  it('cancels hover intent if cursor leaves before 200ms delay elapses', () => {
    render(<ProjectCard project={project} index={0} />)
    const card = screen.getByTestId(`project-card-${project.id}`)

    fireEvent.mouseEnter(card)
    act(() => {
      vi.advanceTimersByTime(100)
    })
    fireEvent.mouseLeave(card)

    // Fast-forward remaining time
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(screen.queryByTitle(`${project.title} live preview`)).toBeNull()
  })

  it('deactivates preview on mouse leave after being active', () => {
    render(<ProjectCard project={project} index={0} />)
    const card = screen.getByTestId(`project-card-${project.id}`)

    fireEvent.mouseEnter(card)
    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(screen.getByTitle(`${project.title} live preview`)).toBeDefined()

    fireEvent.mouseLeave(card)
    // Although iframe is cached in DOM, BrowserWindow receives isActive=false and card ring is removed
    expect(card.className).not.toContain('ring-1')
  })

  it('activates on focus and deactivates on blur', () => {
    render(<ProjectCard project={project} index={0} />)
    const card = screen.getByTestId(`project-card-${project.id}`)

    fireEvent.focus(card)
    expect(card.className).toContain('ring-1')
    expect(screen.getByTitle(`${project.title} live preview`)).toBeDefined()

    fireEvent.blur(card)
    expect(card.className).not.toContain('ring-1')
  })

  it('toggles preview when mobile toggle button is clicked', () => {
    render(<ProjectCard project={project} index={0} />)
    const toggleButton = screen.getByRole('button', { name: /open live preview/i })

    // Click toggle to activate
    fireEvent.click(toggleButton)
    expect(screen.getByTitle(`${project.title} live preview`)).toBeDefined()

    // Click toggle to deactivate
    const closeButton = screen.getByRole('button', { name: /close live preview/i })
    fireEvent.click(closeButton)
    const card = screen.getByTestId(`project-card-${project.id}`)
    expect(card.className).not.toContain('ring-1')
  })

  it('handles non-embeddable project by displaying BlockedEmbedCard when activated', () => {
    render(<ProjectCard project={devforge} index={1} />)
    const card = screen.getByTestId(`project-card-${devforge.id}`)

    fireEvent.mouseEnter(card)
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(screen.getByText(/Embed Protected by Host/i)).toBeDefined()
    expect(screen.queryByTitle(`${devforge.title} live preview`)).toBeNull()
  })
})
