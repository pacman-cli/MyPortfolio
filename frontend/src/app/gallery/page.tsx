import { BreadcrumbSchema } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export const metadata: Metadata = constructMetadata({
  title: 'Gallery | MD Ashikur Rahman Puspo',
  description: 'A curated collection of personal photography, travel memories, and visual stories by MD Ashikur Rahman Puspo.',
  url: absoluteUrl('/gallery'),
})

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Gallery', item: '/gallery' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-b border-border/80 pb-6 mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Photography Grid
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Moments & Perspectives
          </h1>
          <p className="text-xs text-muted-foreground mt-2">
            A curated visual collection of personal memories and travel photography.
          </p>
        </div>

        <GalleryGrid />
      </div>
      <Footer />
    </main>
  )
}
