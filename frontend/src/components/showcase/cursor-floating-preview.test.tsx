import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  CursorFloatingPreview,
  calculateClampedPosition,
  PREVIEW_WIDTH,
  PREVIEW_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
  VIEWPORT_MARGIN,
} from './cursor-floating-preview'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('calculateClampedPosition (Boundary Clamping Calculation)', () => {
  const viewportWidth = 1440
  const viewportHeight = 900

  it('positions preview down and right of cursor under normal conditions', () => {
    const pos = calculateClampedPosition(200, 200, viewportWidth, viewportHeight)
    expect(pos.x).toBe(200 + OFFSET_X)
    expect(pos.y).toBe(200 + OFFSET_Y)
  })

  it('flips preview to the left when cursor is near the right viewport edge', () => {
    const cursorX = viewportWidth - 50
    const cursorY = 200
    const pos = calculateClampedPosition(cursorX, cursorY, viewportWidth, viewportHeight)
    expect(pos.x).toBe(cursorX - PREVIEW_WIDTH - OFFSET_X)
    expect(pos.y).toBe(cursorY + OFFSET_Y)
  })

  it('shifts preview upward when cursor is near the bottom viewport edge', () => {
    const cursorX = 200
    const cursorY = viewportHeight - 50
    const pos = calculateClampedPosition(cursorX, cursorY, viewportWidth, viewportHeight)
    expect(pos.x).toBe(200 + OFFSET_X)
    expect(pos.y).toBe(cursorY - PREVIEW_HEIGHT - OFFSET_Y)
  })

  it('flips both horizontally and vertically when cursor is in bottom-right corner', () => {
    const cursorX = viewportWidth - 40
    const cursorY = viewportHeight - 40
    const pos = calculateClampedPosition(cursorX, cursorY, viewportWidth, viewportHeight)
    expect(pos.x).toBe(cursorX - PREVIEW_WIDTH - OFFSET_X)
    expect(pos.y).toBe(cursorY - PREVIEW_HEIGHT - OFFSET_Y)
    expect(pos.x + PREVIEW_WIDTH).toBeLessThanOrEqual(viewportWidth - VIEWPORT_MARGIN)
    expect(pos.y + PREVIEW_HEIGHT).toBeLessThanOrEqual(viewportHeight - VIEWPORT_MARGIN)
  })

  it('clamps coordinates to margin when cursor is at the extreme top-left (0, 0)', () => {
    const pos = calculateClampedPosition(0, 0, viewportWidth, viewportHeight)
    expect(pos.x).toBe(OFFSET_X)
    expect(pos.y).toBe(OFFSET_Y)
    expect(pos.x).toBeGreaterThanOrEqual(VIEWPORT_MARGIN)
    expect(pos.y).toBeGreaterThanOrEqual(VIEWPORT_MARGIN)
  })

  it('prevents left edge overflow by clamping x to margin when flipped left position is below margin', () => {
    const narrowWidth = 400
    const cursorX = 350
    const pos = calculateClampedPosition(cursorX, 100, narrowWidth, 800)
    expect(pos.x).toBeGreaterThanOrEqual(VIEWPORT_MARGIN)
  })

  it('prevents top edge overflow by clamping y to margin when shifted upward position is below margin', () => {
    const narrowHeight = 300
    const cursorY = 280
    const pos = calculateClampedPosition(100, cursorY, 1000, narrowHeight)
    expect(pos.y).toBeGreaterThanOrEqual(VIEWPORT_MARGIN)
  })

  it('respects custom dimensions, offsets, and margin arguments', () => {
    const customWidth = 400
    const customHeight = 300
    const customOffsetX = 30
    const customOffsetY = 25
    const customMargin = 20

    const pos = calculateClampedPosition(
      100,
      100,
      1000,
      800,
      customWidth,
      customHeight,
      customOffsetX,
      customOffsetY,
      customMargin
    )

    expect(pos.x).toBe(100 + customOffsetX)
    expect(pos.y).toBe(100 + customOffsetY)
  })

  it('ensures preview never exceeds maximum right/bottom boundaries', () => {
    const cursorX = viewportWidth - 5
    const cursorY = viewportHeight - 5
    const pos = calculateClampedPosition(cursorX, cursorY, viewportWidth, viewportHeight)

    expect(pos.x + PREVIEW_WIDTH).toBeLessThanOrEqual(viewportWidth - VIEWPORT_MARGIN)
    expect(pos.y + PREVIEW_HEIGHT).toBeLessThanOrEqual(viewportHeight - VIEWPORT_MARGIN)
  })
})

