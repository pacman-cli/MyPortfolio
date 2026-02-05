import { Footer } from '@/components/footer'
import { About } from '@/components/sections/about'
import { ClosingSection } from '@/components/sections/closing-section'
import { GithubActivity } from '@/components/sections/github-activity'
import { Hero } from '@/components/sections/hero'
import { Highlights } from '@/components/sections/highlights'
import { JourneyTimeline } from '@/components/sections/journey-timeline'
import { SelectedWork } from '@/components/sections/selected-work'
import { TechnicalExpertise } from '@/components/sections/technical-expertise'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Hero />
      <Highlights />
      <About />
      <TechnicalExpertise />
      <SelectedWork />
      <GithubActivity />
      <JourneyTimeline />
      <ClosingSection />
      <Footer />
    </main>
  )
}
