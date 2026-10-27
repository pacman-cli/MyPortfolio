import { ArrowUpRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { SiX, SiFacebook, SiLeetcode, SiGithub, SiInstagram } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa"
import { SOCIAL_PROFILES, siteConfig } from '@/lib/site'
import { EmailOff } from '@/components/seo/email-off'

const iconMap: Record<string, React.ElementType> = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  Instagram: SiInstagram,
  Facebook: SiFacebook,
  X: SiX,
}

const iconSize = "w-5 h-5"

const profiles = SOCIAL_PROFILES.filter(p => p.name !== 'Threads')

export type SocialProfileItem = (typeof SOCIAL_PROFILES)[number]

function SocialIconLink({
  name,
  url,
  icon: Icon,
  onHover,
  onMove,
  onLeave,
}: {
  name: string
  url: string
  icon: React.ElementType
  onHover?: (e: React.MouseEvent) => void
  onMove?: (e: React.MouseEvent) => void
  onLeave?: () => void
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} Profile`}
      onMouseEnter={onHover}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="text-muted-foreground hover:text-primary hover:scale-110 transition-all inline-flex"
    >
      <Icon className={iconSize} aria-hidden="true" />
    </a>
  )
}

export function SocialLinks({
  excludeEmail,
  onHoverItem,
  onMoveItem,
  onLeaveItem,
}: {
  excludeEmail?: boolean
  onHoverItem?: (profile: SocialProfileItem, e: React.MouseEvent) => void
  onMoveItem?: (e: React.MouseEvent) => void
  onLeaveItem?: () => void
}) {
  return (
    <>
      {profiles.map((profile) => {
        const { name, url } = profile
        const Icon = iconMap[name]
        if (!Icon) return null
        return (
          <SocialIconLink
            key={name}
            name={name}
            url={url}
            icon={Icon}
            onHover={onHoverItem ? (e) => onHoverItem(profile, e) : undefined}
            onMove={onMoveItem}
            onLeave={onLeaveItem}
          />
        )
      })}

      {!excludeEmail && (
        <EmailOff>
          <a
            href={`mailto:${siteConfig.email}`}
            data-cfemail="false"
            aria-label="Email Me"
            className="text-muted-foreground hover:text-primary hover:scale-110 transition-all inline-flex"
          >
            <Mail className={iconSize} aria-hidden="true" />
          </a>
        </EmailOff>
      )}
    </>
  )
}

export function SocialHeroLinks({ className }: { className?: string }) {
  const heroProfiles = ['GitHub', 'LinkedIn', 'X']
  const items = SOCIAL_PROFILES.filter(p => heroProfiles.includes(p.name))

  return (
    <div className={className ?? "flex flex-wrap gap-x-5 gap-y-2 items-center text-xs font-mono"}>
      {items.map(({ name, url }) => {
        const Icon = iconMap[name]
        return (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
            <span className="relative">
              {name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-200" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export function SocialFooterLinks({
  onHoverItem,
  onMoveItem,
  onLeaveItem,
}: {
  onHoverItem?: (profile: SocialProfileItem, e: React.MouseEvent) => void
  onMoveItem?: (e: React.MouseEvent) => void
  onLeaveItem?: () => void
}) {
  return (
    <SocialLinks
      excludeEmail
      onHoverItem={onHoverItem}
      onMoveItem={onMoveItem}
      onLeaveItem={onLeaveItem}
    />
  )
}

export function SocialQuietLinks() {
  const keyProfiles = ['GitHub', 'LinkedIn', 'Facebook', 'LeetCode', 'X', 'Instagram']
  const items = SOCIAL_PROFILES.filter(p => keyProfiles.includes(p.name))

  return (
    <>
      {items.map(({ name, url }) => {
        const Icon = iconMap[name]
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105"
          >
            {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
            <span className="relative">
              {name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
          </a>
        )
      })}
      <a
        href="/links"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105"
      >
        <span className="relative">
          All Profiles
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
      </a>
    </>
  )
}
