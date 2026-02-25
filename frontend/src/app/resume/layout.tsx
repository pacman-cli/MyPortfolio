import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
  title: 'Resume | MD Ashikur Rahman Puspo — Backend Developer',
  description:
    'View the professional resume of MD Ashikur Rahman Puspo — Backend Developer with expertise in Spring Boot, Java, MySQL, Docker, AWS, and Microservices Architecture.',
  url: 'https://puspo.online/resume',
  keywords: [
    'Puspo Resume',
    'MD Ashikur Rahman Puspo Resume',
    'Backend Developer Resume',
    'Software Engineer Resume',
    'Spring Boot Developer Resume',
    'Java Developer Resume Bangladesh',
  ],
})

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
