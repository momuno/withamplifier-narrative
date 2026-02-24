'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

const navItems = [
  { href: '/learn', label: 'Learn' },
  { href: '/stories', label: 'Stories' },
]

function formatStarCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`
  }
  return count.toString()
}

function GitHubStarButton({ isOverDark, stars }: { isOverDark: boolean, stars: number }) {
  // Stars are now fetched server-side and cached (see lib/github.ts)

  return (
    <a
      href="https://github.com/microsoft/amplifier"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-3 py-2 rounded-soft transition-all duration-300 ${
        isOverDark
          ? 'text-white/80 hover:text-white hover:bg-white/10'
          : 'text-ink-slate hover:text-ink hover:bg-canvas-stone'
      }`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
      {stars > 0 && (
        <span className="text-[15px] font-medium">{formatStarCount(stars)}</span>
      )}
    </a>
  )
}

export default function Navigation({ stars = 0 }: { stars?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)
  
  // Detect if nav is over a dark section using data-theme attribute
  const checkBackground = useCallback(() => {
    // Sample point at center of nav bar
    const navHeight = 64
    const sampleY = navHeight / 2
    const sampleX = window.innerWidth / 2
    
    // Get element at sample point (temporarily hide nav to sample what's behind)
    const nav = document.querySelector('header')
    if (nav) {
      const originalPointerEvents = nav.style.pointerEvents
      nav.style.pointerEvents = 'none'
      const elementBehind = document.elementFromPoint(sampleX, sampleY)
      nav.style.pointerEvents = originalPointerEvents
      
      if (elementBehind) {
        // Walk up to find section with data-theme attribute
        let current: Element | null = elementBehind
        while (current && current !== document.body) {
          const theme = current.getAttribute('data-theme')
          if (theme === 'dark') {
            setIsOverDark(true)
            return
          } else if (theme === 'light') {
            setIsOverDark(false)
            return
          }
          current = current.parentElement
        }
      }
    }
    setIsOverDark(false)
  }, [])
  
  // Throttle scroll handler for performance (especially on mobile)
  useEffect(() => {
    let ticking = false
    let lastKnownScrollY = 0
    
    const throttledCheck = () => {
      lastKnownScrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkBackground()
          ticking = false
        })
        ticking = true
      }
    }
    
    checkBackground()
    window.addEventListener('scroll', throttledCheck, { passive: true })
    window.addEventListener('resize', throttledCheck, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledCheck)
      window.removeEventListener('resize', throttledCheck)
    }
  }, [checkBackground])
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progressive blur - simplified on mobile for performance */}
      {/* Mobile: single layer with lighter blur. Desktop: full progressive blur */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none">
        {/* Mobile-optimized single blur layer (hidden on desktop) */}
        <div className="md:hidden absolute inset-0" style={{ 
          backdropFilter: 'blur(8px)', 
          WebkitBackdropFilter: 'blur(8px)', 
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 70%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 70%)',
          // Promote to own layer for smoother scrolling
          transform: 'translateZ(0)',
        }} />
        
        {/* Desktop: Full progressive blur (hidden on mobile) */}
        {/* Layer 1 - strongest blur at very top */}
        <div className="hidden md:block absolute inset-0" style={{ 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)', 
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)' 
        }} />
        {/* Layer 2 - medium blur */}
        <div className="hidden md:block absolute inset-0" style={{ 
          backdropFilter: 'blur(8px)', 
          WebkitBackdropFilter: 'blur(8px)', 
          maskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)' 
        }} />
        {/* Layer 3 - light blur fading out */}
        <div className="hidden md:block absolute inset-0" style={{ 
          backdropFilter: 'blur(4px)', 
          WebkitBackdropFilter: 'blur(4px)', 
          maskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)' 
        }} />
        {/* Layer 4 - subtle blur at edge */}
        <div className="hidden md:block absolute inset-0" style={{ 
          backdropFilter: 'blur(2px)', 
          WebkitBackdropFilter: 'blur(2px)', 
          maskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)' 
        }} />
      </div>
      
      {/* Nav content - no background, text adapts to section behind */}
      <nav className={`relative max-w-wide mx-auto px-6 md:px-12 h-16 flex items-center justify-between transition-colors duration-300 ${
        isOverDark ? 'text-white' : 'text-ink'
      }`}>
        <Link 
          href="/" 
          className={`font-semibold tracking-tight transition-colors duration-300 ${
            isOverDark 
              ? 'text-white hover:text-white/80' 
              : 'text-ink hover:text-signal'
          }`}
        >
          Amplifier
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-[15px] font-medium rounded-soft transition-all duration-300 ${
                    pathname === item.href
                      ? isOverDark 
                        ? 'text-white bg-white/20' 
                        : 'text-signal bg-signal-soft'
                      : isOverDark
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-ink-slate hover:text-ink hover:bg-canvas-stone'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <GitHubStarButton isOverDark={isOverDark} stars={stars} />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-soft transition-colors ${
            isOverDark ? 'hover:bg-white/10' : 'hover:bg-canvas-stone'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                isOverDark ? 'bg-white' : 'bg-ink'
              } ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} 
            />
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                isOverDark ? 'bg-white' : 'bg-ink'
              } ${isOpen ? 'opacity-0 scale-0' : ''}`} 
            />
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                isOverDark ? 'bg-white' : 'bg-ink'
              } ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} 
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay - optimized for performance */}
      <div 
        className={`md:hidden fixed inset-0 top-16 bg-canvas transition-opacity duration-150 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'opacity' }}
      >
        <nav className="h-full px-6 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-5 rounded-2xl transition-colors duration-150 ${
                    pathname === item.href
                      ? 'bg-signal text-white'
                      : 'text-ink hover:bg-canvas-stone active:bg-canvas-mist'
                  }`}
                >
                  <span className="text-xl font-semibold tracking-tight">
                    {item.label}
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-150 ${
                      pathname === item.href 
                        ? 'text-white/70' 
                        : 'text-ink-fog group-hover:translate-x-1'
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* GitHub link at bottom */}
          <div className="absolute bottom-8 left-6 right-6">
            <a
              href="https://github.com/microsoft/amplifier"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-canvas-mist text-ink-slate hover:bg-canvas-stone transition-colors duration-150"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
