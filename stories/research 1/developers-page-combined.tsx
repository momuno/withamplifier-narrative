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
          SLIDE 1: THREE NEEDS
          ============================================================ */}

      <section data-section="three-needs" data-theme="dark" className="section-dark" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
        <div className="container-default">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-4">The three needs</p>
            <h2 className="reveal text-display text-white font-heading max-w-4xl mx-auto" style={{ transitionDelay: '0.05s' }}>
              You need three things<br />from your AI&nbsp;framework.
            </h2>
            <p className="reveal mt-6 text-body-large max-w-2xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
              You picked a framework. It got you to a demo fast. Then the model landscape shifted,
              or you needed production-grade behavior, or your teammate asked how to reuse your setup.
            </p>
          </div>
        </div>
      </section>

      {/* ── Need 1: Portability ── */}
      <section data-section="need-portability" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>01</span>
              <h3 className="text-title text-ink font-heading mt-2">
                Portability
              </h3>
              <p className="text-subheading text-ink font-heading mt-1" style={{ fontStyle: 'italic' }}>
                The model you chose isn&apos;t the model you need.
              </p>
              <p className="text-body-large text-ink-slate mt-4">
                You built on one SDK. A different model turned out to be better for your use case.
                The model landscape shifts quarterly. Switching means rewriting your agent logic,
                your tool interfaces, your error handling &mdash; not because the problem changed,
                but because the framework assumed your provider was permanent.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  Providers are modules. Five methods. Switch by changing one YAML line.
                  Run multiple simultaneously. Your tools, hooks, and orchestrator never know
                  which model is answering &mdash; because the kernel has zero vendor code.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-caption text-ink-fog mb-3">Switch provider: change one line</p>
                <CodeBlock
                  code={`providers:
  - module: provider-anthropic       # swap to provider-openai
    config:
      model: claude-sonnet-4-5       # swap to gpt-4o

# Or run both simultaneously
providers:
  - module: provider-anthropic
    config: { model: claude-sonnet-4-5 }
  - module: provider-openai
    config: { model: gpt-4o }`}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* ── Need 2: Control ── */}
      <section data-section="need-control" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>02</span>
              <h3 className="text-title text-ink font-heading mt-2">
                Control
              </h3>
              <p className="text-subheading text-ink font-heading mt-1" style={{ fontStyle: 'italic' }}>
                You can see what&apos;s happening. You can&apos;t change it.
              </p>
              <p className="text-body-large text-ink-slate mt-4">
                Your framework gives you an agent loop that works &mdash; until you need the agent to
                pause for human approval, consult a second model for verification, or handle long
                conversations differently than silent truncation. The two most important behaviors &mdash;
                how the agent reasons and what it remembers &mdash; are the ones you need to own.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  The agent loop is a module. Memory is a module. Hooks are a control plane with
                  five actions: <strong>continue</strong>, <strong>deny</strong>, <strong>modify</strong>,{' '}
                  <strong>inject_context</strong>, <strong>ask_user</strong>.
                </p>
                <p className="text-body text-ink mt-2">
                  <code className="text-micro px-2 py-0.5 rounded" style={{ color: '#4338B8', background: 'rgba(91,77,227,0.06)' }}>inject_context</code>{' '}
                  means hooks participate in the agent&apos;s <em>reasoning</em>, not just the logging.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-caption text-ink-fog mb-3">A hook that teaches &mdash; not by blocking, but by injecting context</p>
                <CodeBlock
                  code={`async def commit_convention_hook(event, data):
    if event != "tool:pre" or data.get("tool_name") != "bash":
        return HookResult(action="continue")

    command = data.get("tool_input", {}).get("command", "")
    if not command.startswith("git commit"):
        return HookResult(action="continue")

    if not re.match(r'git commit -m ["\\\\']?(feat|fix|docs)', command):
        return HookResult(
            action="inject_context",
            context_injection="Commit messages must follow "
                "conventional format: feat|fix|docs|refactor: description",
        )

    return HookResult(action="continue")`}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6"><div style={{ height: '1px', background: 'var(--canvas-mist)' }} /></div>

      {/* ── Need 3: Composability ── */}
      <section data-section="need-composability" data-theme="light" className="section-light-glow" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="container-wide">
          <div className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-[45%]">
              <span className="text-display font-heading font-bold" style={{ color: 'rgba(91,77,227,0.12)', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: '1' }}>03</span>
              <h3 className="text-title text-ink font-heading mt-2">
                Composability
              </h3>
              <p className="text-subheading text-ink font-heading mt-1" style={{ fontStyle: 'italic' }}>
                What you build doesn&apos;t travel.
              </p>
              <p className="text-body-large text-ink-slate mt-4">
                You built a great setup: the right model, the right tools, a custom hook that
                enforces your team&apos;s standards. Your teammate wants the same but with a different
                model and an extra tool.
              </p>
              <p className="text-body text-ink-slate mt-3">
                How do you share it? Copy the config. Manually edit it. Keep two copies in sync.
                No inheritance. No override semantics. Software engineering solved this with
                package managers decades ago. AI development tooling hasn&apos;t caught up.
              </p>
            </div>
            <div className="md:w-[55%] md:pt-16">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(91,77,227,0.04)', border: '1px solid rgba(91,77,227,0.12)' }}>
                <p className="text-eyebrow text-signal tracking-widest uppercase mb-3">With Amplifier</p>
                <p className="text-body-large text-ink">
                  Bundles compose modules with algebraic merge rules. Inherit, override, extend.
                  Your teammate takes your bundle, swaps the provider, adds a tool &mdash;
                  no duplication.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-caption text-ink-fog mb-3">Bundle inheritance: composition, not configuration</p>
                <CodeBlock
                  code={`# Your team's bundle: 14 lines, a complete system
bundle:
  name: my-team-platform
  version: 1.0.0

includes:
  - foundation         # 30+ agents, 7 tools, streaming UI
  - python-dev         # linting, type-checking, LSP

providers:
  - module: provider-anthropic
    config: { model: claude-sonnet-4-5 }

hooks:
  - module: hooks-approval`}
                  className="max-w-xl"
                />
                <div className="mt-4">
                  <p className="text-caption text-ink-fog mb-3">Your teammate extends it &mdash; three lines changed</p>
                  <CodeBlock
                    code={`includes:
  - my-team-platform             # everything inherited

providers:
  - module: provider-openai      # swapped
    config: { model: gpt-4o }

tools:
  - module: tool-browser-test    # added`}
                    className="max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SLIDE 2: THE ARCHITECTURE
          ============================================================ */}

      {/* Architecture intro + diagram */}
      <section data-section="architecture" data-theme="dark" className="section-dark" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container-wide">

          {/* Intro text */}
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
              The architecture
            </p>
            <h2 className="reveal text-display text-white font-heading" style={{ transitionDelay: '0.05s' }}>
              A kernel that provides mechanisms.<br />Everything else is a module you own.
            </h2>
            <p className="reveal mt-6 text-body-large max-w-2xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
              2,600 lines of Python. Zero decisions about models, loops, tools, or memory.
              The kernel loads modules, manages sessions, dispatches events, and resolves hook precedence.
              That&apos;s it.
            </p>
          </div>

          {/* Design principle */}
          <div className="reveal text-center mb-16">
            <blockquote className="text-subheading text-white font-heading italic max-w-2xl mx-auto">
              &ldquo;Could two teams want different behavior?<br />Then it&apos;s a module, not the kernel.&rdquo;
            </blockquote>
          </div>

          {/* Architecture diagram */}
          <div className="reveal max-w-md mx-auto">
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
              { name: 'Provider', icon: 'P', contract: 'complete(req) \u2192 res', desc: 'Which LLM answers. Five methods. Swap without rewriting. Run multiple simultaneously.' },
              { name: 'Orchestrator', icon: 'O', contract: 'execute(prompt, ...)', desc: 'How the loop runs. The only system where you replace the loop itself.' },
              { name: 'Tool', icon: 'T', contract: 'execute(input) \u2192 result', desc: 'What the agent can do. Add, remove, or write your own.' },
              { name: 'Hook', icon: 'H', contract: '(event, data) \u2192 HookResult', desc: 'Control plane: block, modify, inject context, or ask for approval.' },
              { name: 'Context', icon: 'C', contract: 'add/get/set_messages', desc: 'How memory works. Five methods. Swap strategies like databases.' },
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
        </div>
      </section>

      {/* ============================================================
          SLIDE 3: THREE STAGES
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

      {/* ── Stage 1: Understand ── */}
      <section data-section="stage-understand" data-theme="light" className="section-light-glow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 1</span>
            <h2 className="text-headline text-ink font-heading">Understand it</h2>
          </div>

          {/* Three link cards */}
          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl">
            <a href="https://github.com/microsoft/amplifier-core/tree/main/amplifier_core" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Read the kernel</h4>
              <p className="text-body text-ink-slate">
                The entire kernel is ~2,600 lines of Python. No magic, no metaprogramming.
                Small enough to hold in your head.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                amplifier_core/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
            <a href="https://github.com/microsoft/amplifier-core/tree/main/docs/contracts" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Inspect the contracts</h4>
              <p className="text-body text-ink-slate">
                Each module type has a Protocol &mdash; a stable interface that defines the contract
                between the kernel and the module. They&apos;re short, documented, and public.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                docs/contracts/
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
            <a href="https://github.com/microsoft/amplifier-core/blob/main/docs/DESIGN_PHILOSOPHY.md" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift hover:border-signal/20 transition-all duration-300 no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,77,227,0.1)' }}>
                <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-subheading text-ink font-heading mb-2 group-hover:text-signal transition-colors">Trace a request</h4>
              <p className="text-body text-ink-slate">
                Follow a prompt from input to output: Session &rarr; Orchestrator &rarr; Provider &rarr;
                Tools &rarr; Hooks &rarr; Context. Every step is a module boundary you can replace.
              </p>
              <span className="inline-flex items-center gap-1 text-caption text-signal mt-4 font-medium">
                Design Philosophy
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </a>
          </div>

          {/* Provider contract code sample */}
          <div className="reveal max-w-5xl mt-12">
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

      {/* ── Stage 2: Use it ── */}
      <section data-section="stage-use" data-theme="light" className="section-gradient-flow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 2</span>
            <h2 className="text-headline text-ink font-heading">Use it</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Experiment with individual modules. See what changes when you swap one,
              add one, or teach one something new.
            </p>
          </div>

          {/* Hook example */}
          <div className="reveal max-w-5xl">
            <h3 className="text-subheading text-ink font-heading mb-2">Inject context into the conversation</h3>
            <p className="text-body text-ink-slate mb-4">
              Hooks don&apos;t just observe &mdash; they feed information back into the agent&apos;s reasoning.
              A commit convention hook watches for <code className="text-micro px-1.5 py-0.5 rounded" style={{ color: '#4338B8', background: 'rgba(91,77,227,0.06)' }}>git commit</code> commands.
              When the format is wrong, it injects the convention into the conversation. The agent
              sees it, reformats, and retries. No blocking. No prompt engineering.
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
              Change what gets injected and you change the behavior. The orchestrator, the provider,
              the tools &mdash; none of them need to know. The hook is the control plane.
            </p>
          </div>

          {/* Three experiment link cards */}
          <div className="reveal grid md:grid-cols-3 gap-6 max-w-5xl mt-12">
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

      {/* ── Stage 3: Make it yours ── */}
      <section data-section="stage-own" data-theme="light" className="section-light-glow" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="reveal mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 3</span>
            <h2 className="text-headline text-ink font-heading">Make it yours</h2>
            <p className="mt-4 text-body-large text-ink-slate max-w-2xl">
              Pull your modules together into an app you own. Bundles package the pieces.
              Recipes automate the workflows.
            </p>
          </div>

          <div className="reveal max-w-5xl grid md:grid-cols-2 gap-8">
            {/* Bundle */}
            <div>
              <h3 className="text-subheading text-ink font-heading mb-2">Bundle your modules</h3>
              <p className="text-body text-ink-slate mb-4">
                A bundle assembles your providers, tools, hooks, and agents into a shareable,
                composable package. Declare what&apos;s yours. Inherit the rest.
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
                Recipes are declarative workflows &mdash; repeatable, version-controlled, shareable.
                Approval gates, context that accumulates across steps, and resumability after interruption.
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

          <div className="reveal max-w-5xl mt-8">
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
