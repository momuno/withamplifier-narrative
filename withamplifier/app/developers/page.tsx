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
          HERO
          ============================================================ */}

      <section
        data-section="hero"
        data-theme="light"
        className="section-feature section-light-glow"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="container-default text-center">
          <p className="reveal text-eyebrow text-signal tracking-widest uppercase mb-6">
            For Developers
          </p>
          <h1
            className="reveal text-display-xl font-heading text-ink"
            style={{ transitionDelay: '0.05s' }}
          >
            Build AI Your Way<br />with Amplifier
          </h1>
          <p
            className="reveal text-body-large text-ink-slate max-w-2xl mx-auto mt-6"
            style={{ transitionDelay: '0.1s', textWrap: 'balance' as const }}
          >
            Compose your modules. Control the details. Share with others.
          </p>
          <div className="reveal mt-10" style={{ transitionDelay: '0.15s' }}>
            <CodeBlock
              code="uv tool install git+https://github.com/microsoft/amplifier"
              className="max-w-2xl mx-auto"
            />
          </div>

        </div>
      </section>

      {/* ============================================================
          THE THREE NEEDS
          ============================================================ */}

      <section
        data-section="three-needs"
        data-theme="dark"
        className="section-dark"
        style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="container-default text-center">
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-4">
            The Three Needs
          </p>
          <h2
            className="reveal text-display text-white font-heading max-w-4xl mx-auto"
            style={{ transitionDelay: '0.05s' }}
          >
            You need three things<br />from your AI&nbsp;framework.
          </h2>
        </div>
      </section>

      {/* -- Need #01: Composability -- */}
      <section
        data-section="need-composability"
        data-theme="light"
        className="section-light-glow"
        style={{ paddingTop: '4rem', paddingBottom: '3rem' }}
      >
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span
                className="text-display font-heading font-bold block"
                style={{
                  color: 'rgba(91,77,227,0.07)',
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  lineHeight: '1',
                }}
              >
                01
              </span>
              <h3 className="text-title text-ink font-heading mt-2">
                Composability
              </h3>
              <p className="text-body text-ink-slate mt-4">
                Need a different provider? Different context management?
                A different orchestration loop? No problem.
              </p>
              <div
                className="px-4 py-3 rounded-lg mt-4"
                style={{
                  background: 'rgba(91,77,227,0.04)',
                  border: '1px solid rgba(91,77,227,0.10)',
                }}
              >
                <p className="text-micro font-medium text-signal tracking-wide uppercase mb-1">
                  With Amplifier
                </p>
                <p className="text-caption text-ink-slate">
                  Modules let you easily swap out or plug in new functionality.
                  Every capability is a module &mdash; change one line, keep everything else.
                </p>
              </div>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <p className="text-caption text-ink-fog mb-3">
                Your entire module stack &mdash; each one swappable
              </p>
              <CodeBlock
                code={`providers:
  - module: provider-anthropic        # or provider-openai
    config: { model: claude-sonnet-4-5 }

orchestrators:
  - module: orchestrator-streaming    # or orchestrator-batch

tools:
  - module: tool-filesystem
  - module: tool-bash
  - module: tool-web-search

context:
  - module: context-persistent        # or context-simple

hooks:
  - module: hooks-approval            # mix and match
  - module: hooks-redaction`}
                className="max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div style={{ height: '1px', background: 'var(--canvas-mist)' }} />
      </div>

      {/* -- Need #02: Control -- */}
      <section
        data-section="need-control"
        data-theme="light"
        className="section-light-glow"
        style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span
                className="text-display font-heading font-bold block"
                style={{
                  color: 'rgba(91,77,227,0.07)',
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  lineHeight: '1',
                }}
              >
                02
              </span>
              <h3 className="text-title text-ink font-heading mt-2">
                Control
              </h3>
              <p className="text-body text-ink-slate mt-4">
                The agent loop and memory strategy are the most important behaviors
                in your system. They shouldn&apos;t be sealed infrastructure you
                can observe but never change.
              </p>
              <div
                className="px-4 py-3 rounded-lg mt-4"
                style={{
                  background: 'rgba(91,77,227,0.04)',
                  border: '1px solid rgba(91,77,227,0.10)',
                }}
              >
                <p className="text-micro font-medium text-signal tracking-wide uppercase mb-1">
                  With Amplifier
                </p>
                <p className="text-caption text-ink-slate">
                  Customize the model per agent and run simultaneously.
                  Inject context exactly where you need it. Get specific
                  on the details that optimize your agent behaviors.
                </p>
              </div>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <p className="text-caption text-ink-fog mb-3">
                A hook that teaches the agent conventions
              </p>
              <CodeBlock
                code={`async def __call__(self, event, data):
    if event != "tool_call":
        return HookResult(action="continue")

    command = data.get("input", {}).get("command", "")
    if not command.startswith("git commit"):
        return HookResult(action="continue")

    # Don't block — teach. The agent self-corrects.
    if not follows_convention(command):
        return HookResult(
            action="inject_context",
            context="Use conventional commits: "
                    "feat|fix|docs|refactor: description"
        )

    return HookResult(action="continue")`}
                className="max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div style={{ height: '1px', background: 'var(--canvas-mist)' }} />
      </div>

      {/* -- Need #03: Shareability -- */}
      <section
        data-section="need-shareability"
        data-theme="light"
        className="section-light-glow"
        style={{ paddingTop: '3rem', paddingBottom: '6rem' }}
      >
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span
                className="text-display font-heading font-bold block"
                style={{
                  color: 'rgba(91,77,227,0.07)',
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  lineHeight: '1',
                }}
              >
                03
              </span>
              <h3 className="text-title text-ink font-heading mt-2">
                Shareability
              </h3>
              <p className="text-body text-ink-slate mt-4">
                Your teammate wants your setup with a few changes.
                Today that means copying config and keeping two versions in sync.
              </p>
              <div
                className="px-4 py-3 rounded-lg mt-4"
                style={{
                  background: 'rgba(91,77,227,0.04)',
                  border: '1px solid rgba(91,77,227,0.10)',
                }}
              >
                <p className="text-micro font-medium text-signal tracking-wide uppercase mb-1">
                  With Amplifier
                </p>
                <p className="text-caption text-ink-slate">
                  Share your work and they can easily customize it.
                  Your teammate starts from your setup and changes only what&apos;s different.
                </p>
              </div>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <p className="text-caption text-ink-fog mb-3">
                Your teammate extends your setup
              </p>
              <CodeBlock
                code={`includes:
  - my-team-platform             # everything inherited

providers:
  - module: provider-openai      # swapped one provider
    config: { model: gpt-4o }

tools:
  - module: tool-browser-test    # added one tool

# Everything else stays exactly the same`}
                className="max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE ARCHITECTURE
          ============================================================ */}

      <section
        data-section="architecture"
        data-theme="dark"
        className="section-dark"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="container-wide">

          {/* Intro text */}
          <div className="text-center mb-12">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
              The Architecture
            </p>
            <h2
              className="reveal text-display text-white font-heading"
              style={{ transitionDelay: '0.05s' }}
            >
              A kernel at the core.
            </h2>
            <p
              className="reveal mt-6 text-body-large max-w-2xl mx-auto"
              style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}
            >
              2,600 lines of Python. The kernel provides mechanisms &mdash;
              the capabilities that every AI application needs &mdash; but
              makes zero decisions about how you use them.
            </p>
          </div>

          {/* Kernel visual */}
          <div className="reveal max-w-2xl mx-auto">
            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(133,120,240,0.12) 0%, rgba(91,77,227,0.06) 100%)',
                border: '1px solid rgba(133,120,240,0.35)',
                boxShadow: '0 0 80px rgba(133,120,240,0.15), 0 0 160px rgba(91,77,227,0.06)',
              }}
            >
              <div className="text-center mb-8">
                <p
                  className="text-heading font-heading font-semibold mb-1"
                  style={{ color: '#c4bdf8' }}
                >
                  Kernel
                </p>
                <p className="text-caption font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  ~2,600 lines of Python
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { name: 'Session Lifecycle', desc: 'Create, execute, and clean up agent sessions. Fork child sessions for sub-agents.' },
                  { name: 'Module Loading', desc: 'Load and unload any module at runtime. The kernel never knows what it\'s loading.' },
                  { name: 'Event Dispatch', desc: 'If it\'s important, emit an event. Single JSONL log as the source of truth.' },
                  { name: 'Protocol Enforcement', desc: 'Contracts ensure every module is interchangeable. Implement the interface, plug it in.' },
                ].map((mech, i) => (
                  <div key={i}>
                    <h4
                      className="text-caption font-heading font-medium mb-1"
                      style={{ color: '#c4bdf8' }}
                    >
                      {mech.name}
                    </h4>
                    <p className="text-caption" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {mech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design principle */}
          <div className="reveal text-center mt-12">
            <blockquote className="text-subheading text-white font-heading italic max-w-2xl mx-auto">
              &ldquo;Could two teams want different behavior?<br />
              Then it&apos;s a module, not the kernel.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Five module types */}
      <section
        data-section="modules"
        data-theme="light"
        className="section-feature section-light-glow"
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="reveal text-headline text-ink font-heading">
              Five module types. Each one replaceable.
            </h2>
            <p
              className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto"
              style={{ transitionDelay: '0.1s' }}
            >
              Implement the Protocol contract. The kernel treats your module
              identically to any official one.
            </p>
          </div>
          <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              {
                name: 'Provider',
                icon: 'P',
                contract: 'complete(req) \u2192 res',
                desc: 'Which LLM answers. Swap without rewriting.',
              },
              {
                name: 'Orchestrator',
                icon: 'O',
                contract: 'execute(prompt, ...)',
                desc: 'How the loop runs. Replace the loop itself.',
              },
              {
                name: 'Tool',
                icon: 'T',
                contract: 'execute(input) \u2192 result',
                desc: 'What the agent can do. Write your own.',
              },
              {
                name: 'Hook',
                icon: 'H',
                contract: '(event, data) \u2192 HookResult',
                desc: 'Block, modify, inject context, ask for approval.',
              },
              {
                name: 'Context',
                icon: 'C',
                contract: 'add/get/set_messages',
                desc: 'How memory works. Swap strategies.',
              },
            ].map((mod, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-canvas-mist bg-canvas text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(91,77,227,0.1)' }}
                >
                  <span className="text-signal font-heading font-bold text-body">
                    {mod.icon}
                  </span>
                </div>
                <h3 className="text-subheading text-ink font-heading mb-1">
                  {mod.name}
                </h3>
                <code
                  className="text-micro px-2 py-0.5 rounded"
                  style={{ color: '#4338B8', background: 'rgba(91,77,227,0.06)' }}
                >
                  {mod.contract}
                </code>
                <p className="text-caption text-ink-slate mt-3">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          THREE STAGES
          ============================================================ */}

      {/* Stages intro */}
      <section
        data-section="stages-intro"
        data-theme="dark"
        className="section-dark"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="container-narrow text-center">
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
            The Experimental Layer
          </p>
          <h2
            className="reveal text-display text-white font-heading"
            style={{ transitionDelay: '0.05s' }}
          >
            Understand it. Use it.<br />Make it yours.
          </h2>
        </div>
      </section>

      {/* -- Stage 1: Understand -- */}
      <section
        data-section="stage-understand"
        data-theme="light"
        className="section-light-glow"
        style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <div className="container-default">
          <div className="reveal mb-10">
            <span
              className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4"
              style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}
            >
              Stage 1
            </span>
            <h2 className="text-headline text-ink font-heading">Understand it</h2>
          </div>

          {/* Three link cards */}
          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl">
            <a
              href="https://github.com/microsoft/amplifier-core/tree/main/amplifier_core"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Read the kernel
              </h4>
              <p className="text-body text-ink-slate">
                ~2,600 lines of Python. No magic, no abstraction layers.
                Small enough to hold in your head.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                amplifier_core/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href="https://github.com/microsoft/amplifier-core/tree/main/docs/contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Inspect the contracts
              </h4>
              <p className="text-body text-ink-slate">
                Each module type has a Protocol interface.
                Short, documented, public. This is the entire API surface.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                docs/contracts/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href="https://github.com/microsoft/amplifier/tree/main/amplifier"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Go under the hood
              </h4>
              <p className="text-body text-ink-slate">
                The Amplifier CLI is a reference implementation. See how modules load,
                sessions are created, and the orchestrator drives everything.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Reference Implementation
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Protocol code sample */}
          <div className="reveal max-w-5xl mt-12">
            <p className="text-caption text-ink-fog mb-3">
              The Provider contract &mdash; implement three things
            </p>
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

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div style={{ height: '1px', background: 'var(--canvas-mist)' }} />
      </div>

      {/* -- Stage 2: Use it -- */}
      <section
        data-section="stage-use"
        data-theme="light"
        className="section-gradient-flow"
        style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <div className="container-default">
          <div className="reveal mb-10">
            <span
              className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4"
              style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}
            >
              Stage 2
            </span>
            <h2 className="text-headline text-ink font-heading">Use it</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Experiment with modules. See what changes when you swap one,
              add one, or teach one something new. Use the event log to trace every step.
            </p>
          </div>

          {/* Three experiment cards */}
          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl">
            <a
              href="https://github.com/microsoft/amplifier-core/blob/main/docs/HOOKS_API.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Inject a hook
              </h4>
              <p className="text-body text-ink-slate">
                Control the conversation. Five hook actions let you block, modify,
                inject context, or request approval &mdash; without touching the orchestrator.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Hooks API
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href="https://github.com/microsoft/amplifier-core/blob/main/docs/contracts/PROVIDER_CONTRACT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Swap a provider
              </h4>
              <p className="text-body text-ink-slate">
                Change one YAML line. See agents running on different models simultaneously.
                Same tools, same context, different intelligence.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Provider contract
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href="https://github.com/microsoft/amplifier-core/blob/main/docs/contracts/ORCHESTRATOR_CONTRACT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(91,77,227,0.1)' }}
              >
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">
                Replace the loop
              </h4>
              <p className="text-body text-ink-slate">
                The orchestrator IS the agent behavior. Same tools, same hooks,
                completely different execution pattern.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Orchestrator contract
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div style={{ height: '1px', background: 'var(--canvas-mist)' }} />
      </div>

      {/* -- Stage 3: Make it yours -- */}
      <section
        data-section="stage-own"
        data-theme="light"
        className="section-light-glow"
        style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <div className="container-default">
          <div className="reveal mb-10">
            <span
              className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4"
              style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}
            >
              Stage 3
            </span>
            <h2 className="text-headline text-ink font-heading">Make it yours</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Build your own application with exactly the modules you need.
              Automate your workflows. Share with your team.
            </p>
          </div>

          <div className="reveal max-w-5xl grid md:grid-cols-2 gap-8">
            {/* Build your app */}
            <div>
              <h3 className="text-subheading text-ink font-heading mb-2">
                Build your app
              </h3>
              <p className="text-body text-ink-slate mb-4">
                Use the kernel as a dependency. Choose your modules.
                Wire them together with a few lines of Python.
              </p>
              <CodeBlock
                code={`from amplifier_core import AmplifierSession

session = AmplifierSession(
    providers=[MyProvider()],
    orchestrator=MyOrchestrator(),
    tools=[filesystem, bash, web_search],
    hooks=[approval, redaction],
    context=PersistentContext(),
)

result = await session.run(
    "Build the auth module"
)`}
                className="max-w-xl"
              />
            </div>

            {/* Automate with recipes */}
            <div>
              <h3 className="text-subheading text-ink font-heading mb-2">
                Automate with recipes
              </h3>
              <p className="text-body text-ink-slate mb-4">
                Declarative multi-step workflows with approval gates,
                context accumulation, and resumability.
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
        prompt: "Synthesize findings"`}
                className="max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}

      <section
        data-section="dev-cta"
        data-theme="dark"
        className="section-dark"
        style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
      >
        <div className="container-default text-center">
          <div className="reveal">
            <h2 className="text-headline text-white font-heading mb-4">
              Try a reference implementation. The Amplifier CLI.
            </h2>
            <p
              className="text-body-large mb-8"
              style={{ color: 'var(--text-on-dark-secondary)' }}
            >
              Run this in your terminal
            </p>
            <div className="py-4">
              <CodeBlock
                code="uv tool install git+https://github.com/microsoft/amplifier"
                className="max-w-2xl mx-auto"
              />
            </div>
            <div className="mt-10">
              <a
                href="https://github.com/microsoft/amplifier"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-apple"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
