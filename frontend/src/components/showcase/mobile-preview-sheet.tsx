'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Lock } from 'lucide-react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { LivePreviewIFrame } from './live-preview-iframe'
import { BlockedEmbedCard } from './blocked-embed-card'

export interface MobilePreviewSheetProps {
  project?: ShowcaseProject | null
  onClose: () => void
}

export const MobilePreviewSheet: React.FC<MobilePreviewSheetProps> = ({
  project,
  onClose,
}) => {
  // Lock body scroll while sheet is open
  useEffect(() => {
    if (!project) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end">
        {/* Backdrop overlay */}
        <motion.div
          data-testid="mobile-preview-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Slide-up Drawer Panel */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Live preview of ${project.title}`}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_e, info) => {
            if (info.offset.y > 100 || info.velocity.y > 500) {
              onClose()
            }
          }}
          className="relative z-10 w-full max-h-[85vh] h-[75vh] bg-card/95 border-t border-border/80 rounded-t-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
        >
          {/* Top Drag Handle Indicator */}
          <div className="pt-2.5 pb-1 flex justify-center">
            <span className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Browser Chrome Header */}
          <div className="px-4 py-2 border-b border-border/60 flex items-center justify-between gap-3 shrink-0">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 w-14 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Address bar pill */}
            <div className="flex-1 max-w-[220px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md bg-background/80 border border-border/50 text-[11px] font-mono text-muted-foreground truncate">
              <Lock className="w-3 h-3 text-emerald-500 shrink-0" aria-hidden="true" />
              <span className="truncate">{project.displayDomain}</span>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Details Bar */}
          <div className="px-4 py-2 bg-muted/30 border-b border-border/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>Online</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
              <span className="font-semibold text-foreground truncate">{project.title}</span>
            </div>
          </div>

          {/* Preview Viewport */}
          <div className="flex-1 relative w-full overflow-hidden bg-black/90">
            {project.canEmbed === false ? (
              <div data-testid={`blocked-embed-card-${project.id}`} className="w-full h-full">
                <BlockedEmbedCard project={project} />
              </div>
            ) : (
              <div data-testid={`live-preview-iframe-${project.id}`} className="w-full h-full">
                <LivePreviewIFrame
                  project={project}
                  isActive={true}
                />
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-card border-t border-border/60 flex flex-col gap-2 shrink-0">
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Open website CTA */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Open Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
