import { BreadcrumbSchema } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { Camera, MapPin, Sparkles } from 'lucide-react'

export const metadata: Metadata = constructMetadata({
  title: 'Photo Gallery | MD Ashikur Rahman Puspo',
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
        <header className="border-b border-border/80 pb-6 mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Visual Journal & Photography
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Moments, Travels & Perspectives
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            Welcome to my personal photography archive. Beyond backend software architecture and database engineering, I enjoy capturing moments from my travels, campus life in Dhaka, urban landscapes, and quiet everyday reflections.
          </p>
        </header>

        {/* Server-rendered photography narrative & context */}
        <section className="grid sm:grid-cols-3 gap-4 mb-10 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Camera className="w-4 h-4 text-emerald-500" />
              <span>Composition & Light</span>
            </div>
            <p className="leading-relaxed">
              Exploring contrast, geometric lines, and natural lighting across outdoor and urban environments.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Travel & Memory</span>
            </div>
            <p className="leading-relaxed">
              Documenting journeys across Bangladesh, university milestones, and technical community gatherings.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Curated Archive</span>
            </div>
            <p className="leading-relaxed">
              High-resolution imagery integrated directly from Cloud storage with lightbox inspection.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="sr-only">Photo Grid Archive</h2>
          <GalleryGrid />
        </section>

        {/* Rich SEO text description */}
        <section className="mt-16 pt-8 border-t border-border/60 text-xs text-muted-foreground space-y-4">
          <h3 className="text-sm font-semibold text-foreground tracking-tight">About this Gallery Archive</h3>
          <p className="leading-relaxed">
            This collection brings together photography taken over recent years. Each image reflects a unique angle — whether capturing the kinetic energy of street life in Dhaka, peaceful natural scenery, or candid snapshots with fellow software developers and university friends.
          </p>
          <p className="leading-relaxed">
            Click on any photo in the grid above to launch the full-screen interactive lightbox viewer. You can navigate through the high-resolution images using keyboard arrow keys or touch gestures on mobile devices.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  )
}
