'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ExternalLink, ShieldCheck, Terminal, Wrench } from 'lucide-react'

export const BlockedEmbedCard: React.FC<{ project: ShowcaseProject }> = ({
  project,
}) => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-card via-card/90 to-background/95 border border-border/60 rounded-b-lg select-none text-left">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Embed Protected by Host</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
            <Terminal className="w-3 h-3" /> Zero Latency
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-foreground tracking-tight">
              <span>{project.shortTitle}</span> Workspace
            </h4>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {project.highlights.map((tool) => (
              <div
                key={tool}
                className="px-2 py-1 rounded bg-muted/40 border border-border/40 text-[10px] font-mono text-muted-foreground/90 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                <span className="truncate">{tool}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">
          Standalone App
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Launch {project.shortTitle}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
