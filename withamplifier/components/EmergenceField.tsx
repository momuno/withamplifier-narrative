'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * EmergenceField - Animated mesh gradient background
 * 
 * Design concept: "Technology emerging from potential"
 * - Soft gradient orbs that drift organically
 * - Warm color palette (indigo → violet → amber)
 * - Simplex noise for non-mechanical movement
 * - Very slow, ambient motion that feels alive
 * 
 * Inspired by: Microsoft.ai, Gemini's ambient backgrounds
 */

// Simplex noise implementation (simplified 2D)
// Based on Stefan Gustavson's implementation
class SimplexNoise {
  private perm: number[] = []
  
  constructor(seed = Math.random()) {
    const p = []
    for (let i = 0; i < 256; i++) {
      p[i] = Math.floor(seed * 256)
      seed = (seed * 16807) % 2147483647
      seed = seed < 0 ? seed + 2147483647 : seed
      p[i] = Math.floor((seed / 2147483647) * 256)
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255]
    }
  }
  
  private grad2d(hash: number, x: number, y: number): number {
    const h = hash & 7
    const u = h < 4 ? x : y
    const v = h < 4 ? y : x
    return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v)
  }
  
  noise2d(x: number, y: number): number {
    const F2 = 0.5 * (Math.sqrt(3) - 1)
    const G2 = (3 - Math.sqrt(3)) / 6
    
    const s = (x + y) * F2
    const i = Math.floor(x + s)
    const j = Math.floor(y + s)
    const t = (i + j) * G2
    
    const X0 = i - t
    const Y0 = j - t
    const x0 = x - X0
    const y0 = y - Y0
    
    const i1 = x0 > y0 ? 1 : 0
    const j1 = x0 > y0 ? 0 : 1
    
    const x1 = x0 - i1 + G2
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1 + 2 * G2
    const y2 = y0 - 1 + 2 * G2
    
    const ii = i & 255
    const jj = j & 255
    
    let n0 = 0, n1 = 0, n2 = 0
    
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 >= 0) {
      t0 *= t0
      n0 = t0 * t0 * this.grad2d(this.perm[ii + this.perm[jj]], x0, y0)
    }
    
    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 >= 0) {
      t1 *= t1
      n1 = t1 * t1 * this.grad2d(this.perm[ii + i1 + this.perm[jj + j1]], x1, y1)
    }
    
    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 >= 0) {
      t2 *= t2
      n2 = t2 * t2 * this.grad2d(this.perm[ii + 1 + this.perm[jj + 1]], x2, y2)
    }
    
    return 70 * (n0 + n1 + n2)
  }
}

// Gradient orb configuration
interface GradientOrb {
  x: number       // Base position (0-1)
  y: number       // Base position (0-1)
  radius: number  // Size (0-1 of canvas)
  color: string   // Gradient color
  noiseOffsetX: number
  noiseOffsetY: number
  speed: number   // Individual speed multiplier
  opacity: number
}

interface EmergenceFieldProps {
  className?: string
  opacity?: number
  blur?: number
  speed?: number  // 0.0001 = very slow (default), 0.001 = visible movement
}

