'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ChladniWebGLSimpleProps {
  n: number
  m: number
  strength: number
  color: string
  opacity: number
  particleSize: number
  particleCount?: number
}

// Vertex shader for particle positioning
const vertexShader = `
uniform float uN;
uniform float uM;
uniform float uParticleSize;

const float PI = 3.14159265359;

float chladniValue(vec2 pos, float n, float m) {
    return cos(n * PI * pos.x) * cos(m * PI * pos.y) - 
           cos(m * PI * pos.x) * cos(n * PI * pos.y);
}

void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uParticleSize;
}
`

const fragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;

void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    float alpha = (1.0 - dist * 2.0) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
}
`

// Chladni pattern calculation
function chladniValue(x: number, y: number, n: number, m: number): number {
  const PI = Math.PI
  return Math.cos(n * PI * x) * Math.cos(m * PI * y) - 
         Math.cos(m * PI * x) * Math.cos(n * PI * y)
}

export default function ChladniWebGLSimple({
  n,
  m,
  strength,
  color,
  opacity,
  particleSize,
  particleCount = 50000,
}: ChladniWebGLSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlePositionsRef = useRef<Float32Array | null>(null)
  const targetPositionsRef = useRef<Float32Array | null>(null)
  const particleVelocitiesRef = useRef<Float32Array | null>(null)
  
  // Previous pattern values for smooth transitions
  const prevPatternRef = useRef({ n, m, strength, color, opacity })

  // Initialize scene
  useEffect(() => {
    console.log('[ChladniWebGLSimple] Initializing with:', { n, m, strength, color, opacity, particleSize, particleCount })
    if (!containerRef.current) {
      console.error('[ChladniWebGLSimple] No container ref')
      return
    }

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Initialize particle positions
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 2
      positions[i3 + 1] = (Math.random() - 0.5) * 2
      positions[i3 + 2] = 0
      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0
    }

    particlePositionsRef.current = positions
    targetPositionsRef.current = new Float32Array(particleCount * 3)
    particleVelocitiesRef.current = velocities

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const colorVec = new THREE.Color(color)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uN: { value: n },
        uM: { value: m },
        uColor: { value: colorVec },
        uOpacity: { value: opacity },
        uParticleSize: { value: particleSize },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    materialRef.current = material
    
    console.log('[ChladniWebGLSimple] Material created with uniforms:', material.uniforms)

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Handle window resize
    const handleResize = () => {
      if (!renderer || !camera) return
      camera.left = -1
      camera.right = 1
      camera.top = 1
      camera.bottom = -1
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (renderer) {
        renderer.dispose()
      }
      if (geometry) {
        geometry.dispose()
      }
      if (material) {
        material.dispose()
      }
    }
  }, [])

  // Update pattern when props change
  useEffect(() => {
    if (!materialRef.current || !particlePositionsRef.current || !targetPositionsRef.current) return

    const material = materialRef.current
    const prevPattern = prevPatternRef.current
    
    // Smoothly transition uniforms
    const colorVec = new THREE.Color(color)
    material.uniforms.uN.value = n
    material.uniforms.uM.value = m
    material.uniforms.uColor.value = colorVec
    material.uniforms.uOpacity.value = opacity
    material.uniforms.uParticleSize.value = particleSize
    
    console.log('[ChladniWebGLSimple] Pattern updated:', { n, m, color, opacity, particleSize })

    // Calculate new target positions based on pattern
    const positions = particlePositionsRef.current
    const targets = targetPositionsRef.current
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      
      // Normalize to 0-1 range
      const nx = (x + 1) / 2
      const ny = (y + 1) / 2
      
      // Calculate Chladni value
      const val = chladniValue(nx, ny, n, m)
      
      // Calculate gradient for force direction
      const h = 0.001
      const valX = chladniValue(nx + h, ny, n, m)
      const valY = chladniValue(nx, ny + h, n, m)
      
      let dx = -(valX - val) / h
      let dy = -(valY - val) / h
      
      // Apply strength
      const forceStrength = Math.abs(val) * strength
      dx *= forceStrength
      dy *= forceStrength
      
      // Normalize
      const mag = Math.sqrt(dx * dx + dy * dy)
      if (mag > 0) {
        dx /= mag
        dy /= mag
      }
      
      // Set target position (apply force)
      targets[i3] = x + dx * 0.01
      targets[i3 + 1] = y + dy * 0.01
      targets[i3 + 2] = 0
    }

    // Update previous pattern
    prevPatternRef.current = { n, m, strength, color, opacity }
  }, [n, m, strength, color, opacity, particleCount])

  // Animation loop
  useEffect(() => {
    console.log('[ChladniWebGLSimple] Animation loop useEffect starting')
    let frameCount = 0
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        console.error('[ChladniWebGLSimple] Animation loop missing refs')
        return
      }
      if (!particlesRef.current || !particlePositionsRef.current || !targetPositionsRef.current || !particleVelocitiesRef.current) {
        console.error('[ChladniWebGLSimple] Animation loop missing particle data')
        return
      }

      frameCount++
      if (frameCount % 120 === 0) {
        console.log('[ChladniWebGLSimple] Animation running, frame:', frameCount)
      }

      const positions = particlePositionsRef.current
      const targets = targetPositionsRef.current
      const velocities = particleVelocitiesRef.current
      const damping = 0.92
      const stiffness = 0.001
      const jitter = 0.0001

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Spring physics toward target
        const dx = targets[i3] - positions[i3]
        const dy = targets[i3 + 1] - positions[i3 + 1]
        
        velocities[i3] += dx * stiffness
        velocities[i3 + 1] += dy * stiffness
        
        // Add subtle jitter
        velocities[i3] += (Math.random() - 0.5) * jitter
        velocities[i3 + 1] += (Math.random() - 0.5) * jitter
        
        // Apply damping
        velocities[i3] *= damping
        velocities[i3 + 1] *= damping
        
        // Update position
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        
        // Keep within bounds
        positions[i3] = Math.max(-1, Math.min(1, positions[i3]))
        positions[i3 + 1] = Math.max(-1, Math.min(1, positions[i3 + 1]))
      }

      const geometry = particlesRef.current.geometry
      geometry.attributes.position.needsUpdate = true

      rendererRef.current.render(sceneRef.current, cameraRef.current)
      
      // Debug: Check what we're rendering
      if (frameCount === 1) {
        console.log('[ChladniWebGLSimple] First frame rendered')
        console.log('  Camera position:', cameraRef.current.position)
        console.log('  Particle count:', particlesRef.current.geometry.attributes.position.count)
        console.log('  First particle pos:', positions[0], positions[1], positions[2])
        console.log('  Canvas dimensions:', rendererRef.current.domElement.width, 'x', rendererRef.current.domElement.height)
        console.log('  Canvas in DOM:', document.body.contains(rendererRef.current.domElement))
        console.log('  Canvas style:', rendererRef.current.domElement.style.cssText)
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particleCount])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        backgroundColor: 'transparent',
        zIndex: 3 // Between section backgrounds (z-index: 2) and content (z-index: 10)
      }}
    />
  )
}
