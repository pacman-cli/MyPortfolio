import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { SiX, SiFacebook, SiLeetcode, SiThreads, SiGithub, SiYoutube, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

export const metadata: Metadata = constructMetadata({
  title: 'Social Links | MD Ashikur Rahman Puspo',
  description: 'Connect with Ashikur Rahman Puspo across GitHub, LinkedIn, LeetCode, YouTube, and social media channels in one official hub.',
  url: absoluteUrl('/links'),
})

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@pacman-cli',
    url: 'https://github.com/pacman-cli',
    description: 'Open-source projects and code repositories.',
    icon: <SiGithub className="w-4 h-4" />,
  },
  {
    name: 'LinkedIn',
    handle: '@iampuspo',
    url: 'https://www.linkedin.com/in/iampuspo/',
    description: 'Professional network and career updates.',
    icon: <FaLinkedin className="w-4 h-4" />,
  },
  {
    name: 'LeetCode',
    handle: '@pacman-cli',
    url: 'https://leetcode.com/u/pacman-cli/',
    description: 'Data structures and algorithm practice.',
    icon: <SiLeetcode className="w-4 h-4" />,
  },
  {
    name: 'YouTube',
    handle: '@springCraftDev',
    url: 'https://www.youtube.com/@springCraftDev',
    description: 'Tech tutorials and developer vlogs.',
    icon: <SiYoutube className="w-4 h-4" />,
  },
  {
    name: 'Facebook',
    handle: '@pacman.puspo',
    url: 'https://www.facebook.com/pacman.puspo/',
    description: 'Personal updates and social content.',
    icon: <SiFacebook className="w-4 h-4" />,
  },
  {
    name: 'Instagram',
    handle: '@iampuspoo',
    url: 'https://www.instagram.com/iampuspoo/',
    description: 'Visual moments and behind-the-scenes.',
    icon: <SiInstagram className="w-4 h-4" />,
  },
  {
    name: 'X (Twitter)',
    handle: '@iam_puspo',
    url: 'https://x.com/iam_puspo',
    description: 'Industry thoughts and real-time updates.',
    icon: <SiX className="w-3.5 h-3.5" />,
  },
  {
    name: 'Threads',
    handle: '@pacman.puspo',
    url: 'https://www.threads.net/@pacman.puspo',
    description: 'Conversations and casual tech thoughts.',
    icon: <SiThreads className="w-4 h-4" />,
  },
  {
    name: 'Email',
    handle: 'hello@puspo.online',
    url: 'mailto:hello@puspo.online',
    description: 'Direct email contact.',
    icon: <Mail className="w-4 h-4" />,
  },
]

const linksPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl('/links')}#webpage`,
  name: 'Social Links — MD Ashikur Rahman Puspo',
  description: 'Official profile directory and contact links for MD Ashikur Rahman Puspo.',
  url: absoluteUrl('/links'),
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@id': `${siteConfig.url}/#person`,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: socialLinks
      .filter((link) => !link.url.startsWith('mailto:'))
      .map((link, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${link.name} — ${link.handle}`,
        url: link.url,
      })),
  },
}

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <JsonLd data={linksPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Social Links', item: '/links' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <section className="mb-10 text-center flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border border-border bg-muted">
            <Image
              src="/profile.webp"
              alt="MD Ashikur Rahman Puspo"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              sizes="80px"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            MD Ashikur Rahman Puspo
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Backend Developer &middot; Software Engineer
          </p>
        </section>

        <section className="space-y-2.5">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-4 p-3.5 rounded-lg border border-border bg-card/50 hover:border-foreground/30 transition-colors group block"
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
        </section>

        <section className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors"
          >
            Visit Portfolio Website
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
