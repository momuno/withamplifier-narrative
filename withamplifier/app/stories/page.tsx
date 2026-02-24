'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/RevealOnScroll'
import LearnCard, { DeckCategory } from '@/components/LearnCard'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'
import { PARTICLE_SECTIONS } from '@/lib/particle-config'
import { decks } from '@/lib/deck-data'

const categoryFilters: { value: DeckCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'showcase', label: 'Projects' },
  { value: 'tool', label: 'Tools' },
  { value: 'platform', label: 'Platform' },
  { value: 'devex', label: 'Developer Experience' },
  { value: 'enterprise', label: 'Enterprise' },
]

export default function StoriesPage() {
  const [activeFilter, setActiveFilter] = useState<DeckCategory | 'all'>('all')

  const filteredDecks = activeFilter === 'all'
    ? decks.filter(deck => deck.category !== 'intro')
    : decks.filter(deck => deck.category === activeFilter)

  return (
    <div className="pt-16">
      {/* Particle Background */}
      <ChladniWebGLTest params={PARTICLE_SECTIONS['learn-hero']} />

      {/* Hero */}
      <section id="stories-hero" className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink max-w-3xl">
              Stories
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              Read about what people are building, learning, and encoding with Amplifier.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-40">
        <div className="container-wide py-3 sm:py-4">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-canvas/80 to-transparent z-10 pointer-events-none hidden sm:hidden" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-canvas/80 to-transparent z-10 pointer-events-none sm:hidden" aria-hidden="true" />

            <div
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2 snap-x snap-mandatory sm:snap-none"
              role="tablist"
              aria-label="Filter stories by category"
            >
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  role="tab"
                  aria-selected={activeFilter === filter.value}
                  aria-controls="deck-grid"
                  className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium whitespace-nowrap
                             transition-all duration-200 snap-start
                             focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2
                             active:scale-95 ${
                    activeFilter === filter.value
                      ? 'bg-signal text-white shadow-sm'
                      : 'bg-canvas-stone text-ink-slate hover:bg-canvas-mist hover:text-ink active:bg-canvas-mist'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deck grid */}
      <section className="section relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-canvas/80 to-canvas pointer-events-none" style={{ zIndex: 1 }} />
        <div className="container-wide relative" style={{ zIndex: 2 }}>
          <div
            id="deck-grid"
            role="tabpanel"
            aria-label={`${activeFilter === 'all' ? 'All' : categoryFilters.find(f => f.value === activeFilter)?.label} stories`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredDecks.map((deck) => (
              <LearnCard key={deck.id} deck={deck} />
            ))}
          </div>

          {filteredDecks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-ink-slate">No stories found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Ready to build?</h2>
            <p className="mt-4 text-ink-slate max-w-xl mx-auto">
              Join the community and start building. Amplifier is ready when you are.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/microsoft/amplifier#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get started
              </a>
              <a
                href="https://github.com/microsoft/amplifier"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
