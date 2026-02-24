'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const HEADLINE = 'Most AI tools are black boxes.'

const LINES = [
  "They work. They respond. But you don't understand what's happening behind the scenes.",
  "They lock you to one model. Hide how they work. Keep your setup trapped in their system.",
  "When something breaks, you're guessing. When something better comes along, you start over.",
]

// Scroll thresholds that TRIGGER each line (0-1 of scroll progress)
const TRIGGERS = {
  headline: 0.05,
  line1: 0.25,
  line2: 0.50,
  line3: 0.75,
}

// Check for reduced motion preference
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  
  return reducedMotion
}

// Easing functions
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function BlackBoxSection() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [entryProgress, setEntryProgress] = useState(0) // 0 = not entered, 1 = fully entered
  const [scrollProgress, setScrollProgress] = useState(0) // 0-1 through the section
  const [isActive, setIsActive] = useState(false)
  const [isPast, setIsPast] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Track what's been triggered (persists once triggered)
  const [triggered, setTriggered] = useState({
    headline: false,
    line1: false,
    line2: false,
    line3: false,
  })

  const updateProgress = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const sectionHeight = rect.height
    
    // Entry progress: from when section enters viewport to when it fills it
    // Starts when section top is at viewport bottom, ends when section top is at viewport top
    const entryDistance = viewportHeight // distance from "section enters" to "section fills"
    const distanceFromEntry = viewportHeight - rect.top // how far we've scrolled since section entered
    const newEntryProgress = Math.max(0, Math.min(1, distanceFromEntry / entryDistance))
    
    // Scroll progress: how far through the section (0 = just filled viewport, 1 = about to leave)
    const scrollableDistance = sectionHeight - viewportHeight
    const scrolledPast = -rect.top
    const newScrollProgress = Math.max(0, Math.min(1, scrolledPast / scrollableDistance))
    
    // Active = section fills viewport (top at or above 0, bottom at or below viewport)
    const nowActive = rect.top <= 0 && rect.bottom >= viewportHeight
    const nowPast = rect.bottom < viewportHeight
    
    setEntryProgress(newEntryProgress)
    setScrollProgress(newScrollProgress)
    setIsActive(nowActive)
    setIsPast(nowPast)
    
    // Check triggers based on scroll progress
    setTriggered(prev => ({
      headline: prev.headline || newScrollProgress >= TRIGGERS.headline,
      line1: prev.line1 || newScrollProgress >= TRIGGERS.line1,
      line2: prev.line2 || newScrollProgress >= TRIGGERS.line2,
      line3: prev.line3 || newScrollProgress >= TRIGGERS.line3,
    }))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateProgress])

  // Background opacity fades in during entry
  const bgOpacity = easeOutCubic(entryProgress) * 0.85

  // Headline fades in after trigger
  const headlineOpacity = triggered.headline 
    ? Math.min(1, easeOutCubic(Math.min(1, (scrollProgress - TRIGGERS.headline) / 0.15)))
    : 0
  const headlineY = (1 - headlineOpacity) * 30

  // Line opacities - fade in after their triggers
  const getLineOpacity = (trigger: number, triggered: boolean) => {
    if (!triggered) return 0
    return Math.min(0.75, easeOutCubic(Math.min(1, (scrollProgress - trigger) / 0.15)) * 0.75)
  }
  
  const getLineY = (trigger: number, triggered: boolean) => {
    if (!triggered) return 12
    const progress = Math.min(1, (scrollProgress - trigger) / 0.15)
    return (1 - easeOutCubic(progress)) * 12
  }

  // Reduced motion: show all content immediately
  if (reducedMotion) {
    return (
      <section
        id="problem"
        data-section="problem"
        data-theme="dark"
        className="section-feature bg-[rgba(10,10,10,0.85)]"
      >
        <div className="container-narrow text-center">
          <h2 className="text-headline text-on-dark">{HEADLINE}</h2>
          {LINES.map((line, i) => (
            <p key={i} className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto" style={{ textWrap: 'balance' }}>
              {line}
            </p>
          ))}
        </div>
      </section>
    )
  }

  // Content block with animated text
  const contentBlock = (
    <div className="container-narrow text-center px-6">
      <h2
        className="text-headline text-on-dark"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {HEADLINE}
      </h2>
      
      <p 
        className="mt-6 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
        style={{ 
          opacity: getLineOpacity(TRIGGERS.line1, triggered.line1),
          transform: `translateY(${getLineY(TRIGGERS.line1, triggered.line1)}px)`,
          textWrap: 'balance',
        }}
      >
        {LINES[0]}
      </p>
      <p 
        className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
        style={{ 
          opacity: getLineOpacity(TRIGGERS.line2, triggered.line2),
          transform: `translateY(${getLineY(TRIGGERS.line2, triggered.line2)}px)`,
          textWrap: 'balance',
        }}
      >
        {LINES[1]}
      </p>
      <p 
        className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
        style={{ 
          opacity: getLineOpacity(TRIGGERS.line3, triggered.line3),
          transform: `translateY(${getLineY(TRIGGERS.line3, triggered.line3)}px)`,
          textWrap: 'balance',
        }}
      >
        {LINES[2]}
      </p>
    </div>
  )

  return (
    <>
      {/* Tall section with fading background */}
      <section
        ref={sectionRef}
        id="problem"
        data-section="problem"
        data-theme="dark"
        className="relative"
        style={{ 
          height: '400vh',
          background: `rgba(10, 10, 10, ${bgOpacity})`,
        }}
      >
        {/* Static content at bottom - only visible AFTER scrolling past */}
        {isPast && (
          <div className="absolute bottom-0 left-0 right-0 h-screen flex items-center justify-center bg-[rgba(10,10,10,0.85)]">
            {contentBlock}
          </div>
        )}
      </section>
      
      {/* Fixed overlay - visible while actively scrolling through */}
      {isActive && (
        <div 
          data-theme="dark"
          className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(10,10,10,0.85)]"
        >
          {contentBlock}
          
          {/* Progress bar */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] bg-signal/60"
            style={{ width: `${scrollProgress * 100}%` }}
          />
          
          {/* Debug */}
          <div className="absolute top-4 left-4 text-xs text-white/50 font-mono">
            {(scrollProgress * 100).toFixed(0)}%
          </div>
        </div>
      )}
    </>
  )
}
