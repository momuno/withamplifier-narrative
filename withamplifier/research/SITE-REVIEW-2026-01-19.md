# Site Review: Critical Assessment

**Date:** 2026-01-19
**Reviewer:** Design Intelligence + Self-Review
**Status:** Issues identified, action plan required

---

## Executive Summary

The site tells users Amplifier is modular and transparent, but:
- Never says what Amplifier actually IS (CLI? Framework? Library?)
- Never shows WHY modularity matters with real examples
- Never lets users TRY it (demos are simulated)
- Never shows PROOF (who uses it, testimonials, case studies)
- Creates dead-end interactions (non-clickable elements, broken user journeys)

**Verdict:** The site does NOT present the clearest picture of what Amplifier is.

---

## Review Questions & Findings

### 1. What are users supposed to learn about Amplifier?

**What the site currently communicates:**
- "AI that's yours for the making" (vague tagline)
- It's modular (providers, tools, behaviors → bundles)
- You can see how it thinks, swap parts, build your own
- Solves the "black box" problem

**What's unclear or missing:**

| Gap | Impact |
|-----|--------|
| **What IS Amplifier?** | User doesn't know if it's a CLI, framework, library, or app |
| **Who is it for?** | No clear persona (developers? teams? enterprises?) |
| **What can you BUILD?** | Examples are vague ("Review this PR", "Document codebase") |
| **How is it different?** | No competitive positioning vs LangChain, AutoGen, Cursor |
| **Why should I care?** | Benefits are abstract, not grounded in real outcomes |

### 2. What are users supposed to DO with each section?

#### Homepage

| Section | Intended Action | Does it work? | Problem |
|---------|-----------------|---------------|---------|
| Hero | Copy `pip install` | Yes | No guidance on what happens next |
| Problem section | Understand pain | No action | Just text, no CTA |
| Architecture | Learn concepts | No action | Cards not clickable, no "learn more" |
| Terminal demo | See it work | Static | "Try more examples" goes to simulated demos |
| Why it matters | Understand value | No action | Benefits without proof |
| Ecosystem | Browse bundles | Yes | "Explore bundles" works |
| Get Started | Install | Yes | CTAs work |

#### Explore Page

| Element | Intended Action | Problem |
|---------|-----------------|---------|
| Bundle cards | Click to see demo | Demo is SIMULATED, not real |
| "Run it yourself" | Go to Build | Works, but disconnected experience |
| Community bundles | Browse | NOT CLICKABLE - dead end |
| "Watch it work" tab | See execution | Pre-recorded trace, misleading framing |

#### Build Page

| Element | Intended Action | Problem |
|---------|-----------------|---------|
| Install steps | Copy commands | Works well |
| Provider cards | Learn about provider | NOT CLICKABLE - no links to setup docs or API key pages |
| Forge section | Get notified | Links to generic GitHub, not a signup |
| "Go deeper" docs | Read documentation | Links to GitHub README, not actual docs |

#### Support Page

| Element | Intended Action | Problem |
|---------|-----------------|---------|
| 4 resource cards | Get help | ALL 4 link to GitHub - feels redundant and lazy |
| FAQ | Find answers | Works, but answers are shallow |

### 3. Does each thing make sense to do?

**Things that DON'T make sense:**

| Issue | Why It's a Problem |
|-------|-------------------|
| "Try more examples" → simulated demos | User expects to TRY, gets to WATCH fakes |
| Bundle demos are pre-recorded | "Watch it work" implies real AI, but it's a recording |
| Community bundles not clickable | Why show them if user can't do anything? |
| Provider cards have no links | Shows 6 providers but no path to get API keys |
| Forge section takes prime space | Vaporware shouldn't dominate Build page |
| All support links → GitHub | 4 cards that go to same place feels unfinished |

### 4. Compared to best-in-class sites, is this the clearest picture?

**Sites we analyzed:**
- Apple Creator Studio — interactive, you can DO things
- Linear — Problem → Solution → Proof in 3 scrolls
- Stripe — code examples that actually work
- Vercel — interactive playgrounds

**Comparison:**

