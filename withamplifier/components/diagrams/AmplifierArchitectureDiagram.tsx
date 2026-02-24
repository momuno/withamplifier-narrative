'use client'

import { useState } from 'react'

// Color palette
const COLORS = {
  user: { fill: '#F8F8F8', stroke: '#E0E0E0', text: '#333' },
  interfaces: { fill: '#64748B', light: '#94A3B8', dark: '#475569' },
  bundles: { fill: '#8B5CF6', light: '#A78BFA', dark: '#7C3AED' },
  kernel: { fill: '#5B4DE3', light: '#7C6FEA', dark: '#4338CA' },
  modules: {
    provider: { fill: '#10B981', light: '#34D399', dark: '#059669' },
    tool: { fill: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
    orchestrator: { fill: '#EC4899', light: '#F472B6', dark: '#DB2777' },
    hook: { fill: '#06B6D4', light: '#22D3EE', dark: '#0891B2' },
    context: { fill: '#F97316', light: '#FB923C', dark: '#EA580C' },
  },
  llms: { fill: '#1E293B', light: '#334155', dark: '#0F172A' },
}

interface LayerProps {
  y: number
  label: string
  sublabel?: string
  color: { fill: string; light?: string; dark?: string; stroke?: string; text?: string }
  isHovered: boolean
  onHover: (hovered: boolean) => void
  width?: number
  height?: number
  children?: React.ReactNode
}

function Layer({ y, label, sublabel, color, isHovered, onHover, width = 500, height = 60, children }: LayerProps) {
  const x = -width / 2
  
  return (
    <g 
      className="layer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Shadow */}
      <rect
        x={x + 4}
        y={y + 4}
        width={width}
        height={height}
        rx={12}
        fill="rgba(0,0,0,0.1)"
        style={{ filter: 'blur(4px)' }}
      />
      
      {/* Main box */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill={color.fill}
        stroke={isHovered ? color.light || color.stroke || '#fff' : 'transparent'}
        strokeWidth={2}
        style={{ 
          transition: 'all 0.2s ease',
          transform: isHovered ? 'translateY(-2px)' : 'none'
        }}
      />
      
      {/* Label */}
      <text
        x={0}
        y={y + height / 2 - (sublabel ? 6 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color.text || '#fff'}
        fontSize="14"
        fontWeight="600"
      >
        {label}
      </text>
      
      {sublabel && (
        <text
          x={0}
          y={y + height / 2 + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color.text ? `${color.text}99` : 'rgba(255,255,255,0.7)'}
          fontSize="11"
        >
          {sublabel}
        </text>
      )}
      
      {children}
    </g>
  )
}

function ModuleBox({ 
  x, y, label, color, isHovered, onHover 
}: { 
  x: number
  y: number
  label: string
  color: { fill: string; light: string; dark: string }
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  const width = 85
  const height = 50
  
  return (
    <g
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x - width / 2}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={color.fill}
        stroke={isHovered ? color.light : 'transparent'}
        strokeWidth={2}
        style={{ transition: 'all 0.2s ease' }}
      />
      <text
        x={x}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  )
}

function ConnectionArrow({ fromY, toY, label }: { fromY: number; toY: number; label?: string }) {
  const midY = (fromY + toY) / 2
  
  return (
    <g className="connection">
      <line
        x1={0}
        y1={fromY}
        x2={0}
        y2={toY}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <polygon
        points={`0,${toY} -6,${toY - 10} 6,${toY - 10}`}
        fill="rgba(255,255,255,0.3)"
      />
      {label && (
        <text
          x={12}
          y={midY}
          fill="rgba(255,255,255,0.5)"
          fontSize="9"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

export default function AmplifierArchitectureDiagram() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  
  // Vertical positions
  const userY = -280
  const interfacesY = -200
  const bundlesY = -110
  const kernelY = -20
  const modulesY = 70
  const llmsY = 180
  
  return (
    <div className="w-full flex flex-col items-center">
      <svg 
        viewBox="-300 -320 600 580" 
        className="w-full max-w-3xl"
        style={{ overflow: 'visible' }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(91, 77, 227, 0.05)" />
            <stop offset="50%" stopColor="rgba(91, 77, 227, 0.1)" />
            <stop offset="100%" stopColor="rgba(30, 41, 59, 0.1)" />
          </linearGradient>
        </defs>
        <rect x="-300" y="-320" width="600" height="580" fill="url(#bgGradient)" rx="20" />
        
        {/* Connection arrows */}
        <ConnectionArrow fromY={userY + 40} toY={interfacesY} />
        <ConnectionArrow fromY={interfacesY + 50} toY={bundlesY} label="selects" />
        <ConnectionArrow fromY={bundlesY + 60} toY={kernelY} label="mounts to" />
        <ConnectionArrow fromY={kernelY + 60} toY={modulesY} label="loads" />
        <ConnectionArrow fromY={modulesY + 70} toY={llmsY} label="calls" />
        
        {/* Layer labels on left */}
        <g className="layer-labels" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="500">
          <text x="-280" y={interfacesY + 25} textAnchor="start">INTERFACES</text>
          <text x="-280" y={bundlesY + 30} textAnchor="start">COMPOSITION</text>
          <text x="-280" y={kernelY + 30} textAnchor="start">KERNEL</text>
          <text x="-280" y={modulesY + 35} textAnchor="start">MODULES</text>
          <text x="-280" y={llmsY + 25} textAnchor="start">INTELLIGENCE</text>
        </g>

        {/* YOU (User) */}
        <Layer
          y={userY}
          label="You"
          color={COLORS.user}
          isHovered={hoveredLayer === 'user'}
          onHover={(h) => setHoveredLayer(h ? 'user' : null)}
          width={120}
          height={40}
        />
        
        {/* Interfaces */}
        <Layer
          y={interfacesY}
          label="CLI  •  Web  •  Desktop  •  Voice"
          sublabel="Where you interact"
          color={COLORS.interfaces}
          isHovered={hoveredLayer === 'interfaces'}
          onHover={(h) => setHoveredLayer(h ? 'interfaces' : null)}
          height={50}
        />
        
        {/* Bundles */}
        <Layer
          y={bundlesY}
          label="Bundles"
          sublabel="foundation → recipes → your overlay → agents"
          color={COLORS.bundles}
          isHovered={hoveredLayer === 'bundles'}
          onHover={(h) => setHoveredLayer(h ? 'bundles' : null)}
          height={60}
        />
        
        {/* Kernel */}
        <Layer
          y={kernelY}
          label="Kernel"
          sublabel="~2,600 lines • Mechanisms only • The center stays still"
          color={COLORS.kernel}
          isHovered={hoveredLayer === 'kernel'}
          onHover={(h) => setHoveredLayer(h ? 'kernel' : null)}
          height={60}
        />
        
        {/* Modules */}
        <g className="modules-layer">
          {/* Background for modules */}
          <rect
            x={-250}
            y={modulesY}
            width={500}
            height={70}
            rx={12}
            fill="rgba(30, 41, 59, 0.5)"
          />
          
          {/* Module boxes */}
          <ModuleBox
            x={-180}
            y={modulesY + 10}
            label="Providers"
            color={COLORS.modules.provider}
            isHovered={hoveredLayer === 'provider'}
            onHover={(h) => setHoveredLayer(h ? 'provider' : null)}
          />
          <ModuleBox
            x={-85}
            y={modulesY + 10}
            label="Tools"
            color={COLORS.modules.tool}
            isHovered={hoveredLayer === 'tool'}
            onHover={(h) => setHoveredLayer(h ? 'tool' : null)}
          />
          <ModuleBox
            x={5}
            y={modulesY + 10}
            label="Orchestrators"
            color={COLORS.modules.orchestrator}
            isHovered={hoveredLayer === 'orchestrator'}
            onHover={(h) => setHoveredLayer(h ? 'orchestrator' : null)}
          />
          <ModuleBox
            x={95}
            y={modulesY + 10}
            label="Hooks"
            color={COLORS.modules.hook}
            isHovered={hoveredLayer === 'hook'}
            onHover={(h) => setHoveredLayer(h ? 'hook' : null)}
          />
          <ModuleBox
            x={180}
            y={modulesY + 10}
            label="Context"
            color={COLORS.modules.context}
            isHovered={hoveredLayer === 'context'}
            onHover={(h) => setHoveredLayer(h ? 'context' : null)}
          />
          
          {/* Sublabel */}
          <text
            x={0}
            y={modulesY + 78}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
          >
            Policies • Swappable • "The edges move fast"
          </text>
        </g>
        
        {/* LLMs */}
        <Layer
          y={llmsY}
          label="Claude  •  GPT  •  Llama  •  Gemini  •  Local"
          sublabel="The intelligence (via Providers)"
          color={COLORS.llms}
          isHovered={hoveredLayer === 'llms'}
          onHover={(h) => setHoveredLayer(h ? 'llms' : null)}
          height={50}
        />
      </svg>
      
      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.kernel.fill }} />
          <span>Kernel (stable)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.modules.provider.fill }} />
          <span>Modules (swappable)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.bundles.fill }} />
          <span>Bundles (composable)</span>
        </div>
      </div>
    </div>
  )
}
