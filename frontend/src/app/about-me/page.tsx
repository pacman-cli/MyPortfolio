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

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <JsonLd data={aboutPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'About Me', item: '/about-me' },
        ]}
      />
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header Section */}
        <section className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-emerald-600 dark:text-emerald-400">MD Ashikur Rahman Puspo</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Computer Science Student, Backend Developer, and Software Engineer.
          </p>
        </section>

        {/* Narrative Content */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Text */}
          <div className="md:col-span-2 space-y-6">
            <AboutContent />
          </div>

          {/* Sidebar / Image */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-border/30 shadow-lg glass">
              <Image
                src="/profile.webp"
                alt="MD Ashikur Rahman Puspo - Backend Developer"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                quality={75}
              />
            </div>

            <div className="glass rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg tracking-tight">Connect</h3>
              <div className="flex flex-col gap-2.5">
                <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">GitHub</a>
                <a href="https://www.linkedin.com/in/iampuspo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">LinkedIn</a>
                <a href="https://leetcode.com/u/pacman-cli/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">LeetCode</a>
                <a href="https://www.instagram.com/iampuspoo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Instagram</a>
                <a href="https://www.facebook.com/pacman.puspo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Facebook</a>
                <a href="https://www.youtube.com/@springCraftDev" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">YouTube</a>
                <a href="https://x.com/iam_puspo" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">X (Twitter)</a>
                <a href="https://www.threads.net/@pacman.puspo" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Threads</a>
                <a href="mailto:puspopuspo520@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Email</a>
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
