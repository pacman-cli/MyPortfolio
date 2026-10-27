import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  ProjectRowItem,
  ProjectRow,
  ProjectCard,
} from './project-row-item'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('ProjectRowItem Component', () => {
  it('exports ProjectRowItem, ProjectRow, and ProjectCard as identical component references', () => {
    expect(ProjectRowItem).toBe(ProjectCard)
    expect(ProjectRow).toBe(ProjectCard)
  })

  describe('Row rendering for all 7 showcase projects', () => {
    SHOWCASE_PROJECTS.forEach((project, index) => {
      const expectedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

      it(`renders project ${expectedIndex} (${project.shortTitle}) with title, tech tags, domain, and external link`, () => {
        render(<ProjectRowItem project={project} index={index} />)

        // Formatted index number
        expect(screen.getByText(expectedIndex)).toBeDefined()

        // Project title & description
        expect(screen.getByText(project.title)).toBeDefined()
        expect(screen.getByText(project.description)).toBeDefined()

        // Domain pill
        expect(screen.getByText(project.displayDomain)).toBeDefined()

        // Online status indicator
        expect(screen.getByText('Online')).toBeDefined()

        // Tech stack tags
        project.techStack.forEach((tech) => {
          expect(screen.getByText(tech)).toBeDefined()
        })

        // External link attributes
        const rowLink = screen.getByTestId(`project-card-${project.id}`)
        expect(rowLink.getAttribute('href')).toBe(project.url)
        expect(rowLink.getAttribute('target')).toBe('_blank')
        expect(rowLink.getAttribute('rel')).toContain('noopener')
        expect(rowLink.getAttribute('rel')).toContain('noreferrer')
      })
    })
  })

  it('formats index correctly when index is 9 (displays "10")', () => {
    render(<ProjectRowItem project={SHOWCASE_PROJECTS[0]} index={9} />)
    expect(screen.getByText('10')).toBeDefined()
  })

  describe('Mouse hover and movement interactions', () => {
    const project = SHOWCASE_PROJECTS[0]

    it('triggers onHover with project object and mouse event on mouseEnter', () => {
      const onHover = vi.fn()
      render(<ProjectRowItem project={project} index={0} onHover={onHover} />)

      const row = screen.getByTestId(`project-card-${project.id}`)
      fireEvent.mouseEnter(row, { clientX: 250, clientY: 350 })

      expect(onHover).toHaveBeenCalledTimes(1)
      expect(onHover).toHaveBeenCalledWith(project, expect.anything())
    })

    it('triggers onMouseMove callback with event coordinates', () => {
      const onMouseMove = vi.fn()
      render(
        <ProjectRowItem
          project={project}
          index={0}
          onMouseMove={onMouseMove}
        />
      )

      const row = screen.getByTestId(`project-card-${project.id}`)
      fireEvent.mouseMove(row, { clientX: 300, clientY: 400 })

      expect(onMouseMove).toHaveBeenCalledTimes(1)
      expect(onMouseMove).toHaveBeenCalledWith(expect.anything())
    })

    it('triggers onLeave callback on mouseLeave', () => {
      const onLeave = vi.fn()
      render(<ProjectRowItem project={project} index={0} onLeave={onLeave} />)

      const row = screen.getByTestId(`project-card-${project.id}`)
      fireEvent.mouseLeave(row)

      expect(onLeave).toHaveBeenCalledTimes(1)
    })

    it('handles mouse events gracefully when optional callbacks are undefined', () => {
      render(<ProjectRowItem project={project} index={0} />)

      const row = screen.getByTestId(`project-card-${project.id}`)
      expect(() => {
        fireEvent.mouseEnter(row, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(row, { clientX: 150, clientY: 150 })
        fireEvent.mouseLeave(row)
      }).not.toThrow()
    })
  })
})