| Criteria | withamplifier.com | Best-in-class |
|----------|-------------------|---------------|
| Clear value prop | Vague ("yours for the making") | Specific ("Version control for design") |
| Show vs tell | Mostly tell | Show with interactive demos |
| Can user try it? | No, just watch simulations | Yes, playgrounds or sandboxes |
| Proof it works | Static terminal output | Real testimonials, case studies |
| Clear next step | pip install → then what? | Guided onboarding flow |
| Documentation | Links to GitHub | Dedicated docs site |

---

## Critical Issues (Must Fix)

### Issue 1: Never says what Amplifier IS

**Current:** "AI that's yours for the making"
**Problem:** User doesn't know if it's a CLI tool, a Python library, a framework, or an app.

**Fix:** First sentence should be definitional:
> "Amplifier is an open-source framework for building AI agents. Install in 30 seconds, swap any part, see everything."

### Issue 2: Fake demos are misleading

**Current:** "Watch it work" shows pre-recorded traces
**Problem:** User thinks they're seeing real AI execution, but it's a simulation

**Fix Options:**
1. Remove "Watch it work" tab, show only config
2. Add clear label: "This is a recorded session demonstrating..."
3. Build real interactive demo (WebContainer/sandbox)

### Issue 3: Dead-end interactions everywhere

**Current:** Many elements look interactive but aren't
**Problem:** Creates frustration, signals unfinished product

**Fix:** Every card should be clickable with a clear destination:
- Provider cards → link to API key signup + setup guide
- Community bundles → link to GitHub repo or "coming soon" state
- Architecture cards → link to detailed docs

### Issue 4: No proof or social proof

**Current:** Zero testimonials, zero case studies, zero "who uses this"
**Problem:** User has no reason to trust claims

**Fix:** Add:
- 2-3 real quotes from users
- "Used by teams at..." section
- Real project showcases with outcomes

### Issue 5: Support page is 4 GitHub links

**Current:** All 4 cards link to GitHub
**Problem:** Feels lazy, provides no unique value

**Fix:** Either:
- Create actual unique content for each card
- Consolidate to 2 cards
- Add troubleshooting guides, not just links

### Issue 6: Build page has no actual documentation

**Current:** "Documentation" button → GitHub README
**Problem:** README is not docs; users expect structured learning

**Fix:** Either:
- Build /docs section on this site
- Link to actual docs if they exist elsewhere
- Remove the button until docs exist

---

## Secondary Issues

| Issue | Location | Fix |
|-------|----------|-----|
| Forge section dominates Build page | /build | Move to small footer note or remove |
| No competitive positioning | Homepage | Add "Unlike X, Amplifier lets you..." |
| Provider cards need API key links | /build | Link to Anthropic/OpenAI/etc signup pages |
| FAQ answers are shallow | /support | Expand with real troubleshooting |
| "This site" showcase is self-referential | /explore | Add 2-3 external projects |

---

## Action Plan

### Phase 1: Fix Critical Messaging (Content Changes)
1. Rewrite homepage hero with definitional statement
2. Fix "Watch it work" to be honest about what it is
3. Add real social proof section
4. Make all interactive-looking elements actually interactive

### Phase 2: Fix Dead Ends (UX Changes)
1. Provider cards → link to setup guides
2. Community bundles → proper state (clickable or grayed "coming soon")
3. Architecture cards → link to docs

### Phase 3: Add Missing Content
1. Competitive positioning
2. Real case studies/showcases
3. Expanded FAQ with troubleshooting
4. Actual documentation (or honest links)

### Phase 4: Consider Interactive Demo
1. Evaluate WebContainer or similar for real playground
2. If not feasible, be honest that demos are recordings

---

## Content Doc Updates Needed

| Document | Update |
|----------|--------|
| CONTENT-STRATEGY-V2.md | Add "Critical Issues" section, update user journeys |
| CONTENT-OUTLINE.md | Mark problematic sections, add new sections |
| CONTENT-TONE-GUIDE.md | Already good, no changes needed |

---

## Metrics for Success

After fixes, the homepage should answer in <60 seconds:
1. What is Amplifier? (A framework/CLI for building AI agents)
2. Who is it for? (Developers who want control)
3. What can I build? (3 specific examples with outcomes)
4. Why should I trust it? (Social proof, real usage)
5. How do I start? (Clear next step that works)

Currently achieves: 2/5 (maybe 2.5)
Target: 5/5
