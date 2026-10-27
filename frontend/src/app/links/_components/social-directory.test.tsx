import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { SocialDirectory, type SocialLinkItem } from './social-directory'

const mockLinks: SocialLinkItem[] = [
  {
    name: 'GitHub',
    handle: '@pacman-cli',
    url: 'https://github.com/pacman-cli',
    description: 'Explore my open-source projects',
    icon: <span>GH</span>,
  },
  {
    name: 'LinkedIn',
    handle: '@iampuspo',
    url: 'https://www.linkedin.com/in/iampuspo/',
    description: 'Connect professionally',
    icon: <span>LI</span>,
  },
]

describe('SocialDirectory Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.innerWidth = 1440
    window.innerHeight = 900
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders social links and handles', () => {
    render(<SocialDirectory socialLinks={mockLinks} />)
    expect(screen.getByText('GitHub')).toBeDefined()
    expect(screen.getByText('@pacman-cli')).toBeDefined()
    expect(screen.getByText('LinkedIn')).toBeDefined()
    expect(screen.getByText('@iampuspo')).toBeDefined()
  })

  it('activates cursor live preview on hover after debounce', () => {
    render(<SocialDirectory socialLinks={mockLinks} />)
    const githubCard = screen.getByTestId('social-link-github')

    fireEvent.mouseEnter(githubCard, { clientX: 300, clientY: 400 })

    // Before debounce
    expect(screen.queryByTitle(/GitHub/i)).toBeNull()

    // Advance 200ms
    act(() => {
      vi.advanceTimersByTime(250)
    })

    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview).toBeDefined()
    expect(screen.getByTitle(/GitHub/i)).toBeDefined()

    // Mouse leave
    fireEvent.mouseLeave(githubCard)
    expect(preview.className).toContain('opacity-0')
  })
})
