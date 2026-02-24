# Decisions & Essence

What we've decided and why. These are the stable foundations—don't change without explicit discussion.

**Last Updated:** 2026-02-05

---

## How to Use This File

- **Before proposing changes:** Check if it contradicts a decision here
- **After making decisions:** Add them here with date and rationale
- **When context is lost:** This is the thread to walk back through

---

## Core Identity

### What Amplifier IS

> **Amplifier is a modular kernel for AI agents.** The CLI is one application built on the kernel—not the product itself.

**Decided:** 2026-01-19 (CONTENT-STRATEGY-V2.md)

**Why it matters:** This shapes everything. We're not selling a CLI. We're providing infrastructure that can power many interfaces (CLI, desktop, Forge, custom apps).

**The Linux analogy:** Just as Linux kernel → Ubuntu, Fedora, Android... Amplifier kernel → CLI, Desktop, Forge, your app.

---

### The Philosophy

> "The center stays still so the edges can move fast."
> "Mechanism, not policy."

**Decided:** Inherited from amplifier-core design philosophy

**Why it matters:** The kernel provides capabilities. Modules decide behavior. This is why Amplifier stays stable while everything else in AI changes weekly.

---

## Voice & Tone

### We Sound Like

> A **thoughtful senior engineer** sharing something they've built—not a marketer, not a newsletter essayist, not a corporate spokesperson.

**Characteristics:** Precise, confident, respectful, direct, warm

**Decided:** 2026-01-19 (CONTENT-TONE-GUIDE.md)

### We Don't Sound Like

- ❌ "Something is changing in the world of AI..." (Editorial/essay)
- ❌ "Unleash the full power of AI!" (Marketing hype)
- ❌ "We're super excited to share this!" (Overly casual)
- ❌ "In a world where AI tools are increasingly important..." (Corporate preamble)

**Decided:** 2026-01-19 (CONTENT-TONE-GUIDE.md) — This was a deliberate SHIFT away from the earlier Schillace "insider confidant" style.

---

## Differentiators (Stable)

These are our five core differentiators. They should appear throughout the site:

| # | Differentiator | Key Phrase |
|---|----------------|------------|
| 1 | **Observability** | "No black boxes. See every decision." |
| 2 | **Portability** | "Works today. Works tomorrow." |
| 3 | **Composability** | "Snap together what you need." |
| 4 | **Ownership** | "Your AI, your rules, your infrastructure." |
| 5 | **Multi-agent** | "Different expertise, working together." |

**Decided:** 2026-01-XX (draft-differentiation-messaging.md)

**Open question:** Which leads? Observability or Ownership? (Not yet decided)

---

## Language Decisions

### Words We Use

| Concept | We Say | We Don't Say |
|---------|--------|--------------|
| The composable units | "Bundles" | "Profiles", "packages" |
| LLM connections | "Providers" | "Backends", "services" |
| Agent capabilities | "Tools" | "Actions", "functions" |
| AI generally | "AI tools", "what you build" | "Agents" (alone), "AI coworkers" |

**Decided:** Various dates, consolidated 2026-02-05

### Portability Framing

> Don't lead with "switching providers"—users don't wake up wanting to switch. Lead with **durability**: "Works today. Works tomorrow."

**Decided:** 2026-02-05 (this session)

**Why:** "Switching" solves a problem users don't feel yet. "Durability" solves the anxiety they DO feel about AI tools changing constantly.

---

## Content Structure

### Homepage Flow

The homepage follows this structure (from CONTENT-OUTLINE.md):

1. **Hero** — What Amplifier is (definitional)
2. **Problem** — Why current tools fall short
3. **Architecture** — How Amplifier is different (building blocks)
4. **Demo** — Show it working
5. **Benefits** — Why this matters
6. **Ecosystem** — Community and sharing
7. **CTA** — Get started

**Decided:** 2026-01-19

### Page Structure

| Page | Purpose |
|------|---------|
| `/` (Home) | Communicate vision, spark interest |
| `/explore` | Show what's possible, browse ecosystem |
| `/build` | Enable success with the product |
| `/stories` | Showcase features, projects, community |
| `/support` | Resolve problems, connect community |

**Decided:** Evolved through multiple sessions

---

## What We've Explicitly Rejected

| Rejected | Date | Why |
|----------|------|-----|
| "AI coworkers" language | 2026-02-05 | Dehumanizing corporate jargon |
| "Agents" as standalone noun | 2026-02-05 | Technical jargon that means nothing to most people |
| Schillace "insider confidant" essay style | 2026-01-19 | Too narrative, delays the point, doesn't lead with capability |
| "Switching providers" as lead value prop | 2026-02-05 | Solves a problem users don't feel |
| Wholesale content pivots on news | 2026-02-05 | We integrate new info, we don't react to it |

---

## Open Questions (Not Yet Decided)

- [ ] Which angle leads: Observability or Ownership?
- [ ] How do we talk about multi-agent without using "agents"?
- [ ] How aggressive on competitive positioning—direct comparison vs implied?
- [ ] Black box visual element—bring it back?

---

## Related Documents

| Document | What It Contains |
|----------|------------------|
| `research/CONTENT-STRATEGY-V2.md` | Full content strategy with architecture diagrams |
| `research/CONTENT-OUTLINE.md` | Page-by-page content specification |
| `research/CONTENT-TONE-GUIDE.md` | Voice, tone, and writing standards |
| `research/COMPETITIVE-INTELLIGENCE.md` | Competitor tracking and announcements |
| `.design/draft-differentiation-messaging.md` | Positioning and competitive statements |
