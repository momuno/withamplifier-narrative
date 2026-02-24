'use client'

import { useState, useEffect } from 'react'

// Dribbble-inspired palette
const COLORS = {
  bg: '#030405',
  cyan: '#2CBFD9',
  teal: '#1D7687',
  darkTeal: '#335058',
  lightGray: '#E9E9EA',
  mediumGray: '#979B9D',
  darkGray: '#1a1d1e',
  
  // Accent colors for different elements
  memory: '#10B981',    // Emerald for persistent memory
  parallel: '#F59E0B',  // Amber for parallel execution
  agents: '#EC4899',    // Pink for specialized agents
  learning: '#8B5CF6',  // Purple for compound learning
}

// Isometric helper functions
const ISO_ANGLE = Math.PI / 6 // 30 degrees
const cos30 = Math.cos(ISO_ANGLE)
const sin30 = Math.sin(ISO_ANGLE)

function isoX(x: number, y: number): number {
  return (x - y) * cos30
}

function isoY(x: number, y: number, z: number = 0): number {
  return (x + y) * sin30 - z
}

// Isometric cube component
function IsoCube({ 
  x, y, z, 
  width, depth, height,
  topColor, leftColor, rightColor,
  opacity = 1,
  label,
  labelColor = COLORS.lightGray,
  glow = false,
  glowColor = COLORS.cyan
}: {
  x: number
  y: number
  z: number
  width: number
  depth: number
  height: number
  topColor: string
  leftColor: string
  rightColor: string
  opacity?: number
  label?: string
  labelColor?: string
  glow?: boolean
  glowColor?: string
}) {
  // Calculate isometric points
  const points = {
    // Top face
    topFront: [isoX(x, y), isoY(x, y, z + height)],
    topRight: [isoX(x + width, y), isoY(x + width, y, z + height)],
    topBack: [isoX(x + width, y + depth), isoY(x + width, y + depth, z + height)],
    topLeft: [isoX(x, y + depth), isoY(x, y + depth, z + height)],
    // Bottom face
    botFront: [isoX(x, y), isoY(x, y, z)],
    botRight: [isoX(x + width, y), isoY(x + width, y, z)],
    botBack: [isoX(x + width, y + depth), isoY(x + width, y + depth, z)],
    botLeft: [isoX(x, y + depth), isoY(x, y + depth, z)],
  }

  const topFace = `${points.topFront.join(',')} ${points.topRight.join(',')} ${points.topBack.join(',')} ${points.topLeft.join(',')}`
  const leftFace = `${points.topFront.join(',')} ${points.topLeft.join(',')} ${points.botLeft.join(',')} ${points.botFront.join(',')}`
  const rightFace = `${points.topFront.join(',')} ${points.topRight.join(',')} ${points.botRight.join(',')} ${points.botFront.join(',')}`

  const centerX = isoX(x + width/2, y + depth/2)
  const centerY = isoY(x + width/2, y + depth/2, z + height)

  return (
    <g style={{ opacity }}>
      {glow && (
        <polygon
          points={topFace}
          fill={glowColor}
          style={{ filter: 'blur(15px)' }}
          opacity={0.4}
        />
      )}
      <polygon points={leftFace} fill={leftColor} />
      <polygon points={rightFace} fill={rightColor} />
      <polygon points={topFace} fill={topColor} />
      {label && (
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          fill={labelColor}
          fontSize="10"
          fontWeight="600"
          style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          {label}
        </text>
      )}
    </g>
  )
}

// Isometric platform (flat surface)
function IsoPlatform({
  x, y, z,
  width, depth,
  color,
  opacity = 1
}: {
  x: number
  y: number
  z: number
  width: number
  depth: number
  color: string
  opacity?: number
}) {
  const points = [
    [isoX(x, y), isoY(x, y, z)],
    [isoX(x + width, y), isoY(x + width, y, z)],
    [isoX(x + width, y + depth), isoY(x + width, y + depth, z)],
    [isoX(x, y + depth), isoY(x, y + depth, z)],
  ]
  
  return (
    <polygon
      points={points.map(p => p.join(',')).join(' ')}
      fill={color}
      opacity={opacity}
    />
  )
}

// Animated particle/data flow
function DataFlow({ 
  startX, startY, startZ,
  endX, endY, endZ,
  color,
  delay = 0
}: {
  startX: number
  startY: number
  startZ: number
  endX: number
  endY: number
  endZ: number
  color: string
  delay?: number
}) {
  const x1 = isoX(startX, startY)
  const y1 = isoY(startX, startY, startZ)
  const x2 = isoX(endX, endY)
  const y2 = isoY(endX, endY, endZ)
  
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.3}
      />
      <circle r={3} fill={color}>
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          path={`M${x1},${y1} L${x2},${y2}`}
        />
      </circle>
    </g>
  )
}

