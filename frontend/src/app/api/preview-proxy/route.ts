import { NextRequest, NextResponse } from 'next/server'

function generateDevForgeHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DevForge — Fast Developer Tools</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #09090b;
      color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 12px;
      user-select: none;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .brand { display: flex; align-items: center; gap: 8px; }
    .logo {
      width: 22px; height: 22px; border-radius: 6px;
      background: rgba(16, 185, 129, 0.2); color: #10b981;
      font-weight: 700; font-size: 11px; display: flex;
      align-items: center; justify-content: center; font-family: monospace;
    }
    .title { font-size: 13px; font-weight: 600; color: #e4e4e7; }
    .latency {
      font-size: 11px; font-family: monospace; color: #10b981;
      display: flex; align-items: center; gap: 5px;
    }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
    .workspace {
      display: grid; grid-template-columns: 100px 1fr; gap: 10px;
      flex: 1; min-height: 0;
    }
    .sidebar { border-right: 1px solid rgba(255,255,255,0.08); padding-right: 8px; }
    .sidebar-title { font-size: 9px; text-transform: uppercase; color: #71717a; font-family: monospace; margin-bottom: 6px; }
    .tool-item {
      font-size: 10px; font-family: monospace; padding: 4px 6px;
      border-radius: 4px; color: #a1a1aa; margin-bottom: 4px;
    }
    .tool-item.active { background: rgba(16,185,129,0.15); color: #6ee7b7; font-weight: 600; }
    .editor {
      background: #18181b; border: 1px solid #27272a; border-radius: 8px;
      padding: 10px; font-family: monospace; font-size: 11px;
      display: flex; flex-direction: column; justify-content: space-between;
      overflow: hidden;
    }
    .code { line-height: 1.5; color: #d4d4d8; }
    .c-comment { color: #71717a; }
    .c-key { color: #38bdf8; }
    .c-str { color: #fde047; }
    .c-val { color: #34d399; }
    .editor-status {
      display: flex; justify-content: space-between; font-size: 10px;
      color: #71717a; border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 6px; margin-top: 6px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="logo">DF</div>
      <span class="title">DevForge Studio</span>
    </div>
    <div class="latency">
      <span class="dot"></span>
      <span>0ms Latency</span>
    </div>
  </div>
  <div class="workspace">
    <div class="sidebar">
      <div class="sidebar-title">Utilities</div>
      <div class="tool-item active">JSON Format</div>
      <div class="tool-item">JWT Inspect</div>
      <div class="tool-item">UUID Gen</div>
      <div class="tool-item">Regex Test</div>
    </div>
    <div class="editor">
      <div class="code">
        <div class="c-comment">// Formatted JSON Output</div>
        <div>{</div>
        <div style="padding-left:12px;"><span class="c-key">"app"</span>: <span class="c-str">"DevForge"</span>,</div>
        <div style="padding-left:12px;"><span class="c-key">"mode"</span>: <span class="c-val">"zero-roundtrip"</span>,</div>
        <div style="padding-left:12px;"><span class="c-key">"features"</span>: [<span class="c-str">"JSON"</span>, <span class="c-str">"JWT"</span>, <span class="c-str">"UUID"</span>]</div>
        <div>}</div>
      </div>
      <div class="editor-status">
        <span style="color:#10b981;">✓ Valid JSON (58 bytes)</span>
        <span>UTF-8</span>
      </div>
    </div>
  </div>
</body>
</html>`
}

function generateStayMateHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>StayMate — Rental & Roommate Matching</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #09090b; color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh; overflow: hidden; display: flex; flex-direction: column; padding: 12px;
      user-select: none;
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 10px;
    }
    .brand { font-size: 13px; font-weight: 700; color: #60a5fa; }
    .search-pill {
      font-size: 10px; background: #18181b; border: 1px solid #27272a;
      padding: 3px 10px; border-radius: 9999px; color: #a1a1aa;
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; }
    .card {
      background: #18181b; border: 1px solid #27272a; border-radius: 8px;
      padding: 8px; display: flex; flex-direction: column; justify-content: space-between;
    }
    .banner {
      height: 50px; border-radius: 4px; background: linear-gradient(135deg, rgba(59,130,246,0.3), rgba(99,102,241,0.3));
      display: flex; align-items: center; justify-content: center; font-size: 9px; color: #bfdbfe; font-family: monospace;
      margin-bottom: 6px;
    }
    .card-title { font-size: 11px; font-weight: 600; color: #e4e4e7; margin-bottom: 2px; }
    .card-meta { font-size: 9px; color: #34d399; font-weight: 500; }
    .card-footer {
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid rgba(255,255,255,0.06); padding-top: 4px; margin-top: 4px;
    }
    .price { font-size: 11px; font-weight: 700; font-family: monospace; color: #f4f4f5; }
    .badge { font-size: 8px; background: rgba(59,130,246,0.2); color: #93c5fd; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">StayMate</div>
    <div class="search-pill">📍 Mirpur, Dhaka • $150-$300</div>
  </div>
  <div class="grid">
    <div class="card">
      <div>
        <div class="banner">Master Bed w/ Balcony</div>
        <div class="card-title">Sublet in Sector 11</div>
        <div class="card-meta">98% Roommate Match</div>
      </div>
      <div class="card-footer">
        <span class="price">$220/mo</span>
        <span class="badge">Furnished</span>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="banner" style="background: linear-gradient(135deg, rgba(16,185,129,0.3), rgba(20,184,166,0.3)); color: #a7f3d0;">Cozy Studio Room</div>
        <div class="card-title">Shared Flat Floor 3</div>
        <div class="card-meta">94% Roommate Match</div>
      </div>
      <div class="card-footer">
        <span class="price">$180/mo</span>
        <span class="badge" style="background:rgba(16,185,129,0.2); color:#a7f3d0;">Attached Bath</span>
      </div>
    </div>
  </div>
</body>
</html>`
}

function generateExpenseTrackerHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TakaTrack — Personal Finance Tracker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #09090b; color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh; overflow: hidden; display: flex; flex-direction: column; padding: 12px;
      user-select: none;
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 10px;
    }
    .brand { font-size: 13px; font-weight: 700; color: #34d399; }
    .rate { font-size: 10px; font-family: monospace; color: #10b981; }
    .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
    .metric-card { background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 8px; }
    .metric-label { font-size: 9px; text-transform: uppercase; color: #71717a; font-family: monospace; }
    .metric-val { font-size: 14px; font-weight: 700; font-family: monospace; color: #f4f4f5; margin-top: 2px; }
    .goal-box {
      background: rgba(24,24,27,0.8); border: 1px solid #27272a; border-radius: 8px; padding: 8px;
    }
    .goal-head { display: flex; justify-content: space-between; font-size: 9px; font-family: monospace; margin-bottom: 4px; }
    .progress-bar { width: 100%; height: 6px; border-radius: 9999px; background: #27272a; overflow: hidden; }
    .progress-fill { height: 100%; width: 82%; background: linear-gradient(90deg, #10b981, #14b8a6); }
    .pills { display: flex; gap: 6px; margin-top: 6px; font-family: monospace; font-size: 9px; }
    .pill { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #d4d4d8; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">TakaTrack Finance</div>
    <div class="rate">▲ +14.2% Savings Rate</div>
  </div>
  <div class="metrics">
    <div class="metric-card">
      <div class="metric-label">Total Balance</div>
      <div class="metric-val">$14,850.00</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Monthly Spend</div>
      <div class="metric-val" style="color:#fb7185;">$2,140.50</div>
    </div>
  </div>
  <div class="goal-box">
    <div class="goal-head">
      <span>Savings Goal: Emergency Fund</span>
      <span style="color:#34d399; font-weight:600;">82% ($8.2k / $10k)</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
  <div class="pills">
    <div class="pill">Housing 42%</div>
    <div class="pill">Food 28%</div>
    <div class="pill">Cloud 18%</div>
  </div>
</body>
</html>`
}

function generateShelfToTalesHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ShelfToTales — Community Bookstore</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #09090b; color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh; overflow: hidden; display: flex; flex-direction: column; padding: 12px;
      user-select: none;
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 10px;
    }
    .brand { font-size: 13px; font-weight: 700; color: #fbbf24; }
    .badge { font-size: 9px; font-family: monospace; color: #f59e0b; }
    .books { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; flex: 1; }
    .book {
      border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .b-tag { font-size: 8px; text-transform: uppercase; color: #a1a1aa; font-family: monospace; }
    .b-title { font-size: 10px; font-weight: 600; color: #f4f4f5; line-height: 1.3; margin-top: 2px; }
    .b-footer { display: flex; justify-content: space-between; font-size: 8px; color: #71717a; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 4px; }
    .rating { color: #fbbf24; font-family: monospace; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">ShelfToTales</div>
    <div class="badge">★ 2,400+ Active Readers</div>
  </div>
  <div class="books">
    <div class="book" style="background:linear-gradient(180deg, rgba(217,119,6,0.25), rgba(24,24,27,0.8));">
      <div>
        <div class="b-tag">Architecture</div>
        <div class="b-title">Designing Data Systems</div>
      </div>
      <div class="b-footer">
        <span>Kleppmann</span>
        <span class="rating">★ 4.9</span>
      </div>
    </div>
    <div class="book" style="background:linear-gradient(180deg, rgba(147,51,234,0.25), rgba(24,24,27,0.8));">
      <div>
        <div class="b-tag">Engineering</div>
        <div class="b-title">Clean Code Architecture</div>
      </div>
      <div class="b-footer">
        <span>R. Martin</span>
        <span class="rating">★ 4.8</span>
      </div>
    </div>
    <div class="book" style="background:linear-gradient(180deg, rgba(16,185,129,0.25), rgba(24,24,27,0.8));">
      <div>
        <div class="b-tag">Craft</div>
        <div class="b-title">Pragmatic Programmer</div>
      </div>
      <div class="b-footer">
        <span>D. Thomas</span>
        <span class="rating">★ 4.9</span>
      </div>
    </div>
  </div>
</body>
</html>`
}

function getTailoredFallback(url: URL): string {
  const host = url.hostname.toLowerCase()
  if (host.includes('devforge')) return generateDevForgeHtml()
  if (host.includes('stay-mate') || host.includes('staymate')) return generateStayMateHtml()
  if (host.includes('expense-tracker') || host.includes('takatrack')) return generateExpenseTrackerHtml()
  if (host.includes('shelf-to-tales')) return generateShelfToTalesHtml()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${url.hostname}</title>
  <style>
    body {
      margin: 0; padding: 20px; background: #09090b; color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      height: 100vh; box-sizing: border-box; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
    }
    .badge {
      font-size: 11px; font-family: monospace; color: #10b981;
      padding: 3px 10px; border-radius: 9999px; background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.2); margin-bottom: 8px;
    }
    h2 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    p { font-size: 11px; color: #a1a1aa; }
  </style>
</head>
<body>
  <div class="badge">● Live Production Application</div>
  <h2>${url.hostname}</h2>
  <p>Connecting live deployment...</p>
</body>
</html>`
}

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
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return new NextResponse(getTailoredFallback(targetUrl), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Security-Policy': "frame-ancestors 'self'",
          'Cache-Control': 'public, max-age=60',
        },
      })
    }

    let html = await response.text()

    // Detect if Vercel returned a broken deployment error page or SSO login
    const isVercelBroken =
      html.includes("This page couldn't load") ||
      html.includes('DEPLOYMENT_NOT_FOUND') ||
      html.includes('vercel.com/login') ||
      html.includes('Login – Vercel')

    if (isVercelBroken) {
      return new NextResponse(getTailoredFallback(targetUrl), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Security-Policy': "frame-ancestors 'self'",
          'Cache-Control': 'public, max-age=60',
        },
      })
    }

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
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    })
  } catch {
    // Return tailored fallback on network timeout or fetch failure
    return new NextResponse(getTailoredFallback(targetUrl), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Cache-Control': 'public, max-age=60',
      },
    })
  }
}
