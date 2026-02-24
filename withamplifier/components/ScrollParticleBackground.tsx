'use client'

import { useEffect, useState } from 'react'
import ChladniWebGLTest from './ChladniWebGLTest'
import { useScrollSection } from '@/hooks/useScrollSection'
import { PARTICLE_SECTIONS, MOBILE_ADJUSTMENTS } from '@/lib/particle-config'
import type { SectionId } from '@/lib/particle-config'

/**
 * Scroll-responsive particle background that transitions between patterns
 * based on which section is currently in view
 */
export default function ScrollParticleBackground() {
  const activeSection = useScrollSection()
  const [isMobile, setIsMobile] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log('[ScrollParticleBackground] Active section:', activeSection)
  }, [activeSection])

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get pattern for active section
  const getPatternConfig = (section: SectionId) => {
    const pattern = PARTICLE_SECTIONS[section]
    
    // Apply mobile adjustments
    if (isMobile) {
      return {
        ...pattern,
        opacity: Math.max(0.1, pattern.opacity - MOBILE_ADJUSTMENTS.opacityReduction),
        particleSize: pattern.particleSize - MOBILE_ADJUSTMENTS.particleSizeReduction,
      }
    }
    
    return pattern
  }

  const currentPattern = getPatternConfig(activeSection)

  console.log('[ScrollParticleBackground] Rendering with pattern:', currentPattern)

  return <ChladniWebGLTest params={currentPattern} />
}
