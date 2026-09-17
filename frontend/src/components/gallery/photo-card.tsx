'use client'

import Image from 'next/image'
import type { GalleryPhoto } from '@/types'

interface PhotoCardProps {
  photo: GalleryPhoto
  index: number
  onClick: () => void
}

export const PhotoCard = ({ photo, index, onClick }: PhotoCardProps) => {
  const width = photo.width && photo.width > 0 ? photo.width : 600
  const height = photo.height && photo.height > 0 ? photo.height : 450
  const isPriority = index < 4

  return (
    <button
      type="button"
      onClick={onClick}
      className="break-inside-avoid mb-3 group cursor-pointer overflow-hidden rounded-2xl block w-full relative shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-muted/50"
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-label={`View photo: ${photo.name}`}
    >
      <Image
        src={photo.url}
        alt={photo.name}
        width={width}
        height={height}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        loading={isPriority ? 'eager' : 'lazy'}
        priority={isPriority}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UyZThlYSIvPjwvc3ZnPg=="
        className="w-full h-auto block object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
        <span className="text-white text-xs font-medium truncate drop-shadow-lg">
          {photo.name.replace(/\.[^/.]+$/, '')}
        </span>
      </div>
    </button>
  )
}
