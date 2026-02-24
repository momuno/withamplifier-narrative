import { useState, useEffect } from 'react'
import type { SectionId } from '@/lib/particle-config'
import { SECTION_IDS, TRANSITION_TRIGGERS } from '@/lib/particle-config'

/**
 * Hook to detect which section is currently in view
 * Returns the active section ID based on scroll position
 */
export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections with IDs
      const sections = SECTION_IDS.map(id => ({
        id,
        element: document.getElementById(id)
      })).filter(s => s.element !== null) as Array<{ id: SectionId; element: HTMLElement }>

      if (sections.length === 0) return

      // Find which section is most visible in viewport
      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY
      const triggerPoint = scrollTop + (viewportHeight * TRANSITION_TRIGGERS.startThreshold)

      let currentSection = sections[0].id

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect()
        const sectionTop = rect.top + scrollTop
        
        // Section becomes active when its top crosses the trigger point
        if (triggerPoint >= sectionTop) {
          currentSection = section.id
        } else {
          break
        }
      }

      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    // Listen to scroll with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return activeSection
}
