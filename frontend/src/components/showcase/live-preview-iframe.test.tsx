import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { LivePreviewIFrame } from './live-preview-iframe'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('LivePreviewIFrame', () => {
  const embeddableProject = SHOWCASE_PROJECTS[0]
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders default placeholder state when not active', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={false} />)
    expect(screen.getByText(/Hover to preview/i)).toBeDefined()
    expect(screen.queryByTitle(`${embeddableProject.title} live preview`)).toBeNull()
  })

  it('renders iframe when active for embeddable project with security sandbox and a11y', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={true} />)
    const iframe = screen.getByTitle(`${embeddableProject.title} live preview`)
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('src')).toBe(embeddableProject.url)
    expect(iframe.getAttribute('loading')).toBe('lazy')
    expect(iframe.getAttribute('tabindex')).toBe('-1')
    expect(iframe.getAttribute('aria-hidden')).toBe('false')
    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts allow-same-origin allow-forms')
    expect(iframe.getAttribute('allow')).toBe("autoplay 'none'; camera 'none'; microphone 'none'; geolocation 'none'")
  })

  it('renders BlockedEmbedCard when project.canEmbed is false even if active', () => {
    render(<LivePreviewIFrame project={devforge} isActive={true} />)
    expect(screen.getByText(/Embed Protected by Host/i)).toBeDefined()
    expect(screen.queryByTitle(`${devforge.title} live preview`)).toBeNull()
  })

  it('shows connecting state while active and iframe is loading, then reveals iframe after load', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={true} />)
    expect(screen.getByText(/Connecting live site\.\.\./i)).toBeDefined()

    const iframe = screen.getByTitle(`${embeddableProject.title} live preview`)
    fireEvent.load(iframe)

    // After loading, connecting text is no longer shown
    expect(screen.queryByText(/Connecting live site\.\.\./i)).toBeNull()
  })

  it('transitions out of loading state via 8s fallback timeout if onLoad does not fire', () => {
    render(<LivePreviewIFrame project={embeddableProject} isActive={true} />)
    expect(screen.getByText(/Connecting live site\.\.\./i)).toBeDefined()

    // Fast-forward 8 seconds
    act(() => {
      vi.advanceTimersByTime(8000)
    })

    // Fallback timer fired, so connecting state is removed
    expect(screen.queryByText(/Connecting live site\.\.\./i)).toBeNull()
  })

  it('maintains sticky session cache so iframe remains mounted when deactivated', () => {
    const { rerender } = render(<LivePreviewIFrame project={embeddableProject} isActive={false} />)
    expect(screen.queryByTitle(`${embeddableProject.title} live preview`)).toBeNull()

    // Activate preview
    rerender(<LivePreviewIFrame project={embeddableProject} isActive={true} />)
    expect(screen.getByTitle(`${embeddableProject.title} live preview`)).toBeDefined()

    // Deactivate preview
    rerender(<LivePreviewIFrame project={embeddableProject} isActive={false} />)
    // Iframe must still be in the DOM (sticky session cache)
    const iframe = screen.getByTitle(`${embeddableProject.title} live preview`)
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('aria-hidden')).toBe('true')
  })
})
