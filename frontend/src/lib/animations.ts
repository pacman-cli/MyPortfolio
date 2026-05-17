/** Shared spring transition for fade-up animations */
export const SPRING_FADE_UP = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 18,
}

/** Fade-up motion variant */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_FADE_UP,
  },
}
