'use client'

import dynamic from 'next/dynamic'

export const MermaidDiagram = dynamic(
  () => import('./mermaid-diagram').then((mod) => mod.MermaidDiagram),
  { ssr: false }
)
