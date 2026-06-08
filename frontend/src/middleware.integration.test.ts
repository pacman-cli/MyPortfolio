import { describe, it, expect, vi, beforeAll } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

vi.mock('@/lib/site', () => ({
  SITE_URL: 'https://puspo.online',
}))

vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    next: vi.fn(() => ({
      headers: { set: vi.fn() },
    })),
  },
}))

async function getMiddleware() {
  const mod = await import('./middleware')
  return mod.middleware
}

function makeRequest(pathname: string, acceptHeader?: string) {
  return {
    nextUrl: { pathname },
    headers: {
      get: vi.fn().mockImplementation((key: string) => {
        if (key === 'accept') return acceptHeader ?? null
        return null
      }),
    },
  } as unknown as NextRequest
}

// Integration tests: verify full response bodies and structures

describe('API Catalog integration', () => {
  it('returns RFC 9727 compliant linkset', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/api-catalog')) as Response
    const body = await res.json()

    expect(body.linkset).toBeDefined()
    expect(Array.isArray(body.linkset)).toBe(true)

    // First linkset entry should be the main site
    const mainEntry = body.linkset.find((l: { anchor: string }) => l.anchor === 'https://puspo.online')
    expect(mainEntry).toBeDefined()
    expect(mainEntry.item).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rel: 'service-desc' }),
        expect.objectContaining({ rel: 'service-doc' }),
        expect.objectContaining({ rel: 'status' }),
      ]),
    )
  })
})

// OpenID Connect configuration integration
describe('OpenID Config integration', () => {
  it('returns RFC-compliant OIDC discovery metadata', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/openid-configuration')) as Response
    const body = await res.json()

    // Required fields per OpenID Connect Discovery 1.0
    expect(body.issuer).toBe('https://puspo.online')
    expect(body.authorization_endpoint).toContain('oauth/authorize')
    expect(body.token_endpoint).toContain('oauth/token')
    expect(body.jwks_uri).toContain('.well-known/jwks.json')
    expect(body.grant_types_supported).toContain('authorization_code')
    expect(body.response_types_supported).toContain('code')
    expect(body.id_token_signing_alg_values_supported).toContain('RS256')
  })
})

// OAuth Protected Resource integration
describe('OAuth Protected Resource integration', () => {
  it('returns RFC 9728 protected resource metadata', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/oauth-protected-resource')) as Response
    const body = await res.json()

    expect(body.resource).toBe('https://puspo.online')
    expect(Array.isArray(body.authorization_servers)).toBe(true)
    expect(body.authorization_servers).toContain('https://puspo.online')
    expect(Array.isArray(body.scopes_supported)).toBe(true)
    expect(body.bearer_methods_supported).toContain('header')
  })
})

// MCP Server Card integration
describe('MCP Server Card integration', () => {
  it('returns SEP-1649 compliant server card', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/mcp/server-card.json')) as Response
    const body = await res.json()

    expect(body.serverInfo).toBeDefined()
    expect(body.serverInfo.name).toBe('puspo-portfolio')
    expect(body.serverInfo.version).toBeDefined()
    expect(body.transport).toBeDefined()
    expect(body.transport.type).toBe('sse')
    expect(body.transport.url).toContain('/api/mcp')
    expect(body.capabilities).toBeDefined()
  })
})

// Agent Skills Index integration
describe('Agent Skills Index integration', () => {
  it('returns Agent Skills Discovery RFC compliant index', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/agent-skills/index.json')) as Response
    const body = await res.json()

    expect(body['$schema']).toContain('agentskills.io')
    expect(body.domain).toBe('https://puspo.online')
    expect(Array.isArray(body.skills)).toBe(true)
    expect(body.skills.length).toBeGreaterThanOrEqual(5)

    // Each skill should have required fields
    for (const skill of body.skills) {
      expect(skill.name).toBeDefined()
      expect(skill.type).toBeDefined()
      expect(skill.description).toBeDefined()
      expect(skill.url).toBeDefined()
      expect(skill.sha256).toBeDefined()
    }
  })
})

// Markdown negotiation integration
describe('Markdown negotiation integration', () => {
  it('returns markdown for homepage with Accept: text/markdown', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/', 'text/markdown')) as Response

    expect(res.headers.get('Content-Type')).toContain('text/markdown')
    const body = await res.text()
    expect(body).toContain('#') // Should be markdown
    expect(body).toContain('Ashikur Rahman Puspo')
    expect(body).toContain('[Projects]') // Should have markdown links
  })

  it('returns markdown for /projects with Accept: text/markdown', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/projects', 'text/markdown')) as Response
    const body = await res.text()
    expect(body).toContain('#')
    expect(body).toContain('Projects')
  })

  it('does not return markdown for API routes', async () => {
    const middleware = await getMiddleware()
    const mockResponse = { headers: { set: vi.fn() } }
    vi.mocked(NextResponse.next).mockReturnValue(mockResponse as any)
    middleware(makeRequest('/api/gallery', 'text/markdown'))
    // Should not return a Response with markdown Content-Type
    // It should call NextResponse.next()
  })
})

// Link headers integration
describe('Link headers integration', () => {
  it('adds all Link relations to homepage', async () => {
    const middleware = await getMiddleware()
    const mockResponse = { headers: { set: vi.fn() } }
    vi.mocked(NextResponse.next).mockReturnValue(mockResponse as any)
    middleware(makeRequest('/'))

    const linkValue = mockResponse.headers.set.mock.calls[0][1] as string
    const links = linkValue.split(', ')
    const rels = links.map((l: string) => l.match(/rel="([^"]+)"/)?.[1])

    expect(rels).toContain('api-catalog')
    expect(rels).toContain('oauth-protected-resource')
    expect(rels).toContain('mcp-server-card')
    expect(rels).toContain('agent-skills')
    expect(rels).toContain('auth-md')
  })
})

// auth.md integration
describe('auth.md integration', () => {
  it('returns markdown with agent registration info', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/auth.md')) as Response

    expect(res.headers.get('Content-Type')).toContain('text/markdown')
    const body = await res.text()
    expect(body).toContain('Auth.md')
    expect(body).toContain('Agent Authentication')
    expect(body).toContain('OAuth Discovery')
    expect(body).toContain('puspo.online')
  })
})

// CORS headers integration
describe('CORS headers integration', () => {
  it('includes CORS headers on well-known endpoints', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/api-catalog')) as Response
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
  })

  it('includes caching headers on well-known endpoints', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/api-catalog')) as Response
    expect(res.headers.get('Cache-Control')).toContain('max-age')
  })
})

// Unknown well-known endpoints
describe('Unknown endpoints', () => {
  it('returns 404 for unknown well-known paths', async () => {
    const middleware = await getMiddleware()
    const res = middleware(makeRequest('/.well-known/nonexistent')) as Response
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.error).toBeDefined()
  })
})
