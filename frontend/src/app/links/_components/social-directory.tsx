'use client'

import React, { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { EmailOff } from '@/components/seo/email-off'
import {
  CursorFloatingPreview,
  type PreviewItem,
} from '@/components/showcase/cursor-floating-preview'

export interface SocialLinkItem {
  name: string
  handle: string
  url: string
  description: string
  icon: React.ReactNode
}

interface SocialDirectoryProps {
  socialLinks: SocialLinkItem[]
}

export const SocialDirectory: React.FC<SocialDirectoryProps> = ({ socialLinks }) => {
  const [hoveredTarget, setHoveredTarget] = useState<PreviewItem | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(
    (link: SocialLinkItem, e: React.MouseEvent) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      setCursorPosition({ x: e.clientX, y: e.clientY })

      let domain = 'puspo.online'
      try {
        domain = new URL(link.url).hostname
      } catch {
        domain = link.name.toLowerCase()
      }

      const item: PreviewItem = {
        id: link.name,
        title: `${link.name} (${link.handle})`,
        shortTitle: link.name,
        description: link.description,
        url: link.url,
        displayDomain: domain,
        canEmbed: false,
      }

      hoverTimerRef.current = setTimeout(() => {
        setHoveredTarget(item)
      }, 200)
    },
    []
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setHoveredTarget(null)
  }, [])

  return (
    <section className="space-y-2.5 relative">
      <h2 className="sr-only">Directory of Verified Profiles</h2>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`social-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          onMouseEnter={(e) => handleMouseEnter(link, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-4 p-3.5 rounded-lg border border-border bg-card/50 hover:border-foreground/30 transition-colors group block cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
            {link.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-xs">{link.name}</span>
              <span className="text-[11px] font-mono text-muted-foreground">{link.handle}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{link.description}</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      ))}

      {/* Email link with Cloudflare EmailOff protection */}
      <EmailOff>
        <a
          href="mailto:hello@puspo.online"
          data-cfemail="false"
          className="flex items-center gap-4 p-3.5 rounded-lg border border-border bg-card/50 hover:border-foreground/30 transition-colors group block"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-xs">Direct Email</span>
              <span className="text-[11px] font-mono text-muted-foreground">hello@puspo.online</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              Send direct inquiries for project collaborations or technical consulting.
            </p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </a>
      </EmailOff>

      {/* Floating live preview following cursor */}
      <CursorFloatingPreview
        target={hoveredTarget}
        cursorPosition={cursorPosition}
        isVisible={Boolean(hoveredTarget)}
      />
    </section>
  )
}
