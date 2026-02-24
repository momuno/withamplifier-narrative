# Content Strategy v2

Synthesis of learnings from site analyses: Stripe, Linear, Anthropic, Vercel, amplifier.dev.ai

**Last Updated:** 2026-01-19
**Status:** CRITICAL REVIEW COMPLETE - See SITE-REVIEW-2026-01-19.md

---

## Critical Issues Identified

**The site currently fails to answer basic questions:**

| Question | Current State | Required State |
|----------|---------------|----------------|
| What IS Amplifier? | Never explicitly stated | See "What Amplifier IS" section below |
| Who is it for? | Unclear | "Developers who want visibility and control over AI agents" |
| What can I build? | Vague examples | 3 specific real-world outcomes with proof |
| Why trust it? | No proof | Social proof, testimonials, real usage |
| How do I start? | pip install → then what? | Clear guided path |

**See full review:** `research/SITE-REVIEW-2026-01-19.md`

---

## What Amplifier IS (Critical Nuance)

**Amplifier is NOT a CLI.** It's a **modular kernel** for AI agents. The CLI is just one application built on the kernel.

### The Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ KERNEL (amplifier-core)                                         │
│ • Module loading          • Event system                        │
│ • Session lifecycle       • Coordinator                         │
│ • Minimal dependencies    • Stable contracts                    │
│                                                                 │
│ Philosophy: "Mechanism, not policy"                             │
│ The kernel provides capabilities. Modules decide behavior.      │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ protocols
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ MODULES (Swappable)                                             │
│ • Providers: LLM backends (Anthropic, OpenAI, Ollama)          │
│ • Tools: Capabilities (filesystem, bash, web)                   │
│ • Orchestrators: Execution loops                                │
│ • Hooks: Observability (logging, approval)                      │
└─────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ APPLICATIONS (Interfaces to the kernel)                         │
│ • CLI (terminal) ← what most people use today                   │
│ • Desktop (Electron GUI)                                        │
│ • Forge (coming - visual workspace)                             │
│ • Vision app, Voice app, Blog creator                           │
│ • YOUR APP (build whatever interface you want)                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Matters for Messaging

**Wrong:** "Amplifier is an open-source CLI for building AI agents"
**Right:** "Amplifier is an open-source kernel for AI agents. The CLI is one way to use it."

### Messaging by Audience

| Audience | Description |
|----------|-------------|
| **Technical** | "A modular kernel for AI agents. The CLI is one interface. Build your own." |
| **Semi-technical** | "The engine that powers AI agents. Use the terminal, the desktop app, or build something new." |
| **Non-technical** | "The foundation that makes AI agents yours. Use it how you want." |

### The Linux Analogy

Just as:
- Linux kernel → Ubuntu, Fedora, Android (different interfaces, same kernel)
- Chromium engine → Chrome, Edge, Brave (different browsers, same engine)

Amplifier kernel → CLI, Desktop, Forge, Vision app (different interfaces, same kernel)

### Key Phrases That Communicate This

- "The center stays still so the edges can move fast"
- "The CLI is one interface. Forge is another. Build your own."
- "Mechanism, not policy" (for technical audiences)
- "You decide how it works, not us"

---

## AI as Collaborator (Key Differentiator)

Most AI tools are **prompt-in, response-out** black boxes. Amplifier creates AI that works **with** you, not just **for** you.

### Why Amplifier AI Becomes a Collaborator

| Standard AI | Amplifier AI |
|-------------|--------------|
| You ask, it responds | It plans with you, tracks progress, validates work |
| Black box decisions | You see every decision, can intervene |
| One-shot generation | Iterative refinement with specs and docs |
| Forgets context | Maintains accountability to its own commitments |
| Single generalist | Coordinates specialized agents |

### The Spec-First Pattern

**How other AI works:**
> "Write me a feature" → AI generates code → Hope it's right

**How Amplifier works:**
> zen-architect analyzes → creates specification → modular-builder implements to spec → zen-architect reviews

The AI **thinks before it builds**. It creates docs. It follows specs. It reviews its own work. That's collaboration, not just generation.

### Marketing Copy Options

**Option A (Collaboration focus):**
> "AI that works with you, not just for you. Amplifier agents plan, delegate, validate, and refine—like a senior engineer, not a code generator."

**Option B (Partnership focus):**
> "From tool to teammate. Amplifier agents track their own progress, create specifications before building, and coordinate with specialists. The AI becomes a collaborator."

**Option C (Process focus):**
> "Think first, build second. Amplifier agents design before they code, validate as they go, and build on each other's work. Real engineering process, not just generation."

---

## Metacognitive Features (Key Differentiator)

**Metacognition = AI that thinks about how it thinks.**

Most AI tools have no self-awareness. Amplifier agents can:
- Track their own progress
- Analyze their own sessions
- Load knowledge on demand
- Validate work continuously
- Coordinate with specialists