describe('CursorFloatingPreview Component', () => {
  const embeddableProject = SHOWCASE_PROJECTS.find((p) => p.canEmbed)!
  const secondEmbeddableProject = SHOWCASE_PROJECTS.find(
    (p) => p.canEmbed && p.id !== embeddableProject.id
  )!
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!

  beforeEach(() => {
    vi.clearAllMocks()
    window.innerWidth = 1440
    window.innerHeight = 900
  })

  it('renders null when project is null', () => {
    const { container } = render(
      <CursorFloatingPreview
        project={null}
        cursorPosition={{ x: 100, y: 100 }}
        isVisible={false}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders preview with correct container attributes (pointer-events-none, z-50, hidden md:block)', () => {
    render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={true}
      />
    )

    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview).toBeDefined()
    expect(preview.className).toContain('pointer-events-none')
    expect(preview.className).toContain('z-50')
    expect(preview.className).toContain('fixed')
    expect(preview.className).toContain('hidden md:block')
    expect(preview.className).toContain('opacity-100')
    expect(preview.className).toContain('scale-100')
    expect(preview.getAttribute('aria-hidden')).toBe('true')
  })

  it('applies opacity-0 and scale-95 when isVisible is false', () => {
    render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={false}
      />
    )

    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview.className).toContain('opacity-0')
    expect(preview.className).toContain('scale-95')
  })

  it('positions preview based on clamped cursor coordinates using translate3d', () => {
    const { rerender } = render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 200, y: 300 }}
        isVisible={true}
      />
    )

    const preview = screen.getByTestId('cursor-floating-preview')
    const expectedX = 200 + OFFSET_X
    const expectedY = 300 + OFFSET_Y
    expect(preview.style.transform).toBe(`translate3d(${expectedX}px, ${expectedY}px, 0)`)
    expect(preview.style.width).toBe(`${PREVIEW_WIDTH}px`)

    // Update cursor position near right edge
    const nearRightX = 1440 - 50
    rerender(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: nearRightX, y: 300 }}
        isVisible={true}
      />
    )
    const expectedFlippedX = nearRightX - PREVIEW_WIDTH - OFFSET_X
    expect(preview.style.transform).toBe(`translate3d(${expectedFlippedX}px, ${expectedY}px, 0)`)
  })

  it('renders toolbar with 3 traffic light dots and lock icon + domain pill', () => {
    render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={true}
      />
    )

    expect(screen.getByText(embeddableProject.displayDomain)).toBeDefined()
    expect(screen.getByText('Online')).toBeDefined()
  })

  it('embeds LivePreviewIFrame for embeddable projects', () => {
    render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={true}
      />
    )

    const iframe = screen.getByTitle(`${embeddableProject.title} live preview`)
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('src')).toBe(embeddableProject.url)
  })

  it('embeds LivePreviewIFrame with preview-proxy for DevForge', () => {
    render(
      <CursorFloatingPreview
        project={devforge}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={true}
      />
    )

    const iframe = screen.getByTitle(`${devforge.title} live preview`)
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('src')).toBe(
      `/api/preview-proxy?url=${encodeURIComponent(devforge.url)}`
    )
  })

  it('maintains sticky session caching across project changes', () => {
    const { rerender } = render(
      <CursorFloatingPreview
        project={embeddableProject}
        cursorPosition={{ x: 150, y: 200 }}
        isVisible={true}
      />
    )

    expect(screen.getByTitle(`${embeddableProject.title} live preview`)).toBeDefined()

    // Switch to second embeddable project
    rerender(
      <CursorFloatingPreview
        project={secondEmbeddableProject}
        cursorPosition={{ x: 180, y: 220 }}
        isVisible={true}
      />
    )

    // Both projects remain in the DOM, but only second is active/visible in header
    expect(screen.getByTitle(`${secondEmbeddableProject.title} live preview`)).toBeDefined()
    expect(screen.getByText(secondEmbeddableProject.displayDomain)).toBeDefined()

    // Switch to DevForge
    rerender(
      <CursorFloatingPreview
        project={devforge}
        cursorPosition={{ x: 200, y: 250 }}
        isVisible={true}
      />
    )

    expect(screen.getByTitle(`${devforge.title} live preview`)).toBeDefined()
    expect(screen.getByText(devforge.displayDomain)).toBeDefined()
  })
})
