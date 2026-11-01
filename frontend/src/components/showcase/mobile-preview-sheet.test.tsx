// src/components/showcase/mobile-preview-sheet.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MobilePreviewSheet } from './mobile-preview-sheet'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('MobilePreviewSheet Component', () => {
  const project = SHOWCASE_PROJECTS[0] // Marketrix (canEmbed: true)
  const blockedProject = SHOWCASE_PROJECTS[6] // DevForge (canEmbed: false)

  beforeEach(() => {
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders nothing when project is null or undefined', () => {
    const { container } = render(
      <MobilePreviewSheet project={null} onClose={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders dialog with title, domain, close button, and live preview iframe when project is provided', () => {
    render(<MobilePreviewSheet project={project} onClose={vi.fn()} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.getAttribute('aria-label')).toContain(project.title)

    // Domain display
    expect(screen.getByText(project.displayDomain)).toBeDefined()

    // Title
    expect(screen.getByText(project.title)).toBeDefined()

    // Status pill
    expect(screen.getByText('Online')).toBeDefined()

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close preview/i })
    expect(closeBtn).toBeDefined()

    // Live preview iframe container
    const iframe = screen.getByTestId(`live-preview-iframe-${project.id}`)
    expect(iframe).toBeDefined()

    // External visit button in footer
    const visitLink = screen.getByRole('link', { name: /Open Live Website/i })
    expect(visitLink.getAttribute('href')).toBe(project.url)
    expect(visitLink.getAttribute('target')).toBe('_blank')
    expect(visitLink.getAttribute('rel')).toContain('noopener')
  })

  it('renders BlockedEmbedCard when project.canEmbed is false', () => {
    render(<MobilePreviewSheet project={blockedProject} onClose={vi.fn()} />)

    expect(screen.getByTestId(`blocked-embed-card-${blockedProject.id}`)).toBeDefined()
  })

  it('locks document.body overflow when open and unlocks on unmount', () => {
    const { unmount } = render(
      <MobilePreviewSheet project={project} onClose={vi.fn()} />
    )
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    const closeBtn = screen.getByRole('button', { name: /Close preview/i })
    fireEvent.click(closeBtn)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop overlay is clicked', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    const backdrop = screen.getByTestId('mobile-preview-backdrop')
    fireEvent.click(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<MobilePreviewSheet project={project} onClose={onClose} />)

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders all tech stack tags inside footer area', () => {
    render(<MobilePreviewSheet project={project} onClose={vi.fn()} />)

    project.techStack.forEach((tech) => {
      expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1)
    })
  })
})