### The Metacognitive Stack

| Capability | What It Means | Other AI Tools |
|------------|---------------|----------------|
| **Self-Accountability** | AI tracks its own todos, gets reminders | No memory of plan |
| **Spec-First Design** | Think before build | Just generates code |
| **On-Demand Knowledge** | Load expertise when relevant | Everything or nothing |
| **Session Introspection** | Debug and analyze own history | Black box |
| **Multi-Step Workflows** | Coordinated agent pipelines with approval gates | Single-shot |
| **Agent Coordination** | Specialized team that delegates | One generalist |
| **Incremental Validation** | Check every step (lint, types, tests) | Hope for the best |

### Feature Descriptions for Website

**1. Self-Tracking (Todo Tool)**
> "AI that holds itself accountable. When tasks get complex, Amplifier agents create their own checklists and track progress—no wandering, no forgotten steps."

**2. Spec-First Design (zen-architect → modular-builder)**
> "AI that designs before it builds. The zen-architect agent creates specifications; the modular-builder implements them. Coherent architecture, not spaghetti code."

**3. On-Demand Knowledge (Skills)**
> "Knowledge when you need it. Amplifier agents load expertise on demand—Python patterns, security protocols, API guidelines. Right knowledge, right time."

**4. Session Analysis**
> "AI that can examine its own history. Search past conversations, diagnose failures, even rewind sessions to retry. Full introspection, full control."

**5. Recipes (Multi-Step Workflows)**
> "Repeatable AI workflows. Define once, run anywhere, resume anytime. Human approval gates where you need them."

**6. Agent Coordination**
> "Specialized agents, coordinated work. Delegates to specialists, builds on each other's work—like a well-organized engineering team."

**7. Incremental Validation**
> "Validate as you go. Amplifier agents check their work continuously—linters, type checkers, tests after each change. Problems caught early."

### Headline Options for Metacognition

**Technical:**
> "Metacognitive AI infrastructure. Agents that plan, delegate, validate, and reflect."

**Accessible:**
> "AI that thinks about how it thinks. Track progress, coordinate specialists, validate continuously."

**Punchy:**
> "Not just generation. Orchestration."

**Evocative:**
> "The difference between a contractor and a team."

### Homepage Subhead Options

**Option A (Technical):**
> "Amplifier is an open-source kernel for AI agents. See every decision. Swap any part. Build any interface."

**Option B (Accessible):**
> "An open-source engine for AI agents. The CLI is one way to use it. The desktop app is another. Or build your own."

**Option C (Aspirational + Concrete):**
> "The foundation for AI agents that work the way you do. Use the terminal. Use the desktop. Or build something entirely new."

**Option D (Shortest):**
> "Open-source AI agent infrastructure. See inside. Swap anything. Build any way."

---

## Voice: The Schillace Style (REVISED)

The site voice is modeled after Sam Schillace's writing — the insider confidant who respects your intelligence, acknowledges uncertainty, but wants to make sure you don't miss what's actually happening.

**NOTE:** Voice is good, but content must be FACTUAL first. Inspiring tone without concrete information creates vague marketing, not useful communication.

### Voice Characteristics

| Trait | How It Manifests |
|-------|------------------|
| **Insider confidant** | "Something is happening... hidden from most people" |
| **Measured urgency** | Not hyperbolic, but clearly signaling importance |
| **Self-aware humility** | "So…that's how it's going. Who cares, right?" |
| **Empathetic realism** | Acknowledges human cost — "tired, overwhelmed, excited" |
| **Casual authority** | Uses "folks" not "users", contractions freely |

### Writing Patterns

- **Open with quiet provocation** — something important most people are missing
- **Acknowledge the messiness** — don't pretend it's simple
- **Ground in a timeline** — "6 months ago... now..."
- **Show the tipping point** — when it went from "nice to have" to "game-changing"
- **Use "folks" and contractions** — warm, not corporate
- **Bullet the framework** — give people a mental model to take away
- **End with historical resonance** — "this feels like [major tech shift]"
- **Hedge with "seems" and "likely"** — confident but not arrogant

### Headline Flow

Headlines should read as one continuous thought when scanned:

```
Something is changing.
↓
Most tools won't let you see inside.
↓
So we made everything swappable.
↓
Here's what that looks like.
↓
The return compounds.
↓
What works spreads.
↓
If you're curious, try it.
```

### Reference

See Sam's writing: https://open.substack.com/pub/sundaylettersfromsam

---

## Core Principle

**withamplifier.com is THE official presence for Amplifier.**

Everything users need to understand, explore, learn, and get support should be here or clearly linked from here to official GitHub repos.

---

## User Types & Journeys

### 1. The Curious ("What is this?")

