import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import { Camera } from 'lucide-react'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export const metadata: Metadata = constructMetadata({
  title: 'Gallery | MD Ashikur Rahman Puspo',
  description: 'A curated collection of personal photos by MD Ashikur Rahman Puspo.',
  url: absoluteUrl('/gallery'),
})

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-6xl pt-28 pb-20">
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
                  Gallery
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                A curated collection of personal moments.
              </p>
            </div>
          </div>
        </div>

        <GalleryGrid />
      </div>
      <Footer />
    </main>
  )
}
