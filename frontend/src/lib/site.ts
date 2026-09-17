const FALLBACK_SITE_URL = "https://www.puspo.online"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || FALLBACK_SITE_URL

export const siteConfig = {
  url: SITE_URL,
  siteName: "Ashikur Rahman Puspo",
  shortName: "Puspo",
  fullName: "MD Ashikur Rahman Puspo",
  personName: "Ashikur Rahman Puspo",
  jobTitle: "Backend Developer",
  description:
    "Portfolio of Ashikur Rahman Puspo — Backend Engineer specializing in Java, Spring Boot, Microservices, and System Design in Dhaka.",
  email: "hello@puspo.online",
  image: `${SITE_URL}/profile.webp`,
  ogImage: `${SITE_URL}/opengraph-image`,
  twitterHandle: "@iampuspo",
  youtubeHandle: "@springCraftDev",
  resumeDownloadUrl: "https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ",
} as const

export const SOCIAL_PROFILES = [
  {
    name: "LinkedIn",
    handle: "iampuspo",
    url: "https://www.linkedin.com/in/iampuspo/",
  },
  {
    name: "GitHub",
    handle: "pacman-cli",
    url: "https://github.com/pacman-cli",
  },
  {
    name: "YouTube",
    handle: "springCraftDev",
    url: "https://www.youtube.com/@springCraftDev",
  },
  {
    name: "X",
    handle: "iampuspo",
    url: "https://x.com/iampuspo",
  },
  {
    name: "Instagram",
    handle: "iampuspoo",
    url: "https://www.instagram.com/iampuspoo/",
  },
  {
    name: "Facebook",
    handle: "pacman.puspo",
    url: "https://www.facebook.com/pacman.puspo/",
  },
  {
    name: "LeetCode",
    handle: "pacman-cli",
    url: "https://leetcode.com/u/pacman-cli/",
  },
  {
    name: "Threads",
    handle: "pacman.puspo",
    url: "https://www.threads.net/@pacman.puspo",
  },
] as const

export const SAME_AS_LINKS = SOCIAL_PROFILES.map((profile) => profile.url)

export const SITE_NAVIGATION = [
  { name: "About Me", url: absoluteUrl("/about-me") },
  { name: "Projects", url: absoluteUrl("/projects") },
  { name: "Blog", url: absoluteUrl("/blog") },
  { name: "Gallery", url: absoluteUrl("/gallery") },
  { name: "Resume", url: absoluteUrl("/resume") },
  { name: "Social Links", url: absoluteUrl("/links") },
] as const

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return new URL(path, SITE_URL).toString()
}
