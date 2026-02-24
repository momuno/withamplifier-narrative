'use client'

import { useMemo } from 'react'

interface ScrollBoundTextProps {
  /** The text to reveal */
  text: string
  /** Current global progress (0-1) */
  progress: number
  /** Progress value at which this text starts revealing */
  progressStart: number
  /** Progress value at which this text is fully revealed */
  progressEnd: number
  /** Additional className for the paragraph */
  className?: string
  /** Whether to show the cursor */
  showCursor?: boolean
}

export function ScrollBoundText({
  text,
  progress,
  progressStart,
  progressEnd,
  className = '',
  showCursor = true,
}: ScrollBoundTextProps) {
  // Map global progress to local 0-1 for this text segment
  const localProgress = useMemo(() => {
    if (progress < progressStart) return 0
    if (progress >= progressEnd) return 1
    return (progress - progressStart) / (progressEnd - progressStart)
  }, [progress, progressStart, progressEnd])

  // How many characters to show
  const visibleChars = Math.floor(localProgress * text.length)
  
  // Cursor is active when we're in the middle of streaming
  const cursorActive = localProgress > 0 && localProgress < 1

  // Don't render anything until we start
  if (localProgress === 0) return null

  return (
    <p 
      className={className}
      style={{ 
        textWrap: 'balance',
        // Fade to settled state when complete
        opacity: localProgress >= 1 ? 0.75 : 1,
        transition: 'opacity 400ms ease-out',
      }}
    >
      {text.split('').map((char, i) => {
        const isVisible = i < visibleChars
        const isCursorPosition = showCursor && cursorActive && i === visibleChars
        
        return (
          <span key={i} style={{ position: 'relative' }}>
            <span 
              style={{ 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 30ms ease-out',
              }}
            >
              {char}
            </span>
            {/* Cursor travels with the text - positioned right after this character */}
            {isCursorPosition && (
              <span 
                className="inline-block w-[2px] h-[1.1em] bg-signal absolute animate-pulse"
                style={{ 
                  left: 0,
                  top: '0.05em',
                  marginLeft: '-1px',
                }}
                aria-hidden="true"
              />
            )}
          </span>
        )
      })}
    </p>
  )
}

/**
 * Headline variant with fade + slide animation
 */
interface ScrollBoundHeadlineProps {
  text: string
  progress: number
  /** Progress range for the headline reveal */
  progressStart?: number
  progressEnd?: number
  className?: string
}

export function ScrollBoundHeadline({
  text,
  progress,
  progressStart = 0,
  progressEnd = 0.15,
  className = '',
}: ScrollBoundHeadlineProps) {
  const localProgress = useMemo(() => {
    if (progress < progressStart) return 0
    if (progress >= progressEnd) return 1
    return (progress - progressStart) / (progressEnd - progressStart)
  }, [progress, progressStart, progressEnd])

  // Eased progress for smoother animation
  const eased = easeOutCubic(localProgress)

  return (
    <h2
      className={className}
      style={{
        opacity: eased,
        transform: `translateY(${(1 - eased) * 30}px)`,
        transition: 'none', // Progress-driven, no CSS transition
      }}
    >
      {text}
    </h2>
  )
}

// Easing function
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
