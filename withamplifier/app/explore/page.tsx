'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import PlaygroundSimulation from '@/components/PlaygroundSimulation'
import { getTraceForBundle } from '@/lib/demo-traces'

const bundles = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Reads your code, writes your docs. READMEs, API references, architecture guides.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'web-search', 'grep'],
    config: `bundle:
  name: documentation
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - web-search
  - grep

behaviors:
  - technical-writing
  - structured-output`,
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Security vulnerabilities, SOLID violations, best practice checks.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'grep', 'ast-analysis'],
    config: `bundle:
  name: code-reviewer
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - grep
  - ast-analysis

behaviors:
  - security-focused
  - constructive-feedback`,
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Write, test, debug. Full-stack development with filesystem and bash.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'bash', 'grep', 'web-search'],
    config: `bundle:
  name: developer
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - bash
  - grep
  - web-search

behaviors:
  - implementation-focused
  - test-driven`,
  },
  {
    id: 'presentation',
    name: 'Presentation Creator',
    description: 'Creates presentations with research, visual suggestions, and speaker notes.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'web-search'],
    config: `bundle:
  name: presentation
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - web-search

behaviors:
  - visual-thinking
  - narrative-structure`,
  },
]

// Placeholder community bundles - these would come from a real API
const communityBundles = [
  {
    id: 'design-intelligence',
    name: 'Design Intelligence',
    description: 'Design system architecture, component design, and visual strategy.',
    author: 'Community',
    category: 'community',
    tools: ['filesystem', 'web-search'],
  },
]

