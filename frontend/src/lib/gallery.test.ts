import { describe, it, expect } from 'vitest'
import { mapDriveFileToPhoto, buildDriveApiUrl } from './gallery'

describe('mapDriveFileToPhoto', () => {
  it('maps a Drive file to GalleryPhoto', () => {
    const file = {
      id: 'abc123',
      name: 'sunset.jpg',
      createdTime: '2026-01-15T10:00:00.000Z',
      imageMediaMetadata: { width: 1920, height: 1080 },
    }
    const result = mapDriveFileToPhoto(file)
    expect(result).toEqual({
      id: 'abc123',
      name: 'sunset.jpg',
      url: 'https://drive.google.com/thumbnail?id=abc123&sz=w1000',
      width: 1920,
      height: 1080,
      createdTime: '2026-01-15T10:00:00.000Z',
    })
  })

  it('defaults dimensions when imageMediaMetadata is missing', () => {
    const file = {
      id: 'def456',
      name: 'photo.jpg',
      createdTime: '2026-01-15T10:00:00.000Z',
    }
    const result = mapDriveFileToPhoto(file)
    expect(result.width).toBe(4)
    expect(result.height).toBe(3)
  })
})

describe('buildDriveApiUrl', () => {
  it('builds URL with folder ID and API key', () => {
    const url = buildDriveApiUrl('folder123', 'key456')
    expect(url).toContain('www.googleapis.com')
    expect(url).toContain('folder123')
    expect(url).toContain('key456')
  })

  it('includes pageToken when provided', () => {
    const url = buildDriveApiUrl('folder123', 'key456', 'token789')
    expect(url).toContain('token789')
  })

  it('omits pageToken when null', () => {
    const url = buildDriveApiUrl('folder123', 'key456', null)
    expect(url).not.toContain('pageToken')
  })
})
