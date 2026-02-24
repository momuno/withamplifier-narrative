'use client'

import Link from 'next/link'

export type DeckCategory = 
  | 'intro' 
  | 'showcase' 
  | 'platform' 
  | 'tool' 
  | 'devex' 
  | 'enterprise' 
  | 'philosophy'

export interface Deck {
  id: string
  title: string
  description: string
  category: DeckCategory
  href: string
  isNew?: boolean
  publishedDate?: string // ISO date string for filtering/display
}

const categoryLabels: Record<DeckCategory, string> = {
  intro: 'Introduction',
  showcase: 'Showcase',
  platform: 'Platform',
  tool: 'Tools',
  devex: 'Developer Experience',
  enterprise: 'Enterprise',
  philosophy: 'Philosophy',
}

// Using design system colors aligned with brand
const categoryStyles: Record<DeckCategory, string> = {
  intro: 'bg-signal-soft text-signal',
  showcase: 'bg-[#E8F7F0] text-[#00B870]', // Softer green matching brand
  platform: 'bg-[#E8F3FB] text-[#3B9EDB]', // Blue matching buttons
  tool: 'bg-[#FFF4E6] text-[#FF9500]', // Amber
  devex: 'bg-[#FCE8F3] text-[#EC4899]', // Pink
  enterprise: 'bg-[#F2EDFA] text-[#8B5FD9]', // Purple matching particles
  philosophy: 'bg-[#F2EDFA] text-[#8B5FD9]', // Purple matching particles
}

export default function LearnCard({ deck }: { deck: Deck }) {
  return (
    <Link
      href={deck.href}
      className="community-card group"
      style={{ width: 'auto', minWidth: '280px' }}
    >
      <div className="community-card__header">
        {deck.isNew ? (
          <span className="community-card__badge community-card__badge--popular">
            New
          </span>
        ) : (
          <span></span>
        )}
      </div>
      
      <h3 className="community-card__name group-hover:text-signal transition-colors duration-200">
        {deck.title}
      </h3>
      
      <p className="community-card__description">
        {deck.description}
      </p>
      
      <div className="community-card__footer">
        <span className={`px-2 py-0.5 rounded text-micro font-medium ${categoryStyles[deck.category]}`}>
          {categoryLabels[deck.category]}
        </span>
        <span className="community-card__action">View →</span>
      </div>
    </Link>
  )
}