export default function AmplifierLandscapeDiagram() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  
  return (
    <div className="w-full flex flex-col items-center" style={{ backgroundColor: COLORS.bg }}>
      {/* Title */}
      <div className="text-center pt-12 pb-8 px-4">
        <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.lightGray }}>
          The Amplifier Landscape
        </h2>
        <p className="text-sm max-w-xl mx-auto" style={{ color: COLORS.mediumGray }}>
          How AI orchestration is shaping modern digital workflow
        </p>
      </div>
      
      <svg 
        viewBox="-400 -280 800 560" 
        className="w-full max-w-5xl"
        style={{ overflow: 'visible' }}
      >
        {/* Definitions */}
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.3" />
            <stop offset="100%" stopColor={COLORS.teal} stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background grid lines (subtle) */}
        <g opacity={0.1}>
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`grid-${i}`}
              x1={-400 + i * 40}
              y1={-280}
              x2={-400 + i * 40 + 200}
              y2={280}
              stroke={COLORS.teal}
              strokeWidth={0.5}
            />
          ))}
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 1: USER INPUT (Top Left) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="user-input" transform="translate(-280, -180)">
          <text 
            x={0} y={-40} 
            fill={COLORS.mediumGray} 
            fontSize="9" 
            fontWeight="500"
            style={{ letterSpacing: '2px' }}
          >
            YOUR INTENT
          </text>
          
          {/* User "prompt" cube */}
          <IsoCube
            x={0} y={0} z={0}
            width={60} depth={40} height={25}
            topColor={COLORS.cyan}
            leftColor={COLORS.teal}
            rightColor={COLORS.darkTeal}
            glow={true}
            glowColor={COLORS.cyan}
          />
          
          <text 
            x={isoX(30, 20)} 
            y={isoY(30, 20, 35)} 
            fill={COLORS.lightGray}
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            "Why is this slow?"
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 2: THE ORCHESTRATION LAYER (Center) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="orchestration" transform="translate(-50, -80)">
          <text 
            x={0} y={-60} 
            fill={COLORS.cyan} 
            fontSize="10" 
            fontWeight="600"
            textAnchor="middle"
            style={{ letterSpacing: '2px' }}
          >
            ORCHESTRATION
          </text>
          
          {/* Main orchestration platform */}
          <IsoPlatform
            x={-80} y={-40} z={0}
            width={160} depth={80}
            color={COLORS.darkGray}
            opacity={0.8}
          />
          
          {/* Kernel cube (center) */}
          <IsoCube
            x={-25} y={-10} z={0}
            width={50} depth={30} height={35}
            topColor={COLORS.teal}
            leftColor={COLORS.darkTeal}
            rightColor="#0d4a5a"
            label="KERNEL"
            labelColor={COLORS.lightGray}
          />
          
          {/* Small module cubes around kernel */}
          <IsoCube
            x={-70} y={-25} z={0}
            width={30} depth={20} height={20}
            topColor={COLORS.memory}
            leftColor="#0a8a5f"
            rightColor="#059669"
            label=""
          />
          <IsoCube
            x={40} y={-25} z={0}
            width={30} depth={20} height={20}
            topColor={COLORS.parallel}
            leftColor="#b87708"
            rightColor="#d97706"
          />
          <IsoCube
            x={-70} y={15} z={0}
            width={30} depth={20} height={20}
            topColor={COLORS.agents}
            leftColor="#b82f46"
            rightColor="#db2777"
          />
          <IsoCube
            x={40} y={15} z={0}
            width={30} depth={20} height={20}
            topColor={COLORS.learning}
            leftColor="#6d3ac7"
            rightColor="#7c3aed"
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 3: PARALLEL AGENTS (Right side, fanning out) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="parallel-agents" transform="translate(180, -120)">
          <text 
            x={60} y={-80} 
            fill={COLORS.mediumGray} 
            fontSize="9" 
            fontWeight="500"
            textAnchor="middle"
            style={{ letterSpacing: '2px' }}
          >
            PARALLEL EXECUTION
          </text>
          
          {/* Agent cubes - fanned out */}
          <IsoCube
            x={0} y={-40} z={40}
            width={45} depth={25} height={20}
            topColor={COLORS.agents}
            leftColor="#b82f46"
            rightColor="#db2777"
            label="explorer"
            labelColor={COLORS.lightGray}
            glow={activeSection === 'agents'}
          />
          
          <IsoCube
            x={60} y={-20} z={30}
            width={45} depth={25} height={20}
            topColor={COLORS.cyan}
            leftColor={COLORS.teal}
            rightColor={COLORS.darkTeal}
            label="code-intel"
            labelColor={COLORS.lightGray}
          />
          
          <IsoCube
            x={0} y={20} z={20}
            width={45} depth={25} height={20}
            topColor={COLORS.parallel}
            leftColor="#b87708"
            rightColor="#d97706"
            label="architect"
            labelColor={COLORS.lightGray}
          />
          
          <IsoCube
            x={60} y={40} z={10}
            width={45} depth={25} height={20}
            topColor={COLORS.memory}
            leftColor="#0a8a5f"
            rightColor="#059669"
            label="builder"
            labelColor={COLORS.lightGray}
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 4: EXTERNAL SERVICES (Bottom) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="external-services" transform="translate(-100, 120)">
          <text 
            x={100} y={-20} 
            fill={COLORS.mediumGray} 
            fontSize="9" 
            fontWeight="500"
            textAnchor="middle"
            style={{ letterSpacing: '2px' }}
          >
            EXTERNAL SERVICES
          </text>
          
          {/* LLM platforms */}
          <IsoCube
            x={0} y={0} z={0}
            width={40} depth={25} height={15}
            topColor="#1a1d1e"
            leftColor="#0f1011"
            rightColor="#141718"
            label="Claude"
            labelColor={COLORS.mediumGray}
          />
          
          <IsoCube
            x={55} y={0} z={0}
            width={40} depth={25} height={15}
            topColor="#1a1d1e"
            leftColor="#0f1011"
            rightColor="#141718"
            label="GPT"
            labelColor={COLORS.mediumGray}
          />
          
          <IsoCube
            x={110} y={0} z={0}
            width={40} depth={25} height={15}
            topColor="#1a1d1e"
            leftColor="#0f1011"
            rightColor="#141718"
            label="Llama"
            labelColor={COLORS.mediumGray}
          />
          
          <IsoCube
            x={165} y={0} z={0}
            width={40} depth={25} height={15}
            topColor="#1a1d1e"
            leftColor="#0f1011"
            rightColor="#141718"
            label="Local"
            labelColor={COLORS.mediumGray}
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 5: OUTPUT / RESULT (Bottom Right) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="output" transform="translate(220, 140)">
          <text 
            x={30} y={-30} 
            fill={COLORS.mediumGray} 
            fontSize="9" 
            fontWeight="500"
            textAnchor="middle"
            style={{ letterSpacing: '2px' }}
          >
            SYNTHESIZED INSIGHT
          </text>
          
          <IsoCube
            x={0} y={0} z={0}
            width={60} depth={40} height={25}
            topColor={COLORS.cyan}
            leftColor={COLORS.teal}
            rightColor={COLORS.darkTeal}
            glow={true}
            glowColor={COLORS.memory}
          />
          
          <text 
            x={isoX(30, 20)} 
            y={isoY(30, 20, 35)} 
            fill={COLORS.lightGray}
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            Actionable Answer
          </text>
        </g>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DATA FLOW ANIMATIONS */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        {/* Input to Orchestration */}
        <DataFlow
          startX={-220} startY={-160} startZ={20}
          endX={-100} endY={-100} endZ={30}
          color={COLORS.cyan}
          delay={0}
        />
        
        {/* Orchestration to Agents */}
        <DataFlow
          startX={0} startY={-60} startZ={30}
          endX={180} endY={-140} endZ={50}
          color={COLORS.agents}
          delay={0.5}
        />
        <DataFlow
          startX={0} startY={-60} startZ={30}
          endX={240} endY={-100} endZ={40}
          color={COLORS.cyan}
          delay={0.7}
        />
        <DataFlow
          startX={0} startY={-60} startZ={30}
          endX={180} endY={-60} endZ={30}
          color={COLORS.parallel}
          delay={0.9}
        />
        
        {/* Agents to External */}
        <DataFlow
          startX={200} startY={-80} startZ={30}
          endX={0} endY={130} endZ={10}
          color={COLORS.teal}
          delay={1.2}
        />
        
        {/* External to Output */}
        <DataFlow
          startX={100} startY={140} startZ={10}
          endX={250} endY={160} endZ={20}
          color={COLORS.memory}
          delay={1.8}
        />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* LABELS: The Four Pillars */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <g className="pillars" transform="translate(-350, 80)">
          <text fill={COLORS.lightGray} fontSize="11" fontWeight="600" y={0}>
            The Amplifier Advantage
          </text>
          
          <g transform="translate(0, 25)">
            <circle cx={8} cy={-4} r={4} fill={COLORS.memory} />
            <text fill={COLORS.mediumGray} fontSize="9" x={20}>Persistent Memory</text>
          </g>
          
          <g transform="translate(0, 45)">
            <circle cx={8} cy={-4} r={4} fill={COLORS.parallel} />
            <text fill={COLORS.mediumGray} fontSize="9" x={20}>Parallel Execution</text>
          </g>
          
          <g transform="translate(0, 65)">
            <circle cx={8} cy={-4} r={4} fill={COLORS.agents} />
            <text fill={COLORS.mediumGray} fontSize="9" x={20}>Specialized Agents</text>
          </g>
          
          <g transform="translate(0, 85)">
            <circle cx={8} cy={-4} r={4} fill={COLORS.learning} />
            <text fill={COLORS.mediumGray} fontSize="9" x={20}>Compound Learning</text>
          </g>
        </g>
      </svg>
      
      {/* Bottom tagline */}
      <div className="pb-12 pt-4 text-center">
        <p className="text-xs" style={{ color: COLORS.mediumGray }}>
          One question. Multiple experts. Synthesized insight.
        </p>
      </div>
    </div>
  )
}
