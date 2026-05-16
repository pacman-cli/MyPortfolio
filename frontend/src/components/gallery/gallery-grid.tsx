'use client'

import type { GalleryPhoto, GalleryResponse } from '@/types'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { PhotoCard } from './photo-card'
import { Lightbox } from './lightbox'

export const GalleryGrid = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const fetchPhotos = useCallback(async (pageToken: string | null = null) => {
    const isLoadingMore = pageToken !== null
    if (isLoadingMore) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }
    setError(false)

    try {
      const params = new URLSearchParams()
      if (pageToken) params.set('pageToken', pageToken)

      const response = await fetch(`/api/gallery?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data: GalleryResponse = await response.json()
      setPhotos((prev) => (isLoadingMore ? [...prev, ...data.photos] : data.photos))
      setNextPageToken(data.nextPageToken)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  if (loading) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-4 rounded-xl bg-muted animate-pulse"
            style={{ height: `${200 + (i % 3) * 80}px` }}
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">Failed to load photos.</p>
        <button
          type="button"
          onClick={() => fetchPhotos()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No photos yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {nextPageToken && (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => fetchPhotos(nextPageToken)}
            disabled={loadingMore}
            className="px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors disabled:opacity-50"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </span>
            ) : (
              'Load more'
            )}
          </button>
        </div>
      )}

      <Lightbox
        photos={photos}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  )
}
