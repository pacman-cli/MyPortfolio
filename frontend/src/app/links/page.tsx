import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ExternalLink, Code2, MessageSquare } from 'lucide-react'
import { SiX, SiFacebook, SiLeetcode, SiThreads, SiGithub, SiYoutube, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { EmailOff } from '@/components/seo/email-off'

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
    description: 'Explore my open-source projects, Java Spring Boot microservices, Next.js applications, and algorithm repositories.',
    icon: <SiGithub className="w-4 h-4" />,
  },
  {
    name: 'LinkedIn',
    handle: '@iampuspo',
    url: 'https://www.linkedin.com/in/iampuspo/',
    description: 'Connect professionally for backend engineering opportunities, technical posts, and system architecture discussions.',
    icon: <FaLinkedin className="w-4 h-4" />,
  },
  {
    name: 'LeetCode',
    handle: '@pacman-cli',
    url: 'https://leetcode.com/u/pacman-cli/',
    description: 'Review my problem-solving practice in data structures, graph algorithms, and dynamic programming.',
    icon: <SiLeetcode className="w-4 h-4" />,
  },
  {
    name: 'YouTube',
    handle: '@springCraftDev',
    url: 'https://www.youtube.com/@springCraftDev',
    description: 'Watch technical tutorials, Spring Boot guides, microservice tutorials, and developer workflow breakdowns.',
    icon: <SiYoutube className="w-4 h-4" />,
  },
  {
    name: 'X (Twitter)',
    handle: '@iampuspo',
    url: 'https://x.com/iampuspo',
    description: 'Read short-form tech observations, software industry updates, and backend development thoughts.',
    icon: <SiX className="w-3.5 h-3.5" />,
  },
  {
    name: 'Facebook',
    handle: '@pacman.puspo',
    url: 'https://www.facebook.com/pacman.puspo/',
    description: 'Personal life updates, community events, and social connections.',
    icon: <SiFacebook className="w-4 h-4" />,
  },
  {
    name: 'Instagram',
    handle: '@iampuspoo',
    url: 'https://www.instagram.com/iampuspoo/',
    description: 'Behind-the-scenes photographs, travel captures, and everyday moments.',
    icon: <SiInstagram className="w-4 h-4" />,
  },
  {
    name: 'Threads',
    handle: '@pacman.puspo',
    url: 'https://www.threads.net/@pacman.puspo',
    description: 'Casual conversations, engineering snippets, and quick developer Q&As.',
    icon: <SiThreads className="w-4 h-4" />,
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
    itemListElement: socialLinks.map((link, index) => ({
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
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border border-border bg-muted shadow-sm">
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
            Backend Developer &middot; System Architect &middot; Dhaka, Bangladesh
          </p>
          <p className="text-xs text-muted-foreground mt-3 max-w-md leading-relaxed">
            Welcome to my official link directory. Here you can find all my verified developer profiles, open-source code repositories, video tutorials, and social channels.
          </p>
        </header>

        {/* Category overview cards */}
        <section className="grid sm:grid-cols-2 gap-3 mb-6 text-xs text-muted-foreground">
          <div className="p-3.5 rounded-lg border border-border/60 bg-card/40 flex items-start gap-3">
            <Code2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground block mb-0.5">Code & Engineering</span>
              <span>Explore source code on GitHub and algorithmic solutions on LeetCode.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-card/40 flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground block mb-0.5">Community & Content</span>
              <span>Watch tech content on YouTube (@springCraftDev) and join conversations on LinkedIn & X.</span>
            </div>
          </div>
        </section>

        <section className="space-y-2.5">
          <h2 className="sr-only">Directory of Verified Profiles</h2>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
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
                <p className="text-xs text-muted-foreground truncate">Send direct inquiries for project collaborations or technical consulting.</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            </a>
          </EmailOff>
        </section>

        <section className="mt-10 text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors"
          >
            Visit Portfolio Website
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <p className="text-xs text-muted-foreground">
            Looking for detailed case studies, project architecture diagrams, or my formal resume? Browse the main portfolio above.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  )
}
