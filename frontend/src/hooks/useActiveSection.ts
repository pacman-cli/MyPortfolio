import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[], offset: number = 200) {
  const [activeSection, setActiveSection] = useState<string>('')
  const serializedIds = sectionIds.join(',')

  useEffect(() => {
    const ids = serializedIds.split(',').filter(Boolean)
    if (ids.length === 0) return

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting)
      
      if (intersecting.length === 0) {
        // If no section is intersecting, check if we've scrolled back to the top
        // (the first section is below the active offset)
        const firstSection = document.getElementById(ids[0])
        if (firstSection && firstSection.getBoundingClientRect().top > offset) {
          setActiveSection('')
        }
        return
      }

      // Find the one closest to the top of our tracking area
      const closest = intersecting.reduce((prev, curr) => {
        return Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
      })

      setActiveSection(closest.target.id)
    }

    // Set up rootMargin to match the scroll offset
    // Shifting top boundary by -offset px, and bottom by -60% to narrow down the active zone
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: [0, 0.1],
    })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [serializedIds, offset])

  return activeSection
}

