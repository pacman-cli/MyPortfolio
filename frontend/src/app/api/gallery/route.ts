import { NextRequest, NextResponse } from 'next/server'
import { fetchGalleryPhotos } from '@/lib/gallery'

export async function GET(request: NextRequest) {
  const pageToken = request.nextUrl.searchParams.get('pageToken')

  try {
    const data = await fetchGalleryPhotos(pageToken)
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Gallery API error:', message)

    if (message.includes('must be set')) {
      return NextResponse.json(
        { error: 'Gallery not configured. Set GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_FOLDER_ID.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: `Failed to fetch photos: ${message}` },
      { status: 500 }
    )
  }
}
