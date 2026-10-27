'use client'

import React, { useState, useRef, useCallback } from 'react'
import { SocialFooterLinks, type SocialProfileItem } from '@/components/ui/social-links'
import Link from 'next/link'
import {
  CursorFloatingPreview,
  type PreviewItem,
} from '@/components/showcase/cursor-floating-preview'

const CURRENT_YEAR = new Date().getFullYear()

interface NavLinkMeta {
  href: string
  label: string
  ariaLabel: string
  description: string
}

const FOOTER_NAV_LINKS: NavLinkMeta[] = [
  {
    href: '/about-me',
    label: 'About Me',
    ariaLabel: 'About Me Page — Full Biography',
    description: 'Background, system architecture philosophy, and career journey.',
  },
  {
    href: '/projects',
    label: 'Projects',
    ariaLabel: 'Projects Page — Portfolio Archive',
    description: 'Architectural case studies, sequence diagrams, and deployed demos.',
  },
  {
    href: '/blog',
    label: 'Blog',
    ariaLabel: 'Blog Page — Technical Articles',
    description: 'Deep dives on Spring Boot, microservices, and AI engineering.',
  },
  {
    href: '/gallery',
    label: 'Gallery',
    ariaLabel: 'Gallery Page — Photo Journal',
    description: 'Curated photography, events, and personal moments.',
  },
  {
    href: '/resume',
    label: 'Resume',
    ariaLabel: 'Resume Page — Interactive & PDF',
    description: 'Full-stack engineering experience, skills, and certifications.',
  },
  {
    href: '/links',
    label: 'Links',
    ariaLabel: 'Links Page — Verified Profiles',
    description: 'Central directory of official social and developer profiles.',
  },
]

export const Footer: React.FC = () => {
  const [hoveredTarget, setHoveredTarget] = useState<PreviewItem | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnterNavLink = useCallback(
    (nav: NavLinkMeta, e: React.MouseEvent) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      setCursorPosition({ x: e.clientX, y: e.clientY })

      const item: PreviewItem = {
        id: nav.href,
        title: nav.label,
        shortTitle: nav.label,
        description: nav.description,
        url: nav.href,
        displayDomain: 'puspo.online',
        canEmbed: true,
      }

      hoverTimerRef.current = setTimeout(() => {
        setHoveredTarget(item)
      }, 200)
    },
    []
  )

  const handleMouseEnterSocial = useCallback(
    (profile: SocialProfileItem, e: React.MouseEvent) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      setCursorPosition({ x: e.clientX, y: e.clientY })

      let domain = 'puspo.online'
      try {
        domain = new URL(profile.url).hostname
      } catch {
        domain = profile.name.toLowerCase()
      }

      const item: PreviewItem = {
        id: profile.name,
        title: `${profile.name} (${profile.handle})`,
        shortTitle: profile.name,
        description: `Official ${profile.name} profile for MD Ashikur Rahman Puspo.`,
        url: profile.url,
        displayDomain: domain,
        canEmbed: false, // Route through preview proxy
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
    <footer className="py-12 border-t border-border mt-16 print:hidden relative">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            &copy; {CURRENT_YEAR} MD Ashikur Rahman Puspo
          </span>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-muted-foreground"
          >
            {FOOTER_NAV_LINKS.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                aria-label={nav.ariaLabel}
                data-testid={`footer-nav-${nav.label.toLowerCase().replace(/\s+/g, '-')}`}
                onMouseEnter={(e) => handleMouseEnterNavLink(nav, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SocialFooterLinks
            onHoverItem={handleMouseEnterSocial}
            onMoveItem={handleMouseMove}
            onLeaveItem={handleMouseLeave}
          />
        </div>
      </div>

      {/* Floating live preview following cursor */}
      <CursorFloatingPreview
        target={hoveredTarget}
        cursorPosition={cursorPosition}
        isVisible={Boolean(hoveredTarget)}
      />
    </footer>
  )
}
