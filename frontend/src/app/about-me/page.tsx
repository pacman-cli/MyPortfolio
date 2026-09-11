import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import { AboutContent } from './_components/about-content'

export const metadata: Metadata = constructMetadata({
  title: 'About MD Ashikur Rahman Puspo | Backend Developer & Software Engineer',
  description: 'Learn about MD Ashikur Rahman Puspo — a Backend Developer specializing in Spring Boot, Java, MySQL, Docker, and Cloud Architecture. Discover his journey, skills, and professional background.',
  url: 'https://www.puspo.online/about-me',
  keywords: [
    'About Puspo',
    'MD Ashikur Rahman Puspo',
    'Ashikur Rahman Puspo',
    'Backend Developer Bangladesh',
    'Software Engineer',
    'Spring Boot Developer',
    'pacman-cli',
    'pacman.puspo',
    'springCraftDev',
    'LeetCode pacman-cli',
    'iampuspo LinkedIn',
  ],
})

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${absoluteUrl('/about-me')}#webpage`,
  url: absoluteUrl('/about-me'),
  name: `About ${siteConfig.fullName}`,
  description: 'Background, skills, education, and verified social profiles for MD Ashikur Rahman Puspo.',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#person` },
  mainEntity: { '@id': `${siteConfig.url}/#person` },
}

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/pacman-cli' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/iampuspo/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/pacman-cli/' },
  { label: 'Instagram', href: 'https://www.instagram.com/iampuspoo/' },
  { label: 'Facebook', href: 'https://www.facebook.com/pacman.puspo/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@springCraftDev' },
  { label: 'X (Twitter)', href: 'https://x.com/iam_puspo' },
  { label: 'Threads', href: 'https://www.threads.net/@pacman.puspo' },
  { label: 'Email', href: 'mailto:puspopuspo520@gmail.com' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-16">
      <JsonLd data={aboutPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'About Me', item: '/about-me' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <section className="mb-16">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-3">
            About
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
            MD Ashikur Rahman <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Puspo</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Computer Science Student, Backend Developer, and Software Engineer.
          </p>
        </section>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Text */}
          <div className="md:col-span-2 space-y-6">
            <AboutContent />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
              <Image
                src="/profile.webp"
                alt="MD Ashikur Rahman Puspo - Backend Developer"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                quality={75}
              />
            </div>

            <div className="rounded-xl p-6 bg-zinc-900/50 border border-zinc-800/80 space-y-4">
              <h3 className="font-bold text-base text-zinc-100 tracking-tight">Connect</h3>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
