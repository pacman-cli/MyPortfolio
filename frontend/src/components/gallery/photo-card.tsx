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
      className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
      aria-label={`View photo: ${photo.name}`}
    >
      <Image
        src={photo.url}
        alt={photo.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        loading={index < 6 ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UyZThlYSIvPjwvc3ZnPg=="
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
