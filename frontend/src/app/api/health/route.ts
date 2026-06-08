import { NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/site'

interface HealthCheck {
  status: 'healthy' | 'degraded'
  timestamp: string
  uptime: number
  checks: {
    [key: string]: {
      status: 'pass' | 'fail' | 'skip'
      message: string
      latency?: number
    }
  }
}

const startTime = Date.now()

async function checkEndpoint(url: string, name: string): Promise<{ status: 'pass' | 'fail' | 'skip'; message: string; latency: number }> {
  const start = Date.now()
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    })
    const latency = Date.now() - start
    return {
      status: res.ok ? 'pass' : 'fail',
      message: res.ok ? `${res.status} ${res.statusText}` : `HTTP ${res.status}`,
      latency,
    }
  } catch (error) {
    const latency = Date.now() - start
    return {
      status: 'skip',
      message: error instanceof Error ? error.message : 'Connection failed',
      latency,
    }
  }
}

export async function GET() {
  const checks: HealthCheck['checks'] = {}

  // Check well-known endpoints
  const wellKnownEndpoints = [
    { url: `${SITE_URL}/.well-known/api-catalog`, name: 'api-catalog' },
    { url: `${SITE_URL}/.well-known/openid-configuration`, name: 'openid-configuration' },
    { url: `${SITE_URL}/.well-known/oauth-authorization-server`, name: 'oauth-authorization-server' },
    { url: `${SITE_URL}/.well-known/oauth-protected-resource`, name: 'oauth-protected-resource' },
    { url: `${SITE_URL}/.well-known/mcp/server-card.json`, name: 'mcp-server-card' },
    { url: `${SITE_URL}/.well-known/agent-skills/index.json`, name: 'agent-skills-index' },
    { url: `${SITE_URL}/auth.md`, name: 'auth-md' },
    { url: `${SITE_URL}/api/gallery`, name: 'gallery-api' },
  ]

  const results = await Promise.all(
    wellKnownEndpoints.map(async (endpoint) => {
      const result = await checkEndpoint(endpoint.url, endpoint.name)
      return { name: endpoint.name, ...result }
    }),
  )

  for (const result of results) {
    checks[result.name] = {
      status: result.status,
      message: result.message,
      latency: result.latency,
    }
  }

  const hasFailures = Object.values(checks).some((c) => c.status === 'fail')
  const allSkipped = Object.values(checks).every((c) => c.status === 'skip')

  const health: HealthCheck = {
    status: hasFailures ? 'degraded' : allSkipped ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),      uptime: Date.now() - startTime,
    checks,
  }

  return NextResponse.json(health, {
    status: hasFailures ? 503 : 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
