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
    "Official portfolio of Ashikur Rahman Puspo, a backend developer from Dhaka, Bangladesh. Explore projects, technical articles, resume, and verified social profiles including GitHub, LinkedIn, and YouTube @springCraftDev.",
  email: "puspopuspo520@gmail.com",
  image: `${SITE_URL}/profile.jpg`,
  ogImage: `${SITE_URL}/og-image.png`,
  twitterHandle: "@iam_puspo",
  youtubeHandle: "@springCraftDev",
} as const

export const SOCIAL_PROFILES = [
  {
    name: "GitHub",
    handle: "pacman-cli",
    url: "https://github.com/pacman-cli",
  },
  {
    name: "LinkedIn",
    handle: "iampuspo",
    url: "https://www.linkedin.com/in/iampuspo/",
  },
  {
    name: "LeetCode",
    handle: "pacman-cli",
    url: "https://leetcode.com/u/pacman-cli/",
  },
  {
    name: "YouTube",
    handle: "springCraftDev",
    url: "https://www.youtube.com/@springCraftDev",
  },
  {
    name: "Instagram",
    handle: "pacman.puspo",
    url: "https://www.instagram.com/pacman.puspo/",
  },
  {
    name: "Facebook",
    handle: "pacman.puspo",
    url: "https://www.facebook.com/pacman.puspo/",
  },
  {
    name: "X",
    handle: "iam_puspo",
    url: "https://x.com/iam_puspo",
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
  { name: "Resume", url: absoluteUrl("/resume") },
  { name: "Social Links", url: absoluteUrl("/links") },
] as const

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return new URL(path, SITE_URL).toString()
}
