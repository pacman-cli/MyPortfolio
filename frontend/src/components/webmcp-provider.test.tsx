import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { WebMCPProvider } from './webmcp-provider'

// Mock navigator.modelContext
const mockProvideContext = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  // Reset the mock
  Object.defineProperty(navigator, 'modelContext', {
    value: undefined,
    writable: true,
    configurable: true,
  })
})

afterEach(() => {
  cleanup()
})

describe('WebMCPProvider', () => {
  it('renders nothing (null)', () => {
    const { container } = render(<WebMCPProvider />)
    expect(container.firstChild).toBeNull()
  })

  it('does not call provideContext when modelContext is not available', () => {
    render(<WebMCPProvider />)
    expect(mockProvideContext).not.toHaveBeenCalled()
  })

  it('calls provideContext when modelContext is available', () => {
    // Mock modelContext
    Object.defineProperty(navigator, 'modelContext', {
      value: {
        provideContext: mockProvideContext,
      },
      writable: true,
      configurable: true,
    })

    render(<WebMCPProvider />)
    
    expect(mockProvideContext).toHaveBeenCalledWith(
      expect.objectContaining({
        tools: expect.arrayContaining([
          expect.objectContaining({
            name: 'getProfileInfo',
            description: expect.any(String),
            inputSchema: expect.any(Object),
            execute: expect.any(Function),
          }),
        ]),
      })
    )
  })

  it('registers 8 tools', () => {
    // Mock modelContext
    Object.defineProperty(navigator, 'modelContext', {
      value: {
        provideContext: mockProvideContext,
      },
      writable: true,
      configurable: true,
    })

    render(<WebMCPProvider />)
    
    const callArgs = mockProvideContext.mock.calls[0][0]
    expect(callArgs.tools).toHaveLength(8)
  })

  it('includes all expected tool names', () => {
    // Mock modelContext
    Object.defineProperty(navigator, 'modelContext', {
      value: {
        provideContext: mockProvideContext,
      },
      writable: true,
      configurable: true,
    })

    render(<WebMCPProvider />)
    
    const callArgs = mockProvideContext.mock.calls[0][0]
    const toolNames = callArgs.tools.map((tool: { name: string }) => tool.name)
    
    expect(toolNames).toContain('getProfileInfo')
    expect(toolNames).toContain('getProjects')
    expect(toolNames).toContain('getBlogPosts')
    expect(toolNames).toContain('getGalleryPhotos')
    expect(toolNames).toContain('getResume')
    expect(toolNames).toContain('sendContactMessage')
    expect(toolNames).toContain('getSocialLinks')
    expect(toolNames).toContain('getNavigationLinks')
  })

  it('handles provideContext throwing an error gracefully', () => {
    // Mock modelContext that throws
    Object.defineProperty(navigator, 'modelContext', {
      value: {
        provideContext: vi.fn().mockImplementation(() => {
          throw new Error('WebMCP not supported')
        }),
      },
      writable: true,
      configurable: true,
    })

    // Should not throw
    expect(() => {
      render(<WebMCPProvider />)
    }).not.toThrow()
  })
})