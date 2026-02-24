/**
 * Letter Shape Attractor
 * 
 * Creates an "A" shape that particles are attracted to,
 * using the same physics feel as Chladni patterns.
 */

export interface LetterParams {
  shape: 'A' | 'custom'
  strength: number
  lineWidth: number  // How thick the attractor lines are
}

/**
 * Define the "A" shape as line segments (normalized 0-1 coordinates)
 * This creates a stylized A with the Amplifier aesthetic
 */
export function getAShapeSegments(): Array<{x1: number, y1: number, x2: number, y2: number}> {
  // Stylized "A" - pointed top, wide base, crossbar
  return [
    // Left leg
    { x1: 0.5, y1: 0.15, x2: 0.22, y2: 0.85 },
    // Right leg  
    { x1: 0.5, y1: 0.15, x2: 0.78, y2: 0.85 },
    // Crossbar
    { x1: 0.32, y1: 0.58, x2: 0.68, y2: 0.58 },
  ]
}

/**
 * Calculate distance from point to line segment
 */
function distanceToSegment(
  px: number, py: number,
  x1: number, y1: number,
  x2: number, y2: number
): { distance: number, nearestX: number, nearestY: number } {
  const dx = x2 - x1
  const dy = y2 - y1
  const lengthSq = dx * dx + dy * dy
  
  let t = 0
  if (lengthSq > 0) {
    t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq))
  }
  
  const nearestX = x1 + t * dx
  const nearestY = y1 + t * dy
  const distance = Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2)
  
  return { distance, nearestX, nearestY }
}

/**
 * Calculate the "A" shape value at a point
 * Returns 0 at the shape lines, increases with distance
 * (Inverse of Chladni - we want particles ON the lines, not at zero-crossings)
 */
export function letterShapeValue(x: number, y: number): number {
  const segments = getAShapeSegments()
  let minDist = Infinity
  
  for (const seg of segments) {
    const { distance } = distanceToSegment(x, y, seg.x1, seg.y1, seg.x2, seg.y2)
    minDist = Math.min(minDist, distance)
  }
  
  return minDist
}

/**
 * Calculate force vector pushing particle toward the "A" shape
 */
export function letterShapeForce(
  x: number,
  y: number,
  strength: number = 1
): [number, number] {
  const segments = getAShapeSegments()
  let minDist = Infinity
  let nearestX = x
  let nearestY = y
  
  // Find nearest point on any segment
  for (const seg of segments) {
    const result = distanceToSegment(x, y, seg.x1, seg.y1, seg.x2, seg.y2)
    if (result.distance < minDist) {
      minDist = result.distance
      nearestX = result.nearestX
      nearestY = result.nearestY
    }
  }
  
  // Force direction: toward nearest point on shape
  let fx = nearestX - x
  let fy = nearestY - y
  
  // Normalize
  const mag = Math.sqrt(fx * fx + fy * fy)
  if (mag > 0.001) {
    fx /= mag
    fy /= mag
  }
  
  // Force magnitude: stronger when further away, caps at a threshold
  // This creates the "settling" behavior like Chladni
  const forceMag = Math.min(minDist * 2, 0.5) * strength
  
  return [fx * forceMag, fy * forceMag]
}

/**
 * Check if particle is "on" the letter shape (within threshold)
 */
export function isOnLetterShape(x: number, y: number, threshold: number = 0.02): boolean {
  return letterShapeValue(x, y) < threshold
}
