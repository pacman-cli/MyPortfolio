import { describe, it, expect } from 'vitest'
import {
  PERSON_ID,
  WEBSITE_ID,
  personSchema,
  websiteSchema,
  webPageSchema,
  siteNavigationSchema,
} from './schema'
import { SOCIAL_PROFILES, SITE_NAVIGATION, siteConfig } from './site'

describe('personSchema', () => {
  it('uses the canonical PERSON_ID', () => {
    expect(personSchema()['@id']).toBe(`${siteConfig.url}/#person`)
  })

  it('lists every social profile in sameAs', () => {
    const schema = personSchema()
    const sameAs = schema.sameAs as string[]
    expect(sameAs).toHaveLength(SOCIAL_PROFILES.length)
    for (const profile of SOCIAL_PROFILES) {
      expect(sameAs).toContain(profile.url)
    }
  })

  it('includes username-style alternate names for all handles', () => {
    const schema = personSchema()
    const alternateNames = schema.alternateName as string[]
    for (const handle of SOCIAL_PROFILES.map((p) => p.handle)) {
      expect(alternateNames).toContain(handle)
    }
  })

  it('mirrors every profile as a typed PropertyValue identifier', () => {
    const schema = personSchema()
    const identifiers = schema.identifier as Array<{
      name: string
      value: string
      url: string
    }>
    expect(identifiers).toHaveLength(SOCIAL_PROFILES.length)
    expect(identifiers.map((i) => i.name)).toEqual(
      SOCIAL_PROFILES.map((p) => p.name),
    )
  })
})

describe('websiteSchema', () => {
  it('references the Person node as publisher', () => {
    const schema = websiteSchema()
    expect(schema['@id']).toBe(WEBSITE_ID)
    expect(schema.publisher).toEqual({ '@id': PERSON_ID })
  })
})

describe('webPageSchema', () => {
  it('links the page into the site graph and about the Person', () => {
    const schema = webPageSchema({
      path: '/links',
      name: 'Social Links',
      description: 'Profile hub',
      type: 'ProfilePage',
    })
    expect(schema['@type']).toBe('ProfilePage')
    expect(schema.url).toBe(`${siteConfig.url}/links`)
    expect(schema.isPartOf).toEqual({ '@id': WEBSITE_ID })
    expect(schema.about).toEqual({ '@id': PERSON_ID })
  })

  it('treats the root path as the bare site URL', () => {
    const schema = webPageSchema({
      path: '/',
      name: 'Home',
      description: 'Homepage',
    })
    expect(schema.url).toBe(siteConfig.url)
  })
})

describe('siteNavigationSchema', () => {
  it('returns one element per navigation item (valid markup)', () => {
    const elements = siteNavigationSchema()
    expect(elements).toHaveLength(SITE_NAVIGATION.length)
    for (const element of elements) {
      expect(typeof element.name).toBe('string')
      expect(typeof element.url).toBe('string')
    }
  })
})
