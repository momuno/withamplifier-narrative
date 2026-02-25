'use client';

import React, { useState } from 'react';

/**
 * KernelArchitectureDiagram
 *
 * Purpose: Visualize Amplifier's "kernel at the core" architecture philosophy
 * through concentric layers where animation velocity increases from center
 * outward — the center stays still so the edges can move fast.
 *
 * Layers (inside → out):
 *   1. Kernel — tiny, stable, near-still
 *   2. Connections — radial lines with flowing particles
 *   3. Module Ring — 5 module types with gentle drift
 *   4. Application — outer atmosphere, most motion
 *
 * States: default, hover (per module with connected highlighting)
 * Accessibility: WCAG AA, prefers-reduced-motion, role="img" with aria-label
 */

// --- Constants ---

const CX = 300;
const CY = 300;

const COLORS = {
  signal: '#5B4DE3',
  signalLight: '#7B6FF0',
  module: '#4ade80',
  white: '#ffffff',
};

interface ModuleData {
  name: string;
  descriptor: string;
  angle: number;
}

const MODULES: ModuleData[] = [
  { name: 'Provider', descriptor: 'LLM connections', angle: -90 },
  { name: 'Tool', descriptor: 'Agent capabilities', angle: -90 + 72 },
  { name: 'Orchestrator', descriptor: 'Agent loops', angle: -90 + 144 },
  { name: 'Hook', descriptor: 'Lifecycle events', angle: -90 + 216 },
  { name: 'Context', descriptor: 'Knowledge & state', angle: -90 + 288 },
];

const MODULE_ORBIT_R = 170;
const KERNEL_R = 52;
const KERNEL_INNER_R = 36;
const APP_RING_R = 260;
const NODE_W = 96;
const NODE_H = 40;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function pointOnCircle(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = degToRad(angleDeg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// --- Sub-components ---

function SvgDefs() {
  return (
    <defs>
      {/* Kernel glow filter */}
      <filter id="ka-kernelGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="16" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Module hover glow filter */}
      <filter id="ka-moduleGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="20" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Radial violet atmosphere emanating from center */}
      <radialGradient
        id="ka-coreGlow"
        cx={CX}
        cy={CY}
        r={280}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={COLORS.signal} stopOpacity={0.06} />
        <stop offset="35%" stopColor={COLORS.signal} stopOpacity={0.02} />
        <stop offset="100%" stopColor={COLORS.signal} stopOpacity={0} />
      </radialGradient>
    </defs>
  );
}

function BackgroundAmbiance() {
  return (
    <g className="ka-ambiance">
      {/* Radial violet atmosphere */}
      <circle cx={CX} cy={CY} r={280} fill="url(#ka-coreGlow)" />
      {/* Echo rings — barely perceptible depth markers between layers */}
      <circle
        cx={CX}
        cy={CY}
        r={110}
        fill="none"
        stroke={COLORS.signal}
        strokeOpacity={0.03}
        strokeWidth={0.5}
      />
      <circle
        cx={CX}
        cy={CY}
        r={220}
        fill="none"
        stroke={COLORS.white}
        strokeOpacity={0.02}
        strokeWidth={0.5}
      />
    </g>
  );
}

function ApplicationAtmosphere() {
  const dotCount = 8;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = i * (360 / dotCount);
    const pos = pointOnCircle(CX, CY, APP_RING_R, angle);
    return { ...pos, index: i };
  });

  return (
    <g className="ka-application-layer">
      {/* Outer dashed ring — most visual motion */}
      <circle
        cx={CX}
        cy={CY}
        r={APP_RING_R}
        fill="none"
        stroke={COLORS.white}
        strokeOpacity={0.07}
        strokeWidth={1.5}
        strokeDasharray="8 16"
        className="ka-app-ring-dash"
      />

      {/* Pulse dots scattered around circumference — fastest animation */}
      {dots.map(({ x, y, index }) => (
        <circle
          key={`pulse-${index}`}
          cx={x}
          cy={y}
          r={2.5}
          fill={COLORS.white}
          className="ka-pulse-dot"
          style={{
            animationDelay: `${index * 0.3}s`,
            animationDuration: `${2 + index * 0.3}s`,
          }}
        />
      ))}

      {/* "Your Application" label at top of outer ring */}
      <text
        x={CX}
        y={28}
        textAnchor="middle"
        fontFamily="'Syne', sans-serif"
        fontSize={12}
        fontWeight={400}
        letterSpacing="0.15em"
        fill={COLORS.white}
        fillOpacity={0.35}
      >
        YOUR APPLICATION
      </text>
    </g>
  );
}

