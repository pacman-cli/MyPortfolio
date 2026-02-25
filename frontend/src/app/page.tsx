import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getBlogs } from '@/lib/api'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Skeleton placeholder for below-the-fold sections
const SectionSkeleton = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
  </div>
)

// Lazy load below-the-fold components with loading fallback
const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About), { ssr: true, loading: () => <SectionSkeleton /> })
const ClosingSection = dynamic(() => import('@/components/sections/closing-section').then(mod => mod.ClosingSection), { ssr: true, loading: () => <SectionSkeleton /> })
const GithubActivity = dynamic(() => import('@/components/sections/github-activity').then(mod => mod.GithubActivity), { ssr: true, loading: () => <SectionSkeleton /> })
const Highlights = dynamic(() => import('@/components/sections/highlights').then(mod => mod.Highlights), { ssr: true, loading: () => <SectionSkeleton /> })
const JourneyTimeline = dynamic(() => import('@/components/sections/journey-timeline').then(mod => mod.JourneyTimeline), { ssr: true, loading: () => <SectionSkeleton /> })
const RecentBlogs = dynamic(() => import('@/components/sections/recent-blogs').then(mod => mod.RecentBlogs), { ssr: true, loading: () => <SectionSkeleton /> })
const SelectedWork = dynamic(() => import('@/components/sections/selected-work').then(mod => mod.SelectedWork), { ssr: true, loading: () => <SectionSkeleton /> })
const Certifications = dynamic(() => import('@/components/sections/certifications').then(mod => mod.Certifications), { ssr: true, loading: () => <SectionSkeleton /> })
const TechnicalExpertise = dynamic(() => import('@/components/sections/technical-expertise').then(mod => mod.TechnicalExpertise), { ssr: true, loading: () => <SectionSkeleton /> })

export default async function Home() {
  const blogs = await getBlogs()

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Hero />
      <Highlights />
      <About />
      <TechnicalExpertise />
      <SelectedWork />
      <Certifications />
      <RecentBlogs blogs={blogs} />
      <Suspense fallback={<SectionSkeleton />}>
        <GithubActivity />
      </Suspense>
      <JourneyTimeline />
      <ClosingSection />
      <Footer />
    </main>
  )
}
