import { NextRequest, NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/site'

/* ------------------------------------------------------------------ */
/*  Link Headers (RFC 8288)                                           */
/* ------------------------------------------------------------------ */

const LINK_HEADER_VALUE = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</auth.md>; rel="auth-md"',
].join(', ')

function addLinkHeaders(response: NextResponse): NextResponse {
  response.headers.set('Link', LINK_HEADER_VALUE)
  return response
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function jsonResponse(data: unknown, contentType: string): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

function isPageRoute(pathname: string): boolean {
  if (pathname.startsWith('/api/')) return false
  if (pathname.startsWith('/_next/')) return false
  if (pathname.startsWith('/.well-known/')) return false
  if (pathname === '/auth.md') return false
  if (pathname === '/robots.txt') return false
  // Exclude static file extensions
  if (/\.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|js|css|json|txt|xml)$/.test(pathname)) return false
  return true
}

/* ------------------------------------------------------------------ */
/*  .well-known Handlers                                              */
/* ------------------------------------------------------------------ */

function handleApiCatalog(): Response {
  return jsonResponse(
    {
      linkset: [
        {
          anchor: SITE_URL,
          item: [
            {
              rel: 'service-desc',
              href: `${SITE_URL}/api/v1`,
              type: 'application/json',
              title: 'Portfolio Backend API',
              'media-type': 'application/json',
            },
            {
              rel: 'service-doc',
              href: `${SITE_URL}/projects`,
              type: 'text/html',
              title: 'Projects Documentation',
            },
            {
              rel: 'status',
              href: `${SITE_URL}/api/v1/health`,
              type: 'application/json',
              title: 'Health Check',
            },
          ],
        },
        {
          anchor: `${SITE_URL}/api/gallery`,
          item: [
            {
              rel: 'self',
              href: `${SITE_URL}/api/gallery`,
              type: 'application/json',
              title: 'Gallery API — Fetch portfolio photos',
            },
          ],
        },
      ],
    },
    'application/linkset+json',
  )
}

function handleOpenIdConfiguration(): Response {
  return jsonResponse(
    {
      issuer: SITE_URL,
      authorization_endpoint: `${SITE_URL}/oauth/authorize`,
      token_endpoint: `${SITE_URL}/oauth/token`,
      jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
      userinfo_endpoint: `${SITE_URL}/oauth/userinfo`,
      grant_types_supported: ['authorization_code'],
      response_types_supported: ['code'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'profile', 'email'],
      claims_supported: ['sub', 'name', 'email', 'picture'],
      service_documentation: `${SITE_URL}/projects`,
      ui_locales_supported: ['en'],
    },
    'application/json',
  )
}

function handleOAuthAuthorizationServer(): Response {
  return jsonResponse(
    {
      issuer: SITE_URL,
      authorization_endpoint: `${SITE_URL}/oauth/authorize`,
      token_endpoint: `${SITE_URL}/oauth/token`,
      jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
      registration_endpoint: `${SITE_URL}/oauth/register`,
      scopes_supported: ['read', 'profile', 'email'],
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code'],
      token_endpoint_auth_methods_supported: [
        'client_secret_basic',
        'client_secret_post',
      ],
      service_documentation: `${SITE_URL}/projects`,
      ui_locales_supported: ['en'],

    },
    'application/json',
  )
}

function handleOAuthProtectedResource(): Response {
  return jsonResponse(
    {
      resource: SITE_URL,
      authorization_servers: [SITE_URL],
      scopes_supported: ['read', 'profile'],
      bearer_methods_supported: ['header'],
      resource_documentation: `${SITE_URL}/projects`,
      resource_policy_documentation: `${SITE_URL}/auth.md`,
    },
    'application/json',
  )
}

function handleMcpServerCard(): Response {
  return jsonResponse(
    {
      serverInfo: {
        name: 'puspo-portfolio',
        version: '1.0.0',
        description:
          "AI agent tools for exploring Ashikur Rahman Puspo's portfolio — projects, blog posts, gallery, resume, and contact.",
      },
      transport: {
        type: 'sse',
        url: `${SITE_URL}/api/mcp`,
      },
      capabilities: {
        tools: {},
        resources: {},
      },
      documentation: `${SITE_URL}/projects`,
      repository: 'https://github.com/pacman-cli/MyPortfolio',
    },
    'application/json',
  )
}

