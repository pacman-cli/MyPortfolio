'use client'

import mermaid from 'mermaid'
import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#60a5fa',
          lineColor: '#94a3b8',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          background: '#0f172a',
          mainBkg: '#1e293b',
          nodeBorder: '#60a5fa',
          clusterBkg: '#1e293b',
          clusterBorder: '#334155',
          titleColor: '#e2e8f0',
          edgeLabelBackground: '#1e293b',
          nodeTextColor: '#e2e8f0',
        },
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        fontSize: 14,
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          padding: 16,
        },
        securityLevel: 'loose',
      })
      mermaidInitialized = true
    }

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
        setError(null)
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError('Failed to render diagram')
      }
    }

    renderChart()
  }, [chart])

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-sm text-yellow-400 mb-2">⚠️ Diagram render error</p>
        <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono">
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-8 flex justify-center rounded-xl border border-border/50 bg-[#0f172a] p-6 overflow-x-auto shadow-lg"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
