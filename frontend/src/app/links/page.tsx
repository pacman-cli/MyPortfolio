import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { SiX, SiFacebook, SiLeetcode, SiThreads, SiGithub, SiLinkedin, SiYoutube, SiInstagram } from 'react-icons/si'

export const metadata: Metadata = constructMetadata({
  title: 'Social Links | MD Ashikur Rahman Puspo — Connect With Me',
  description:
    'Official social links and profiles of MD Ashikur Rahman Puspo. Connect on GitHub, LinkedIn, LeetCode, YouTube @springCraftDev, Instagram, Facebook, X, and Threads.',
  url: absoluteUrl('/links'),
  keywords: [
    'MD Ashikur Rahman Puspo social links',
    'Ashikur Rahman Puspo profiles',
    'pacman-cli GitHub',
    'iampuspo LinkedIn',
    'iampuspoo Instagram',
    'pacman.puspo Facebook',
    'springCraftDev YouTube',
    'pacman-cli LeetCode',
    'Puspo social media',
    'Ashikur Rahman Puspo contact',
  ],
})

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@pacman-cli',
    url: 'https://github.com/pacman-cli',
    description: 'Open-source projects, contributions, and code repositories.',
    icon: <SiGithub className="w-5 h-5" />,
  },
  {
    name: 'LinkedIn',
    handle: '@iampuspo',
    url: 'https://www.linkedin.com/in/iampuspo/',
    description: 'Professional network, career updates, and industry connections.',
    icon: <SiLinkedin className="w-5 h-5" />,
  },
  {
    name: 'LeetCode',
    handle: '@pacman-cli',
    url: 'https://leetcode.com/u/pacman-cli/',
    description: 'Competitive programming, data structures, and algorithm practice.',
    icon: <SiLeetcode className="w-5 h-5" />,
  },
  {
    name: 'YouTube',
    handle: '@springCraftDev',
    url: 'https://www.youtube.com/@springCraftDev',
    description: 'Tech tutorials, coding content, and developer vlogs.',
    icon: <SiYoutube className="w-5 h-5" />,
  },
  {
    name: 'Facebook',
    handle: '@pacman.puspo',
    url: 'https://www.facebook.com/pacman.puspo/',
    description: 'Personal updates, community engagement, and social content.',
    icon: <SiFacebook className="w-5 h-5" />,
  },
  {
    name: 'Instagram',
    handle: '@iampuspoo',
    url: 'https://www.instagram.com/iampuspoo/',
    description: 'Behind-the-scenes, lifestyle, and visual storytelling.',
    icon: <SiInstagram className="w-5 h-5" />,
  },
  {
    name: 'X (Twitter)',
    handle: '@iam_puspo',
    url: 'https://x.com/iam_puspo',
    description: 'Tech opinions, industry thoughts, and real-time updates.',
    icon: <SiX className="w-4 h-4" />,
  },
  {
    name: 'Threads',
    handle: '@pacman.puspo',
    url: 'https://www.threads.net/@pacman.puspo',
    description: 'Conversations, threads, and casual tech discussions.',
    icon: <SiThreads className="w-5 h-5" />,
  },
  {
    name: 'Email',
    handle: 'puspopuspo520@gmail.com',
    url: 'mailto:puspopuspo520@gmail.com',
    description: 'Business inquiries, collaborations, and professional contact.',
    icon: <Mail className="w-5 h-5" />,
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-16">
      <JsonLd data={linksPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Social Links', item: '/links' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <section className="mb-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border border-zinc-800 shadow-2xl">
            <Image
              src="/profile.webp"
              alt="MD Ashikur Rahman Puspo"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="96px"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mb-2">
            MD Ashikur Rahman Puspo
          </h1>
          <p className="text-zinc-400 text-base mb-1">
            Backend Developer &middot; Software Engineer
          </p>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Building scalable systems with Spring Boot, Java, and AWS. Connect with me across platforms.
          </p>
        </section>

        {/* Social Links */}
        <section className="space-y-3">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors">{link.name}</span>
                  <span className="text-xs text-zinc-500">{link.handle}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">{link.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0" />
            </Link>
          ))}
        </section>

        {/* Website CTA */}
        <section className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            Visit Portfolio Website
            <ExternalLink className="w-4 h-4" />
          </Link>
        </section>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
