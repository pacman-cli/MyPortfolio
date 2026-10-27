import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { RecentBlogs } from './recent-blogs'
import type { Blog } from '@/types'

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: 'LLM Deep Thinking: Architecture & Trade-offs',
    slug: 'llm-deep-thinking',
    excerpt: 'An architectural exploration of test-time compute scaling.',
    content: 'Full content',
    publishedAt: '2026-03-15T00:00:00Z',
    tags: 'AI, Architecture',
  },
  {
    id: 2,
    title: 'Spring Security Architecture on LinkedIn',
    slug: 'spring-security-linkedin',
    excerpt: 'Deep dive into Spring Security 6 stateless JWT authentication.',
    content: 'Full content',
    publishedAt: '2026-02-10T00:00:00Z',
    tags: 'Spring Boot, Security',
    externalUrl: 'https://linkedin.com/pulse/spring-security-puspo',
  },
]

describe('RecentBlogs Section with Cursor Live Preview', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.innerWidth = 1440
    window.innerHeight = 900
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing when blogs array is empty', () => {
    const { container } = render(<RecentBlogs blogs={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders blog items with title, excerpt, date, and external link arrow', () => {
    render(<RecentBlogs blogs={mockBlogs} />)
    expect(screen.getByText('LLM Deep Thinking: Architecture & Trade-offs')).toBeDefined()
    expect(screen.getByText('Spring Security Architecture on LinkedIn')).toBeDefined()
    expect(screen.getByText('External')).toBeDefined()
  })

  it('activates cursor live preview on blog row hover after debounce', () => {
    render(<RecentBlogs blogs={mockBlogs} />)
    const row = screen.getByTestId('blog-row-llm-deep-thinking')

    fireEvent.mouseEnter(row, { clientX: 200, clientY: 250 })

    // Before debounce
    expect(screen.queryByTitle(/LLM Deep Thinking: Architecture & Trade-offs live preview/i)).toBeNull()

    // Advance 200ms debounce
    act(() => {
      vi.advanceTimersByTime(250)
    })

    // Now active
    const preview = screen.getByTestId('cursor-floating-preview')
    expect(preview).toBeDefined()
    expect(screen.getByTitle(/LLM Deep Thinking: Architecture & Trade-offs live preview/i)).toBeDefined()

    // Mouse leaves
    fireEvent.mouseLeave(row)
    expect(preview.className).toContain('opacity-0')
  })
})
