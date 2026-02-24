'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'
import ScrollParticleBackground from '@/components/ScrollParticleBackground'

export default function Home() {
  useViewportHeight()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale').forEach(el => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pt-16">
      <ScrollParticleBackground />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section id="hero" data-section="hero" data-theme="dark" className="section-feature section-dark relative overflow-hidden">
        <div className="text-center container-default relative z-10">
          <h1 className="reveal text-display-xl text-white font-heading px-2">
            You need three things<br />from your AI&nbsp;framework.
          </h1>
          <p className="reveal mt-6 md:mt-8 text-body-large max-w-2xl mx-auto px-4" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
            You picked a framework. It got you to a demo fast. Then the model landscape shifted,
            or you needed production-grade behavior, or your teammate asked how to reuse your setup.
          </p>
        </div>
      </section>

      {/* ============================================================
          THREE NEEDS
          ============================================================ */}

      {/* Need 1: Portability */}
      <section data-section="need-portability" data-theme="light" className="section-light-glow" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>01</span>
              <h3 className="text-title text-ink font-heading mt-2">Portability</h3>
              <p className="text-body-large text-ink-slate mt-4">
                The model you chose isn&apos;t the model you need. Switching shouldn&apos;t mean
                rewriting your agent logic, your tools, your error handling.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  Providers are modules. Switch by changing one line. Run multiple simultaneously.
                </p>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`providers:
  - module: provider-anthropic    # swap to provider-openai
    config:
      model: claude-sonnet-4-5    # swap to gpt-4o`}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* Need 2: Control */}
      <section data-section="need-control" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>02</span>
              <h3 className="text-title text-ink font-heading mt-2">Control</h3>
              <p className="text-body-large text-ink-slate mt-4">
                You can see what&apos;s happening. You can&apos;t change it. The agent loop, the memory,
                the lifecycle &mdash; the most important behaviors are the ones you need to own.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  The agent loop is a module. Memory is a module. Hooks are a control plane &mdash;
                  block, modify, inject context, or ask for human approval.
                </p>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`# A hook that teaches, not just blocks
if not follows_convention(command):
    return HookResult(
        action="inject_context",
        context="Use conventional format: feat|fix|docs: description"
    )`}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* Need 3: Composability */}
      <section data-section="need-composability" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>03</span>
              <h3 className="text-title text-ink font-heading mt-2">Composability</h3>
              <p className="text-body-large text-ink-slate mt-4">
                What you build doesn&apos;t travel. Your teammate wants your setup with a different
                model and an extra tool. There&apos;s no inheritance, no override semantics.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  Bundles compose modules into shareable configurations. Inherit everything,
                  override what you need. No duplication.
                </p>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`includes:
  - my-team             # everything inherited

providers:
  - module: provider-openai    # swapped
    config: { model: gpt-4o }

tools:
  - module: tool-browser-test  # added`}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE ARCHITECTURE
          ============================================================ */}
      <section data-section="architecture" data-theme="dark" className="section-dark" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
              The architecture
            </p>
            <h2 className="reveal text-display text-white font-heading" style={{ transitionDelay: '0.05s' }}>
              A kernel, not a framework.
            </h2>
            <p className="reveal mt-6 text-body-large max-w-2xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
              2,600 lines of Python. Five module types. Each one replaceable.
            </p>
          </div>

          {/* Architecture diagram */}
          <div className="reveal max-w-md mx-auto">
            <div className="p-8 rounded-2xl" style={{ background: 'rgba(91,77,227,0.08)', border: '1px solid rgba(91,77,227,0.25)', boxShadow: '0 0 60px rgba(91,77,227,0.08)' }}>
              <div className="space-y-3">
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-caption font-medium" style={{ color: 'var(--text-on-dark)' }}>Your App</span>
                </div>
                <div className="flex justify-center" style={{ color: 'var(--text-on-dark-tertiary)' }}>
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(91,77,227,0.12)', border: '1px solid rgba(91,77,227,0.3)' }}>
                  <span className="text-caption font-medium text-signal-light">Kernel</span>
                  <p className="text-micro mt-1" style={{ color: 'var(--text-on-dark-tertiary)' }}>2,600 lines &middot; mechanisms only</p>
                </div>
                <div className="flex justify-center" style={{ color: 'var(--text-on-dark-tertiary)' }}>
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Orchestrator', note: 'your loop' },
                    { name: 'Provider(s)', note: 'any LLM' },
                    { name: 'Tools', note: 'composable' },
                    { name: 'Hooks', note: 'control plane' },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-lg text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <span className="text-micro font-medium" style={{ color: '#4ade80' }}>{m.name}</span>
                      <p className="text-micro" style={{ color: '#22c55e' }}>{m.note}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="text-micro font-medium" style={{ color: '#4ade80' }}>Context</span>
                  <p className="text-micro" style={{ color: '#22c55e' }}>your memory</p>
                </div>
              </div>
            </div>
          </div>

          {/* Design principle */}
          <div className="reveal mt-12 text-center">
            <blockquote className="text-subheading text-white font-heading italic max-w-2xl mx-auto">
              &ldquo;Could two teams want different behavior?<br />Then it&apos;s a module, not the kernel.&rdquo;
            </blockquote>
          </div>

          {/* Go deeper link */}
          <div className="reveal mt-10 text-center">
            <Link href="/developers" className="inline-flex items-center gap-2 text-body text-signal-light hover:text-white transition-colors">
              See the contracts, the code, the three doors in
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section data-section="cta" data-theme="dark" className="section-dark" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline" style={{ color: 'var(--text-on-dark)' }}>
            Ready to build?
          </h2>

          <div className="reveal mt-8" style={{ transitionDelay: '0.1s' }}>
            <CodeBlock code="uv tool install git+https://github.com/microsoft/amplifier" className="max-w-lg mx-auto" />
          </div>

          <div className="reveal mt-8 flex flex-col sm:flex-row gap-3 justify-center px-4" style={{ transitionDelay: '0.2s' }}>
            <a
              href="https://github.com/microsoft/amplifier#quick-start"
              className="btn-apple w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quick Start Guide
            </a>
            <Link href="/developers" className="btn-apple-secondary w-full sm:w-auto">
              For Developers
            </Link>
          </div>

          <p className="reveal mt-8 text-sm" style={{ transitionDelay: '0.3s', color: 'var(--text-on-dark-tertiary)' }}>
            Questions? <a href="https://github.com/microsoft/amplifier/discussions" target="_blank" rel="noopener noreferrer" className="text-link-blue hover:underline">Join the discussion</a>
          </p>
        </div>
      </section>
    </div>
  )
}
