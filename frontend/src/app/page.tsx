import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { getBlogSummaries } from '@/lib/api'
import { getProjects } from '@/lib/projects'
import dynamic from 'next/dynamic'

const SectionSkeleton = () => (
  <div className="min-h-[400px] py-20 flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
  </div>
)

const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About), { ssr: true, loading: () => <SectionSkeleton /> })
const TechnicalExpertise = dynamic(() => import('@/components/sections/technical-expertise').then(mod => mod.TechnicalExpertise), { ssr: true, loading: () => <SectionSkeleton /> })
const SelectedWork = dynamic(() => import('@/components/sections/selected-work').then(mod => mod.SelectedWork), { ssr: true, loading: () => <SectionSkeleton /> })
const JourneyTimeline = dynamic(() => import('@/components/sections/journey-timeline').then(mod => mod.JourneyTimeline), { ssr: true, loading: () => <SectionSkeleton /> })
const RecentBlogs = dynamic(() => import('@/components/sections/recent-blogs').then(mod => mod.RecentBlogs), { ssr: true, loading: () => <SectionSkeleton /> })
const ClosingSection = dynamic(() => import('@/components/sections/closing-section').then(mod => mod.ClosingSection), { ssr: true, loading: () => <SectionSkeleton /> })

export default async function Home() {
  const [blogs, projects] = await Promise.all([
    getBlogSummaries(),
    getProjects(),
  ])

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <Hero />
      <div className="space-y-12 md:space-y-20 pb-16">
        <About />
        <TechnicalExpertise />
        <SelectedWork projects={projects} />
        <JourneyTimeline />
        <RecentBlogs blogs={blogs} />
        <ClosingSection />
      </div>
      <Footer />
    </main>
  )
}
