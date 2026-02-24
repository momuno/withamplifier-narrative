'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { SECTION_PATTERNS, type ExtendedPatternConfig } from '@/lib/chladni'

// Simplified shaders - CPU does the physics
const vertexShader = `
uniform float uN1;
uniform float uM1;
uniform float uN2;
uniform float uM2;
uniform float uTransition;

varying float vDistance;

const float PI = 3.14159265359;

float chladniValue(vec2 pos, float n, float m) {
    return cos(n * PI * pos.x) * cos(m * PI * pos.y) - 
           cos(m * PI * pos.x) * cos(n * PI * pos.y);
}

void main() {
    vec3 pos = position;
    vec2 normalizedPos = pos.xy * 0.5 + 0.5;
    
    // Calculate distance from nodal line for coloring
    float val1 = chladniValue(normalizedPos, uN1, uM1);
    float val2 = chladniValue(normalizedPos, uN2, uM2);
    
    float eased = uTransition < 0.5 
        ? 4.0 * uTransition * uTransition * uTransition 
        : 1.0 - pow(-2.0 * uTransition + 2.0, 3.0) / 2.0;
    
    vDistance = abs(mix(val1, val2, eased));
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 3.0;
}
`

const fragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uGlowIntensity;

varying float vDistance;

void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    float nodal = 1.0 - smoothstep(0.0, 0.15, vDistance);
    float glow = nodal * uGlowIntensity;
    
    alpha *= (uOpacity + glow);
    vec3 finalColor = uColor * (1.0 + glow * 0.3);
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(finalColor, alpha);
}
`

interface SectionConfig {
  id: string
  pattern: ExtendedPatternConfig
  isDark: boolean
}

const SECTIONS: SectionConfig[] = [
  { id: 'hero', pattern: SECTION_PATTERNS.hero, isDark: false },
  { id: 'problem', pattern: SECTION_PATTERNS.problem, isDark: true },
  { id: 'differentiation', pattern: SECTION_PATTERNS.differentiation, isDark: true },
  { id: 'platform', pattern: SECTION_PATTERNS.platform, isDark: false },
  { id: 'demo', pattern: SECTION_PATTERNS.demo, isDark: false },
  { id: 'bundles', pattern: SECTION_PATTERNS.bundles, isDark: false },
  { id: 'impact', pattern: SECTION_PATTERNS.impact, isDark: false },
  { id: 'why', pattern: SECTION_PATTERNS.why, isDark: true },
  { id: 'ecosystem', pattern: SECTION_PATTERNS.ecosystem, isDark: false },
  { id: 'cta', pattern: SECTION_PATTERNS.cta, isDark: false },
]

// Chladni math functions
function chladniValue(x: number, y: number, n: number, m: number): number {
  const PI = Math.PI
  return Math.cos(n * PI * x) * Math.cos(m * PI * y) - 
         Math.cos(m * PI * x) * Math.cos(n * PI * y)
}

function chladniGradient(x: number, y: number, n: number, m: number): [number, number] {
  const h = 0.001
  const val = chladniValue(x, y, n, m)
  const valX = chladniValue(x + h, y, n, m)
  const valY = chladniValue(x, y + h, n, m)
  
  let dx = -(valX - val) / h
  let dy = -(valY - val) / h
  
  const strength = Math.abs(val)
  dx *= strength
  dy *= strength
  
  const mag = Math.sqrt(dx * dx + dy * dy)
  if (mag > 0) {
    dx /= mag
    dy /= mag
  }
  
  return [dx, dy]
}

function chladniForce(x: number, y: number, n: number, m: number, strength: number): [number, number] {
  const val = chladniValue(x, y, n, m)
  const [dx, dy] = chladniGradient(x, y, n, m)
  const forceMag = Math.abs(val) * strength
  return [dx * forceMag, dy * forceMag]
}

export default function ChladniWebGL() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const currentSectionRef = useRef<string>('hero')
  const transitionRef = useRef({ 
    progress: 0, 
    isTransitioning: false,
    n1: 1, m1: 2,
    n2: 1, m2: 2,
    forceStrength: 0.8,
    damping: 0.92,
    chaos: 0
  })

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return

    console.log('[ChladniWebGL] Initializing scene...')

    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    console.log(`[ChladniWebGL] Window size: ${width}x${height}`)
    console.log(`[ChladniWebGL] Container element:`, containerRef.current)
    console.log(`[ChladniWebGL] Container computed style:`, window.getComputedStyle(containerRef.current))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    console.log('[ChladniWebGL] Canvas element added to DOM')
    console.log('[ChladniWebGL] Canvas actual size:', renderer.domElement.width, 'x', renderer.domElement.height)
    console.log('[ChladniWebGL] Canvas style:', renderer.domElement.style.cssText)
    console.log('[ChladniWebGL] Canvas position in viewport:', renderer.domElement.getBoundingClientRect())

    const isMobile = width < 768
    const particleCount = isMobile ? 5000 : 10000
    console.log(`[ChladniWebGL] Creating ${particleCount} particles`)
    console.log(`[ChladniWebGL] Aspect ratio: ${aspect}, Camera bounds: x=[${-aspect}, ${aspect}], y=[-1, 1]`)

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Random initial positions - match camera aspect ratio for full viewport coverage
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // X range matches camera width: -aspect to +aspect
      positions[i3] = (Math.random() - 0.5) * 2 * aspect
      // Y range matches camera height: -1 to +1
      positions[i3 + 1] = (Math.random() - 0.5) * 2
      positions[i3 + 2] = 0
      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const heroPattern = SECTION_PATTERNS.hero
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uN1: { value: heroPattern.params.n },
        uM1: { value: heroPattern.params.m },
        uN2: { value: heroPattern.params.n },
        uM2: { value: heroPattern.params.m },
        uTransition: { value: 0 },
        uColor: { value: new THREE.Color(0x666666) },
        uOpacity: { value: 0.6 },
        uGlowIntensity: { value: 0.4 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    particlesRef.current = particles
    materialRef.current = material

    // Initialize transition state
    transitionRef.current.n1 = heroPattern.params.n
    transitionRef.current.m1 = heroPattern.params.m
    transitionRef.current.n2 = heroPattern.params.n
    transitionRef.current.m2 = heroPattern.params.m
    transitionRef.current.forceStrength = heroPattern.forceStrength
    transitionRef.current.damping = heroPattern.damping
    transitionRef.current.chaos = heroPattern.chaos

    console.log('[ChladniWebGL] Scene initialized successfully')
  }, [])

  // CPU-side physics update
  const updatePhysics = useCallback(() => {
    if (!particlesRef.current) return

    const geometry = particlesRef.current.geometry
    const positions = geometry.attributes.position.array as Float32Array
    const velocities = geometry.attributes.velocity.array as Float32Array
    
    const particleCount = positions.length / 3
    const deltaTime = 0.016 // 60fps
    
    const trans = transitionRef.current
    const eased = trans.progress < 0.5 
      ? 4 * trans.progress * trans.progress * trans.progress 
      : 1 - Math.pow(-2 * trans.progress + 2, 3) / 2
    
    const n = trans.n1 * (1 - eased) + trans.n2 * eased
    const m = trans.m1 * (1 - eased) + trans.m2 * eased

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      let x = positions[i3]
      let y = positions[i3 + 1]
      let vx = velocities[i3]
      let vy = velocities[i3 + 1]
      
      // Normalize to 0-1 for Chladni calculation
      const nx = x * 0.5 + 0.5
      const ny = y * 0.5 + 0.5
      
      // Chladni force
      const [fx, fy] = chladniForce(nx, ny, n, m, trans.forceStrength)
      
      // Mouse repulsion
      if (mouseRef.current.isActive) {
        const dx = nx - mouseRef.current.x
        const dy = ny - (1 - mouseRef.current.y)
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 0.15
        
        if (dist < radius && dist > 0.001) {
          const repelStrength = (1 - dist / radius) * 0.5
          vx += (dx / dist) * repelStrength * deltaTime
          vy += (dy / dist) * repelStrength * deltaTime
        }
      }
      
      // Chaos/random forces
      if (trans.chaos > 0) {
        const randomFx = (Math.random() - 0.5) * trans.chaos * 0.01
        const randomFy = (Math.random() - 0.5) * trans.chaos * 0.01
        vx += randomFx * deltaTime
        vy += randomFy * deltaTime
      }
      
      // Apply forces and damping
      vx = (vx + fx * deltaTime) * trans.damping
      vy = (vy + fy * deltaTime) * trans.damping
      
      // Update position
      x += vx * deltaTime
      y += vy * deltaTime
      
      // Wrap edges
      if (x < -1) x += 2
      if (x > 1) x -= 2
      if (y < -1) y += 2
      if (y > 1) y -= 2
      
      // Write back
      positions[i3] = x
      positions[i3 + 1] = y
      velocities[i3] = vx
      velocities[i3 + 1] = vy
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.velocity.needsUpdate = true
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) {
      return
    }

    // Update physics on CPU
    updatePhysics()

    // Update shader uniforms for coloring
    const material = materialRef.current
    if (transitionRef.current.isTransitioning) {
      transitionRef.current.progress += 0.008 // 2 second transition
      if (transitionRef.current.progress >= 1) {
        transitionRef.current.progress = 1
        transitionRef.current.isTransitioning = false
        
        // Snap to new pattern
        transitionRef.current.n1 = transitionRef.current.n2
        transitionRef.current.m1 = transitionRef.current.m2
        material.uniforms.uN1.value = transitionRef.current.n2
        material.uniforms.uM1.value = transitionRef.current.m2
      }
      material.uniforms.uTransition.value = transitionRef.current.progress
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updatePhysics])

  // Transition to pattern
  const transitionToPattern = useCallback((sectionId: string) => {
    if (!materialRef.current) return
    
    const section = SECTIONS.find(s => s.id === sectionId)
    if (!section) return

    console.log(`[ChladniWebGL] Transitioning to ${sectionId}`, section.pattern)

    const material = materialRef.current
    const trans = transitionRef.current

    // Set target pattern
    trans.n2 = section.pattern.params.n
    trans.m2 = section.pattern.params.m
    trans.forceStrength = section.pattern.forceStrength
    trans.damping = section.pattern.damping
    trans.chaos = section.pattern.chaos

    material.uniforms.uN2.value = section.pattern.params.n
    material.uniforms.uM2.value = section.pattern.params.m

    // Update color for dark sections
    if (section.isDark) {
      material.uniforms.uColor.value.setHex(0xcccccc)
      material.uniforms.uOpacity.value = 0.5
    } else {
      material.uniforms.uColor.value.setHex(0x666666)
      material.uniforms.uOpacity.value = 0.6
    }

    // Start transition
    trans.progress = 0
    trans.isTransitioning = true
  }, [])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId && sectionId !== currentSectionRef.current) {
              currentSectionRef.current = sectionId
              transitionToPattern(sectionId)
            }
          }
        })
      },
      { threshold: [0.5] }
    )

    document.querySelectorAll('[data-section]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [transitionToPattern])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
      mouseRef.current.isActive = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight
      const aspect = width / height

      cameraRef.current.left = -aspect
      cameraRef.current.right = aspect
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize and start
  useEffect(() => {
    console.log('[ChladniWebGL] Main effect running')
    initScene()
    
    const startAnimation = () => {
      if (!rendererRef.current || !sceneRef.current || !materialRef.current) {
        console.warn('[ChladniWebGL] Scene not ready, retrying...')
        setTimeout(startAnimation, 100)
        return
      }
      
      console.log('[ChladniWebGL] Starting animation')
      animate()
      
      // Transition to hero after 2 seconds
      setTimeout(() => {
        console.log('[ChladniWebGL] Transitioning to hero')
        transitionToPattern('hero')
      }, 2000)
    }
    
    startAnimation()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        backgroundColor: 'transparent',
        zIndex: 1
      }}
    />
  )
}
