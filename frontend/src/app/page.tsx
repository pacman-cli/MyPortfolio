import { Footer } from '@/components/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { TechnicalExpertise } from '@/components/sections/technical-expertise'
import { ProjectsShowcase } from '@/components/showcase/projects-showcase'
import { JourneyTimeline } from '@/components/sections/journey-timeline'
import { RecentBlogs } from '@/components/sections/recent-blogs'
import { ClosingSection } from '@/components/sections/closing-section'
import { getBlogSummaries } from '@/lib/api'

export default async function Home() {
  const blogs = await getBlogSummaries()

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <Hero />
      <div className="space-y-12 md:space-y-20 pb-16">
        <About />
        <TechnicalExpertise />
        <ProjectsShowcase />
        <JourneyTimeline />
        <RecentBlogs blogs={blogs} />
        <ClosingSection />
      </div>
      <Footer />
    </main>
  )
}
