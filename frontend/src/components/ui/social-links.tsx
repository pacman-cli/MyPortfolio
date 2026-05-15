import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import Link from 'next/link'
import { SiX, SiFacebook, SiLeetcode } from "react-icons/si"
import { SOCIAL_PROFILES, siteConfig } from '@/lib/site'

const iconMap: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: SiLeetcode,
  YouTube: Youtube,
  Instagram: Instagram,
  Facebook: SiFacebook,
  X: SiX,
}

const iconSize = "w-5 h-5"

const profiles = SOCIAL_PROFILES.filter(p => p.name !== 'Threads')

export function SocialLinks({ excludeEmail }: { excludeEmail?: boolean }) {
  return (
    <>
      {profiles.map(({ name, url }) => {
        const Icon = iconMap[name]
        if (!Icon) return null
        return (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} Profile`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon className={iconSize} aria-hidden="true" />
          </Link>
        )
      })}
      {!excludeEmail && (
        <Link
          href={`mailto:${siteConfig.email}`}
          aria-label="Email Me"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className={iconSize} aria-hidden="true" />
        </Link>
      )}
    </>
  )
}

export function SocialHeroLinks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex gap-3 items-center"}>
      {profiles.slice(0, 7).map(({ name, url }) => {
        const Icon = iconMap[name]
        if (!Icon) return null
        return (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="p-3 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full transition-all duration-200 hover:-translate-y-1 bg-muted/50 border border-border"
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </Link>
        )
      })}
    </div>
  )
}

export function SocialFooterLinks() {
  return <SocialLinks excludeEmail />
}

export function SocialQuietLinks() {
  const keyProfiles = ['GitHub', 'LinkedIn', 'YouTube', 'Facebook', 'LeetCode', 'X', 'Instagram']
  const items = SOCIAL_PROFILES.filter(p => keyProfiles.includes(p.name))

  return (
    <>
      {items.map(({ name, url }) => (
        <Link
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span className="relative">
            {name}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
        </Link>
      ))}
      <Link
        href="/links"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="relative">
          All Profiles
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
      </Link>
    </>
  )
}
