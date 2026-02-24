'use client'

import { useMemo } from 'react'
import styles from './DualRowScrollingCards.module.css'

interface BundleCard {
  name: string
  type: string
  description: string
  author: string
  authorAvatar: string
  repoUrl: string
  badge?: 'validated' | 'experimental' | 'popular' | 'official'
}

interface DualRowScrollingCardsProps {
  cards: BundleCard[]
}

export default function DualRowScrollingCards({ cards }: DualRowScrollingCardsProps) {
  // Split cards into two rows
  const midpoint = Math.ceil(cards.length / 2)
  const topRowCards = cards.slice(0, midpoint)
  const bottomRowCards = cards.slice(midpoint)
  
  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Top Row - Scrolls Right to Left */}
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {/* Triple the cards for seamless loop */}
          {[...topRowCards, ...topRowCards, ...topRowCards].map((card, i) => (
            <BundleCard key={`top-${i}`} card={card} />
          ))}
        </div>
      </div>
      
      {/* Bottom Row - Scrolls Left to Right */}
      <div className={styles.scrollContainer}>
        <div className={`${styles.scrollTrack} ${styles.scrollReverse}`}>
          {/* Triple the cards for seamless loop */}
          {[...bottomRowCards, ...bottomRowCards, ...bottomRowCards].map((card, i) => (
            <BundleCard key={`bottom-${i}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}

function BundleCard({ card }: { card: BundleCard }) {
  const iconMap: Record<string, JSX.Element> = {
    agent: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tool: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    bundle: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    app: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    provider: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="m16.24 16.24 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="m16.24 7.76 2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    hook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v10c0 3-2 5-5 5s-5-2-5-5" strokeLinecap="round" />
        <circle cx="12" cy="3" r="2" />
      </svg>
    )
  }
  
  return (
    <a 
      href={card.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="community-card"
    >
      <div className="community-card__header">
        <span className={`community-card__icon community-card__icon--${card.type}`}>
          {iconMap[card.type] || iconMap.bundle}
        </span>
        {card.badge && (
          <div className="community-card__badges">
            <span className={`community-card__badge community-card__badge--${card.badge}`}>
              {card.badge.charAt(0).toUpperCase() + card.badge.slice(1)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="community-card__name">{card.name}</h3>
      <p className="community-card__description">{card.description}</p>
      
      <div className="community-card__footer">
        <div className="community-card__author">
          <img 
            alt={card.author}
            className="community-card__avatar"
            loading="lazy"
            src={card.authorAvatar}
          />
          <span className="community-card__author-name">@{card.author}</span>
        </div>
        <span className="community-card__action">View →</span>
      </div>
    </a>
  )
}
