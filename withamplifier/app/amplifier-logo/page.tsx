'use client'

import { useEffect, useRef, useState } from 'react'
import { amplifierShapeForce, getAmplifierShapePoints } from '@/lib/amplifier-shape'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export default function AmplifierLogoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  
  const [strength, setStrength] = useState(1.2)
  const [damping, setDamping] = useState(0.90)
  const [jitter, setJitter] = useState(0.003)
  const [particleSize, setParticleSize] = useState(1.5)
  const [color, setColor] = useState('#D9846B')
  const [bgColor, setBgColor] = useState('#0D1E28')
  const [showPoints, setShowPoints] = useState(false)
  const [initialized, setInitialized] = useState(false)
  
  useEffect(() => {
    const particles: Particle[] = []
    for (let i = 0; i < 25000; i++) {
      particles.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0 })
    }
    particlesRef.current = particles
    setInitialized(true)
  }, [])
  
  useEffect(() => {
    if (!initialized) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    function animate() {
      if (!ctx) return
      
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
      
      if (showPoints) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)'
        const points = getAmplifierShapePoints()
        for (const p of points) {
          ctx.beginPath()
          ctx.arc(p.x * width, p.y * height, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      
      const particles = particlesRef.current
      ctx.fillStyle = color
      
      for (const p of particles) {
        const [fx, fy] = amplifierShapeForce(p.x, p.y, strength)
        
        p.vx += fx * 0.008
        p.vy += fy * 0.008
        p.vx += (Math.random() - 0.5) * jitter
        p.vy += (Math.random() - 0.5) * jitter
        p.vx *= damping
        p.vy *= damping
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0.05) p.vx += 0.001
        if (p.x > 0.95) p.vx -= 0.001
        if (p.y < 0.05) p.vy += 0.001
        if (p.y > 0.95) p.vy -= 0.001
        
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(p.x * width, p.y * height, particleSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    return () => cancelAnimationFrame(animationRef.current)
  }, [initialized, strength, damping, jitter, color, bgColor, showPoints, particleSize])
  
  const scatter = () => {
    particlesRef.current.forEach(p => {
      p.x = Math.random()
      p.y = Math.random()
      p.vx = 0
      p.vy = 0
    })
  }
  
  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <canvas ref={canvasRef} width={868} height={868} className="border border-gray-800 rounded-lg"/>
      </div>
      
      <div className="w-80 bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold text-white mb-2">Amplifier Logo</h1>
        <p className="text-sm text-gray-400 mb-6">Particles forming your icon</p>
        
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Strength: {strength.toFixed(2)}</label>
            <input type="range" min="0.1" max="3" step="0.1" value={strength} onChange={(e) => setStrength(parseFloat(e.target.value))} className="w-full"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Damping: {damping.toFixed(3)}</label>
            <input type="range" min="0.8" max="0.98" step="0.005" value={damping} onChange={(e) => setDamping(parseFloat(e.target.value))} className="w-full"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Jitter: {jitter.toFixed(4)}</label>
            <input type="range" min="0.001" max="0.015" step="0.001" value={jitter} onChange={(e) => setJitter(parseFloat(e.target.value))} className="w-full"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Size: {particleSize.toFixed(1)}</label>
            <input type="range" min="0.5" max="4" step="0.25" value={particleSize} onChange={(e) => setParticleSize(parseFloat(e.target.value))} className="w-full"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded"/>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showPoints" checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)}/>
            <label htmlFor="showPoints" className="text-sm text-gray-400">Show attractor points</label>
          </div>
          <button onClick={scatter} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded">
            Scatter Particles
          </button>
        </div>
      </div>
    </div>
  )
}
