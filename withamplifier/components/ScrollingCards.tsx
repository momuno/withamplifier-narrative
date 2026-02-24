'use client'

import { useEffect, useRef } from 'react'

interface BundleCard {
  name: string
  type: string
  description: string
  author: string
  stars: number
  validated?: boolean
}

interface ScrollingCardsProps {
  cards: BundleCard[]
  speed?: number // pixels per second
}

export default function ScrollingCards({ cards, speed = 40 }: ScrollingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current
    if (!container || !scroller) return
    
    // Duplicate cards for seamless loop
    const scrollerContent = Array.from(scroller.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement
      duplicatedItem.setAttribute('aria-hidden', 'true')
      scroller.appendChild(duplicatedItem)
    })
    
    // Calculate animation duration based on content width and speed
    const scrollerWidth = scroller.scrollWidth / 2 // Divided by 2 because we duplicated
    const duration = scrollerWidth / speed
    
    scroller.style.setProperty('--scroll-duration', `${duration}s`)
    
    // Start animation
    scroller.classList.add('animate-scroll')
    
    // Pause on hover
    const handleMouseEnter = () => scroller.style.animationPlayState = 'paused'
    const handleMouseLeave = () => scroller.style.animationPlayState = 'running'
    
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cards, speed])
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div 
        ref={scrollerRef}
        className="flex gap-3 lg:gap-4 will-change-transform"
      >
        {cards.map((card, i) => (
          <div
            key={`${card.name}-${i}`}
            className="flex-shrink-0 w-72 lg:w-80 p-4 lg:p-5 rounded-xl bg-canvas border border-canvas-mist shadow-soft-sm hover:shadow-soft hover:border-signal-glow transition-all duration-300 cursor-pointer"
          >
            {/* Header with name and type */}
            <div className="flex justify-between items-start gap-3 mb-3">
              <h3 className="font-mono text-sm text-ink font-medium truncate flex-1">
                {card.name}
              </h3>
              <span className="flex-shrink-0 px-2 py-1 bg-canvas-stone rounded text-[10px] text-ink-fog uppercase tracking-wider">
                {card.type}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-xs text-ink-slate leading-relaxed mb-3 line-clamp-2">
              {card.description}
            </p>
            
            {/* Validation badge */}
            {card.validated && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded text-[10px] font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Validated
                </span>
              </div>
            )}
            
            {/* Metadata */}
            <div className="flex justify-between items-center pt-3 border-t border-canvas-mist text-[11px]">
              <span className="text-signal font-medium">@{card.author}</span>
              <div className="flex items-center gap-1 text-ink-fog">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {card.stars}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--scroll-duration, 50s) linear infinite;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
