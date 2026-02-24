'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseScrollProgressOptions {
  /** Offset from top of section to start progress (default: 0) */
  startOffset?: number
  /** End progress early before section bottom (default: 0) */
  endOffset?: number
}

interface UseScrollProgressReturn {
  /** Current progress 0-1 through the section */
  progress: number
  /** Ref to attach to the tall outer section */
  sectionRef: React.RefObject<HTMLElement>
  /** Whether section is currently in view */
  isInView: boolean
}

/**
 * Observes scroll position and calculates progress through a section.
 * Does NOT capture or intercept scroll - works with native browser scroll.
 * 
 * The section should be tall (e.g., 300vh) to create scroll "duration".
 * Progress is 0 when section top reaches viewport top, 1 when section bottom
 * reaches viewport bottom.
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}): UseScrollProgressReturn {
  const { startOffset = 0, endOffset = 0 } = options
  
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  const calculateProgress = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    
    // Section boundaries
    const sectionTop = rect.top + startOffset
    const sectionBottom = rect.bottom - endOffset
    const sectionHeight = sectionBottom - sectionTop
    
    // Progress: 0 when section top hits viewport top
    //           1 when section bottom hits viewport bottom
    // This means the sticky content stays visible throughout
    const scrollableDistance = sectionHeight - viewportHeight
    
    if (scrollableDistance <= 0) {
      // Section is shorter than viewport
      setProgress(sectionTop <= 0 ? 1 : 0)
      setIsInView(rect.top < viewportHeight && rect.bottom > 0)
      return
    }
    
    // How far we've scrolled into the section
    const scrolledIntoSection = -sectionTop
    
    // Calculate progress
    const newProgress = Math.max(0, Math.min(1, scrolledIntoSection / scrollableDistance))
    
    setProgress(newProgress)
    setIsInView(rect.top < viewportHeight && rect.bottom > 0)
  }, [startOffset, endOffset])

  useEffect(() => {
    const handleScroll = () => {
      // Use RAF for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(calculateProgress)
    }

    // Initial calculation
    calculateProgress()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [calculateProgress])

  return {
    progress,
    sectionRef: sectionRef as React.RefObject<HTMLElement>,
    isInView,
  }
}
