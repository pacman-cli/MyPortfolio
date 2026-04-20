import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
  title: 'Resume | MD Ashikur Rahman Puspo — Backend Developer',
  description:
    'View the professional resume of MD Ashikur Rahman Puspo — Backend Developer with expertise in Spring Boot, Java, MySQL, Docker, AWS, and Microservices Architecture.',
  url: absoluteUrl('/resume'),
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
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${absoluteUrl('/resume')}#webpage`,
          url: absoluteUrl('/resume'),
          name: `Resume | ${siteConfig.fullName}`,
          description: 'Professional resume, experience, and technical skills of MD Ashikur Rahman Puspo.',
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          about: { '@id': `${siteConfig.url}/#person` },
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Resume', item: '/resume' },
        ]}
      />
      {children}
    </>
  )
}
