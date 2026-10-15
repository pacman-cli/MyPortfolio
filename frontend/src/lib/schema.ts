import { SAME_AS_LINKS, SOCIAL_PROFILES, SITE_NAVIGATION, siteConfig } from './site'

/* ------------------------------------------------------------------ */
/*  Canonical Entity IDs — shared across every page's JSON-LD         */
/* ------------------------------------------------------------------ */

export const PERSON_ID = `${siteConfig.url}/#person`
export const WEBSITE_ID = `${siteConfig.url}/#website`

/* ------------------------------------------------------------------ */
/*  Person — the canonical entity node Google should consolidate      */
/* ------------------------------------------------------------------ */

export function personSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.personName,
    honorificPrefix: 'MD.',
    alternateName: [
      'Ashikur Rahman Puspo',
      'Ashikur Rahman',
      'Ashikur Puspo',
      'MD Ashikur Rahman Puspo',
      'Puspo',
      'iampuspoo',
      'iampuspo',
      'pacman-cli',
      'pacman.puspo',
    ],
    additionalName: 'Puspo',
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: siteConfig.image,
      width: 400,
      height: 400,
    },
    description: siteConfig.description,
    email: siteConfig.email,
    jobTitle: 'Backend Engineer & Software Developer',
    knowsAbout: [
      'Backend Engineering',
      'Software Development',
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
    knowsLanguage: ['English', 'Bengali'],
    nationality: { '@type': 'Country', name: 'Bangladesh' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'United International University',
      url: 'https://www.uiu.ac.bd/',
    },
    /** Every profile — this is the single most important signal for the knowledge panel */
    sameAs: SAME_AS_LINKS,
    /** Typed per-platform identity references — reinforces sameAs */
    identifier: SOCIAL_PROFILES.map((profile) => ({
      '@type': 'PropertyValue',
      name: profile.name,
      value: profile.handle,
      url: profile.url,
    })),
  }
}

/* ------------------------------------------------------------------ */
/*  WebSite — canonical site node                                     */
/* ------------------------------------------------------------------ */

export function websiteSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.siteName,
    alternateName: ['Puspo', 'iampuspoo', 'Ashikur Rahman Puspo Portfolio'],
    description: siteConfig.description,
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
  }
}

/* ------------------------------------------------------------------ */
/*  WebPage — with canonical node references                          */
/* ------------------------------------------------------------------ */

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'ProfilePage' | 'AboutPage' | 'CollectionPage' | 'ContactPage'
}) {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`
  return {
    '@context': 'https://schema.org' as const,
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: siteConfig.image,
    },
    inLanguage: 'en',
  }
}

/* ------------------------------------------------------------------ */
/*  SiteNavigationElement — one entry per link (valid markup)         */
/* ------------------------------------------------------------------ */

export function siteNavigationSchema() {
  return SITE_NAVIGATION.map((item) => ({
    '@type': 'SiteNavigationElement',
    name: item.name,
    url: item.url,
  }))
}
