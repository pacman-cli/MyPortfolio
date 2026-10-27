'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ExternalLink, Lock, Eye, EyeOff } from 'lucide-react'

export interface BrowserWindowProps {
  project: ShowcaseProject
  isActive: boolean
  onTogglePreview?: () => void
  children: React.ReactNode
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  project,
  isActive,
  onTogglePreview,
  children,
}) => {
  return (
    <div className="w-full flex flex-col rounded-t-xl bg-card/90 border border-border/80 overflow-hidden shadow-sm transition-all duration-300 group-hover:border-border">
      {/* Browser Toolbar Chrome */}
      <div className="h-9 px-3 bg-muted/40 border-b border-border/70 flex items-center justify-between gap-2 select-none">
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-1.5 w-14 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-rose-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-amber-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border/90 group-hover:bg-emerald-500/80 transition-colors" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[200px] sm:max-w-[240px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-md bg-background/80 border border-border/50 text-[11px] font-mono text-muted-foreground truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
          <span className="truncate">{project.displayDomain}</span>
        </div>

        {/* Actions (Touch Toggle + External Link) */}
        <div className="flex items-center gap-1.5 w-14 justify-end shrink-0">
          {onTogglePreview && (
            <button
              type="button"
              onClick={onTogglePreview}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors md:hidden"
              title={isActive ? 'Close Preview' : 'Open Preview'}
              aria-label={isActive ? 'Close live preview' : 'Open live preview'}
            >
              {isActive ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            title="Open in new tab"
            aria-label={`Open ${project.title} in a new tab`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="relative w-full aspect-[16/10] bg-background/95 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
