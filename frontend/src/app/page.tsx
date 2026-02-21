import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getBlogs } from '@/lib/api'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Skeleton placeholder for below-the-fold sections
const SectionSkeleton = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
)

// Lazy load below-the-fold components with loading fallback
const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About), { loading: () => <SectionSkeleton /> })
const ClosingSection = dynamic(() => import('@/components/sections/closing-section').then(mod => mod.ClosingSection), { loading: () => <SectionSkeleton /> })
const GithubActivity = dynamic(() => import('@/components/sections/github-activity').then(mod => mod.GithubActivity), { loading: () => <SectionSkeleton /> })
const Highlights = dynamic(() => import('@/components/sections/highlights').then(mod => mod.Highlights), { loading: () => <SectionSkeleton /> })
const JourneyTimeline = dynamic(() => import('@/components/sections/journey-timeline').then(mod => mod.JourneyTimeline), { loading: () => <SectionSkeleton /> })
const RecentBlogs = dynamic(() => import('@/components/sections/recent-blogs').then(mod => mod.RecentBlogs), { loading: () => <SectionSkeleton /> })
const SelectedWork = dynamic(() => import('@/components/sections/selected-work').then(mod => mod.SelectedWork), { loading: () => <SectionSkeleton /> })
const TechnicalExpertise = dynamic(() => import('@/components/sections/technical-expertise').then(mod => mod.TechnicalExpertise), { loading: () => <SectionSkeleton /> })

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
