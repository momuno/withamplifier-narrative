/**
 * Chladni Pattern Mathematics
 * 
 * Based on Ernst Chladni's acoustic experiments (1787)
 * Particles collect at nodal lines where vibration = 0
 * 
 * Core equation for square plate:
 * cos(n*PI*x/L) * cos(m*PI*y/L) - cos(m*PI*x/L) * cos(n*PI*y/L) = 0
 */

export interface ChladniParams {
  n: number  // First mode number
  m: number  // Second mode number
}

export interface PatternConfig {
  id: string
  name: string
  params: ChladniParams
  color: string
  glowColor?: string
  opacity: number
}

// Extended pattern config for WebGL shader control
export interface ExtendedPatternConfig extends PatternConfig {
  forceStrength: number
  damping: number
  chaos: number
}

// Section pattern configurations - Story through resonance
// Each pattern creates a distinctive visual that reinforces the section's meaning
export const SECTION_PATTERNS: Record<string, ExtendedPatternConfig> = {
  // HERO - "Open Invitation"
  // Simple cross pattern - open, welcoming, clear
  hero: {
    id: 'hero',
    name: 'Open Invitation',
    params: { n: 1, m: 2 },
    color: '#6366F1',
    opacity: 0.4,
    forceStrength: 0.8,
    damping: 0.92,
    chaos: 0
  },
  
  // PROBLEM - "Scattered Chaos"
  // No clear pattern - confusion, lack of structure
  problem: {
    id: 'problem',
    name: 'Scattered Chaos',
    params: { n: 1, m: 1 },
    color: '#999999',
    opacity: 0.25,
    forceStrength: 0.1,
    damping: 0.85,
    chaos: 1.5
  },
  
  // DIFFERENTIATION - "Breaking Free" / "Three Pillars"
  // Three distinct structures - liberation, clarity emerging
  differentiation: {
    id: 'differentiation', 
    name: 'Three Pillars',
    params: { n: 3, m: 3 },
    color: '#6366F1',
    glowColor: '#818CF8',
    opacity: 0.5,
    forceStrength: 1.2,  // Strong - particles "snap" into place
    damping: 0.94,       // Very smooth
    chaos: 0
  },
  
  // PLATFORM - "Four Quadrants of Completeness"
  // Grid showing 4 areas - complete, organized, comprehensive
  platform: {
    id: 'platform',
    name: 'Four Quadrants',
    params: { n: 4, m: 4 },
    color: '#6366F1',
    opacity: 0.35,
    forceStrength: 0.9,
    damping: 0.93,
    chaos: 0
  },
  
  // DEMO - "Active Patterns"
  // Dynamic diagonal flow - action, motion, things happening
  demo: {
    id: 'demo',
    name: 'Dynamic Action',
    params: { n: 3, m: 5 },
    color: '#8B5CF6',
    opacity: 0.3,
    forceStrength: 0.8,
    damping: 0.92,
    chaos: 0
  },
  
  // BUNDLES - "Simple Unity"
  // Perfect symmetry - elegant, unified, complete in simplicity
  bundles: {
    id: 'bundles',
    name: 'Simple Unity',
    params: { n: 5, m: 5 },
    color: '#6366F1',
    opacity: 0.35,
    forceStrength: 0.85,
    damping: 0.94,  // Very smooth
    chaos: 0
  },
  
  // ECOSYSTEM - "Network Resonance"
  // Complex interconnected pattern - abundance, connectivity, community
  ecosystem: {
    id: 'ecosystem',
    name: 'Network Resonance',
    params: { n: 6, m: 7 },
    color: '#8B5CF6',
    opacity: 0.4,
    forceStrength: 0.8,
    damping: 0.92,
    chaos: 0
  },
  
  // CTA - "Convergence"
  // Central focus pattern - resolution, focus, decisive
  cta: {
    id: 'cta',
    name: 'Convergence',
    params: { n: 6, m: 6 },
    color: '#6366F1',
    glowColor: '#818CF8',
    opacity: 0.5,
    forceStrength: 1.0,  // Strong
    damping: 0.94,       // Smooth
    chaos: 0
  }
}

/**
 * Calculate Chladni pattern value at a point
 * Returns value where 0 = nodal line (where particles collect)
 * 
 * @param x - X position (0 to 1, normalized)
 * @param y - Y position (0 to 1, normalized)
 * @param n - First mode number
 * @param m - Second mode number
 * @returns Pattern value (-1 to 1, 0 = nodal line)
 */