**Entry point**: Homepage, word of mouth, search
**Questions**: What does it do? Why should I care? Is it for me?
**Needs**: Vision, value prop, quick understanding
**Exit**: Either leaves or becomes Explorer

**Content needed**:
- Clear headline that captures the essence
- Problem/solution framing
- Visual demonstration of value
- Low-friction path to try it

### 2. The Explorer ("Show me more")

**Entry point**: Homepage CTA, direct link to Explore
**Questions**: What can I build? What exists? How does it work?
**Needs**: Browse capabilities, see examples, understand ecosystem
**Exit**: Either leaves or becomes Builder

**Content needed**:
- Bundle browser with real examples
- Demo/playground capability
- Showcase of what's been built
- Community contributions visible

### 3. The Builder ("I'm ready to use this")

**Entry point**: Explore page, direct link to Build
**Questions**: How do I install? How do I configure? What are the commands?
**Needs**: Step-by-step guidance, reference docs, examples
**Exit**: Becomes active user, returns for reference

**Content needed**:
- Installation instructions
- Quick start guide
- Command reference
- Provider setup guides
- Bundle creation guide (eventually)

### 4. The Contributor ("I want to extend this")

**Entry point**: Build page, GitHub
**Questions**: How do I create a bundle? How do I add modules? Where do I contribute?
**Needs**: Architecture understanding, contribution guidelines, examples
**Exit**: Creates and shares work

**Content needed**:
- Bundle authoring guide
- Module development guide
- Contribution guidelines
- Community showcase

### 5. The Stuck ("Something's wrong")

**Entry point**: Support page, search
**Questions**: Why isn't this working? Where do I get help?
**Needs**: FAQ, troubleshooting, community access
**Exit**: Problem solved or escalated

**Content needed**:
- FAQ (common issues)
- Troubleshooting guides
- Community links (Discussions)
- Bug reporting path

---

## Page Mapping

| Page | Primary User | Secondary Users | Core Job |
|------|--------------|-----------------|----------|
| **Home** | Curious | All | Communicate vision, spark interest |
| **Explore** | Explorer | Builder, Contributor | Show what's possible, browse ecosystem |
| **Build** | Builder | Contributor | Enable success with the product |
| **Updates** | All | - | Keep community informed |
| **Support** | Stuck | All | Resolve problems, connect community |

---

## Content Gaps Identified

### Home Page
- [x] Vision/value prop (exists but needs refinement)
- [ ] Social proof (who's using it, what they've built)
- [ ] Clearer "what is it" for different audiences

### Explore Page
- [ ] Complete bundle catalog (auto-generate from ecosystem)
- [ ] Provider catalog (Anthropic, OpenAI, Azure, Ollama, Gemini, Bedrock, vLLM)
- [ ] Agent catalog (50+ agents exist)
- [ ] Community showcase (apps, extensions)
- [ ] Interactive demo/playground

### Build Page
- [ ] Provider-specific setup guides
- [ ] Bundle creation tutorial
- [ ] Common patterns cookbook
- [ ] CLI command reference
- [ ] Configuration reference

### Support Page
- [ ] Expanded FAQ
- [ ] Troubleshooting guides
- [ ] Migration guides (if applicable)

---

## Auto-Generation Opportunities

Learn from catalog.json approach - scan GitHub repos and generate:

1. **Bundle catalog**
   - Name, description, what it includes
   - Source: Parse bundle.md files from ecosystem repos

2. **Provider list**
   - Name, models supported, setup command
   - Source: Provider module repos

3. **Agent catalog**
   - Name, description, when to use
   - Source: Agent .md files from bundles

4. **Module catalog** (for Build/advanced users)
   - Type, name, description
   - Source: Module repos

5. **Community contributions**
   - Apps built with Amplifier
   - Community bundles
   - Source: GitHub topics/search + manual curation

### Implementation approach
- GitHub Action that runs on schedule
- Outputs JSON data files
- Next.js reads at build time or via API
- Content stays fresh automatically

---

## Learnings by Source

### From Stripe
- Progressive disclosure (overview → details)
- Code examples front and center
- Clear navigation hierarchy

### From Linear
- Confidence in voice ("the way you want")
- Minimal, focused messaging
- Speed/quality positioning

### From Anthropic
- Research-backed credibility
- Thoughtful, considered tone
- Clear capability communication

### From Vercel
- Developer-centric language
- "Ship" action orientation
- Framework/ecosystem integration clarity

