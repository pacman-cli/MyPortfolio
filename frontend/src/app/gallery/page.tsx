import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export const metadata: Metadata = constructMetadata({
  title: 'Gallery | MD Ashikur Rahman Puspo',
  description: 'A curated collection of personal photos by MD Ashikur Rahman Puspo.',
  url: absoluteUrl('/gallery'),
})

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Moments
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 mb-3">
            Gallery
          </h1>
          <p className="text-zinc-400 max-w-xl text-base leading-relaxed">
            A curated collection of personal moments and memories.
          </p>
        </div>

        <GalleryGrid />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
