'use client'

import Image from 'next/image'
import type { GalleryPhoto } from '@/types'

interface PhotoCardProps {
  photo: GalleryPhoto
  index: number
  onClick: () => void
}

export const PhotoCard = ({ photo, index, onClick }: PhotoCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="break-inside-avoid mb-3 group cursor-pointer overflow-hidden rounded-2xl block w-full relative shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label={`View photo: ${photo.name}`}
    >
      <Image
        src={photo.url}
        alt={photo.name}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        loading={index < 6 ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UyZThlYSIvPjwvc3ZnPg=="
        className="w-full h-auto block"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <span className="text-white text-xs font-medium truncate drop-shadow-lg">
          {photo.name.replace(/\.[^/.]+$/, '')}
        </span>
      </div>
    </button>
  )
}
