import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCard } from './project-card'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('ProjectCard / ProjectRow', () => {
  const project = SHOWCASE_PROJECTS[0]

  it('renders row with project details, index number, domain, and external link attributes', () => {
    render(<ProjectCard project={project} index={0} />)

    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText(project.title)).toBeDefined()
    expect(screen.getByText(project.description)).toBeDefined()
    expect(screen.getByText(project.displayDomain)).toBeDefined()
    expect(screen.getByText('Online')).toBeDefined()

    const link = screen.getByTestId(`project-card-${project.id}`)
    expect(link.getAttribute('href')).toBe(project.url)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
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

  it('triggers onHover and onMouseMove callbacks during mouse interactions', () => {
    const onHover = vi.fn()
    const onMouseMove = vi.fn()
    const onLeave = vi.fn()

    render(
      <ProjectCard
        project={project}
        index={0}
        onHover={onHover}
        onMouseMove={onMouseMove}
        onLeave={onLeave}
      />
    )

    const row = screen.getByTestId(`project-card-${project.id}`)

    fireEvent.mouseEnter(row, { clientX: 100, clientY: 200 })
    expect(onHover).toHaveBeenCalledTimes(1)
    expect(onHover).toHaveBeenCalledWith(project, expect.anything())

    fireEvent.mouseMove(row, { clientX: 120, clientY: 220 })
    expect(onMouseMove).toHaveBeenCalledTimes(1)

    fireEvent.mouseLeave(row)
    expect(onLeave).toHaveBeenCalledTimes(1)
  })

  it('renders a mobile-only preview button with Eye icon', () => {
    render(<ProjectCard project={project} index={0} />)

    const previewBtn = screen.getByRole('button', { name: new RegExp(`Preview ${project.shortTitle || project.title}`, 'i') })
    expect(previewBtn).toBeDefined()
    expect(previewBtn.className).toContain('md:hidden')
  })

  it('triggers onPreview callback and prevents navigation when mobile preview button is clicked', () => {
    const onPreview = vi.fn()
    render(<ProjectCard project={project} index={0} onPreview={onPreview} />)

    const previewBtn = screen.getByRole('button', { name: new RegExp(`Preview ${project.shortTitle || project.title}`, 'i') })
    fireEvent.click(previewBtn)

    expect(onPreview).toHaveBeenCalledTimes(1)
    expect(onPreview).toHaveBeenCalledWith(project)
  })

  it('triggers onPreview callback when Enter or Space is pressed on mobile preview button', () => {
    const onPreview = vi.fn()
    render(<ProjectCard project={project} index={0} onPreview={onPreview} />)

    const previewBtn = screen.getByRole('button', { name: new RegExp(`Preview ${project.shortTitle || project.title}`, 'i') })
    fireEvent.keyDown(previewBtn, { key: 'Enter' })
    expect(onPreview).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(previewBtn, { key: ' ' })
    expect(onPreview).toHaveBeenCalledTimes(2)
  })
})
