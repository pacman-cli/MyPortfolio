import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { ProjectsShowcase } from './projects-showcase'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'
import {
  PREVIEW_WIDTH,
  PREVIEW_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
} from './cursor-floating-preview'

describe('ProjectsShowcase Section', () => {
  beforeEach(() => {
    window.innerWidth = 1440
    window.innerHeight = 900
  })

  it('renders section element with id="projects" and scroll-mt-24', () => {
    const { container } = render(<ProjectsShowcase />)
    const section = container.querySelector('section#projects')
    expect(section).toBeDefined()
    expect(section?.classList.contains('scroll-mt-24')).toBe(true)
  })

  it('matches max-w-4xl container layout with border-b header and uppercase font-mono title', () => {
    const { container } = render(<ProjectsShowcase />)
    const maxWidthContainer = container.querySelector('.max-w-4xl.mx-auto.px-6')
    expect(maxWidthContainer).toBeDefined()

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Interactive Projects Showcase/i,
    })
    expect(heading).toBeDefined()
    expect(heading.className).toContain('uppercase')
    expect(heading.className).toContain('font-mono')
    expect(heading.className).toContain('text-xs')

    const viewAllLink = screen.getByRole('link', { name: /View all/i })
    expect(viewAllLink.getAttribute('href')).toBe('/projects')
  })

  describe('Row rendering for all 7 projects with title, tech tags, domain, and external link', () => {
    it('renders exactly 7 project rows in a space-y-3 vertical list', () => {
      const { container } = render(<ProjectsShowcase />)
      const listContainer = container.querySelector('.space-y-3')
      expect(listContainer).toBeDefined()
      expect(SHOWCASE_PROJECTS).toHaveLength(7)

      SHOWCASE_PROJECTS.forEach((project, index) => {
        const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`
        const row = screen.getByTestId(`project-card-${project.id}`)
        expect(row).toBeDefined()

        // Index
        expect(screen.getByText(formattedIndex)).toBeDefined()

        // Title and description
        expect(screen.getByText(project.title)).toBeDefined()
        expect(screen.getByText(project.description)).toBeDefined()

        // Domain
        expect(screen.getAllByText(project.displayDomain).length).toBeGreaterThanOrEqual(1)

        // All tech tags for this project
        project.techStack.forEach((tech) => {
          expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1)
        })

        // External link attributes
        expect(row.getAttribute('href')).toBe(project.url)
        expect(row.getAttribute('target')).toBe('_blank')
        expect(row.getAttribute('rel')).toContain('noopener')
        expect(row.getAttribute('rel')).toContain('noreferrer')
      })
    })
  })

  describe('Mouse hover activation of cursor preview', () => {
    it('activates cursor floating preview on row hover, tracks mouse moves, and hides on leave', () => {
      render(<ProjectsShowcase />)
      const firstProject = SHOWCASE_PROJECTS[0]
      const row = screen.getByTestId(`project-card-${firstProject.id}`)

      // Hover over row with cursor coordinates
      fireEvent.mouseEnter(row, { clientX: 300, clientY: 400 })

      const preview = screen.getByTestId('cursor-floating-preview')
      expect(preview).toBeDefined()
      expect(preview.className).toContain('opacity-100')
      expect(preview.className).toContain('scale-100')
      expect(preview.style.transform).toBe(
        `translate3d(${300 + OFFSET_X}px, ${400 + OFFSET_Y}px, 0)`
      )

      // Mouse move updates coordinates
      fireEvent.mouseMove(row, { clientX: 350, clientY: 450 })
      expect(preview.className).toContain('opacity-100')
      expect(preview.style.transform).toBe(
        `translate3d(${350 + OFFSET_X}px, ${450 + OFFSET_Y}px, 0)`
      )

      // Mouse leaves row
      fireEvent.mouseLeave(row)
      expect(preview.className).toContain('opacity-0')
      expect(preview.className).toContain('scale-95')
    })

    it('switches active project in preview when hovering between different rows', () => {
      render(<ProjectsShowcase />)
      const project1 = SHOWCASE_PROJECTS[0]
      const project2 = SHOWCASE_PROJECTS[1]

      const row1 = screen.getByTestId(`project-card-${project1.id}`)
      const row2 = screen.getByTestId(`project-card-${project2.id}`)

      // Hover first project
      fireEvent.mouseEnter(row1, { clientX: 200, clientY: 200 })
      const preview = screen.getByTestId('cursor-floating-preview')
      expect(preview.className).toContain('opacity-100')
      expect(screen.getByTitle(`${project1.title} live preview`)).toBeDefined()

      // Move to second project
      fireEvent.mouseLeave(row1)
      fireEvent.mouseEnter(row2, { clientX: 250, clientY: 350 })
      expect(screen.getByTitle(`${project2.title} live preview`)).toBeDefined()
    })
  })

  describe('Boundary clamping calculation during hover and mouse moves', () => {
    it('applies horizontal flip when cursor is near the right edge of viewport', () => {
      render(<ProjectsShowcase />)
      const row = screen.getByTestId(`project-card-${SHOWCASE_PROJECTS[0].id}`)
      const nearRightX = 1440 - 50

      fireEvent.mouseEnter(row, { clientX: nearRightX, clientY: 200 })
      const preview = screen.getByTestId('cursor-floating-preview')
      const expectedX = nearRightX - PREVIEW_WIDTH - OFFSET_X
      const expectedY = 200 + OFFSET_Y

      expect(preview.style.transform).toBe(`translate3d(${expectedX}px, ${expectedY}px, 0)`)
    })

    it('applies vertical flip when cursor is near the bottom edge of viewport', () => {
      render(<ProjectsShowcase />)
      const row = screen.getByTestId(`project-card-${SHOWCASE_PROJECTS[0].id}`)
      const nearBottomY = 900 - 50

      fireEvent.mouseEnter(row, { clientX: 200, clientY: nearBottomY })
      const preview = screen.getByTestId('cursor-floating-preview')
      const expectedX = 200 + OFFSET_X
      const expectedY = nearBottomY - PREVIEW_HEIGHT - OFFSET_Y

      expect(preview.style.transform).toBe(`translate3d(${expectedX}px, ${expectedY}px, 0)`)
    })

    it('applies both horizontal and vertical flip when cursor is in bottom-right corner', () => {
      render(<ProjectsShowcase />)
      const row = screen.getByTestId(`project-card-${SHOWCASE_PROJECTS[0].id}`)
      const cornerX = 1440 - 40
      const cornerY = 900 - 40

      fireEvent.mouseEnter(row, { clientX: cornerX, clientY: cornerY })
      const preview = screen.getByTestId('cursor-floating-preview')
      const expectedX = cornerX - PREVIEW_WIDTH - OFFSET_X
      const expectedY = cornerY - PREVIEW_HEIGHT - OFFSET_Y

      expect(preview.style.transform).toBe(`translate3d(${expectedX}px, ${expectedY}px, 0)`)
    })
  })

  describe('DevForge BlockedEmbedCard fallback', () => {
    it('renders BlockedEmbedCard instead of iframe when hovering over DevForge row', () => {
      render(<ProjectsShowcase />)
      const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!
      expect(devforge).toBeDefined()
      expect(devforge.canEmbed).toBe(false)

      const devforgeRow = screen.getByTestId(`project-card-devforge`)
      fireEvent.mouseEnter(devforgeRow, { clientX: 300, clientY: 300 })

      // Preview is active
      const preview = screen.getByTestId('cursor-floating-preview')
      expect(preview.className).toContain('opacity-100')

      // BlockedEmbedCard elements are visible inside the preview
      expect(within(preview).getByText(/Embed Protected by Host/i)).toBeDefined()
      expect(
        within(preview).getByRole('heading', { level: 4, name: /DevForge Workspace/i, hidden: true })
      ).toBeDefined()
      expect(within(preview).getAllByText(/Zero Latency/i).length).toBeGreaterThanOrEqual(1)
      expect(within(preview).getByText('JSON Formatter')).toBeDefined()
      expect(within(preview).getByText('JWT Inspector')).toBeDefined()
      expect(within(preview).getByText('UUID Generator')).toBeDefined()
      expect(within(preview).getByText('Regex Tester')).toBeDefined()
      expect(within(preview).getByText('Standalone App')).toBeDefined()

      // Launch button exists pointing to DevForge live URL
      const launchLink = within(preview).getByRole('link', { name: /Launch DevForge/i, hidden: true })
      expect(launchLink).toBeDefined()
      expect(launchLink.getAttribute('href')).toBe('https://devforge.puspo.online')
      expect(launchLink.getAttribute('target')).toBe('_blank')
      expect(launchLink.getAttribute('rel')).toContain('noopener')

      // No iframe is rendered for DevForge
      expect(screen.queryByTitle(`${devforge.title} live preview`)).toBeNull()
    })
  })
})
