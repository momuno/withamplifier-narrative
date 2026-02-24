'use client'

import { useState, useEffect } from 'react'

// Muted color palette - let connections provide visual interest
const COLORS = {
  providers: '#10B981',   // Emerald
  tools: '#F59E0B',       // Amber
  hooks: '#06B6D4',       // Cyan
  agents: '#F43F5E',      // Rose
  behaviors: '#8B5CF6',   // Purple
  recipes: '#F97316',     // Orange
  bundle: '#5B4DE3',      // Signal
}

interface NodeProps {
  id: string
  x: number
  y: number
  label: string
  sublabel?: string
  color: string
  isHovered: boolean
  onHover: (id: string | null) => void
  connections: string[]
  activeConnection: string | null
}

function Node({ id, x, y, label, sublabel, color, isHovered, onHover, connections, activeConnection }: NodeProps) {
  const isConnected = activeConnection ? connections.includes(activeConnection) || id === activeConnection : false
  const dimmed = activeConnection && !isConnected
  
  return (
    <g 
      className="node-group"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{ 
        opacity: dimmed ? 0.3 : 1,
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <circle
          cx={x}
          cy={y}
          r="45"
          fill={color}
          opacity="0.15"
          style={{ filter: 'blur(15px)' }}
        />
      )}
      
      {/* Node body - flat, minimal */}
      <rect
        x={x - 50}
        y={y - 22}
        width="100"
        height="44"
        rx="8"
        fill="rgba(20, 20, 25, 0.9)"
        stroke={isHovered ? color : 'rgba(255,255,255,0.1)'}
        strokeWidth={isHovered ? 2 : 1}
        style={{ transition: 'stroke 0.2s ease' }}
      />
      
      {/* Color accent bar */}
      <rect
        x={x - 50}
        y={y - 22}
        width="4"
        height="44"
        rx="2"
        fill={color}
      />
      
      {/* Connection ports */}
      <g className="ports">
        {/* Input port (left) */}
        <circle
          cx={x - 50}
          cy={y}
          r="4"
          fill={isHovered ? color : 'rgba(255,255,255,0.3)'}
          style={{ transition: 'fill 0.2s ease' }}
        />
        {/* Output port (right) */}
        <circle
          cx={x + 50}
          cy={y}
          r="4"
          fill={isHovered ? color : 'rgba(255,255,255,0.3)'}
          style={{ transition: 'fill 0.2s ease' }}
        />
      </g>
      
      {/* Labels */}
      <text
        x={x + 4}
        y={y - 4}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + 4}
          y={y + 10}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="9"
        >
          {sublabel}
        </text>
      )}
    </g>
  )
}

// Flowing connection with particle effect
function FlowingConnection({ 
  from, to, color, isActive, id 
}: { 
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  isActive: boolean
  id: string
}) {
  // Create a curved path
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const curve = Math.abs(to.y - from.y) * 0.3
  
  const path = `M ${from.x} ${from.y} Q ${midX + curve} ${midY} ${to.x} ${to.y}`
  
  return (
    <g className="connection" style={{ opacity: isActive ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      {/* Base line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
      />
      
      {/* Animated gradient line */}
      <path
        d={path}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Flowing particles */}
      <circle r="3" fill={color}>
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={path}
        />
      </circle>
      <circle r="2" fill={color} opacity="0.6">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={path}
          begin="0.5s"
        />
      </circle>
      <circle r="2" fill={color} opacity="0.4">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={path}
          begin="1s"
        />
      </circle>
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="50%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </g>
  )
}

export default function PatchBayDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  // Node positions - laid out in layers
  const nodes = {
    // Foundation layer (bottom)
    providers: { x: -120, y: 120, label: 'Providers', sublabel: 'Any LLM', color: COLORS.providers },
    tools: { x: 0, y: 120, label: 'Tools', sublabel: 'Capabilities', color: COLORS.tools },
    hooks: { x: 120, y: 120, label: 'Hooks', sublabel: 'Lifecycle', color: COLORS.hooks },
    
    // Composition layer (middle)
    agents: { x: -80, y: 40, label: 'Agents', sublabel: 'Personas', color: COLORS.agents },
    behaviors: { x: 80, y: 40, label: 'Behaviors', sublabel: 'Instructions', color: COLORS.behaviors },
    
    // Output layer (top)
    bundle: { x: 0, y: -50, label: 'Bundle', sublabel: 'Your Setup', color: COLORS.bundle },
  }
  
  // Connection definitions: [from, to, color]
  const connections: [string, string, string][] = [
    ['providers', 'agents', COLORS.providers],
    ['tools', 'agents', COLORS.tools],
    ['tools', 'behaviors', COLORS.tools],
    ['hooks', 'behaviors', COLORS.hooks],
    ['agents', 'bundle', COLORS.agents],
    ['behaviors', 'bundle', COLORS.behaviors],
  ]
  
  // Which nodes connect to the hovered node
  const getConnectedNodes = (nodeId: string): string[] => {
    const connected: string[] = []
    connections.forEach(([from, to]) => {
      if (from === nodeId) connected.push(to)
      if (to === nodeId) connected.push(from)
    })
    return connected
  }

  return (
    <div className="w-full flex justify-center">
      <svg 
        viewBox="-220 -120 440 300" 
        className="w-full max-w-2xl"
        style={{ overflow: 'visible' }}
      >
        {/* Subtle background glow */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(91, 77, 227, 0.08)" />
            <stop offset="100%" stopColor="rgba(91, 77, 227, 0)" />
          </radialGradient>
        </defs>
        <ellipse cx="0" cy="40" rx="200" ry="140" fill="url(#bgGlow)" />

        {/* Layer labels */}
        <text x="-200" y="125" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">
          Foundation
        </text>
        <text x="-200" y="45" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">
          Composition
        </text>
        <text x="-200" y="-45" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">
          Output
        </text>

        {/* Connections (behind nodes) */}
        <g className="connections">
          {connections.map(([fromId, toId, color], i) => {
            const from = nodes[fromId as keyof typeof nodes]
            const to = nodes[toId as keyof typeof nodes]
            const isActive = !hoveredNode || hoveredNode === fromId || hoveredNode === toId
            
            return (
              <FlowingConnection
                key={`${fromId}-${toId}`}
                id={`${fromId}-${toId}`}
                from={{ x: from.x + 50, y: from.y }}
                to={{ x: to.x - 50, y: to.y }}
                color={color}
                isActive={isActive}
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {Object.entries(nodes).map(([id, node]) => (
            <Node
              key={id}
              id={id}
              x={node.x}
              y={node.y}
              label={node.label}
              sublabel={node.sublabel}
              color={node.color}
              isHovered={hoveredNode === id}
              onHover={setHoveredNode}
              connections={getConnectedNodes(id)}
              activeConnection={hoveredNode}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
