import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Footer } from './footer'

describe('Footer with Cursor Live Preview', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.innerWidth = 1440
    window.innerHeight = 900
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders copyright and navigation links', () => {
    render(<Footer />)
    expect(screen.getByText(/MD Ashikur Rahman Puspo/i)).toBeDefined()
    expect(screen.getByText('About Me')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('Blog')).toBeDefined()
    expect(screen.getByText('Gallery')).toBeDefined()
    expect(screen.getByText('Resume')).toBeDefined()
    expect(screen.getByText('Links')).toBeDefined()
  })

  it('activates cursor live preview on footer nav link hover', () => {
    render(<Footer />)
    const aboutLink = screen.getByTestId('footer-nav-about-me')

    fireEvent.mouseEnter(aboutLink, { clientX: 200, clientY: 800 })

    // Before debounce
    expect(screen.queryByTitle(/About Me live preview/i)).toBeNull()

    // Advance 200ms debounce
    act(() => {
      vi.advanceTimersByTime(250)
    })

    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview).toBeDefined()
    expect(screen.getByTitle(/About Me live preview/i)).toBeDefined()

    // Mouse leave
    fireEvent.mouseLeave(aboutLink)
    expect(preview.className).toContain('opacity-0')
  })

  it('activates cursor live preview on social icon hover', () => {
    render(<Footer />)
    const githubLink = screen.getByLabelText('GitHub Profile')

    fireEvent.mouseEnter(githubLink, { clientX: 500, clientY: 800 })

    act(() => {
      vi.advanceTimersByTime(250)
    })

    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview).toBeDefined()
    expect(screen.getByTitle(/GitHub/i)).toBeDefined()
  })
})
