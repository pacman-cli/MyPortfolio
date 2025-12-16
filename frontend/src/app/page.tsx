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

import { Blog } from '@/types';

async function getBlogs(): Promise<Blog[]> {
  try {
    // Fetch from backend container internal URL
    const res = await fetch('http://portfolio-backend:8080/api/v1/blogs', { 
      cache: 'no-store',
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
        console.error('Failed to fetch blogs:', res.status, res.statusText);
        return [];
    }
    
    const data = await res.json();
    if (Array.isArray(data)) {
        return data.sort((a: Blog, b: Blog) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
    return [];
  } catch (error) {
    console.error('Error loading blogs:', error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubActivity />
      <Experience />
      <RecentBlogs blogs={blogs} />
      <Contact />
      <Footer />
    </main>
  );
}
