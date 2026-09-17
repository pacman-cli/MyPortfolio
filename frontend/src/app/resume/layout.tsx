import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { absoluteUrl, siteConfig } from '@/lib/site'

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
