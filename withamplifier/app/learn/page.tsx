'use client'

import RevealOnScroll from '@/components/RevealOnScroll'
import Link from 'next/link'

const cards = [
  {
    number: 1,
    tag: 'Introduction',
    title: 'What is Amplifier?',
    description: 'A modular AI agent framework. Provider-agnostic, fully extensible, completely observable. Built on Linux kernel principles.',
    slides: 8,
    filename: 'what-is-amplifier.html',
  },
  {
    number: 2,
    tag: 'Quick Start',
    title: 'Getting Started',
    description: 'From install to productive in 5 minutes. Prerequisites, installation, configuration, and your first session.',
    slides: 9,
    filename: 'getting-started-guide.html',
  },
  {
    number: 3,
    tag: 'Expert Practices',
    title: 'Best Practices & Patterns',
    description: 'Deliberate development, context management, when to delegate, recipe patterns, and multi-agent coordination.',
    slides: 9,
    filename: 'best-practices-patterns.html',
  },
  {
    number: 4,
    tag: 'Composition Model',
    title: 'Bundles & Agents',
    description: 'Understanding the composition model. How bundles work, what agents are, and how to build your own.',
    slides: 10,
    filename: 'bundles-and-agents.html',
  },
  {
    number: 5,
    tag: 'Multi-Step Orchestration',
    title: 'Recipes & Workflows',
    description: 'Declarative multi-step agent coordination. Approval gates, resumability, and context accumulation.',
    slides: 10,
    filename: 'recipes-workflows.html',
  },
  {
    number: 6,
    tag: 'Future Direction',
    title: 'Vision & Roadmap',
    description: 'Where Amplifier is going. Core philosophy, current state, near-term roadmap, and how to contribute.',
    slides: 8,
    filename: 'vision-roadmap.html',
  },
]

export default function LearnPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <h1 className="text-display text-ink">Learn Amplifier</h1>
          <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
            New to Amplifier? Start here. Learn the basics, understand the concepts, and get productive quickly.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="section relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <RevealOnScroll key={card.number} delay={index * 50}>
                <a
                  href={`/stories/decks/${card.filename}`}
                  className="group block p-6 rounded-2xl bg-canvas border border-canvas-mist shadow-soft hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-signal">{card.number}</span>
                    <span className="text-xs font-medium text-ink-slate uppercase tracking-wider">{card.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-signal transition-colors duration-200 mb-2">{card.title}</h3>
                  <p className="text-sm text-ink-slate leading-relaxed">{card.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-ink-fog">{card.slides} slides</span>
                    <span className="text-sm text-signal">View story</span>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
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
