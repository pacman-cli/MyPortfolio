'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { BlockedEmbedCard } from './blocked-embed-card'
import { ArrowUpRight, Globe, Loader2, Sparkles } from 'lucide-react'

interface LivePreviewIFrameProps {
  project: ShowcaseProject
  isActive: boolean
}

export const LivePreviewIFrame: React.FC<LivePreviewIFrameProps> = ({
  project,
  isActive,
}) => {
  const [hasLoadedEver, setHasLoadedEver] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [containerWidth, setContainerWidth] = useState(400)
  const containerRef = useRef<HTMLDivElement>(null)

  // Once activated, keep mounted to prevent reloading (sticky session cache)
  if (isActive && !hasLoadedEver) {
    setHasLoadedEver(true)
  }

  // Measure container width for responsive 1280px scaling
  useEffect(() => {
    if (!containerRef.current) return

    const updateWidth = () => {
      if (containerRef.current && containerRef.current.clientWidth > 0) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }

    updateWidth()
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateWidth)
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [])

  // If project is blocked by X-Frame-Options (e.g. DevForge), render custom card
  if (!project.canEmbed) {
    return <BlockedEmbedCard project={project} />
  }

  const scale = containerWidth > 0 ? containerWidth / 1280 : 0.3125
  const iframeHeight = containerWidth > 0 ? (containerWidth * 10) / 16 / scale : 800

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-background"
    >
      {/* Default Ambient Backdrop (visible when preview is inactive or loading) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${
          isActive && isIframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-card border border-border/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Globe className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground tracking-tight block">
              {project.shortTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-muted/50 border border-border/40 text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground transition-all">
              {isActive && !isIframeLoaded ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
                  <span>Connecting live site...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Hover to preview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Live Iframe: Only mounted if active or cached */}
      {hasLoadedEver && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive && isIframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <iframe
            src={project.url}
            title={`${project.title} live preview`}
            loading="lazy"
            onLoad={() => setIsIframeLoaded(true)}
            className="border-0 bg-white"
            style={{
              width: '1280px',
              height: `${iframeHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      )}
    </div>
  )
}
