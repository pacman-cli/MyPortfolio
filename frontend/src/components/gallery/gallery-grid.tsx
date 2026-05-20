'use client'

import type { GalleryPhoto, GalleryResponse } from '@/types'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PhotoCard } from './photo-card'
import { Lightbox } from './lightbox'

export const GalleryGrid = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    fetch('/api/gallery', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json() as Promise<GalleryResponse>
      })
      .then((data) => {
        setPhotos(data.photos)
        setNextPageToken(data.nextPageToken)
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => { controller.abort() }
  }, [retryCount])

  const loadMore = useCallback(async () => {
    if (!nextPageToken) return
    setLoadingMore(true)
    try {
      const params = new URLSearchParams({ pageToken: nextPageToken })
      const response = await fetch(`/api/gallery?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data: GalleryResponse = await response.json()
      setPhotos((prev) => [...prev, ...data.photos])
      setNextPageToken(data.nextPageToken)
    } catch {
      setError(true)
    } finally {
      setLoadingMore(false)
    }
  }, [nextPageToken])

  if (loading) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 rounded-2xl bg-muted animate-pulse"
            style={{ height: `${180 + (i % 4) * 60}px` }}
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
          onClick={() => setRetryCount((c) => c + 1)}
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
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
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
            onClick={loadMore}
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
