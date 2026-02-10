import { Footer } from '@/components/footer'
import { About } from '@/components/sections/about'
import { ClosingSection } from '@/components/sections/closing-section'
import { GithubActivity } from '@/components/sections/github-activity'
import { Hero } from '@/components/sections/hero'
import { Highlights } from '@/components/sections/highlights'
import { JourneyTimeline } from '@/components/sections/journey-timeline'
import { RecentBlogs } from '@/components/sections/recent-blogs'
import { SelectedWork } from '@/components/sections/selected-work'
import { TechnicalExpertise } from '@/components/sections/technical-expertise'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getBlogs } from '@/lib/api'

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
