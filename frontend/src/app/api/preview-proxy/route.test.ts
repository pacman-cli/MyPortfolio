import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('Preview Proxy API Route', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns 400 if url parameter is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/preview-proxy')
    const res = await GET(req)
    expect(res.status).toBe(400)
    expect(await res.text()).toContain('Missing url parameter')
  })

  it('returns 400 if url protocol is not http or https', async () => {
    const req = new NextRequest(
      'http://localhost:3000/api/preview-proxy?url=javascript:alert(1)'
    )
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('fetches remote html, injects base href, and sets frame-ancestors header', async () => {
    const mockHtml =
      '<!DOCTYPE html><html><head><title>Test App</title></head><body><h1>Hello</h1></body></html>'

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(mockHtml),
    } as unknown as Response)

    const req = new NextRequest(
      'http://localhost:3000/api/preview-proxy?url=https://devforge.puspo.online'
    )
    const res = await GET(req)

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Security-Policy')).toBe("frame-ancestors 'self'")
    expect(res.headers.get('Content-Type')).toContain('text/html')

    const body = await res.text()
    expect(body).toContain('<base href="https://devforge.puspo.online/" />')
  })
})
