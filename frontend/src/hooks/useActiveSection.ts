import { useEffect, useState, useRef } from 'react'

export function useActiveSection(sectionIds: string[], offset: number = 200) {
  const [activeSection, setActiveSection] = useState<string>('')
  const activeSectionRef = useRef<string>('')

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + offset

          // Find the current active section
          let current = ''
          for (const id of sectionIds) {
            const element = document.getElementById(id)
            if (element) {
              const top = element.offsetTop
              const height = element.offsetHeight
              if (scrollPosition >= top && scrollPosition < top + height) {
                current = id
              }
            }
          }

          if (current !== activeSectionRef.current) {
            activeSectionRef.current = current
            setActiveSection(current)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
