'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export type CaptureState = 'idle' | 'approach' | 'captured' | 'releasing' | 'settled'

interface UseScrollCaptureOptions {
  /** Total virtual scroll distance to map to 0-1 progress */
  scrollRange?: number
  /** Trigger capture when section top reaches this % of viewport */
  captureThreshold?: number
  /** Sensitivity multiplier for touch input */
  touchSensitivity?: number
  /** Momentum decay factor (0-1, higher = more momentum) */
  momentumDecay?: number
  /** Callback when state changes */
  onStateChange?: (state: CaptureState) => void
  /** Callback when progress changes */
  onProgressChange?: (progress: number) => void
  /** Whether reduced motion is preferred */
  reducedMotion?: boolean
}

interface UseScrollCaptureReturn {
  state: CaptureState
  progress: number
  sectionRef: React.RefObject<HTMLElement>
}

export function useScrollCapture(options: UseScrollCaptureOptions = {}): UseScrollCaptureReturn {
  const {
    scrollRange = 1000,
    captureThreshold = 0.15, // Capture when section top is 15% from viewport top
    touchSensitivity = 1.5,
    momentumDecay = 0.92,
    onStateChange,
    onProgressChange,
    reducedMotion = false,
  } = options

  const [state, setState] = useState<CaptureState>('idle')
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Refs for tracking
  const velocityRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const touchStartYRef = useRef(0)
  const lastTouchYRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const stateRef = useRef(state)
  const progressRef = useRef(progress)

  // Keep refs in sync
  useEffect(() => {
    stateRef.current = state
    onStateChange?.(state)
  }, [state, onStateChange])

  useEffect(() => {
    progressRef.current = progress
    onProgressChange?.(progress)
  }, [progress, onProgressChange])

  // Lock/unlock body scroll
  const lockScroll = useCallback(() => {
    lastScrollYRef.current = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lastScrollYRef.current}px`
    document.body.style.width = '100%'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, lastScrollYRef.current)
  }, [])

  // Update progress with bounds
  const updateProgress = useCallback((delta: number) => {
    setProgress(prev => {
      const next = Math.max(0, Math.min(1, prev + delta / scrollRange))
      return next
    })
  }, [scrollRange])

  // Handle wheel events (trackpad + mouse)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (stateRef.current !== 'captured') return
    
    e.preventDefault()
    e.stopPropagation()
    
    // Apply delta directly
    updateProgress(e.deltaY)
    
    // Accumulate velocity for momentum
    velocityRef.current = e.deltaY * 0.5
  }, [updateProgress])

  // Handle touch events
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (stateRef.current !== 'captured') return
    
    touchStartYRef.current = e.touches[0].clientY
    lastTouchYRef.current = e.touches[0].clientY
    velocityRef.current = 0
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (stateRef.current !== 'captured') return
    
    e.preventDefault()
    
    const currentY = e.touches[0].clientY
    const deltaY = (lastTouchYRef.current - currentY) * touchSensitivity
    
    velocityRef.current = deltaY
    updateProgress(deltaY)
    lastTouchYRef.current = currentY
  }, [touchSensitivity, updateProgress])

  const handleTouchEnd = useCallback(() => {
    if (stateRef.current !== 'captured') return
    
    // Apply momentum
    const applyMomentum = () => {
      if (Math.abs(velocityRef.current) > 0.5 && stateRef.current === 'captured') {
        updateProgress(velocityRef.current)
        velocityRef.current *= momentumDecay
        rafIdRef.current = requestAnimationFrame(applyMomentum)
      }
    }
    applyMomentum()
  }, [momentumDecay, updateProgress])

  // Main scroll handler for state transitions
  const handleScroll = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    
    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    
    // State machine transitions based on scroll position
    if (stateRef.current === 'idle') {
      // Enter approach when section is visible
      if (rect.top < viewportHeight * 0.8) {
        setState('approach')
      }
    } 
    else if (stateRef.current === 'approach') {
      // Enter captured when section top reaches threshold
      if (rect.top <= viewportHeight * captureThreshold) {
        setState('captured')
        lockScroll()
        setProgress(0)
      }
      // Back to idle if scrolled away
      else if (rect.top > viewportHeight) {
        setState('idle')
      }
    }
    else if (stateRef.current === 'settled') {
      // Re-enter captured if scrolling back up
      if (rect.top > 0 && rect.top < viewportHeight * 0.5) {
        setState('captured')
        lockScroll()
        setProgress(1)
      }
    }
  }, [captureThreshold, lockScroll])

  // Watch progress for release
  useEffect(() => {
    if (state !== 'captured') return
    
    // Release when progress completes and user continues scrolling
    if (progress >= 1) {
      // Wait for one more scroll gesture
      const handleReleaseScroll = (e: WheelEvent) => {
        if (e.deltaY > 10) {
          setState('releasing')
          unlockScroll()
          
          // Transition to settled after brief delay
          setTimeout(() => {
            setState('settled')
          }, 300)
        }
      }
      
      const handleReleaseTouchEnd = () => {
        // Check if they were scrolling down
        if (velocityRef.current > 5) {
          setState('releasing')
          unlockScroll()
          
          setTimeout(() => {
            setState('settled')
          }, 300)
        }
      }
      
      window.addEventListener('wheel', handleReleaseScroll, { passive: false })
      window.addEventListener('touchend', handleReleaseTouchEnd)
      
      return () => {
        window.removeEventListener('wheel', handleReleaseScroll)
        window.removeEventListener('touchend', handleReleaseTouchEnd)
      }
    }
  }, [state, progress, unlockScroll])

  // Setup event listeners
  useEffect(() => {
    // Skip scroll capture for reduced motion
    if (reducedMotion) {
      setState('settled')
      setProgress(1)
      return
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [handleScroll, reducedMotion])

  // Capture state event listeners
  useEffect(() => {
    if (state !== 'captured') return
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [state, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [])

  return {
    state,
    progress,
    sectionRef: sectionRef as React.RefObject<HTMLElement>,
  }
}
