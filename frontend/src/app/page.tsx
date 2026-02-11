import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getBlogs } from '@/lib/api'
import dynamic from 'next/dynamic'

// Lazy load below-the-fold components
const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About))
const ClosingSection = dynamic(() => import('@/components/sections/closing-section').then(mod => mod.ClosingSection))
const GithubActivity = dynamic(() => import('@/components/sections/github-activity').then(mod => mod.GithubActivity))
const Highlights = dynamic(() => import('@/components/sections/highlights').then(mod => mod.Highlights))
const JourneyTimeline = dynamic(() => import('@/components/sections/journey-timeline').then(mod => mod.JourneyTimeline))
const RecentBlogs = dynamic(() => import('@/components/sections/recent-blogs').then(mod => mod.RecentBlogs))
const SelectedWork = dynamic(() => import('@/components/sections/selected-work').then(mod => mod.SelectedWork))
const TechnicalExpertise = dynamic(() => import('@/components/sections/technical-expertise').then(mod => mod.TechnicalExpertise))

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
      <GithubActivity />
      <JourneyTimeline />
      <ClosingSection />
      <Footer />
    </main>
  )
}
