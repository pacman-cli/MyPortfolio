'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import type { GalleryPhoto } from '@/types'

interface LightboxProps {
  photos: GalleryPhoto[]
  selectedIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export const Lightbox = ({ photos, selectedIndex, onClose, onNavigate }: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && selectedIndex > 0) onNavigate(selectedIndex - 1)
      if (e.key === 'ArrowRight' && selectedIndex < photos.length - 1) onNavigate(selectedIndex + 1)
    },
    [selectedIndex, photos.length, onClose, onNavigate]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  if (selectedIndex === null) return null

  const photo = photos[selectedIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo lightbox"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>

        {selectedIndex > 0 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex - 1) }}
            className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {selectedIndex < photos.length - 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex + 1) }}
            className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        <motion.div
          key={photo.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-[90vw] h-[85vh] max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.url}
            alt={photo.name}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono">
          {selectedIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