export function chladniValue(x: number, y: number, n: number, m: number): number {
  const PI = Math.PI
  return (
    Math.cos(n * PI * x) * Math.cos(m * PI * y) -
    Math.cos(m * PI * x) * Math.cos(n * PI * y)
  )
}

/**
 * Calculate the gradient (direction toward nearest nodal line)
 * Used to move particles toward stable positions
 * 
 * @returns [dx, dy] normalized direction vector
 */
export function chladniGradient(
  x: number, 
  y: number, 
  n: number, 
  m: number
): [number, number] {
  const PI = Math.PI
  const h = 0.001 // Small delta for numerical gradient
  
  const val = chladniValue(x, y, n, m)
  const valX = chladniValue(x + h, y, n, m)
  const valY = chladniValue(x, y + h, n, m)
  
  // Gradient points toward increasing values
  // We want to move toward zero (nodal lines)
  // So if value is positive, move toward negative gradient
  // If value is negative, move toward positive gradient
  let dx = -(valX - val) / h
  let dy = -(valY - val) / h
  
  // Scale by distance from nodal line (stronger force further away)
  const strength = Math.abs(val)
  dx *= strength
  dy *= strength
  
  // Normalize
  const mag = Math.sqrt(dx * dx + dy * dy)
  if (mag > 0) {
    dx /= mag
    dy /= mag
  }
  
  return [dx, dy]
}

/**
 * Calculate force vector pushing particle toward nodal line
 * 
 * @param x - Particle x position (0 to 1)
 * @param y - Particle y position (0 to 1)
 * @param n - First mode number
 * @param m - Second mode number
 * @param strength - Force multiplier
 * @returns [fx, fy] force vector
 */
export function chladniForce(
  x: number,
  y: number,
  n: number,
  m: number,
  strength: number = 1
): [number, number] {
  const val = chladniValue(x, y, n, m)
  const [gx, gy] = chladniGradient(x, y, n, m)
  
  // Force magnitude based on distance from nodal line
  // Particles far from nodal lines feel stronger pull
  const forceMag = Math.abs(val) * strength
  
  return [gx * forceMag, gy * forceMag]
}

/**
 * Interpolate between two Chladni patterns
 * Used for smooth transitions between sections
 * 
 * @param x - X position (0 to 1)
 * @param y - Y position (0 to 1)
 * @param from - Starting pattern params
 * @param to - Target pattern params
 * @param t - Interpolation factor (0 to 1)
 * @returns Blended pattern value
 */
export function interpolatePattern(
  x: number,
  y: number,
  from: ChladniParams,
  to: ChladniParams,
  t: number
): number {
  const valFrom = chladniValue(x, y, from.n, from.m)
  const valTo = chladniValue(x, y, to.n, to.m)
  
  // Smooth easing for transition
  const eased = easeInOutCubic(t)
  
  return valFrom * (1 - eased) + valTo * eased
}

/**
 * Get interpolated force between two patterns
 */
export function interpolateForce(
  x: number,
  y: number,
  from: ChladniParams,
  to: ChladniParams,
  t: number,
  strength: number = 1
): [number, number] {
  const [fx1, fy1] = chladniForce(x, y, from.n, from.m, strength)
  const [fx2, fy2] = chladniForce(x, y, to.n, to.m, strength)
  
  const eased = easeInOutCubic(t)
  
  return [
    fx1 * (1 - eased) + fx2 * eased,
    fy1 * (1 - eased) + fy2 * eased
  ]
}

/**
 * Cubic easing function for smooth transitions
 */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Generate initial random particle positions
 */
export function generateParticles(count: number): Array<{
  x: number
  y: number
  vx: number
  vy: number
  size: number
}> {
  const particles = []
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
      size: 2 + Math.random() * 2 // 2-4px
    })
  }
  
  return particles
}

/**
 * Check if a point is near a nodal line
 * Used for visual effects (glow on nodal lines)
 */
export function isNearNodalLine(
  x: number,
  y: number,
  n: number,
  m: number,
  threshold: number = 0.1
): boolean {
  const val = Math.abs(chladniValue(x, y, n, m))
  return val < threshold
}
