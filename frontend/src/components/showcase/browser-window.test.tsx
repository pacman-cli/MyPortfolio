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

  it('displays correct aria-label and title based on isActive state', () => {
    const onToggle = vi.fn()
    const { rerender } = render(
      <BrowserWindow project={project} isActive={false} onTogglePreview={onToggle}>
        <div>Viewport</div>
      </BrowserWindow>
    )

    expect(screen.getByRole('button', { name: /open live preview/i })).toBeDefined()

    rerender(
      <BrowserWindow project={project} isActive={true} onTogglePreview={onToggle}>
        <div>Viewport</div>
      </BrowserWindow>
    )

    expect(screen.getByRole('button', { name: /close live preview/i })).toBeDefined()
  })

  it('renders external link to project url with proper security attributes', () => {
    render(
      <BrowserWindow project={project} isActive={false}>
        <div>Viewport</div>
      </BrowserWindow>
    )

    const link = screen.getByRole('link', { name: new RegExp(`open ${project.title} in a new tab`, 'i') })
    expect(link.getAttribute('href')).toBe(project.url)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('does not render toggle preview button when onTogglePreview is not provided', () => {
    render(
      <BrowserWindow project={project} isActive={false}>
        <div>Viewport</div>
      </BrowserWindow>
    )

    expect(screen.queryByRole('button', { name: /preview/i })).toBeNull()
  })
})
