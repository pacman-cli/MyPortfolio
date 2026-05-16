import { NextRequest, NextResponse } from 'next/server'
import { fetchGalleryPhotos } from '@/lib/gallery'

export async function GET(request: NextRequest) {
  const pageToken = request.nextUrl.searchParams.get('pageToken')

  try {
    const data = await fetchGalleryPhotos(pageToken)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Gallery API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}
