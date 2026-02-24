'use client'

import { useState } from 'react'

// Color palette
const COLORS = {
  user: { fill: '#F8F8F8', stroke: '#E0E0E0', text: '#333' },
  interfaces: { fill: '#64748B', light: '#94A3B8', dark: '#475569' },
  value: {
    memory: { fill: '#10B981', light: '#34D399' },
    parallel: { fill: '#F59E0B', light: '#FBBF24' },
    agents: { fill: '#EC4899', light: '#F472B6' },
    learning: { fill: '#8B5CF6', light: '#A78BFA' },
  },
  orchestration: { fill: '#5B4DE3', light: '#7C6FEA', dark: '#4338CA' },
  modules: { fill: '#1E293B', light: '#334155' },
  llms: { fill: '#0F172A', light: '#1E293B' },
}

function ValuePillar({ 
  x, label, sublabel, color, icon, isHovered, onHover 
}: { 
  x: number
  label: string
  sublabel: string
  color: { fill: string; light: string }
  icon: string
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  const width = 110
  const height = 80
  const y = -120
  
  return (
    <g
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow on hover */}
      {isHovered && (
        <rect
          x={x - width/2 - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx={14}
          fill={color.light}
          opacity={0.2}
          style={{ filter: 'blur(8px)' }}
        />
      )}
      
      {/* Main box */}
      <rect
        x={x - width/2}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill={color.fill}
        stroke={isHovered ? color.light : 'transparent'}
        strokeWidth={2}
      />
      
      {/* Icon */}
      <text
        x={x}
        y={y + 24}
        textAnchor="middle"
        fontSize="20"
      >
        {icon}
      </text>
      
      {/* Label */}
      <text
        x={x}
        y={y + 46}
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="600"
      >
        {label}
      </text>
      
      {/* Sublabel */}
      <text
        x={x}
        y={y + 62}
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize="9"
      >
        {sublabel}
      </text>
    </g>
  )
}

export default function AmplifierValueDiagram() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  return (
    <div className="w-full flex flex-col items-center">
      <svg 
        viewBox="-300 -220 600 480" 
        className="w-full max-w-3xl"
        style={{ overflow: 'visible' }}
      >
        {/* Background */}
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(91, 77, 227, 0.03)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.05)" />
          </linearGradient>
        </defs>
        <rect x="-300" y="-220" width="600" height="480" fill="url(#bgGrad)" rx="16" />
        
        {/* Title */}
        <text
          x={0}
          y={-185}
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="16"
          fontWeight="600"
        >
          What Amplifier Does
        </text>
        <text
          x={0}
          y={-165}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="11"
        >
          "An AI orchestration layer that amplifies your abilities"
        </text>
        
        {/* THE FOUR VALUE PILLARS */}
        <ValuePillar
          x={-165}
          label="Persistent"
          sublabel="Memory"
          color={COLORS.value.memory}
          icon="🧠"
          isHovered={hoveredItem === 'memory'}
          onHover={(h) => setHoveredItem(h ? 'memory' : null)}
        />
        <ValuePillar
          x={-55}
          label="Parallel"
          sublabel="Execution"
          color={COLORS.value.parallel}
          icon="⚡"
          isHovered={hoveredItem === 'parallel'}
          onHover={(h) => setHoveredItem(h ? 'parallel' : null)}
        />
        <ValuePillar
          x={55}
          label="Specialized"
          sublabel="Agents"
          color={COLORS.value.agents}
          icon="🤖"
          isHovered={hoveredItem === 'agents'}
          onHover={(h) => setHoveredItem(h ? 'agents' : null)}
        />
        <ValuePillar
          x={165}
          label="Compound"
          sublabel="Learning"
          color={COLORS.value.learning}
          icon="📈"
          isHovered={hoveredItem === 'learning'}
          onHover={(h) => setHoveredItem(h ? 'learning' : null)}
        />
        
        {/* Connecting line under pillars */}
        <line x1={-165} y1={-35} x2={165} y2={-35} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
        
        {/* Arrow down to orchestration */}
        <line x1={0} y1={-30} x2={0} y2={5} stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="4 4" />
        <polygon points="0,10 -6,0 6,0" fill="rgba(255,255,255,0.3)" />
        
        {/* HOW IT WORKS section title */}
        <text
          x={0}
          y={30}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="10"
          fontWeight="500"
        >
          HOW IT WORKS
        </text>
        
        {/* ORCHESTRATION LAYER */}
        <g className="orchestration">
          <rect
            x={-230}
            y={45}
            width={460}
            height={55}
            rx={10}
            fill={COLORS.orchestration.fill}
            stroke={hoveredItem === 'orchestration' ? COLORS.orchestration.light : 'transparent'}
            strokeWidth={2}
            onMouseEnter={() => setHoveredItem('orchestration')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ cursor: 'pointer' }}
          />
          <text x={0} y={68} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
            Orchestration Layer
          </text>
          <text x={0} y={86} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
            Kernel (~2,600 lines) • Bundles • Recipes • Workflows
          </text>
        </g>
        
        {/* Arrow down */}
        <line x1={0} y1={105} x2={0} y2={125} stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="4 4" />
        <polygon points="0,130 -6,120 6,120" fill="rgba(255,255,255,0.3)" />
        
        {/* MODULES LAYER */}
        <g className="modules">
          <rect
            x={-230}
            y={135}
            width={460}
            height={45}
            rx={10}
            fill={COLORS.modules.fill}
            stroke={hoveredItem === 'modules' ? COLORS.modules.light : 'transparent'}
            strokeWidth={2}
            onMouseEnter={() => setHoveredItem('modules')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ cursor: 'pointer' }}
          />
          <text x={0} y={158} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">
            Providers • Tools • Hooks • Context
          </text>
          <text x={0} y={172} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
            Swappable modules — the edges move fast
          </text>
        </g>
        
        {/* Arrow down */}
        <line x1={0} y1={185} x2={0} y2={200} stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="4 4" />
        <polygon points="0,205 -6,195 6,195" fill="rgba(255,255,255,0.3)" />
        
        {/* LLMs LAYER */}
        <g className="llms">
          <rect
            x={-180}
            y={210}
            width={360}
            height={35}
            rx={8}
            fill={COLORS.llms.fill}
            stroke={hoveredItem === 'llms' ? '#334155' : 'transparent'}
            strokeWidth={2}
            onMouseEnter={() => setHoveredItem('llms')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ cursor: 'pointer' }}
          />
          <text x={0} y={232} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
            Claude • GPT • Llama • Gemini • Local
          </text>
        </g>
        
        {/* INTERFACES on the right side */}
        <g className="interfaces">
          <text x={260} y={-100} textAnchor="start" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="500">
            INTERFACES
          </text>
          
          {['CLI', 'API', 'Web', 'Desktop'].map((iface, i) => (
            <g key={iface}>
              <rect
                x={260}
                y={-85 + i * 28}
                width={50}
                height={22}
                rx={4}
                fill="rgba(100, 116, 139, 0.3)"
                stroke={hoveredItem === iface.toLowerCase() ? '#94A3B8' : 'transparent'}
                strokeWidth={1}
                onMouseEnter={() => setHoveredItem(iface.toLowerCase())}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={285}
                y={-70 + i * 28}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
              >
                {iface}
              </text>
              {/* Connecting line */}
              <line
                x1={230}
                y1={-74 + i * 28}
                x2={258}
                y2={-74 + i * 28}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                strokeDasharray="2 2"
              />
            </g>
          ))}
        </g>
      </svg>
      
      {/* Value prop descriptions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm max-w-3xl">
        <div className="text-center">
          <div className="text-emerald-400 font-medium">Persistent Memory</div>
          <div className="text-white/50 text-xs mt-1">AI remembers your work, patterns, preferences</div>
        </div>
        <div className="text-center">
          <div className="text-amber-400 font-medium">Parallel Execution</div>
          <div className="text-white/50 text-xs mt-1">Explores 10-20 solution paths simultaneously</div>
        </div>
        <div className="text-center">
          <div className="text-pink-400 font-medium">Specialized Agents</div>
          <div className="text-white/50 text-xs mt-1">20+ expert agents, not a single generalist</div>
        </div>
        <div className="text-center">
          <div className="text-purple-400 font-medium">Compound Learning</div>
          <div className="text-white/50 text-xs mt-1">System becomes smarter across interactions</div>
        </div>
      </div>
      
      {/* Quote */}
      <div className="mt-8 text-center max-w-2xl">
        <p className="text-white/60 text-sm italic">
          "Where coding assistants focus on 'what to type,' Amplifier operates at the level of 'how to think.'"
        </p>
        <p className="text-white/40 text-xs mt-2">— Brian Krabach & Sam Schillace</p>
      </div>
    </div>
  )
}
