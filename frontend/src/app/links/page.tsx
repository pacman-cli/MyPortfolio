import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Instagram, Linkedin, Mail, Youtube, ExternalLink } from 'lucide-react'
import { SiX, SiFacebook, SiLeetcode, SiThreads } from 'react-icons/si'

export const metadata: Metadata = constructMetadata({
  title: 'Social Links | MD Ashikur Rahman Puspo — Connect With Me',
  description:
    'Find all social media profiles and links of MD Ashikur Rahman Puspo. Connect on GitHub (pacman-cli), LinkedIn (iampuspo), LeetCode, YouTube (pacmanTichKule), Facebook, Instagram, X (Twitter), and Threads.',
  url: 'https://www.puspo.online/links',
  keywords: [
    'MD Ashikur Rahman Puspo social links',
    'Ashikur Rahman Puspo profiles',
    'pacman-cli GitHub',
    'iampuspo LinkedIn',
    'pacman.puspo Instagram',
    'pacman.puspo Facebook',
    'pacmanTichKule YouTube',
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
    icon: <Github className="w-6 h-6" />,
    color: 'hover:border-gray-400 dark:hover:border-gray-500',
  },
  {
    name: 'LinkedIn',
    handle: '@iampuspo',
    url: 'https://www.linkedin.com/in/iampuspo/',
    description: 'Professional network, career updates, and industry connections.',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'hover:border-blue-500',
  },
  {
    name: 'LeetCode',
    handle: '@pacman-cli',
    url: 'https://leetcode.com/u/pacman-cli/',
    description: 'Competitive programming, data structures, and algorithm practice.',
    icon: <SiLeetcode className="w-6 h-6" />,
    color: 'hover:border-amber-500',
  },
  {
    name: 'YouTube',
    handle: '@pacmanTichKule',
    url: 'https://www.youtube.com/@pacmanTichKule',
    description: 'Tech tutorials, coding content, and developer vlogs.',
    icon: <Youtube className="w-6 h-6" />,
    color: 'hover:border-red-500',
  },
  {
    name: 'Facebook',
    handle: '@pacman.puspo',
    url: 'https://www.facebook.com/pacman.puspo/',
    description: 'Personal updates, community engagement, and social content.',
    icon: <SiFacebook className="w-6 h-6" />,
    color: 'hover:border-blue-600',
  },
  {
    name: 'Instagram',
    handle: '@pacman.puspo',
    url: 'https://www.instagram.com/pacman.puspo/',
    description: 'Behind-the-scenes, lifestyle, and visual storytelling.',
    icon: <Instagram className="w-6 h-6" />,
    color: 'hover:border-pink-500',
  },
  {
    name: 'X (Twitter)',
    handle: '@iam_puspo',
    url: 'https://x.com/iam_puspo',
    description: 'Tech opinions, industry thoughts, and real-time updates.',
    icon: <SiX className="w-5 h-5" />,
    color: 'hover:border-gray-500',
  },
  {
    name: 'Threads',
    handle: '@pacman.puspo',
    url: 'https://www.threads.net/@pacman.puspo',
    description: 'Conversations, threads, and casual tech discussions.',
    icon: <SiThreads className="w-6 h-6" />,
    color: 'hover:border-gray-400',
  },
  {
    name: 'Email',
    handle: 'puspopuspo520@gmail.com',
    url: 'mailto:puspopuspo520@gmail.com',
    description: 'Business inquiries, collaborations, and professional contact.',
    icon: <Mail className="w-6 h-6" />,
    color: 'hover:border-emerald-500',
  },
]

// JSON-LD for this specific page — explicitly marks each social as a linked WebPage
const linksPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Social Links — MD Ashikur Rahman Puspo',
  description: 'All social media profiles and contact information for MD Ashikur Rahman Puspo.',
  url: 'https://www.puspo.online/links',
  mainEntity: {
    '@id': 'https://www.puspo.online/#person',
  },
  hasPart: socialLinks
    .filter((link) => !link.url.startsWith('mailto:'))
    .map((link) => ({
      '@type': 'WebPage',
      name: `${link.name} — ${link.handle}`,
      url: link.url,
    })),
}

export default function LinksPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(linksPageJsonLd) }}
        />
      </head>
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <section className="mb-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-lg">
            <Image
              src="/profile.jpg"
              alt="MD Ashikur Rahman Puspo"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            MD Ashikur Rahman Puspo
          </h1>
          <p className="text-muted-foreground text-lg mb-1">
            Backend Developer &middot; Software Engineer
          </p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Building scalable systems with Spring Boot, Java, and AWS. Connect with me across platforms.
          </p>
        </section>

        {/* Social Links Grid */}
        <section className="space-y-3">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className={`group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${link.color}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{link.name}</span>
                  <span className="text-sm text-muted-foreground">{link.handle}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{link.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-emerald-500 transition-colors shrink-0" />
            </Link>
          ))}
        </section>

        {/* Website CTA */}
        <section className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-md"
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
