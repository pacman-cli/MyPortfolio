import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { RecentBlogs } from '@/components/sections/recent-blogs';
import { GithubActivity } from '@/components/sections/github-activity';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubActivity />
      <Experience />
      <RecentBlogs />
      <Contact />
      <Footer />
    </main>
  );
}
