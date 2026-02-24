// Particle configuration based on design strategy
// See: .design/PARTICLE-COLOR-STRATEGY.md

export interface ParticlePattern {
  n: number
  m: number
  strength: number
  color: string
  opacity: number
  particleSize: number
  transitionDuration: number
  transitionEasing: string
  prominence: 'subtle' | 'medium' | 'prominent' | 'subtle-medium'
  label: string
}

export const PARTICLE_SECTIONS: Record<string, ParticlePattern> = {
  hero: {
    n: 3,
    m: 5,
    strength: 0.5,
    color: '#00B870', // Softer brand green (less neon)
    opacity: 0.4,
    particleSize: 2,
    transitionDuration: 0, // Entry state
    transitionEasing: 'ease-in-out',
    prominence: 'subtle',
    label: 'Hero - Dynamic Potential',
  },
  problem: {
    n: 12,
    m: 12,
    strength: 0.9,
    color: '#6B6B6B', // Darker gray for fence
    opacity: 0.5,
    particleSize: 1.5,
    transitionDuration: 800,
    transitionEasing: 'ease-in-out',
    prominence: 'medium',
    label: 'Problem - Chainlink',
  },
  differentiation: {
    n: 2,
    m: 5,
    strength: 0.6,
    color: '#8B5FD9', // Purple for "open by design"
    opacity: 0.65,
    particleSize: 2.5,
    transitionDuration: 400,
    transitionEasing: 'ease-out',
    prominence: 'prominent',
    label: 'Differentiation - Open By Design',
  },
  platform: {
    n: 4,
    m: 6,
    strength: 0.65,
    color: '#7B4BBF', // Refined purple for "composable pieces"
    opacity: 0.55,
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-in-out',
    prominence: 'medium',
    label: 'Platform - Composable Pieces',
  },
  demo: {
    n: 1,
    m: 3,
    strength: 0.5,
    color: '#3B9EDB', // Blue matching button colors for "ready to build"
    opacity: 0.5,
    particleSize: 2,
    transitionDuration: 1200,
    transitionEasing: 'ease-in',
    prominence: 'subtle',
    label: 'Demo - Ready To Build',
  },
  bundles: {
    n: 5,
    m: 7,
    strength: 0.7,
    color: '#9B7AB8', // Softer mauve (less neon)
    opacity: 0.5,
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-out',
    prominence: 'subtle-medium',
    label: 'Bundles - Built By Different Minds',
  },
  cta: {
    n: 3,
    m: 4,
    strength: 0.6,
    color: '#3B9EDB', // Blue matching button colors for "ready to build"
    opacity: 0.55,
    particleSize: 2,
    transitionDuration: 800,
    transitionEasing: 'ease-in-out',
    prominence: 'medium',
    label: 'CTA - Ready To Build',
  },
  'learn-hero': {
    n: 3,
    m: 12,
    strength: 0.1,
    color: '#8f8f8f',
    opacity: 0.6,
    particleSize: 0.5,
    transitionDuration: 0,
    transitionEasing: 'ease-in-out',
    prominence: 'subtle',
    label: 'Stories - Flowing Pattern',
  },
}

// Scroll trigger thresholds
export const TRANSITION_TRIGGERS = {
  startThreshold: 0.2, // Begin transition at 20% viewport
  completeThreshold: 0.4, // Complete transition at 40% viewport
}

// Mobile adjustments
export const MOBILE_ADJUSTMENTS = {
  opacityReduction: 0.1, // Reduce opacity by 0.1
  particleSizeReduction: 0.5, // 1.5px instead of 2px
  transitionSpeedup: 200, // Reduce durations by 200ms
}

// Section IDs matching homepage layout
export const SECTION_IDS = [
  'hero',
  'problem',
  'differentiation',
  'platform',
  'demo',
  'bundles',
  'cta',
] as const

// Learn page section IDs
export const LEARN_SECTION_IDS = [
  'learn-hero',
] as const

export type SectionId = (typeof SECTION_IDS)[number]
