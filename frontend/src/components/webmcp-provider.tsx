'use client'

import { useEffect } from 'react'

import { SITE_URL } from '@/lib/site'

/**
 * WebMCP Provider — exposes site tools to AI agents running in the browser
 * via the navigator.modelContext.provideContext() API (SEP-1649).
 *
 * @see https://webmachinelearning.github.io/webmcp/
 * @see https://developer.chrome.com/blog/webmcp-epp
 */
export function WebMCPProvider() {
  useEffect(() => {
    // WebMCP may not be available in all browsers yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelContext = (navigator as any).modelContext
    if (!modelContext?.provideContext) return

    try {
      modelContext.provideContext({
        tools: [
          {
            name: 'getProfileInfo',
            description:
              'Get profile information about Ashikur Rahman Puspo — a Backend Engineer & Software Developer from Dhaka, Bangladesh.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => ({
              name: 'Ashikur Rahman Puspo',
              title: 'Backend Engineer & Software Developer',
              location: 'Dhaka, Bangladesh',
              education: 'United International University',
              email: 'puspopuspo520@gmail.com',
              skills: [
                'Spring Boot',
                'Java',
                'Microservices',
                'System Design',
                'Docker',
                'Kubernetes',
                'AWS',
                'PostgreSQL',
                'MySQL',
                'REST APIs',
                'Cloud Architecture',
                'DevOps',
              ],
              social: {
                github: 'https://github.com/pacman-cli',
                linkedin: 'https://www.linkedin.com/in/iampuspo/',
                youtube: 'https://www.youtube.com/@springCraftDev',
                x: 'https://x.com/iam_puspo',
                instagram: 'https://www.instagram.com/iampuspoo/',
                facebook: 'https://www.facebook.com/pacman.puspo/',
                leetcode: 'https://leetcode.com/u/pacman-cli/',
                threads: 'https://www.threads.net/@pacman.puspo',
              },
              portfolioUrl: SITE_URL,
            }),
          },
          {
            name: 'getProjects',
            description:
              'Get a list of backend engineering projects from the portfolio with titles, descriptions, and technologies used.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => {
              try {
                const res = await fetch(`${SITE_URL}/api/v1/projects`)
                if (!res.ok) return { error: 'Failed to fetch projects' }
                return await res.json()
              } catch {
                return { error: 'Network error fetching projects' }
              }
            },
          },
          {
            name: 'getBlogPosts',
            description:
              'Get a list of technical blog posts about backend engineering, Spring Boot, and system design.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => {
              try {
                const res = await fetch(`${SITE_URL}/api/v1/blogs`)
                if (!res.ok) return { error: 'Failed to fetch blog posts' }
                return await res.json()
              } catch {
                return { error: 'Network error fetching blog posts' }
              }
            },
          },
          {
            name: 'getGalleryPhotos',
            description:
              'Get photos from the portfolio photography gallery.',
            inputSchema: {
              type: 'object' as const,
              properties: {
                pageToken: {
                  type: 'string',
                  description: 'Pagination token for fetching the next page of results',
                },
              },
            },
            execute: async (input: { pageToken?: string }) => {
              try {
                const url = new URL(`${SITE_URL}/api/gallery`)
                if (input.pageToken) url.searchParams.set('pageToken', input.pageToken)
                const res = await fetch(url.toString())
                if (!res.ok) return { error: 'Failed to fetch gallery photos' }
                return await res.json()
              } catch {
                return { error: 'Network error fetching gallery photos' }
              }
            },
          },
          {
            name: 'getResume',
            description:
              'Get the resume download URL and view link for Ashikur Rahman Puspo.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => ({
              downloadUrl:
                'https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ',
              viewUrl:
                'https://drive.google.com/file/d/1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ/view',
              onlineViewer: `${SITE_URL}/resume`,
            }),
          },
          {
            name: 'sendContactMessage',
            description:
              'Send a contact message to Ashikur Rahman Puspo. Messages are delivered via email.',
            inputSchema: {
              type: 'object' as const,
              properties: {
                name: {
                  type: 'string',
                  description: 'Your name (minimum 2 characters)',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Your email address',
                },
                message: {
                  type: 'string',
                  description: 'Your message (minimum 10 characters)',
                },
              },
              required: ['name', 'email', 'message'],
            },
            execute: async (input: { name: string; email: string; message: string }) => {
              try {
                const res = await fetch(`${SITE_URL}/api/v1/contact`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(input),
                })
                if (!res.ok) return { error: 'Failed to send message. Please try again.' }
                return { success: true, message: 'Message sent successfully!' }
              } catch {
                return { error: 'Network error sending message' }
              }
            },
          },
          {
            name: 'getSocialLinks',
            description:
              'Get all social media profile links for Ashikur Rahman Puspo.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => ({
              linkedin: 'https://www.linkedin.com/in/iampuspo/',
              github: 'https://github.com/pacman-cli',
              youtube: 'https://www.youtube.com/@springCraftDev',
              x: 'https://x.com/iam_puspo',
              instagram: 'https://www.instagram.com/iampuspoo/',
              facebook: 'https://www.facebook.com/pacman.puspo/',
              leetcode: 'https://leetcode.com/u/pacman-cli/',
              threads: 'https://www.threads.net/@pacman.puspo',
            }),
          },
          {
            name: 'getNavigationLinks',
            description:
              'Get all navigation links and page URLs for the portfolio site.',
            inputSchema: {
              type: 'object' as const,
              properties: {},
            },
            execute: async () => ({
              home: SITE_URL,
              aboutMe: `${SITE_URL}/about-me`,
              projects: `${SITE_URL}/projects`,
              blog: `${SITE_URL}/blog`,
              gallery: `${SITE_URL}/gallery`,
              resume: `${SITE_URL}/resume`,
              socialLinks: `${SITE_URL}/links`,
              agentDiscovery: {
                apiCatalog: `${SITE_URL}/.well-known/api-catalog`,
                oauthProtectedResource: `${SITE_URL}/.well-known/oauth-protected-resource`,
                mcpServerCard: `${SITE_URL}/.well-known/mcp/server-card.json`,
                agentSkills: `${SITE_URL}/.well-known/agent-skills/index.json`,
                authMd: `${SITE_URL}/auth.md`,
              },
            }),
          },
        ],
      })
    } catch {
      // WebMCP not supported in this browser or registration failed
    }
  }, [])

  return null
}
