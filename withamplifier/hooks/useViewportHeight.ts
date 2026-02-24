'use client'

import { useEffect, useRef } from 'react'

/**
 * Sets a CSS custom property --vh for accurate viewport height on mobile.
 * Mobile browsers have dynamic toolbars that change 100vh meaning.
 * This hook sets --vh to 1% of the actual viewport height.
 * 
 * Usage in CSS:
 * min-height: calc(var(--vh, 1vh) * 100);
 * 
 * Performance: Throttled to avoid layout thrashing when mobile URL bar shows/hides
 */
export function useViewportHeight() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastHeightRef = useRef<number>(0)
  
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      lastHeightRef.current = window.innerHeight
    }
    
    // Throttled version to prevent excessive updates during URL bar animation
    const throttledSetVH = () => {
      // Skip if height hasn't changed significantly (within 50px - accounts for URL bar)
      const heightDiff = Math.abs(window.innerHeight - lastHeightRef.current)
      if (heightDiff < 50 && lastHeightRef.current !== 0) {
        return
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Debounce resize events - wait for resize to settle
      timeoutRef.current = setTimeout(setVH, 100)
    }
    
    // Set immediately on mount
    setVH()
    
    // Throttle resize events (fires frequently on mobile during URL bar hide/show)
    window.addEventListener('resize', throttledSetVH, { passive: true })
    // Orientation change is less frequent, update immediately
    window.addEventListener('orientationchange', setVH, { passive: true })
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('resize', throttledSetVH)
      window.removeEventListener('orientationchange', setVH)
    }
  }, [])
}

export default useViewportHeight