function handleAgentSkillsIndex(): Response {
  return jsonResponse(
    {
      $schema: 'https://agentskills.io/schema/v0.2.0',
      domain: SITE_URL,
      version: '1.0.0',
      skills: [
        {
          name: 'link-headers',
          type: 'discovery',
          description:
            'RFC 8288 Link response headers for agent discovery. Provides links to API catalog, OAuth metadata, and MCP server card.',
          url: `${SITE_URL}/.well-known/agent-skills/link-headers/SKILL.md`,
          sha256: '', // Compute at build time for production
        },
        {
          name: 'api-catalog',
          type: 'discovery',
          description:
            'RFC 9727 API catalog for automated API discovery using application/linkset+json format.',
          url: `${SITE_URL}/.well-known/api-catalog`,
          sha256: '',
        },
        {
          name: 'markdown-negotiation',
          type: 'content',
          description:
            'Returns markdown responses for agents requesting Accept: text/markdown.',
          url: `${SITE_URL}/`,
          sha256: '',
        },
        {
          name: 'oauth-discovery',
          type: 'auth',
          description:
            'OAuth 2.0 / OpenID Connect discovery metadata for agent authentication.',
          url: `${SITE_URL}/.well-known/openid-configuration`,
          sha256: '',
        },
        {
          name: 'mcp-server-card',
          type: 'tools',
          description:
            'MCP Server Card (SEP-1649) for agent tool discovery.',
          url: `${SITE_URL}/.well-known/mcp/server-card.json`,
          sha256: '',
        },
        {
          name: 'webmcp',
          type: 'tools',
          description:
            'Browser-side MCP tools via navigator.modelContext.provideContext() for in-browser agent interaction.',
          url: `${SITE_URL}/`,
          sha256: '',
        },
        {
          name: 'auth-md',
          type: 'auth',
          description:
            'Auth.md metadata for agent registration and authentication instructions.',
          url: `${SITE_URL}/auth.md`,
          sha256: '',
        },
        {
          name: 'content-signals',
          type: 'discovery',
          description:
            'Content-Signal directives in robots.txt declaring AI content usage preferences for ai-train, search, and ai-input.',
          url: `${SITE_URL}/robots.txt`,
          sha256: '',
        },
      ],
    },
    'application/json',
  )
}

function handleWellKnown(pathname: string): Response {
  if (pathname === '/.well-known/api-catalog') return handleApiCatalog()
  if (pathname === '/.well-known/openid-configuration')
    return handleOpenIdConfiguration()
  if (pathname === '/.well-known/oauth-authorization-server')
    return handleOAuthAuthorizationServer()
  if (pathname === '/.well-known/oauth-protected-resource')
    return handleOAuthProtectedResource()
  if (pathname === '/.well-known/mcp/server-card.json')
    return handleMcpServerCard()
  if (pathname === '/.well-known/agent-skills/index.json')
    return handleAgentSkillsIndex()

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  })
}

/* ------------------------------------------------------------------ */
/*  robots.txt Handler — Content Signals                              */
/* ------------------------------------------------------------------ */