### From amplifier.dev.ai
- Auto-generation from source repos works
- Ecosystem is larger than we're showing
- Technical reference has value (but shouldn't be primary)

---

## Terminology (Canonical)

| Use This | Not This | Notes |
|----------|----------|-------|
| Bundle | Profile, Collection | Bundle is the current, correct term |
| Provider | - | LLM backends |
| Tool | - | Agent capabilities |
| Hook | - | Lifecycle observers |
| Agent | - | Specialized personas within bundles |
| Module | - | Generic term for Provider/Tool/Hook/etc |

---

## Next Steps

1. **Refine Home page** - Headline work, clearer value prop
2. **Expand Explore page** - Add provider list, more bundles, community section
3. **Enhance Build page** - Provider setup guides, better command reference
4. **Plan auto-generation** - Spec out what to auto-generate, implementation approach

---

## Open Questions

1. Should Explore have sub-pages (Bundles, Providers, Agents) or single scrolling page?
2. How much technical depth on the marketing site vs GitHub docs?
3. Do we need a dedicated "Docs" section separate from Build?
4. How do we handle versioning as Amplifier evolves?

---

## Critical Fixes Required

### Fix 1: Define What Amplifier IS (Homepage Hero)

**Current:** "AI that's yours for the making"
**Required:** Definitional statement in first 10 words

**New Hero Structure:**
```
H1: "AI that's yours for the making."
Subhead: "Amplifier is an open-source CLI for building AI agents. 
         See every decision. Swap any part. Make it yours."
CTA: pip install amplifier
```

### Fix 2: Remove or Fix Fake Demos

**Current:** "Watch it work" shows pre-recorded traces labeled as "real execution"
**Problem:** Misleading framing

**Options (pick one):**
- A) Add honest label: "Recorded session showing typical execution"
- B) Remove demo tab, show only config
- C) Build real interactive sandbox (high effort)

**Recommendation:** Option A for now, Option C as future enhancement

### Fix 3: Make Everything Clickable

Every element that looks interactive must DO something:

| Element | Current | Fix |
|---------|---------|-----|
| Provider cards (Build) | Static | Link to provider docs + API key signup |
| Architecture cards (Home) | Static | Link to detailed explanation |
| Community bundles (Explore) | Static | Link to repo or show "Coming soon" state |

### Fix 4: Add Social Proof

**Required sections:**
1. "Used by" logos or statement
2. 1-2 testimonial quotes
3. Real project showcase (not "this site")

**Placement:** After "Why it matters" section on homepage

### Fix 5: Fix Support Page

**Current:** 4 cards that all link to GitHub
**Required:** Unique value per card OR consolidate

**Option A - Differentiate:**
- Discussions → Keep
- Issues → Keep  
- Docs → Link to actual docs (when they exist)
- Contributing → Keep

**Option B - Consolidate:**
- "Community" (Discussions + Contributing)
- "Report Issues" (Bug reports)
- Remove redundant cards

---

## Page-Level Content Requirements

### Homepage: 5 Questions in 60 Seconds

| Question | Section | Content Required |
|----------|---------|------------------|
| What is it? | Hero | "Amplifier is an open-source CLI for building AI agents" |
| Why should I care? | Problem | 3 pain points (exists, needs sharpening) |
| How does it work? | Architecture | Providers + Tools + Behaviors = Bundle (exists) |
| Does it actually work? | Demo + Proof | Real example + social proof (MISSING) |
| How do I start? | CTA | Clear next step (exists) |

### Explore: Show What's Possible

| Requirement | Status | Notes |
|-------------|--------|-------|
| Bundle browser | Exists | Works |
| Real demos | Needs fix | Currently fake |
| Community section | Needs fix | Not clickable |
| Showcase | Needs expansion | Only 2 items, one is self-referential |

### Build: Enable Success

| Requirement | Status | Notes |
|-------------|--------|-------|
| Install steps | Good | Works well |
| Provider setup | Needs fix | Cards need links |
| Command reference | Good | Exists |
| Forge teaser | Remove/minimize | Vaporware shouldn't dominate |
| "Go deeper" | Needs fix | Should link to real docs |

### Support: Resolve Problems

| Requirement | Status | Notes |
|-------------|--------|-------|
| Quick links | Needs fix | Too many GitHub links |
| FAQ | Good | Works, could expand |
| Troubleshooting | Missing | Should add common issues |

---

## Implementation Priority

### P0 - Do Now (Blocking)
1. Rewrite homepage hero with definitional statement
2. Fix "Watch it work" labeling
3. Add social proof section placeholder

### P1 - Do Soon (Important)
4. Make provider cards clickable
5. Fix community bundles state
6. Reduce Forge section prominence

### P2 - Do Eventually (Nice to Have)
7. Expand FAQ
8. Add troubleshooting guides
9. Build real interactive playground

---

## Success Metrics

**Before fixes:**
- User understands what Amplifier is: 40%
- User knows next step: 60%
- User trusts claims: 20%
- User can try something: 0% (demos are fake)

**After fixes:**
- User understands what Amplifier is: 95%
- User knows next step: 90%
- User trusts claims: 70%
- User can try something: 50% (honest about limitations)
