'use client'

import { useEffect } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'

export default function DevelopersPage() {
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

      {/* ============================================================
          SLIDE 1: THE PROBLEM — 3 stacked rows, large type, visual weight
          ============================================================ */}

      <section data-section="problems" data-theme="dark" className="section-dark" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
        <div className="container-default">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-4">Sound familiar?</p>
            <h2 className="reveal text-display text-white font-heading max-w-3xl mx-auto" style={{ transitionDelay: '0.05s' }}>
              If you&apos;ve built with AI frameworks,<br />you&apos;ve hit these walls.
            </h2>
          </div>
        </div>
      </section>

      {/* Problem 1 */}
      <section data-section="problem-1" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>01</span>
              <h3 className="text-title text-ink font-heading mt-2">
                The provider<br />isn&apos;t yours.
              </h3>
              <p className="text-body-large text-ink-slate mt-4">
                When the best model for your use case changes &mdash; and it does,
                quarterly &mdash; you&apos;re constrained by what the framework supports,
                not what&apos;s possible.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  The provider is a module you own. Implement the Protocol and it&apos;s a
                  first-class citizen &mdash; alongside any other official provider,
                  running simultaneously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* Problem 2 */}
      <section data-section="problem-2" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>02</span>
              <h3 className="text-title text-ink font-heading mt-2">
                The agent loop<br />isn&apos;t yours.
              </h3>
              <p className="text-body-large text-ink-slate mt-4">
                When you want to do more than just change a hook.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  The orchestrator is a module you own. Implement the Protocol and
                  customize your agent loop to act how you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* Problem 3 */}
      <section data-section="problem-3" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>03</span>
              <h3 className="text-title text-ink font-heading mt-2">
                Interjection<br />isn&apos;t yours.
              </h3>
              <p className="text-body-large text-ink-slate mt-4">
                When you want to do more than seeing and blocking an event.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  Not only can you modify the message in flight, you can inject context
                  into the conversation to change what is happening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SLIDE 2: THE ARCHITECTURE
          ============================================================ */}

      {/* Architecture intro + diagram — single dark section */}
      <section data-section="architecture" data-theme="dark" className="section-dark" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container-wide">

          {/* Intro text */}
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
              How Amplifier is different
            </p>
            <h2 className="reveal text-display text-white font-heading" style={{ transitionDelay: '0.05s' }}>
              A kernel, not a framework.
            </h2>
            <p className="reveal mt-6 text-body-large max-w-2xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
              2,600 lines of Python. Zero decisions about models, loops, tools, or memory.
              Those are all modules you own.
            </p>
          </div>

          {/* Side-by-side diagram */}
          <div className="reveal max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

            {/* Vendor SDKs side */}
            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-eyebrow tracking-widest uppercase mb-6" style={{ color: 'var(--text-on-dark-tertiary)' }}>Vendor SDKs</p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-caption font-medium" style={{ color: 'var(--text-on-dark)' }}>Your App</span>
                </div>
                <div className="flex justify-center" style={{ color: 'var(--text-on-dark-tertiary)' }}>
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-caption font-medium" style={{ color: '#f87171' }}>Vendor&apos;s Agent Loop</span>
                  <p className="text-micro mt-1" style={{ color: '#ef4444' }}>fixed or opaque</p>
                </div>
                <div className="flex justify-center" style={{ color: 'var(--text-on-dark-tertiary)' }}>
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-caption font-medium" style={{ color: '#f87171' }}>Vendor&apos;s API</span>
                  <p className="text-micro mt-1" style={{ color: '#ef4444' }}>one vendor</p>
                </div>
              </div>
            </div>

            {/* Amplifier side */}
            <div className="p-8 rounded-2xl" style={{ background: 'rgba(91,77,227,0.08)', border: '1px solid rgba(91,77,227,0.25)', boxShadow: '0 0 60px rgba(91,77,227,0.08)' }}>
              <p className="text-eyebrow text-signal-light tracking-widest uppercase mb-6">Amplifier</p>
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
                    { name: 'Orchestrator', note: 'replaceable' },
                    { name: 'Provider(s)', note: 'any, multiple' },
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
                  <p className="text-micro" style={{ color: '#22c55e' }}>replaceable</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Five module types */}
      <section data-section="modules" data-theme="light" className="section-feature section-light-glow">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="reveal text-headline text-ink font-heading">Five module types. Each one replaceable.</h2>
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{ transitionDelay: '0.1s' }}>
              Implement the Protocol contract, and the kernel treats your module
              identically to any official one.
            </p>
          </div>
          <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Provider', icon: 'P', contract: 'complete(req) \u2192 res', desc: 'Which LLM answers. Swap without rewriting. Run multiple simultaneously.' },
              { name: 'Orchestrator', icon: 'O', contract: 'execute(prompt, ...)', desc: 'How the loop runs. The only system where you replace the loop itself.' },
              { name: 'Tool', icon: 'T', contract: 'execute(input) \u2192 result', desc: 'What the agent can do. Add, remove, or write your own.' },
              { name: 'Hook', icon: 'H', contract: '(event, data) \u2192 HookResult', desc: 'Control plane: block, modify, inject context, or ask for approval.' },
              { name: 'Context', icon: 'C', contract: 'add/get/set_messages', desc: 'How memory works. Swap strategies like databases.' },
            ].map((mod, i) => (
              <div key={i} className="p-5 rounded-2xl border border-canvas-mist bg-canvas text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                  <span className="text-signal font-heading font-bold text-body">{mod.icon}</span>
                </div>
                <h3 className="text-subheading text-ink font-heading mb-1">{mod.name}</h3>
                <code className="text-micro px-2 py-0.5 rounded" style={{ color: '#4338B8', background: 'rgba(91,77,227,0.06)' }}>{mod.contract}</code>
                <p className="text-caption text-ink-slate mt-3">{mod.desc}</p>
              </div>
            ))}
          </div>

          {/* Design principle */}
          <div className="reveal mt-16 text-center">
            <blockquote className="text-subheading text-ink font-heading italic max-w-2xl mx-auto">
              &ldquo;Could two teams want different behavior?<br />Then it&apos;s a module, not the kernel.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================================
          SLIDE 3: UNDERSTAND, USE, EXTEND
          ============================================================ */}

      {/* Stages intro */}
      <section data-section="stages-intro" data-theme="dark" className="section-dark" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-narrow text-center">
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
            The experimental layer
          </p>
          <h2 className="reveal text-display text-white font-heading" style={{ transitionDelay: '0.05s' }}>
            Understand it. Use it.<br />Make it yours.
          </h2>
          <p className="reveal mt-6 text-body-large max-w-xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
            Go as deep as you want. Each stage builds on the last.
          </p>
        </div>
      </section>

      {/* STAGE 1: Understand */}
      <section data-section="understand" data-theme="light" className="section-light-glow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 1</span>
            <h2 className="text-headline text-ink font-heading">Understand it</h2>
          </div>

          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl">
            {/* Read the kernel */}
            <a href="https://github.com/microsoft/amplifier-core/tree/main/amplifier_core" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Read the kernel</h3>
              <p className="text-body text-ink-slate">
                The entire kernel is ~2,600 lines of Python. No magic, no metaprogramming.
                Small enough to hold in your head.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                amplifier_core/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>

            {/* Inspect the contracts */}
            <a href="https://github.com/microsoft/amplifier-core/tree/main/docs/contracts" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Inspect the contracts</h3>
              <p className="text-body text-ink-slate">
                Each module type has a Protocol &mdash; a stable interface that defines the contract
                between the kernel and the module. They&apos;re short, documented, and public.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                docs/contracts/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>

            {/* Trace a request */}
            <a href="https://github.com/microsoft/amplifier-core/blob/main/docs/DESIGN_PHILOSOPHY.md" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Trace a request</h3>
              <p className="text-body text-ink-slate">
                Follow a prompt from input to output: Session &rarr; Orchestrator &rarr; Provider &rarr; Tools &rarr; Hooks &rarr; Context.
                Every step is a module boundary you can replace.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Design Philosophy
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
          </div>

          {/* Code sample */}
          <div className="reveal mt-10 max-w-5xl">
            <p className="text-caption text-ink-fog mb-3">The entire Provider contract &mdash; from <a href="https://github.com/microsoft/amplifier-core/blob/main/amplifier_core/interfaces.py" target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">interfaces.py</a></p>
            <CodeBlock
              code={`class Provider(Protocol):
    @property
    def name(self) -> str: ...

    @property
    def model(self) -> str: ...

    async def complete(
        self, request: CompletionRequest
    ) -> CompletionResponse: ...

# Implement these three things and the kernel
# treats your module identically to any official provider.`}
              className="max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* STAGE 2: Use it — experiment with modules */}
      <section data-section="use" data-theme="light" className="section-gradient-flow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 2</span>
            <h2 className="text-headline text-ink font-heading">Use it</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Experiment with individual modules. See what changes when you swap one,
              add one, or teach one something new.
            </p>
          </div>

          {/* Injection example — the hook that teaches */}
          <div className="reveal max-w-5xl">
            <h3 className="text-subheading text-ink font-heading mb-2">Inject context into the conversation</h3>
            <p className="text-body text-ink-slate mb-4">
              Most hook systems let you see events or block them. Amplifier hooks can feed
              information <em>back</em> into the agent&apos;s reasoning. Here&apos;s a hook that
              teaches the agent your team&apos;s commit convention &mdash; not by changing the prompt,
              but by injecting context when it gets it wrong:
            </p>
            <CodeBlock
              code={`async def __call__(self, event, data):
    if event != "tool_call":
        return HookResult(action="continue")

    command = data.get("input", {}).get("command", "")
    if not command.startswith("git commit"):
        return HookResult(action="continue")

    # The hook doesn't block — it teaches.
    # The agent sees this context and reformats the commit.
    if not follows_convention(command):
        return HookResult(
            action="inject_context",
            context="Commit messages must use conventional format: "
                    "feat|fix|docs|refactor: description"
        )

    return HookResult(action="continue")`}
              className="max-w-2xl"
            />
            <p className="text-body text-ink-slate mt-4">
              Change what gets injected and you change how the agent behaves &mdash; without
              touching the prompt, the orchestrator, or anything else. The hook is
              a standalone module that composes with the rest of the system.
            </p>
          </div>

          {/* Three experiment cards */}
          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl mt-10">
            <a href="https://github.com/microsoft/amplifier-core/blob/main/docs/HOOKS_API.md" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Hook injection</h4>
              <p className="text-body text-ink-slate">
                Five hook actions: continue, deny, ask_user, modify, and inject_context.
                Layer multiple hooks with deterministic precedence.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Hooks API
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
            <a href="https://github.com/microsoft/amplifier-core/blob/main/docs/contracts/PROVIDER_CONTRACT.md" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Swap a provider</h4>
              <p className="text-body text-ink-slate">
                Change one module reference and the entire system uses a different model.
                Your tools, hooks, and orchestrator don&apos;t notice.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Provider contract
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
            <a href="https://github.com/microsoft/amplifier-core/blob/main/docs/contracts/ORCHESTRATOR_CONTRACT.md" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Replace the loop</h4>
              <p className="text-body text-ink-slate">
                The orchestrator is a module. Swap in a different execution pattern &mdash; same
                tools, same hooks, completely different behavior.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Orchestrator contract
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* STAGE 3: Make it yours — compose into your app */}
      <section data-section="make-yours" data-theme="light" className="section-light-glow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 3</span>
            <h2 className="text-headline text-ink font-heading">Make it yours</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Pull your modules together into an app you own.
              Bundles package the pieces. Recipes automate the workflows.
            </p>
          </div>

          <div className="reveal max-w-5xl grid md:grid-cols-2 gap-8">
            {/* Bundle */}
            <div>
              <h3 className="text-subheading text-ink font-heading mb-2">Bundle your modules</h3>
              <p className="text-body text-ink-slate mb-4">
                A bundle assembles your providers, tools, hooks, and agents into a
                shareable, composable package. Your teammates inherit it and override
                what they need.
              </p>
              <CodeBlock
                code={`bundle:
  name: my-team-platform
  version: 1.0.0

includes:
  - foundation        # base tools
  - python-dev        # code intelligence

providers:
  - module: provider-anthropic
    config:
      model: claude-sonnet-4-20250514

tools:
  - module: ./modules/internal-docs

hooks:
  - module: ./modules/commit-convention
  - module: hooks-approval
  - module: hooks-redaction`}
                className="max-w-xl"
              />
            </div>

            {/* Recipe */}
            <div>
              <h3 className="text-subheading text-ink font-heading mb-2">Declare your workflows</h3>
              <p className="text-body text-ink-slate mb-4">
                Recipes are repeatable, version-controlled YAML workflows with
                stages, approval gates, and resumability. Commit them to your repo
                and run them the same way every time.
              </p>
              <CodeBlock
                code={`name: pr-review
stages:
  review:
    steps:
      - agent: python-dev
        prompt: "Review {repo_path} for quality"
      - agent: security-guardian
        prompt: "Audit for vulnerabilities"

  approve:
    needs_approval: true

  report:
    steps:
      - agent: technical-writer
        prompt: "Synthesize into a report"`}
                className="max-w-xl"
              />
            </div>
          </div>

          <div className="reveal mt-8 max-w-5xl">
            <p className="text-body text-ink-slate">
              Your app is the bundle + the recipes + the modules you wrote or chose.
              Your teammate forks your bundle, swaps the provider, adds their own hook.
              The system composes &mdash; it doesn&apos;t copy.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section data-section="dev-cta" data-theme="dark" className="section-dark" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default text-center">
          <div className="reveal">
            <p className="text-caption mb-3" style={{ color: 'var(--text-on-dark-tertiary)' }}>Install the Amplifier CLI</p>
            <CodeBlock code="uv tool install git+https://github.com/microsoft/amplifier" className="max-w-lg mx-auto" />
            <div className="mt-8">
              <a href="https://github.com/microsoft/amplifier" target="_blank" rel="noopener noreferrer" className="btn-apple">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
