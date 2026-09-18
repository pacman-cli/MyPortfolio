import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { TechnicalExpertise } from '@/components/sections/technical-expertise'
import { SelectedWork } from '@/components/sections/selected-work'
import { JourneyTimeline } from '@/components/sections/journey-timeline'
import { RecentBlogs } from '@/components/sections/recent-blogs'
import { ClosingSection } from '@/components/sections/closing-section'
import { getBlogSummaries } from '@/lib/api'
import { getProjects } from '@/lib/projects'

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
