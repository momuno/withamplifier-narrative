'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface HorizontalScrollProps {
  children: ReactNode
  showIndicators?: boolean
  className?: string
  itemClassName?: string
}

export function HorizontalScroll({ 
  children, 
  showIndicators = true,
  className = '',
  itemClassName = ''
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [itemCount, setItemCount] = useState(0)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const items = container.children
    setItemCount(items.length)
    
    // Intersection Observer to track visible item
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target as Element)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      { root: container, threshold: 0.5 }
    )
    
    Array.from(items).forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [children])
  
  const scrollToIndex = (index: number) => {
    const container = containerRef.current
    if (!container) return
    
    const items = container.children
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    }
  }
  
  return (
    <div className={className}>
      <div 
        ref={containerRef}
        className="horizontal-scroll"
      >
        {children}
      </div>
      
      {showIndicators && itemCount > 1 && (
        <div className="scroll-indicators mt-4 sm:hidden">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              className={`scroll-indicator-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HorizontalScroll
