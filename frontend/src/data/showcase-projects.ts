// src/data/showcase-projects.ts

export interface ShowcaseProject {
  id: string
  title: string
  shortTitle: string
  description: string
  url: string
  displayDomain: string
  techStack: string[]
  canEmbed: boolean
  highlights?: string[]
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'marketrix',
    title: 'Marketrix — Market Intelligence Platform',
    shortTitle: 'Marketrix',
    description:
      'Professional market intelligence workspace for founders to brief research needs, compare expert reports, and connect with vetted analysts.',
    url: 'https://marketrix-xi.vercel.app/marketplace',
    displayDomain: 'marketrix-xi.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Spring Boot'],
    canEmbed: true,
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker — Real-Time Personal Finance',
    shortTitle: 'Expense Tracker',
    description:
      'Personal finance platform with real-time expense logging, savings goal progress tracking, and interactive category breakdowns.',
    url: 'https://expense-tracker-3eh1j64an-puspos-projects.vercel.app',
    displayDomain: 'expense-tracker.vercel.app',
    techStack: ['Next.js', 'Spring Boot', 'MySQL', 'JWT', 'Docker'],
    canEmbed: false,
    highlights: ['Expense Analytics', 'Savings Goals', 'Budget Tracking', 'Multi-Device Sync'],
  },
  {
    id: 'shelf-to-tales',
    title: 'Shelf to Tales — Community Bookstore',
    shortTitle: 'Shelf to Tales',
    description:
      'Community bookstore platform to discover, read, curate collections, and share books with a community of passionate readers.',
    url: 'https://shelf-to-tales-rho.vercel.app',
    displayDomain: 'shelf-to-tales-rho.vercel.app',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    canEmbed: false,
    highlights: ['Book Catalog', 'Reading Lists', 'Curated Reviews', 'Community Shelves'],
  },
  {
    id: 'uptime-monitoring',
    title: 'Uptime Monitoring — Real-Time Endpoint Health',
    shortTitle: 'Uptime Monitoring',
    description:
      'High-availability service monitoring platform providing real-time ping analytics, uptime tracking, and instant incident alerts.',
    url: 'https://uptime-monitoring-orcin.vercel.app',
    displayDomain: 'uptime-monitoring-orcin.vercel.app',
    techStack: ['React', 'Vite', 'Framer Motion', 'Java', 'Tailwind CSS'],
    canEmbed: true,
  },
  {
    id: 'ecommare-medi',
    title: 'Ecommare Medi — Pharmacy & Healthcare Platform',
    shortTitle: 'Ecommare Medi',
    description:
      'Certified online pharmacy with prescription validation, authentic medicine catalog, and express medical delivery checkout.',
    url: 'https://ecommare-medi-frontend.vercel.app',
    displayDomain: 'ecommare-medi-frontend.vercel.app',
    techStack: ['Next.js', 'Spring Boot', 'MySQL', 'Docker', 'Tailwind CSS'],
    canEmbed: true,
  },
  {
    id: 'stay-mate',
    title: 'Stay Mate — Rental & Roommate Matching',
    shortTitle: 'Stay Mate',
    description:
      'Verified rental room and roommate platform featuring profile verification, dynamic search filters, and in-app messaging.',
    url: 'https://stay-mate-puspos-projects.vercel.app',
    displayDomain: 'stay-mate.vercel.app',
    techStack: ['Next.js', 'TypeScript', 'Spring Boot', 'MySQL', 'JWT'],
    canEmbed: false,
    highlights: ['Roommate Finder', 'Verified Listings', 'Search Filters', 'Direct Messaging'],
  },
  {
    id: 'devforge',
    title: 'DevForge — Instant Developer Utilities Suite',
    shortTitle: 'DevForge',
    description:
      'Fast, browser-based developer utilities — JSON formatting, JWT decoding, UUID generation, timestamp conversion, and regex testing with zero latency.',
    url: 'https://devforge.puspo.online',
    displayDomain: 'devforge.puspo.online',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Developer Tools'],
    canEmbed: false,
    highlights: ['JSON Formatter', 'JWT Inspector', 'UUID Generator', 'Regex Tester'],
  },
]
