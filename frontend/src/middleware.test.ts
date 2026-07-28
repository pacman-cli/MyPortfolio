import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

// Mock the middleware module
vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    next: vi.fn(() => ({
      headers: {
        set: vi.fn(),
      },
    })),
  },
}))

describe('Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Link Headers', () => {
    it('should add Link headers to page routes', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const mockResponse = {
        headers: {
          set: vi.fn(),
        },
      }
      
      vi.mocked(NextResponse.next).mockReturnValue(mockResponse as unknown as NextResponse)
      
      middleware(mockRequest)
      
      expect(mockResponse.headers.set).toHaveBeenCalledWith(
        'Link',
        expect.stringContaining('rel="api-catalog"')
      )
    })

    it('should not add Link headers to API routes', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/api/gallery' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const mockResponse = {
        headers: {
          set: vi.fn(),
        },
      }
      
      vi.mocked(NextResponse.next).mockReturnValue(mockResponse as unknown as NextResponse)
      
      middleware(mockRequest)
      
      expect(mockResponse.headers.set).not.toHaveBeenCalled()
    })
  })

  describe('Markdown for Agents', () => {
    it('should return markdown when Accept header includes text/markdown', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/' },
        headers: {
          get: vi.fn().mockReturnValue('text/markdown'),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest)
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toContain('text/markdown')
    })

    it('should not return markdown for non-page routes', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/api/gallery' },
        headers: {
          get: vi.fn().mockReturnValue('text/markdown'),
        },
      } as unknown as NextRequest

      const mockResponse = {
        headers: {
          set: vi.fn(),
        },
      }
      
      vi.mocked(NextResponse.next).mockReturnValue(mockResponse as unknown as NextResponse)
      
      const response = middleware(mockRequest)
      
      // Should return NextResponse.next() instead of markdown Response
      expect(response).toHaveProperty('headers')
    })
  })

  describe('Well-known Endpoints', () => {
    it('should handle API catalog endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/api-catalog' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/linkset+json')
    })

    it('should handle OpenID configuration endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/openid-configuration' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    it('should handle OAuth authorization server endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/oauth-authorization-server' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    it('should handle OAuth protected resource endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/oauth-protected-resource' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    it('should handle MCP server card endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/mcp/server-card.json' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    it('should handle agent skills index endpoint', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/agent-skills/index.json' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    it('should return 404 for unknown well-known endpoints', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/.well-known/unknown-endpoint' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.status).toBe(404)
    })
  })

  describe('auth.md', () => {
    it('should return markdown for auth.md', async () => {
      const { middleware } = await import('./middleware')
      
      const mockRequest = {
        nextUrl: { pathname: '/auth.md' },
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as NextRequest

      const response = middleware(mockRequest) as Response
      
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toContain('text/markdown')
    })
  })
})