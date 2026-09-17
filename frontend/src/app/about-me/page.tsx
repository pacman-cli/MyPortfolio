import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { EmailOff } from '@/components/seo/email-off'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import { AboutContent } from './_components/about-content'

export const metadata: Metadata = constructMetadata({
  title: 'About MD Ashikur Rahman Puspo | Backend Developer',
  description: 'Learn about MD Ashikur Rahman Puspo, a Backend Engineer specializing in Java, Spring Boot, Microservices, and System Design.',
  url: absoluteUrl('/about-me'),
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
  { label: 'YouTube', href: 'https://www.youtube.com/@springCraftDev' },
  { label: 'X (Twitter)', href: 'https://x.com/iam_puspo' },
  { label: 'Email', href: 'mailto:hello@puspo.online' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <JsonLd data={aboutPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'About Me', item: '/about-me' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-b border-border/80 pb-6 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Biography
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            MD Ashikur Rahman Puspo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Backend Software Engineer & System Architect
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8">
            <AboutContent />
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src="/profile.webp"
                alt="MD Ashikur Rahman Puspo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 300px"
                quality={85}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <div className="rounded-lg p-5 border border-border bg-card/50 flex flex-col gap-3">
              <h3 className="font-semibold text-xs font-mono uppercase tracking-wider text-foreground">Social & Contact</h3>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <EmailOff key={link.label}>
                    <a
                      href={link.href}
                      data-cfemail={link.href.startsWith('mailto:') ? 'false' : undefined}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono block"
                    >
                      {link.label} &rarr;
                    </a>
                  </EmailOff>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
