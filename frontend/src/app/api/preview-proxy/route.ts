import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url')

  if (!urlParam) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(urlParam)
    if (!['http:', 'https:'].includes(targetUrl.protocol)) {
      return new NextResponse('Invalid protocol', { status: 400 })
    }
  } catch {
    return new NextResponse('Invalid URL', { status: 400 })
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 300 },
    })

    let html = await response.text()

    // Inject <base href="..."> so all relative scripts, styles, images, and fonts load from the target origin
    const origin = targetUrl.origin
    const baseTag = `<base href="${origin}/" />`

    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}`)
    } else if (html.includes('<HEAD>')) {
      html = html.replace('<HEAD>', `<HEAD>${baseTag}`)
    } else if (html.includes('<html>')) {
      html = html.replace('<html>', `<html><head>${baseTag}</head>`)
    } else {
      html = `${baseTag}${html}`
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Critical: Allow embedding inside our own portfolio domain
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    // Return a clean fallback HTML preview document if remote fetch fails or times out
    const hostname = targetUrl.hostname
    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${hostname}</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #09090b;
      color: #fafafa;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      box-sizing: border-box;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      font-size: 12px;
      margin-bottom: 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    h2 { font-size: 16px; margin: 0 0 8px 0; font-family: system-ui, sans-serif; font-weight: 600; }
    p { font-size: 12px; color: #a1a1aa; margin: 0; }
  </style>
</head>
<body>
  <div class="badge">● Live Production URL</div>
  <h2>${hostname}</h2>
  <p>Connecting live service...</p>
</body>
</html>`

    return new NextResponse(fallbackHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Cache-Control': 'public, max-age=60',
      },
    })
  }
}