export function EmergenceField({ 
  className = '', 
  opacity = 0.6,
  blur = 60,
  speed = 0.0003
}: EmergenceFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const noiseRef = useRef<SimplexNoise | null>(null)
  const orbsRef = useRef<GradientOrb[]>([])
  const timeRef = useRef(0)
  const isVisibleRef = useRef(true)
  
  // Initialize orbs with warm, sophisticated colors
  const initializeOrbs = useCallback(() => {
    // Color palette: warm indigo → violet → amber accents
    const colors = [
      'rgba(99, 102, 241, 0.4)',    // Indigo (primary)
      'rgba(139, 92, 246, 0.35)',   // Violet
      'rgba(168, 85, 247, 0.3)',    // Purple
      'rgba(251, 146, 60, 0.25)',   // Amber (warm accent)
      'rgba(236, 72, 153, 0.2)',    // Pink (subtle)
      'rgba(59, 130, 246, 0.25)',   // Blue (cool balance)
    ]
    
    orbsRef.current = [
      // Large background orbs
      { x: 0.2, y: 0.3, radius: 0.5, color: colors[0], noiseOffsetX: 0, noiseOffsetY: 100, speed: 0.8, opacity: 1 },
      { x: 0.8, y: 0.2, radius: 0.45, color: colors[1], noiseOffsetX: 200, noiseOffsetY: 50, speed: 1.2, opacity: 1 },
      { x: 0.5, y: 0.7, radius: 0.55, color: colors[2], noiseOffsetX: 400, noiseOffsetY: 150, speed: 0.6, opacity: 1 },
      // Medium accent orbs
      { x: 0.7, y: 0.6, radius: 0.35, color: colors[3], noiseOffsetX: 600, noiseOffsetY: 200, speed: 1.0, opacity: 0.9 },
      { x: 0.3, y: 0.8, radius: 0.3, color: colors[4], noiseOffsetX: 800, noiseOffsetY: 250, speed: 1.4, opacity: 0.8 },
      // Small highlight orb
      { x: 0.6, y: 0.4, radius: 0.25, color: colors[5], noiseOffsetX: 1000, noiseOffsetY: 300, speed: 0.9, opacity: 0.85 },
    ]
  }, [])
  
  // Track frame timing for throttling on low-power devices
  const lastFrameTimeRef = useRef(0)
  const targetFPS = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 60
  const frameInterval = 1000 / targetFPS
  
  // Animation loop with frame throttling for mobile
  const animate = useCallback((currentTime: number = 0) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const noise = noiseRef.current
    
    if (!canvas || !ctx || !noise || !isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    
    // Throttle frame rate on mobile to reduce GPU load
    const elapsed = currentTime - lastFrameTimeRef.current
    if (elapsed < frameInterval) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    lastFrameTimeRef.current = currentTime - (elapsed % frameInterval)
    
    const width = canvas.width
    const height = canvas.height
    
    // Clear with warm cream base
    ctx.fillStyle = '#FDFCFA'
    ctx.fillRect(0, 0, width, height)
    
    // Update time
    timeRef.current += speed
    const time = timeRef.current
    
    // Draw each orb
    orbsRef.current.forEach(orb => {
      // Calculate position using noise for organic movement
      const noiseX = noise.noise2d(orb.noiseOffsetX + time * orb.speed, time * 0.5)
      const noiseY = noise.noise2d(orb.noiseOffsetY + time * orb.speed, time * 0.5 + 100)
      
      // Map noise (-1 to 1) to position offset
      const offsetX = noiseX * 0.15  // 15% movement range
      const offsetY = noiseY * 0.15
      
      const x = (orb.x + offsetX) * width
      const y = (orb.y + offsetY) * height
      const radius = orb.radius * Math.min(width, height)
      
      // Create radial gradient for soft edge
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, orb.color)
      gradient.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, `${parseFloat(orb.color.match(/[\d.]+\)$/)?.[0] || '0.3') * 0.5})`))
      gradient.addColorStop(1, 'rgba(253, 252, 250, 0)')
      
      ctx.globalAlpha = orb.opacity
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
    
    ctx.globalAlpha = 1
    
    animationRef.current = requestAnimationFrame(animate)
  }, [speed])
  
  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])
  
  // Setup and cleanup
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Just show static gradient
      return
    }
    
    noiseRef.current = new SimplexNoise(42) // Consistent seed for reproducibility
    initializeOrbs()
    handleResize()
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)
    
    // Handle resize
    window.addEventListener('resize', handleResize)
    
    // Intersection observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 }
    )
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [animate, handleResize, initializeOrbs])
  
  // Reduce blur on mobile for performance - blur is GPU intensive
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const effectiveBlur = isMobile ? Math.min(blur, 40) : blur // Cap at 40px on mobile
  
  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity,
          filter: `blur(${effectiveBlur}px)`,
          transform: 'scale(1.2) translateZ(0)', // translateZ(0) forces GPU compositing
          transformOrigin: 'center center',
          // Hint to browser this will animate
          willChange: 'transform',
        }}
      />
      {/* Subtle noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

/**
 * Static fallback for reduced motion or SSR
 * Uses CSS gradients instead of canvas animation
 */
export function EmergenceFieldStatic({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Multi-layer gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 90% 70% at 50% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 70% 60%, rgba(251, 146, 60, 0.08) 0%, transparent 50%),
            #FDFCFA
          `,
        }}
      />
    </div>
  )
}
