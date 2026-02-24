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
          SLIDE 1: THE PROBLEM
          ============================================================ */}

      {/* HERO: Name the pain */}
      <section data-section="dev-hero" data-theme="dark" className="section-feature section-dark relative overflow-hidden">
        <div className="container-default text-center relative z-10">
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-6">
            For developers building with AI
          </p>
          <h1 className="reveal text-display-xl text-white font-heading px-2" style={{ transitionDelay: '0.1s' }}>
            Your framework<br />assumes too much.
          </h1>
          <p className="reveal mt-6 md:mt-8 text-body-large max-w-2xl mx-auto px-4" style={{ transitionDelay: '0.2s', color: 'var(--text-on-dark-secondary)' }}>
            You picked an AI framework. It got you to a demo fast.
            Then you hit the parts that aren&apos;t yours to change.
          </p>
          <div className="reveal mt-10" style={{ transitionDelay: '0.3s' }}>
            <svg className="w-6 h-6 mx-auto animate-bounce" style={{ color: 'var(--text-on-dark-tertiary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ALL 5 PROBLEMS: Compact cards with hover/click expand */}
      <section data-section="problems" data-theme="light" className="section-feature section-light-glow" style={{ minHeight: 'auto', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="reveal text-eyebrow text-signal tracking-widest uppercase mb-4">Sound familiar?</p>
            <h2 className="reveal text-headline text-ink font-heading max-w-3xl mx-auto" style={{ transitionDelay: '0.05s' }}>
              If you&apos;ve built with AI frameworks, you&apos;ve hit these walls.
            </h2>
          </div>

          {/* Top row: 3 cards */}
          <div className="reveal-stagger grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'The provider isn\u2019t yours.',
                summary: 'Your framework owns the model abstraction. Bringing a custom endpoint means workarounds.',
                expanded: 'Most frameworks let you configure which model to call. But the framework owns how it calls the model, parses responses, and handles errors. You can\u2019t bring your own fine-tuned endpoint, a self-hosted model, or a provider the SDK doesn\u2019t know about without working around the abstraction. When the best model for your use case changes \u2014 and it does, quarterly \u2014 you\u2019re constrained by what the framework supports, not what\u2019s possible.',
                answer: 'In Amplifier, the provider is a module you own. Implement the Protocol and it\u2019s a first-class citizen \u2014 alongside any official provider, running simultaneously.',
              },
              {
                num: '02',
                title: 'The agent loop isn\u2019t yours to change.',
                summary: 'The loop is where decisions happen. You can configure it, but not replace it.',
                expanded: 'Your framework gives you an agent loop: prompt the model, get tool calls, execute them, feed results back. It works until it doesn\u2019t. Maybe you need the agent to pause for human approval before a destructive action. Maybe you need it to consult a second model for verification. Maybe you need a fundamentally different execution pattern. Some frameworks ship the loop as a closed binary (55\u201373MB) you can\u2019t inspect. Others expose it as source you can read and configure, but the core loop logic is fixed. You can tune it, but you can\u2019t replace it with your own.',
                answer: 'In Amplifier, the orchestrator is a replaceable module. Same tools, same hooks, same providers \u2014 completely different execution behavior.',
              },
              {
                num: '03',
                title: 'You can observe, but not control.',
                summary: 'Callbacks let you see what\u2019s happening. They don\u2019t let you change it.',
                expanded: 'You want rules: \u201cbefore any file write, check with the user.\u201d Or: \u201credact API keys from logs.\u201d Or: \u201cinject linting errors back into the conversation so the agent fixes them proactively.\u201d Most frameworks give you callbacks \u2014 before_tool, after_tool \u2014 that observe. You can log that a dangerous tool call is about to happen. But the gap between seeing an event and being able to block it, reroute it, or feed information back into the agent\u2019s reasoning is the gap between monitoring and a control plane.',
                answer: 'Amplifier hooks are a control plane with five actions: continue, deny, ask_user, modify, and inject_context. Multiple hooks compose with deterministic precedence.',
              },
            ].map((pain, i) => (
              <details key={i} className="group rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift transition-all duration-300">
                <summary className="p-6 cursor-pointer list-none select-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-micro font-medium text-signal">{pain.num}</span>
                      <h3 className="text-subheading text-ink font-heading mt-2 mb-2">{pain.title}</h3>
                      <p className="text-body text-ink-slate">{pain.summary}</p>
                    </div>
                    <svg className="w-5 h-5 text-ink-fog flex-shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-canvas-mist">
                    <p className="text-body text-ink-slate">{pain.expanded}</p>
                    <p className="text-caption text-signal-dark mt-4 font-medium">{pain.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Bottom row: 2 cards */}
          <div className="reveal-stagger grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mt-5">
            {[
              {
                num: '04',
                title: 'Your workflow disappears when the session ends.',
                summary: 'You got the agent working perfectly. Tomorrow you re-explain the whole thing.',
                expanded: 'You spent 45 minutes getting an agent to review your code exactly the way you want: security first, then style, then performance, pause for approval before writing a summary. It worked. Tomorrow you need to do it again for a different PR. You re-explain from scratch. There\u2019s no way to capture that workflow as a repeatable, version-controlled artifact. No way to hand it to a teammate and say \u201crun this.\u201d No way to add an approval gate that pauses the workflow and waits for a human decision before continuing.',
                answer: 'Amplifier recipes are declarative YAML workflows with stages, approval gates, context accumulation, foreach/while loops, conditional execution, and automatic checkpointing for resumability.',
              },
              {
                num: '05',
                title: 'Your setup doesn\u2019t compose.',
                summary: 'Your teammate wants your config with one change. That means maintaining two copies.',
                expanded: 'You figured out a great setup: the right model, the right tools, the right system prompt, a custom hook that enforces your team\u2019s commit standards. Your teammate wants the same thing but with a different model and an extra tool for their frontend work. That means: copy the config, manually edit it, keep two copies in sync forever. There\u2019s no inheritance, no override semantics, no way to say \u201cstart from this setup, swap the provider, add this tool.\u201d Software engineering solved this decades ago with package managers and imports. AI tooling hasn\u2019t caught up.',
                answer: 'Amplifier bundles are composable packages that inherit, override, and share. The thin bundle pattern means most setups are ~14 lines of YAML that inherit everything else.',
              },
            ].map((pain, i) => (
              <details key={i} className="group rounded-2xl border border-canvas-mist bg-canvas hover:shadow-lift transition-all duration-300">
                <summary className="p-6 cursor-pointer list-none select-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-micro font-medium text-signal">{pain.num}</span>
                      <h3 className="text-subheading text-ink font-heading mt-2 mb-2">{pain.title}</h3>
                      <p className="text-body text-ink-slate">{pain.summary}</p>
                    </div>
                    <svg className="w-5 h-5 text-ink-fog flex-shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-canvas-mist">
                    <p className="text-body text-ink-slate">{pain.expanded}</p>
                    <p className="text-caption text-signal-dark mt-4 font-medium">{pain.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSITION */}
      <section data-section="transition" data-theme="dark" className="section-dark" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-narrow text-center">
          <h2 className="reveal text-display text-white font-heading">
            What if the architecture<br />made none of those<br />decisions for you?
          </h2>
        </div>
      </section>

      {/* ============================================================
          SLIDE 2: THE ARCHITECTURE
          ============================================================ */}

      {/* Architecture intro */}
      <section data-section="arch-intro" data-theme="light" className="section-feature section-light-glow">
        <div className="container-default text-center">
          <p className="reveal text-eyebrow text-signal tracking-widest uppercase mb-6">
            How Amplifier is different
          </p>
          <h2 className="reveal text-display text-ink font-heading" style={{ transitionDelay: '0.05s' }}>
            A kernel, not a framework.
          </h2>
          <p className="reveal mt-6 text-body-large text-ink-slate max-w-2xl mx-auto" style={{ transitionDelay: '0.1s' }}>
            2,600 lines of Python. It loads modules, manages sessions, dispatches events,
            and resolves hooks. It makes <strong>zero decisions</strong> about which model to use,
            how the agent loop works, what tools are available, or how memory is managed.
          </p>
          <p className="reveal mt-4 text-body-large text-ink max-w-2xl mx-auto" style={{ transitionDelay: '0.15s' }}>
            Those are all modules. You own every one of them.
          </p>
        </div>
      </section>

      {/* Architecture visual comparison */}
      <section data-section="arch-diagram" data-theme="light" className="section-feature section-stone">
        <div className="container-wide">
          <div className="reveal max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Vendor SDKs side */}
            <div className="p-8 rounded-2xl border border-canvas-mist bg-canvas">
              <p className="text-eyebrow text-ink-fog tracking-widest uppercase mb-6">Vendor SDKs</p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-canvas-stone text-center">
                  <span className="text-caption font-medium text-ink">Your App</span>
                </div>
                <div className="flex justify-center text-ink-fog">
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <span className="text-caption font-medium" style={{ color: '#b91c1c' }}>Vendor&apos;s Agent Loop</span>
                  <p className="text-micro mt-1" style={{ color: '#dc2626' }}>fixed or opaque</p>
                </div>
                <div className="flex justify-center text-ink-fog">
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <span className="text-caption font-medium" style={{ color: '#b91c1c' }}>Vendor&apos;s API</span>
                  <p className="text-micro mt-1" style={{ color: '#dc2626' }}>one vendor</p>
                </div>
              </div>
            </div>

            {/* Amplifier side */}
            <div className="p-8 rounded-2xl border bg-canvas" style={{ borderColor: 'rgba(91,77,227,0.2)', boxShadow: '0 0 40px rgba(91,77,227,0.06)' }}>
              <p className="text-eyebrow text-signal tracking-widest uppercase mb-6">Amplifier</p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-canvas-stone text-center">
                  <span className="text-caption font-medium text-ink">Your App</span>
                </div>
                <div className="flex justify-center text-ink-fog">
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(91,77,227,0.05)', border: '1px solid rgba(91,77,227,0.2)' }}>
                  <span className="text-caption font-medium text-signal-dark">Kernel</span>
                  <p className="text-micro text-ink-fog mt-1">2,600 lines &middot; mechanisms only</p>
                </div>
                <div className="flex justify-center text-ink-fog">
                  <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none"><path d="M8 0v20M8 20l-3-3M8 20l3-3" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Orchestrator', note: 'replaceable' },
                    { name: 'Provider(s)', note: 'any, multiple' },
                    { name: 'Tools', note: 'composable' },
                    { name: 'Hooks', note: 'control plane' },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-lg text-center" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <span className="text-micro font-medium" style={{ color: '#15803d' }}>{m.name}</span>
                      <p className="text-micro" style={{ color: '#16a34a' }}>{m.note}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg text-center" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="text-micro font-medium" style={{ color: '#15803d' }}>Context</span>
                  <p className="text-micro" style={{ color: '#16a34a' }}>replaceable</p>
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
      <section data-section="understand" data-theme="light" className="section-feature section-light-glow">
        <div className="container-default">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[35%] mb-8 lg:mb-0 lg:sticky lg:top-24">
              <div className="reveal">
                <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 1 &middot; ~1 hour</span>
                <h2 className="text-headline text-ink font-heading">Understand it</h2>
                <p className="mt-4 text-body-large text-ink-slate">
                  Read the kernel. Inspect the contracts. Trace a request through the system.
                </p>
              </div>
            </div>
            <div className="lg:flex-1">
              <div className="reveal">
                <p className="text-body text-ink-slate mb-4">
                  The entire Provider contract:
                </p>
                <CodeBlock
                  code={`class Provider(Protocol):
    @property
    def name(self) -> str: ...
    @property
    def model(self) -> str: ...
    async def complete(
        self, request: CompletionRequest
    ) -> CompletionResponse: ...`}
                  className="max-w-xl"
                />
                <p className="mt-6 text-body text-ink-slate">
                  Implement those three things and the kernel treats your module identically
                  to the official Anthropic or OpenAI providers. Every module type has a
                  similarly small contract.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 2: Use */}
      <section data-section="use" data-theme="light" className="section-feature section-gradient-flow" style={{ minHeight: 'auto', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[35%] mb-8 lg:mb-0 lg:sticky lg:top-24">
              <div className="reveal">
                <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 2 &middot; ~1 afternoon</span>
                <h2 className="text-headline text-ink font-heading">Use it</h2>
                <p className="mt-4 text-body-large text-ink-slate">
                  Compose a bundle. Run a recipe. See real results.
                </p>
              </div>
            </div>
            <div className="lg:flex-1 space-y-10">
              <div className="reveal">
                <h3 className="text-subheading text-ink font-heading mb-3">Compose a bundle</h3>
                <CodeBlock
                  code={`bundle:
  name: my-dev-setup
  version: 0.1.0

includes:
  - foundation      # base tools
  - recipes          # workflow engine
  - python-dev       # code intelligence

providers:
  - module: provider-anthropic
    config:
      model: claude-sonnet-4-20250514

hooks:
  - module: hooks-approval    # ask before destructive ops
  - module: hooks-redaction   # strip secrets from logs`}
                  className="max-w-xl"
                />
                <p className="mt-4 text-body text-ink-slate">
                  A complete, functional setup in 14 lines. Remove <code style={{ color: '#4338B8', background: 'rgba(91,77,227,0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.875rem' }}>python-dev</code>,
                  add a database tool &mdash; it&apos;s a different system from the same kernel.
                </p>
              </div>
              <div className="reveal">
                <h3 className="text-subheading text-ink font-heading mb-3">Run a recipe</h3>
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
    needs_approval: true   # pauses for human decision

  report:
    steps:
      - agent: technical-writer
        prompt: "Synthesize findings into a report"`}
                  className="max-w-xl"
                />
                <p className="mt-4 text-body text-ink-slate">
                  A repeatable, version-controlled AI workflow with approval gates.
                  Not a chat session you re-explain every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3: Extend */}
      <section data-section="extend" data-theme="light" className="section-feature section-light-glow" style={{ minHeight: 'auto', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-default">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[35%] mb-8 lg:mb-0 lg:sticky lg:top-24">
              <div className="reveal">
                <span className="inline-block px-3 py-1 rounded-full text-micro font-medium mb-4" style={{ background: 'rgba(91,77,227,0.1)', color: '#5B4DE3' }}>Stage 3 &middot; ~1 day</span>
                <h2 className="text-headline text-ink font-heading">Make it yours</h2>
                <p className="mt-4 text-body-large text-ink-slate">
                  Write a hook. Create a tool. Replace the orchestrator.
                  Your modules are first-class citizens.
                </p>
              </div>
            </div>
            <div className="lg:flex-1 space-y-10">
              <div className="reveal">
                <h3 className="text-subheading text-ink font-heading mb-3">Write a custom hook</h3>
                <CodeBlock
                  code={`class CommitConventionHook:
    name = "hooks-commit-convention"

    async def __call__(self, event, data):
        if event != "tool_call":
            return HookResult(action="continue")

        command = data.get("input", {}).get("command", "")
        if not command.startswith("git commit"):
            return HookResult(action="continue")

        if not follows_convention(command):
            return HookResult(
                action="inject_context",
                context="Use conventional commits: "
                        "feat|fix|docs: description"
            )
        return HookResult(action="continue")`}
                  className="max-w-xl"
                />
                <p className="mt-4 text-body text-ink-slate">
                  This hook doesn&apos;t just observe &mdash; it <strong>injects context</strong> back
                  into the agent&apos;s reasoning. The agent reformats the commit and tries again.
                  ~30 lines that compose with everything else.
                </p>
              </div>
              <div className="reveal">
                <h3 className="text-subheading text-ink font-heading mb-3">Package it for your team</h3>
                <CodeBlock
                  code={`bundle:
  name: my-team-platform
  version: 1.0.0

includes:
  - foundation
  - recipes
  - python-dev

tools:
  - module: ./modules/internal-docs

hooks:
  - module: ./modules/commit-convention
  - module: hooks-redaction

behaviors:
  - ./behaviors/team-standards.yaml`}
                  className="max-w-xl"
                />
                <p className="mt-4 text-body text-ink-slate">
                  Your teammate clones this. They get your tools, hooks, and standards.
                  They add their own. Override the provider. The bundle composes &mdash;
                  it doesn&apos;t copy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section data-section="dev-cta" data-theme="dark" className="section-feature section-dark">
        <div className="container-narrow text-center">
          <h2 className="reveal text-display text-white font-heading">
            Read the kernel.<br />It&apos;ll take an afternoon.
          </h2>
          <p className="reveal mt-6 text-body-large max-w-xl mx-auto" style={{ transitionDelay: '0.1s', color: 'var(--text-on-dark-secondary)' }}>
            The module contracts are public. Implement your own in an hour.
            The bundle system is declarative. Compose your first setup in minutes.
          </p>
          <div className="reveal mt-10 flex flex-col sm:flex-row gap-4 justify-center" style={{ transitionDelay: '0.2s' }}>
            <a href="https://github.com/microsoft/amplifier" className="btn-apple">
              View on GitHub
            </a>
            <a href="/learn" className="btn-apple-secondary">
              Learn Amplifier
            </a>
          </div>
          <div className="reveal mt-8" style={{ transitionDelay: '0.3s' }}>
            <CodeBlock code="uv tool install git+https://github.com/microsoft/amplifier" className="max-w-lg mx-auto" />
          </div>
        </div>
      </section>

    </div>
  )
}