function ConnectionRadial({
  module,
  index,
  isActive,
  isDimmed,
}: {
  module: ModuleData;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
}) {
  const start = pointOnCircle(CX, CY, KERNEL_R + 4, module.angle);
  const end = pointOnCircle(
    CX,
    CY,
    MODULE_ORBIT_R - NODE_H / 2 - 4,
    module.angle
  );
  const pathId = `ka-conn-path-${index}`;
  const pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  return (
    <g
      className="ka-connection-radial"
      style={{
        opacity: isDimmed ? 0.15 : 1,
        transition: 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Invisible path for particle motion reference */}
      <path id={pathId} d={pathD} fill="none" stroke="none" />

      {/* Visible dashed line from kernel to module */}
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={COLORS.white}
        strokeOpacity={isActive ? 0.25 : 0.06}
        strokeWidth={1}
        strokeDasharray="3 6"
        style={{
          transition: 'stroke-opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Primary particle — flows outward from kernel to module */}
      <circle r={2} fill={COLORS.signal} opacity={isActive ? 0.9 : 0.5}>
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin={`${index * 0.6}s`}
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values={isActive ? '0.9;0.4;0.9' : '0.5;0.15;0.5'}
          dur="3s"
          repeatCount="indefinite"
          begin={`${index * 0.6}s`}
        />
      </circle>

      {/* Secondary particle — fainter, offset timing for rhythm */}
      <circle r={1.5} fill={COLORS.signal} opacity={0.25}>
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin={`${index * 0.6 + 1.5}s`}
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0.25;0.08;0.25"
          dur="3s"
          repeatCount="indefinite"
          begin={`${index * 0.6 + 1.5}s`}
        />
      </circle>
    </g>
  );
}

function ModuleNode({
  module,
  index,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
}: {
  module: ModuleData;
  index: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const center = pointOnCircle(CX, CY, MODULE_ORBIT_R, module.angle);
  const rx = NODE_W / 2;
  const ry = NODE_H / 2;

  return (
    <g
      className="ka-module-node"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        cursor: 'pointer',
        opacity: isDimmed ? 0.35 : 1,
        transition: 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Float animation wrapper — each module drifts at its own rate */}
      <g
        className="ka-module-float"
        style={{
          animationDelay: `${index * 0.7}s`,
          animationDuration: `${4 + index * 0.7}s`,
        }}
      >
        {/* Hover glow — soft green bloom behind the node */}
        <circle
          cx={center.x}
          cy={center.y}
          r={32}
          fill={COLORS.module}
          opacity={isHovered ? 0.08 : 0}
          filter="url(#ka-moduleGlow)"
          style={{ transition: 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />

        {/* Node background */}
        <rect
          x={center.x - rx}
          y={center.y - ry}
          width={NODE_W}
          height={NODE_H}
          rx={8}
          fill={COLORS.white}
          fillOpacity={isHovered ? 0.1 : 0.04}
          stroke={COLORS.module}
          strokeOpacity={isHovered ? 0.6 : 0.2}
          strokeWidth={1}
          style={{
            transition:
              'fill-opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Left accent bar — matches PatchBay visual vocabulary */}
        <rect
          x={center.x - rx + 4}
          y={center.y - 12}
          width={3}
          height={24}
          rx={1.5}
          fill={COLORS.module}
          fillOpacity={isHovered ? 0.7 : 0.4}
          style={{
            transition:
              'fill-opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Module name */}
        <text
          x={center.x + 4}
          y={center.y - 3}
          textAnchor="middle"
          fontFamily="'Syne', sans-serif"
          fontSize={11}
          fontWeight={500}
          fill={COLORS.white}
          fillOpacity={0.85}
        >
          {module.name}
        </text>

        {/* Technical descriptor */}
        <text
          x={center.x + 4}
          y={center.y + 11}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize={8}
          fill={COLORS.white}
          fillOpacity={0.35}
        >
          {module.descriptor}
        </text>
      </g>
    </g>
  );
}

function KernelCore() {
  return (
    <g className="ka-kernel-core">
      {/* Breathing glow — the SLOWEST animation in the diagram (6s) */}
      <circle
        cx={CX}
        cy={CY}
        r={KERNEL_R}
        fill={COLORS.signal}
        opacity={0.12}
        filter="url(#ka-kernelGlow)"
        className="ka-kernel-breathe"
      />

      {/* Main kernel circle */}
      <circle
        cx={CX}
        cy={CY}
        r={KERNEL_R}
        fill={COLORS.signal}
        fillOpacity={0.08}
        stroke={COLORS.signal}
        strokeOpacity={0.4}
        strokeWidth={1.5}
      />

      {/* Inner accent ring — secondary depth */}
      <circle
        cx={CX}
        cy={CY}
        r={KERNEL_INNER_R}
        fill="none"
        stroke={COLORS.signal}
        strokeOpacity={0.12}
        strokeWidth={1}
      />

      {/* "Kernel" label */}
      <text
        x={CX}
        y={CY - 4}
        textAnchor="middle"
        fontFamily="'Syne', sans-serif"
        fontSize={14}
        fontWeight={600}
        fill={COLORS.white}
        fillOpacity={0.9}
      >
        Kernel
      </text>

      {/* Line count — the key stat that sells "tiny" */}
      <text
        x={CX}
        y={CY + 14}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={9}
        fill={COLORS.signal}
        fillOpacity={0.7}
      >
        ~2,600 lines
      </text>
    </g>
  );
}

// --- Animation Styles ---
// Scoped via ka- prefix. Embedded in SVG <style> for keyframe support.
// Animation velocity gradient: kernel (6s) → modules (4-7.5s) → app ring (25s pulses at 2-4s)

const svgAnimationStyles = `
  /* ===== Layer 1: Kernel breathe — NEAR STILLNESS (6s) ===== */
  .ka-kernel-breathe {
    animation: ka-kernelBreathe 6s ease-in-out infinite;
  }
  @keyframes ka-kernelBreathe {
    0%, 100% { opacity: 0.08; }
    50% { opacity: 0.18; }
  }

  /* ===== Layer 3: Module float — SLOW DRIFT (4-7.5s each) ===== */
  .ka-module-float {
    animation: ka-moduleFloat ease-in-out infinite alternate;
  }
  @keyframes ka-moduleFloat {
    0% { transform: translateY(-2.5px); }
    100% { transform: translateY(2.5px); }
  }

  /* ===== Layer 4: App ring dash orbit — MODERATE (25s) ===== */
  .ka-app-ring-dash {
    animation: ka-dashOrbit 25s linear infinite;
  }
  @keyframes ka-dashOrbit {
    to { stroke-dashoffset: 48; }
  }

  /* ===== Layer 4: Pulse dots — MOST ACTIVE (2-4.3s) ===== */
  .ka-pulse-dot {
    animation: ka-pulseDot ease-in-out infinite;
    opacity: 0.1;
  }
  @keyframes ka-pulseDot {
    0%, 100% { opacity: 0.06; }
    50% { opacity: 0.22; }
  }

  /* ===== Accessibility: halt all motion ===== */
  @media (prefers-reduced-motion: reduce) {
    .ka-kernel-breathe,
    .ka-module-float,
    .ka-app-ring-dash,
    .ka-pulse-dot {
      animation: none !important;
    }
    .ka-kernel-breathe { opacity: 0.12; }
    .ka-pulse-dot { opacity: 0.12; }
    .ka-connection-radial circle { display: none; }
  }
`;

// --- Main Component ---

interface KernelArchitectureDiagramProps {
  className?: string;
}

export default function KernelArchitectureDiagram({
  className = '',
}: KernelArchitectureDiagramProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div
      className={className}
      style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}
    >
      <svg
        viewBox="0 0 600 600"
        width="100%"
        height="auto"
        role="img"
        aria-label="Amplifier architecture diagram showing a small kernel at the center surrounded by five replaceable module types — Provider, Tool, Orchestrator, Hook, and Context — with your application as the outermost layer. The center stays still so the edges can move fast."
        style={{ overflow: 'visible', display: 'block' }}
      >
        <style>{svgAnimationStyles}</style>
        <SvgDefs />

        {/* Layer 0: Background ambiance — subtle violet atmosphere */}
        <BackgroundAmbiance />

        {/* Layer 4: Application atmosphere — outermost, most active */}
        <ApplicationAtmosphere />

        {/* Orbital guide circle — barely visible ring connecting modules */}
        <circle
          cx={CX}
          cy={CY}
          r={MODULE_ORBIT_R}
          fill="none"
          stroke={COLORS.white}
          strokeOpacity={0.03}
          strokeWidth={1}
          strokeDasharray="2 8"
        />

        {/* Layer 2: Connection radials — particles flowing kernel → modules */}
        {MODULES.map((module, i) => (
          <ConnectionRadial
            key={`conn-${module.name}`}
            module={module}
            index={i}
            isActive={hoveredModule === module.name}
            isDimmed={hoveredModule !== null && hoveredModule !== module.name}
          />
        ))}

        {/* Layer 3: Module nodes — 5 types in orbital ring */}
        {MODULES.map((module, i) => (
          <ModuleNode
            key={`mod-${module.name}`}
            module={module}
            index={i}
            isHovered={hoveredModule === module.name}
            isDimmed={hoveredModule !== null && hoveredModule !== module.name}
            onHover={() => setHoveredModule(module.name)}
            onLeave={() => setHoveredModule(null)}
          />
        ))}

        {/* Layer 1: Kernel core — rendered last to sit on top, nearly still */}
        <KernelCore />
      </svg>
    </div>
  );
}
