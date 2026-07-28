"use client"

import { BLUR_DATA_URL } from '@/lib/blur'
import Image from 'next/image'

export const HeroAvatar = () => {
  return (
    <div className="relative z-10 flex h-[300px] w-full items-center justify-center overflow-visible md:h-[500px]">
      <div className="absolute h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl md:h-96 md:w-96" aria-hidden="true" />
      <div className="relative h-40 w-40 rounded-full border border-emerald-400/15 bg-card/80 p-2 shadow-2xl shadow-emerald-950/20 backdrop-blur-sm sm:h-56 sm:w-56 md:h-80 md:w-80">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src="/profile.webp"
            alt="MD Ashikur Rahman Puspo"
            fill
            className="object-cover object-[52%_45%]"
            priority
            sizes="(max-width: 768px) 160px, 320px"
            quality={88}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
      </div>
    </div>
  )
}