function handleRobotsTxt(): Response {
  const robotsTxt = `User-agent: *
Allow: /
Content-Signal: ai-train=no, ai-input=no, search=yes

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

/* ------------------------------------------------------------------ */
/*  auth.md Handler                                                   */
/* ------------------------------------------------------------------ */

function handleAuthMd(): Response {
  const md = `# Auth.md — Agent Authentication & Registration

## Overview
This site (**puspo.online**) provides public APIs for portfolio data.
Most endpoints are publicly accessible without authentication.

## Available Endpoints
- \`GET /api/gallery\` — Fetch portfolio photos (public, no auth required)
- \`GET /api/v1/*\` — Backend API endpoints (proxied)

## Authentication
Currently, all public API endpoints do not require authentication.
For protected endpoints (if added in the future), OAuth 2.0 will be used.

## OAuth Discovery
- [OpenID Configuration](${SITE_URL}/.well-known/openid-configuration)
- [OAuth Authorization Server](${SITE_URL}/.well-known/oauth-authorization-server)
- [Protected Resource Metadata](${SITE_URL}/.well-known/oauth-protected-resource)

## Agent Registration
No registration is required for public endpoints.
For MCP tool access, see the [MCP Server Card](${SITE_URL}/.well-known/mcp/server-card.json).

## Contact
For questions or to report issues:
- **Email:** puspopuspo520@gmail.com
- **GitHub:** https://github.com/pacman-cli/MyPortfolio

## Rate Limiting
Please be respectful of rate limits. Excessive automated requests may be throttled.

## Related
- [Site Home](${SITE_URL})
- [API Catalog](${SITE_URL}/.well-known/api-catalog)
- [Agent Skills Index](${SITE_URL}/.well-known/agent-skills/index.json)
`

  return new Response(md, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

/* ------------------------------------------------------------------ */
/*  Markdown for Agents                                               */
/* ------------------------------------------------------------------ */

function handleMarkdownRequest(pathname: string): Response {
  let markdown: string

  if (pathname === '/' || pathname === '') {
    markdown = `# Ashikur Rahman Puspo — Backend Engineer & Software Developer

## About
Official portfolio of Ashikur Rahman Puspo, a backend developer from Dhaka, Bangladesh.
Specializing in Spring Boot, Java, Microservices, System Design, Docker, Kubernetes, AWS, PostgreSQL, and REST APIs.

## Navigation
- [About Me](${SITE_URL}/about-me) — Background, education, and technical expertise
- [Projects](${SITE_URL}/projects) — Backend engineering projects with case studies
- [Blog](${SITE_URL}/blog) — Technical articles and tutorials
- [Gallery](${SITE_URL}/gallery) — Photography portfolio
- [Resume](${SITE_URL}/resume) — Downloadable resume
- [Social Links](${SITE_URL}/links) — All social profiles

## APIs
- [API Catalog](${SITE_URL}/.well-known/api-catalog) — Machine-readable API discovery
- [Gallery API](${SITE_URL}/api/gallery) — Fetch portfolio photos

## Agent Discovery
- [OAuth Protected Resource](${SITE_URL}/.well-known/oauth-protected-resource)
- [MCP Server Card](${SITE_URL}/.well-known/mcp/server-card.json)
- [Agent Skills Index](${SITE_URL}/.well-known/agent-skills/index.json)
- [Auth.md](${SITE_URL}/auth.md)

## Social Profiles
- LinkedIn: https://www.linkedin.com/in/iampuspo/
- GitHub: https://github.com/pacman-cli
- YouTube: https://www.youtube.com/@springCraftDev
- X: https://x.com/iam_puspo
- Instagram: https://www.instagram.com/iampuspoo/
- Facebook: https://www.facebook.com/pacman.puspo/
- LeetCode: https://leetcode.com/u/pacman-cli/
- Threads: https://www.threads.net/@pacman.puspo
`
  } else if (pathname === '/projects') {
    markdown = `# Projects — Ashikur Rahman Puspo

Backend engineering projects built with Spring Boot, Java, and modern technologies.

Visit ${SITE_URL}/projects for the full project showcase with detailed case studies.

## API
- [API Catalog](${SITE_URL}/.well-known/api-catalog)
`
  } else if (pathname === '/blog') {
    markdown = `# Blog — Ashikur Rahman Puspo

Technical articles and tutorials on backend engineering, Spring Boot, system design, and software development.

Visit ${SITE_URL}/blog for the full blog listing.

## API
- [API Catalog](${SITE_URL}/.well-known/api-catalog)
`
  } else if (pathname === '/about-me') {
    markdown = `# About Me — Ashikur Rahman Puspo

Backend Engineer & Software Developer from Dhaka, Bangladesh.
Graduate of United International University.

## Skills
Spring Boot, Java, Microservices, System Design, Docker, Kubernetes, AWS, PostgreSQL, MySQL, REST APIs, Cloud Architecture, DevOps.

Visit ${SITE_URL}/about-me for the full profile.
`
  } else if (pathname === '/gallery') {
    markdown = `# Gallery — Ashikur Rahman Puspo

Photography portfolio.

Visit ${SITE_URL}/gallery for the full gallery.
- [Gallery API](${SITE_URL}/api/gallery) — Fetch photos programmatically
`
  } else if (pathname === '/resume') {
    markdown = `# Resume — Ashikur Rahman Puspo

Download the resume: https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ

Visit ${SITE_URL}/resume for the online resume viewer.
`
  } else if (pathname === '/links') {
    markdown = `# Social Links — Ashikur Rahman Puspo

- LinkedIn: https://www.linkedin.com/in/iampuspo/
- GitHub: https://github.com/pacman-cli
- YouTube: https://www.youtube.com/@springCraftDev
- X: https://x.com/iam_puspo
- Instagram: https://www.instagram.com/iampuspoo/
- Facebook: https://www.facebook.com/pacman.puspo/
- LeetCode: https://leetcode.com/u/pacman-cli/
- Threads: https://www.threads.net/@pacman.puspo

Visit ${SITE_URL}/links for the full links page.
`
  } else {
    markdown = `# ${pathname.replace(/\//g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}

Visit ${SITE_URL}${pathname} for the full page.

## Agent Discovery
- [API Catalog](${SITE_URL}/.well-known/api-catalog)
- [Agent Skills Index](${SITE_URL}/.well-known/agent-skills/index.json)
`
  }

  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',

      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

/* ------------------------------------------------------------------ */
/*  Middleware Entry Point                                             */
/* ------------------------------------------------------------------ */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get('accept') || ''

  // 1. Handle .well-known routes
  if (pathname.startsWith('/.well-known/')) {
    return handleWellKnown(pathname)
  }

  // 2. Handle robots.txt — inject Content Signals for AI agents
  if (pathname === '/robots.txt') {
    return handleRobotsTxt()
  }

  // 3. Handle auth.md
  if (pathname === '/auth.md') {
    return handleAuthMd()
  }

  // 4. Markdown for Agents — return markdown when agents request it
  if (accept.includes('text/markdown') && isPageRoute(pathname)) {
    return handleMarkdownRequest(pathname)
  }

  // 5. Link headers on all page routes
  const response = NextResponse.next()
  if (isPageRoute(pathname)) {
    addLinkHeaders(response)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|profile.jpg|og-image.png|ads.txt|BingSiteAuth.xml|.*\\.(?:svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|js|css)$).*)',
  ],
}