export default function ExplorePage() {
  const [selectedBundle, setSelectedBundle] = useState<typeof bundles[0] | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'config'>('demo')

  const handleTryBundle = (bundle: typeof bundles[0]) => {
    setSelectedBundle(bundle)
    setShowDemo(true)
    setActiveTab('demo')
  }

  const trace = selectedBundle ? getTraceForBundle(selectedBundle.id) : null

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink max-w-3xl">
              Start with what works.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              Unlike closed platforms, everything here is inspectable and composable. 
              Use bundles as-is, remix them, or learn how they work.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Platform overview - NEW */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Explore by type</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Amplifier has more than bundles. Browse the building blocks.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3z"></path>
                  <path d="M12 12L20 7.5"></path>
                  <path d="M12 12V21"></path>
                  <path d="M12 12L4 7.5"></path>
                </svg>
              </div>
              <h3 className="text-subheading text-ink">Bundles</h3>
              <p className="mt-1 text-ink-slate text-sm">Complete agent configurations</p>
              <span className="mt-3 inline-block text-signal text-sm font-medium">12 available</span>
            </div>

            <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-subheading text-ink">Tools</h3>
              <p className="mt-1 text-ink-slate text-sm">Capabilities for agents</p>
              <span className="mt-3 inline-block text-signal text-sm font-medium">25+ tools</span>
            </div>

            <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 00-16 0"></path>
                </svg>
              </div>
              <h3 className="text-subheading text-ink">Agents</h3>
              <p className="mt-1 text-ink-slate text-sm">Specialized personas</p>
              <span className="mt-3 inline-block text-signal text-sm font-medium">8 agents</span>
            </div>

            <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M12 22v-5"></path>
                  <path d="M9 8V2"></path>
                  <path d="M15 8V2"></path>
                  <path d="M18 8v4a6 6 0 01-12 0V8h12z"></path>
                </svg>
              </div>
              <h3 className="text-subheading text-ink">Providers</h3>
              <p className="mt-1 text-ink-slate text-sm">Any model you want</p>
              <span className="mt-3 inline-block text-signal text-sm font-medium">6 providers</span>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Main content - Bundle browser */}
      <section className="section border-t border-canvas-mist">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[350px_1fr] gap-12">
            {/* Sidebar - Bundle browser */}
            <div>
              <h2 className="text-heading text-ink mb-6">Official Bundles</h2>
              <div className="space-y-3">
                {bundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => handleTryBundle(bundle)}
                    className={`w-full p-4 text-left rounded-soft transition-all duration-300 ${
                      selectedBundle?.id === bundle.id
                        ? 'bg-signal-soft border-2 border-signal'
                        : 'bg-canvas-stone border-2 border-transparent hover:border-canvas-mist'
                    }`}
                  >
                    <span className={`block font-medium text-sm ${
                      selectedBundle?.id === bundle.id ? 'text-signal' : 'text-ink'
                    }`}>
                      {bundle.name}
                    </span>
                    <span className="block mt-1 text-ink-slate text-micro">
                      {bundle.description}
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {bundle.tools.slice(0, 3).map((tool) => (
                        <span 
                          key={tool}
                          className="px-2 py-0.5 bg-canvas text-ink-fog text-micro rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Community section */}
              <h2 className="text-heading text-ink mt-10 mb-6">Community</h2>
              <div className="space-y-3">
                {communityBundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="w-full p-4 text-left rounded-soft bg-canvas-stone border-2 border-transparent"
                  >
                    <span className="block font-medium text-sm text-ink">
                      {bundle.name}
                    </span>
                    <span className="block mt-1 text-ink-slate text-micro">
                      {bundle.description}
                    </span>
                    <span className="block mt-2 text-ink-fog text-micro">
                      by {bundle.author}
                    </span>
                  </div>
                ))}
                <p className="text-ink-fog text-sm p-4">
                  More community bundles coming as the ecosystem grows.
                </p>
              </div>

              {/* Contribute CTA */}
              <div className="mt-10 p-6 bg-canvas-stone rounded-gentle">
                <h3 className="text-subheading text-ink">Share your bundle</h3>
                <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                  Built something useful? Contribute it back. The ecosystem 
                  grows because people share.
                </p>
                <Link 
                  href="https://github.com/microsoft/amplifier/blob/main/CONTRIBUTING.md"
                  className="mt-4 inline-block text-signal text-sm font-medium link-underline"
                >
                  How to contribute
                </Link>
              </div>
            </div>

            {/* Main area - Demo/Config */}
            <div>
              {selectedBundle ? (
                <div>
                  {/* Bundle header */}
                  <div className="mb-6">
                    <p className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-2">Bundle</p>
                    <h2 className="text-title text-ink">{selectedBundle.name}</h2>
                    <p className="mt-2 text-ink-slate">{selectedBundle.description}</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 border-b border-canvas-mist mb-6">
                    <button
                      onClick={() => setActiveTab('demo')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'demo'
                          ? 'border-signal text-signal'
                          : 'border-transparent text-ink-slate hover:text-ink'
                      }`}
                    >
                      Watch it work
                    </button>
                    <button
                      onClick={() => setActiveTab('config')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'config'
                          ? 'border-signal text-signal'
                          : 'border-transparent text-ink-slate hover:text-ink'
                      }`}
                    >
                      View config
                    </button>
                  </div>

                  {/* Tab content */}
                  {activeTab === 'demo' ? (
                    <div>
                      {showDemo && trace ? (
                        <div>
                          <div className="mb-4 p-4 bg-canvas-stone rounded-soft">
                            <p className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                              Recorded session
                            </p>
                            <p className="mt-1 text-ink-slate text-sm">
                              This is a real execution trace. Watch the agent think, 
                              use tools, and produce output.
                            </p>
                          </div>
                          <PlaygroundSimulation 
                            trace={trace} 
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        <div className="terminal min-h-[400px]">
                          <div className="terminal-header">
                            <div className="terminal-dots">
                              <div className="terminal-dot" />
                              <div className="terminal-dot" />
                              <div className="terminal-dot" />
                            </div>
                            <span className="terminal-label">Ready</span>
                          </div>
                          <div className="terminal-body flex items-center justify-center h-[350px]">
                            <div className="text-center">
                              <p className="text-ink-slate mb-4">
                                Select a bundle to see it in action
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="code-block">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                          Bundle Configuration
                        </span>
                        <span className="text-micro text-ink-fog">bundle.yaml</span>
                      </div>
                      <pre className="text-sm text-[#E8E8E6] whitespace-pre font-mono">
                        {selectedBundle.config}
                      </pre>
                      <p className="mt-6 text-ink-fog text-sm">
                        This is everything the bundle includes. Transparent, readable, 
                        customizable.
                      </p>
                    </div>
                  )}

                  {/* Try it yourself CTA */}
                  <div className="mt-8 p-6 bg-canvas-stone rounded-gentle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-subheading text-ink">Run it yourself</h3>
                      <p className="mt-1 text-ink-slate text-sm">
                        Install Amplifier and use this bundle on your own projects.
                      </p>
                    </div>
                    <Link href="/build" className="btn-primary flex-shrink-0">
                      Get started
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[500px] bg-canvas-stone rounded-gentle">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-signal-soft flex items-center justify-center">
                      <svg className="w-8 h-8 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-heading text-ink">Select a bundle</h3>
                    <p className="mt-2 text-ink-slate max-w-sm">
                      Choose a bundle from the sidebar to see how it works 
                      and view its configuration.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Model flexibility callout - NEW */}
      <section className="section border-t border-canvas-mist bg-ink">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-on-dark">Works with any model.</h2>
            <p className="mt-4 text-on-dark-secondary max-w-xl mx-auto">
              Every bundle works with every provider. Claude today, GPT-4 tomorrow, 
              Llama next week. Change one line, keep everything else.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">Anthropic</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">OpenAI</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">Google</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">Azure</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">AWS</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-on-dark text-sm">Ollama</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Built with Amplifier */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <p className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-2">Showcase</p>
            <h2 className="text-title text-ink">Built with Amplifier</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Real projects using Amplifier. See what's possible.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Bundle
              </span>
              <h3 className="mt-3 text-heading text-ink">Design Intelligence</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                A collection of design-focused agents for system architecture, 
                component design, animation choreography, and visual strategy.
              </p>
              <Link 
                href="https://github.com/microsoft/amplifier"
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                View on GitHub
              </Link>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Website
              </span>
              <h3 className="mt-3 text-heading text-ink">This site</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                withamplifier.com was built with Amplifier bundles. Content 
                strategy, code generation, design decisions all assisted by 
                the framework.
              </p>
              <Link 
                href="https://github.com/anderlpz/withamplifier"
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                View source
              </Link>
            </div>
          </RevealStagger>

          <RevealOnScroll delay={200}>
            <p className="mt-12 text-center text-ink-slate">
              Built something with Amplifier?{' '}
              <Link 
                href="https://github.com/microsoft/amplifier/discussions"
                className="text-signal link-underline"
              >
                Share it with the community
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
