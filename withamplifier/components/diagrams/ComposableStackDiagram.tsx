'use client'

import { useState } from 'react'

// Color palette for components
const COLORS = {
  providers: { fill: '#10B981', light: '#34D399', dark: '#059669' },  // Emerald
  tools: { fill: '#F59E0B', light: '#FBBF24', dark: '#D97706' },      // Amber
  hooks: { fill: '#06B6D4', light: '#22D3EE', dark: '#0891B2' },      // Cyan
  agents: { fill: '#F43F5E', light: '#FB7185', dark: '#E11D48' },     // Rose
  behaviors: { fill: '#8B5CF6', light: '#A78BFA', dark: '#7C3AED' },  // Purple
  recipes: { fill: '#F97316', light: '#FB923C', dark: '#EA580C' },    // Orange
  bundle: { fill: '#5B4DE3', light: '#7C6FEA', dark: '#4338CA' },     // Signal
}

interface BlockProps {
  x: number
  y: number
  width: number
  height: number
  depth: number
  colors: { fill: string; light: string; dark: string }
  label: string
  sublabel?: string
  isHovered?: boolean
  onHover?: (hovered: boolean) => void
  delay?: number
}

// Isometric block component
function IsometricBlock({ 
  x, y, width, height, depth, colors, label, sublabel, 
  isHovered, onHover, delay = 0 
}: BlockProps) {
  // Isometric projection calculations
  const isoX = (x - y) * 0.866  // cos(30°)
  const isoY = (x + y) * 0.5 - height  // sin(30°)
  
  // Face vertices for isometric cube
  const topFace = `
    ${isoX},${isoY - depth * 0.5}
    ${isoX + width * 0.866},${isoY - depth * 0.5 + width * 0.5}
    ${isoX},${isoY - depth * 0.5 + width}
    ${isoX - width * 0.866},${isoY - depth * 0.5 + width * 0.5}
  `
  
  const leftFace = `
    ${isoX - width * 0.866},${isoY - depth * 0.5 + width * 0.5}
    ${isoX},${isoY - depth * 0.5 + width}
    ${isoX},${isoY + depth * 0.5 + width}
    ${isoX - width * 0.866},${isoY + depth * 0.5 + width * 0.5}
  `
  
  const rightFace = `
    ${isoX},${isoY - depth * 0.5 + width}
    ${isoX + width * 0.866},${isoY - depth * 0.5 + width * 0.5}
    ${isoX + width * 0.866},${isoY + depth * 0.5 + width * 0.5}
    ${isoX},${isoY + depth * 0.5 + width}
  `

  const hoverOffset = isHovered ? -8 : 0
  
  return (
    <g 
      className="isometric-block"
      style={{ 
        transform: `translateY(${hoverOffset}px)`,
        transition: 'transform 0.3s ease-out',
        animationDelay: `${delay}ms`
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Shadow */}
      <ellipse
        cx={isoX}
        cy={isoY + depth * 0.5 + width * 0.5 + 10}
        rx={width * 0.7}
        ry={width * 0.25}
        fill="rgba(0,0,0,0.15)"
        className="block-shadow"
        style={{
          filter: 'blur(8px)',
          opacity: isHovered ? 0.3 : 0.15,
          transition: 'opacity 0.3s ease-out'
        }}
      />
      
      {/* Left face (darkest) */}
      <polygon 
        points={leftFace} 
        fill={colors.dark}
        stroke={colors.dark}
        strokeWidth="0.5"
      />
      
      {/* Right face (medium) */}
      <polygon 
        points={rightFace} 
        fill={colors.fill}
        stroke={colors.fill}
        strokeWidth="0.5"
      />
      
      {/* Top face (lightest) */}
      <polygon 
        points={topFace} 
        fill={colors.light}
        stroke={colors.light}
        strokeWidth="0.5"
      />
      
      {/* Label on top face */}
      <text
        x={isoX}
        y={isoY - depth * 0.5 + width * 0.5 - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="600"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        {label}
      </text>
      
      {sublabel && (
        <text
          x={isoX}
          y={isoY - depth * 0.5 + width * 0.5 + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.8)"
          fontSize="8"
        >
          {sublabel}
        </text>
      )}
    </g>
  )
}

// Connection line between blocks
function ConnectionLine({ 
  from, to, color = 'rgba(255,255,255,0.2)' 
}: { 
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string 
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4 4"
      className="connection-line"
    />
  )
}

export default function ComposableStackDiagram() {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  
  // Block dimensions
  const blockWidth = 70
  const blockHeight = 20
  const blockDepth = 25
  
  // Layout positions (will be transformed to isometric)
  const positions = {
    // Bottom layer (foundation)
    providers: { x: -80, y: 80 },
    tools: { x: 0, y: 80 },
    hooks: { x: 80, y: 80 },
    
    // Middle layer
    agents: { x: -40, y: 0 },
    behaviors: { x: 40, y: 0 },
    recipes: { x: 120, y: 0 },
    
    // Top layer (output)
    bundle: { x: 0, y: -80 },
  }

  return (
    <div className="w-full flex justify-center">
      <svg 
        viewBox="-200 -180 400 360" 
        className="w-full max-w-lg"
        style={{ overflow: 'visible' }}
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(91, 77, 227, 0.1)" />
            <stop offset="100%" stopColor="rgba(91, 77, 227, 0)" />
          </radialGradient>
        </defs>
        <ellipse cx="0" cy="20" rx="180" ry="120" fill="url(#centerGlow)" />

        {/* Connection lines (behind blocks) */}
        <g className="connections" opacity="0.4">
          {/* Bottom to middle */}
          <ConnectionLine from={{ x: -50, y: 60 }} to={{ x: -30, y: 10 }} />
          <ConnectionLine from={{ x: 0, y: 60 }} to={{ x: -30, y: 10 }} />
          <ConnectionLine from={{ x: 0, y: 60 }} to={{ x: 30, y: 10 }} />
          <ConnectionLine from={{ x: 50, y: 60 }} to={{ x: 30, y: 10 }} />
          
          {/* Middle to top */}
          <ConnectionLine from={{ x: -30, y: -20 }} to={{ x: 0, y: -60 }} />
          <ConnectionLine from={{ x: 30, y: -20 }} to={{ x: 0, y: -60 }} />
        </g>

        {/* Bottom layer: Providers, Tools, Hooks */}
        <g className="layer-foundation">
          <IsometricBlock
            x={positions.providers.x}
            y={positions.providers.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.providers}
            label="Providers"
            sublabel="Any LLM"
            isHovered={hoveredBlock === 'providers'}
            onHover={(h) => setHoveredBlock(h ? 'providers' : null)}
            delay={0}
          />
          <IsometricBlock
            x={positions.tools.x}
            y={positions.tools.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.tools}
            label="Tools"
            sublabel="Capabilities"
            isHovered={hoveredBlock === 'tools'}
            onHover={(h) => setHoveredBlock(h ? 'tools' : null)}
            delay={100}
          />
          <IsometricBlock
            x={positions.hooks.x}
            y={positions.hooks.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.hooks}
            label="Hooks"
            sublabel="Lifecycle"
            isHovered={hoveredBlock === 'hooks'}
            onHover={(h) => setHoveredBlock(h ? 'hooks' : null)}
            delay={200}
          />
        </g>

        {/* Middle layer: Agents, Behaviors, Recipes */}
        <g className="layer-composition">
          <IsometricBlock
            x={positions.agents.x}
            y={positions.agents.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.agents}
            label="Agents"
            sublabel="Personas"
            isHovered={hoveredBlock === 'agents'}
            onHover={(h) => setHoveredBlock(h ? 'agents' : null)}
            delay={300}
          />
          <IsometricBlock
            x={positions.behaviors.x}
            y={positions.behaviors.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.behaviors}
            label="Behaviors"
            sublabel="Instructions"
            isHovered={hoveredBlock === 'behaviors'}
            onHover={(h) => setHoveredBlock(h ? 'behaviors' : null)}
            delay={400}
          />
          <IsometricBlock
            x={positions.recipes.x}
            y={positions.recipes.y}
            width={blockWidth}
            height={blockHeight}
            depth={blockDepth}
            colors={COLORS.recipes}
            label="Recipes"
            sublabel="Workflows"
            isHovered={hoveredBlock === 'recipes'}
            onHover={(h) => setHoveredBlock(h ? 'recipes' : null)}
            delay={500}
          />
        </g>

        {/* Top layer: Bundle (output) */}
        <g className="layer-output">
          <IsometricBlock
            x={positions.bundle.x}
            y={positions.bundle.y}
            width={blockWidth * 1.2}
            height={blockHeight}
            depth={blockDepth * 1.2}
            colors={COLORS.bundle}
            label="Bundle"
            sublabel="Your Setup"
            isHovered={hoveredBlock === 'bundle'}
            onHover={(h) => setHoveredBlock(h ? 'bundle' : null)}
            delay={600}
          />
        </g>

        {/* Layer labels */}
        <text x="-180" y="100" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="500">
          Foundation
        </text>
        <text x="-180" y="20" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="500">
          Composition
        </text>
        <text x="-180" y="-60" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="500">
          Output
        </text>
      </svg>
    </div>
  )
}
