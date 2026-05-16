import type { GalleryPhoto } from '@/types'

interface DriveFile {
  id: string
  name: string
  createdTime: string
  imageMediaMetadata?: {
    width?: number
    height?: number
  }
}

interface DriveApiResponse {
  nextPageToken?: string
  files: DriveFile[]
}

export function mapDriveFileToPhoto(file: DriveFile): GalleryPhoto {
  return {
    id: file.id,
    name: file.name,
    url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
    width: file.imageMediaMetadata?.width ?? 4,
    height: file.imageMediaMetadata?.height ?? 3,
    createdTime: file.createdTime,
  }
}

export function buildDriveApiUrl(
  folderId: string,
  apiKey: string,
  pageToken: string | null = null
): string {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    orderBy: 'modifiedTime desc',
    pageSize: '20',
    fields: 'nextPageToken,files(id,name,createdTime,imageMediaMetadata)',
    key: apiKey,
  })

  if (pageToken) {
    params.set('pageToken', pageToken)
  }

  return `https://drive.googleapis.com/drive/v3/files?${params.toString()}`
}

export async function fetchGalleryPhotos(
  pageToken: string | null = null
): Promise<{ photos: GalleryPhoto[]; nextPageToken: string | null }> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!apiKey || !folderId) {
    throw new Error('GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_FOLDER_ID must be set')
  }

  const url = buildDriveApiUrl(folderId, apiKey, pageToken)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.status}`)
  }

  const data: DriveApiResponse = await response.json()

  return {
    photos: data.files.map(mapDriveFileToPhoto),
    nextPageToken: data.nextPageToken ?? null,
  }
}
