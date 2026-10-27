'use client'

import React, { useState } from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { LivePreviewIFrame, type PreviewItem } from './live-preview-iframe'
export type { PreviewItem } from './live-preview-iframe'
import { Lock } from 'lucide-react'

export const PREVIEW_WIDTH = 340
export const PREVIEW_HEIGHT = 245
export const OFFSET_X = 20
export const OFFSET_Y = 20
export const VIEWPORT_MARGIN = 16

/**
 * Calculates viewport-clamped coordinates for cursor-following preview.
 * - Flips to the left if near the right edge of the viewport.
 * - Shifts upward if near the bottom edge of the viewport.
 * - Ensures preview never clips beyond viewport boundaries.
 */
export function calculateClampedPosition(
  cursorX: number,
  cursorY: number,
  viewportWidth: number,
  viewportHeight: number,
  previewWidth = PREVIEW_WIDTH,
  previewHeight = PREVIEW_HEIGHT,
  offsetX = OFFSET_X,
  offsetY = OFFSET_Y,
  margin = VIEWPORT_MARGIN
): { x: number; y: number } {
  // Default placement: down and to the right of the cursor
  let x = cursorX + offsetX
  let y = cursorY + offsetY

  // Boundary clamping: if near right edge, flip preview to the left of the cursor
  if (cursorX + offsetX + previewWidth > viewportWidth - margin) {
    x = cursorX - previewWidth - offsetX
  }

  // Ensure preview never clips off the left edge
  if (x < margin) {
    x = margin
  }

  // Ensure preview never overflows the right edge
  if (x + previewWidth > viewportWidth - margin) {
    x = Math.max(margin, viewportWidth - previewWidth - margin)
  }

  // Boundary clamping: if near bottom, shift upward / flip above cursor
  if (cursorY + offsetY + previewHeight > viewportHeight - margin) {
    y = cursorY - previewHeight - offsetY
  }

  // Ensure preview never clips off the top edge
  if (y < margin) {
    y = margin
  }

  // Ensure preview never overflows the bottom edge
  if (y + previewHeight > viewportHeight - margin) {
    y = Math.max(margin, viewportHeight - previewHeight - margin)
  }

  return { x, y }
}

export interface CursorFloatingPreviewProps {
  project?: ShowcaseProject | null
  target?: PreviewItem | null
  cursorPosition: { x: number; y: number }
  isVisible: boolean
}

export const CursorFloatingPreview: React.FC<CursorFloatingPreviewProps> = ({
  project,
  target,
  cursorPosition,
  isVisible,
}) => {
  const currentItem = target || project || null

  const [prevItem, setPrevItem] = useState<PreviewItem | null>(currentItem)
  const [activeItem, setActiveItem] = useState<PreviewItem | null>(currentItem)
  const [visitedMap, setVisitedMap] = useState<Record<string, PreviewItem>>(() =>
    currentItem ? { [currentItem.id]: currentItem } : {}
  )

  if (currentItem !== prevItem) {
    setPrevItem(currentItem)
    if (currentItem) {
      setActiveItem(currentItem)
      if (!visitedMap[currentItem.id]) {
        setVisitedMap({ ...visitedMap, [currentItem.id]: currentItem })
      }
    }
  }

  const visitedItems = Object.values(visitedMap)

  const clampedPos =
    typeof window !== 'undefined'
      ? calculateClampedPosition(
          cursorPosition.x,
          cursorPosition.y,
          window.innerWidth,
          window.innerHeight
        )
      : { x: 0, y: 0 }

  if (!activeItem) return null

  return (
    <div
      data-testid="cursor-floating-preview"
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-50 hidden md:block ${
        isVisible && currentItem ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        transform: `translate3d(${clampedPos.x}px, ${clampedPos.y}px, 0)`,
        width: `${PREVIEW_WIDTH}px`,
        transition: isVisible
          ? 'transform 100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-out, scale 150ms ease-out'
          : 'opacity 150ms ease-out, scale 150ms ease-out',
      }}
    >
      <div className="w-full flex flex-col rounded-xl bg-card/95 border border-border/80 shadow-2xl shadow-black/25 backdrop-blur-md overflow-hidden">
        {/* Miniature Browser Toolbar Chrome */}
        <div className="h-8 px-3 bg-muted/60 border-b border-border/70 flex items-center justify-between gap-2 select-none">
          {/* Window controls (traffic lights) */}
          <div className="flex items-center gap-1.5 w-14 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Address Bar Pill */}
          <div className="flex-1 max-w-[200px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-md bg-background/80 border border-border/50 text-[10px] font-mono text-muted-foreground truncate">
            <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" aria-hidden="true" />
            <span className="truncate">{activeItem.displayDomain}</span>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1 w-14 justify-end shrink-0 text-[10px] font-mono text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Online</span>
          </div>
        </div>

        {/* Viewport Area */}
        <div className="relative w-full aspect-[16/10] bg-background/95 overflow-hidden">
          {visitedItems.map((item) => {
            const isCurrent = item.id === activeItem.id
            return (
              <div
                key={item.id}
                className={`absolute inset-0 ${isCurrent ? 'block' : 'hidden'}`}
              >
                <LivePreviewIFrame
                  target={item}
                  isActive={isVisible && isCurrent}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
