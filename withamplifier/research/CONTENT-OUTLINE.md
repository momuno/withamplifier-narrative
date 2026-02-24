# withamplifier.com Content Outline

**Last Updated:** 2026-01-19
**Status:** REVISED based on critical site review

---

## Critical Update: Content Failures Identified

The site fails to answer basic questions. Each page section below now includes:
- **[OK]** - Content exists and works
- **[FIX]** - Content exists but needs revision
- **[MISSING]** - Content doesn't exist but should
- **[REMOVE]** - Content exists but shouldn't

See `SITE-REVIEW-2026-01-19.md` for full analysis.

---

## Site Structure

```
withamplifier.com
├── / (Home)
├── /explore
├── /build
├── /updates
└── /support
```

---

## VOICE & TONE

**Primary Voice:** Sam Schillace style — insider confidant who respects your intelligence, acknowledges uncertainty, but wants to make sure you don't miss what's actually happening.

**Characteristics:**
- Conversational, not corporate
- Uses "folks" not "users"
- Hedges with "seems," "likely" — confident but not arrogant
- Acknowledges messiness and complexity
- Grounds observations in timelines ("6 months ago... now...")
- Connects to broader patterns ("this feels like the early web")

**Headline Flow:** Headlines should read as one continuous thought when scanned:

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

---

## PAGE 1: HOME (`/`)

### Section 1.1: Hero
| Element | Content |
|---------|---------|
| **Headline** | "Something is changing." |
| **Subhead** | "The folks building serious things with AI want to see inside, swap pieces, make it theirs. That's what Amplifier is for." |
| **CTA** | `pip install amplifier` (code block) |
| **Visual** | Gradient orbs (CSS), warm cream background |

---

### Section 1.2: The Problem
| Element | Content |
|---------|---------|
| **Headline** | "Most tools won't let you see inside." |
| **Layout** | 3-column grid |

**Pain Points:**
1. **You can't see why** — "When something goes wrong, you're guessing. No visibility into decisions, prompts, or tool calls."
2. **You can't change anything** — "Want a different model? Different tools? You're stuck with what they decided to give you."
3. **You can't make it yours** — "Generic instructions. Generic personality. No way to encode how you actually work."

---

### Section 1.3: The Architecture
| Element | Content |
|---------|---------|
| **Headline** | "So we made everything swappable." |
| **Subhead** | "Providers, tools, and behaviors snap together into bundles. Change one piece without touching the rest." |
| **Layout** | 3 tiles + 1 centered card |

**Building Blocks:**

| Block | Description | Code Example |
|-------|-------------|--------------|
| **Providers** | "The brain. Claude, GPT-4, Ollama, or run your own local model. Switch between them without changing anything else." | `providers: [anthropic, ollama]` |
| **Tools** | "The hands. Filesystem access, bash commands, web search, GitHub integration. Add only what you need." | `tools: [filesystem, bash, grep]` |
| **Behaviors** | "The personality. Instructions, expertise, and guardrails that shape how it works. Your workflow, encoded." | `behaviors: [security-focused]` |
| **Bundle** | "Combine providers + tools + behaviors into a shareable package. Install someone else's bundle, or publish your own." | (no code) |

---

### Section 1.4: Demo
| Element | Content |
|---------|---------|
| **Headline** | "Here's what that looks like." |
| **Subhead** | "One command loads a bundle, connects to a model, and gets to work." |
| **Visual** | Terminal simulation |
| **CTA** | "Try more examples" → /explore |

**Terminal Content:**
```
$ amplifier run "Review this PR for security issues"

→ Loading bundle: security-reviewer
→ Provider: claude-sonnet-4-20250514
→ Tools: filesystem, grep, ast-analysis

◐ Analyzing changes in src/auth.py...
◐ Checking for common vulnerabilities...

⚠ Found 2 issues:

1. SQL Injection Risk (Line 47)
   user_query = f"SELECT * FROM users WHERE id = {user_id}"
   → Use parameterized queries instead

2. Missing Input Validation (Line 23)
   password field accepts any length
   → Add length limits to prevent DoS

✓ Review complete. 2 issues found, 0 false positives.
```

---

### Section 1.5: Why This Matters (Benefits)
| Element | Content |
|---------|---------|
| **Headline** | "The return compounds." |
| **Layout** | 2x2 grid of benefit cards |

**Benefits:**

| Benefit | Description |
|---------|-------------|
| **Debug with confidence** | "See every prompt, every tool call, every decision. When something goes wrong, you can trace exactly why." |
| **Iterate without limits** | "New model comes out? Swap it in. Need a custom tool? Write one. Your investment in learning compounds." |
| **Share what works** | "Package your setup as a bundle. Share it with your team. Publish it for others. No vendor lock-in." |
| **Security you control** | "Run models locally. Inspect every API call. Add approval gates for sensitive operations. Your data, your rules." |

---

### Section 1.6: Ecosystem
| Element | Content |
|---------|---------|
| **Headline** | "What works spreads." |
| **Body** | "Package your setup as a bundle. Share it with your team or the community. Use bundles others have built. Each contribution makes the whole ecosystem richer." |
| **Visual** | Bundle pills: documentation-writer, security-reviewer, code-explorer, test-generator, api-designer, data-analyst |
| **CTA** | "Explore bundles" → /explore |

---

### Section 1.7: CTA (Get Started)
| Element | Content |
|---------|---------|
| **Headline** | "If you're curious, try it." |
| **Subhead** | "It takes about a minute to get running." |
| **Code** | `pip install amplifier` |
| **Primary CTA** | "Quick Start Guide" → /build |
| **Secondary CTA** | "View on GitHub" → github.com/microsoft/amplifier |
| **Footer** | "Questions? Get support" → /support |

---

## PAGE 2: EXPLORE (`/explore`)

### Section 2.1: Hero
| Element | Content |
|---------|---------|
| **Headline** | "Browse. Use. Customize." |
| **Subhead** | "Bundles built by the team and community. Pick one that fits, customize it for your workflow, or build your own from scratch." |

---

### Section 2.2: Bundle Browser
| Element | Content |
|---------|---------|
| **Layout** | Sidebar (bundle list) + Main area (demo/config) |

**Official Bundles:**

| Bundle | Description | Tools |
|--------|-------------|-------|
| **Documentation** | "Reads your code, writes your docs. READMEs, API references, architecture guides." | filesystem, web-search, grep |
| **Code Reviewer** | "Security vulnerabilities, SOLID violations, best practice checks." | filesystem, grep, ast-analysis |
| **Developer** | "Write, test, debug. Full-stack development with filesystem and bash." | filesystem, bash, grep, web-search |
| **Presentation Creator** | "Creates presentations with research, visual suggestions, and speaker notes." | filesystem, web-search |

**Community Bundles:**
| Bundle | Description |
|--------|-------------|
| **Design Intelligence** | "Design system architecture, component design, and visual strategy." |

**Contribute CTA:**
- **Headline:** "Share your bundle"
- **Body:** "Built something useful? Contribute it back. The ecosystem grows because people share."
- **Link:** "How to contribute →" → CONTRIBUTING.md

---

### Section 2.3: Demo Area
| Element | Content |
|---------|---------|
| **Tabs** | "Watch it work" / "View config" |
| **Demo tab** | PlaygroundSimulation component with trace playback |
| **Config tab** | YAML bundle configuration display |
| **Info box** | "This is a real execution trace. Watch the agent think, use tools, and produce output." |

**Run It Yourself CTA:**
- **Headline:** "Run it yourself"
- **Body:** "Install Amplifier and use this bundle on your own projects."
- **CTA:** "Get started" → /build

---

### Section 2.4: Built with Amplifier
| Element | Content |
|---------|---------|
| **Eyebrow** | "Showcase" |
| **Headline** | "Built with Amplifier" |
| **Subhead** | "Real projects using Amplifier. See what's possible." |

**Showcase Cards:**

| Type | Name | Description | Link |
|------|------|-------------|------|
| Bundle | Design Intelligence | "A collection of design-focused agents for system architecture, component design, animation choreography, and visual strategy." | GitHub |
| Website | This site | "withamplifier.com was built with Amplifier bundles—content strategy, code generation, design decisions all assisted by the framework." | View source |

**Footer:** "Built something with Amplifier? Share it with the community"

---

## PAGE 3: BUILD (`/build`)

### Section 3.1: Hero (Install)
| Element | Content |
|---------|---------|
| **Headline** | "Get started" |
| **Subhead** | "Install Amplifier, add a provider, and run your first command." |
| **Code** | `pip install amplifier` |
| **Note** | "Requires Python 3.10+" |

---

### Section 3.2: Quick Start
| Element | Content |
|---------|---------|
| **Headline** | "Three steps. Under a minute." |

**Steps:**

| Step | Title | Code | Note |
|------|-------|------|------|
| 1 | Install | `pip install amplifier` | — |
| 2 | Add a provider | `amplifier provider add anthropic` | "You'll need an API key from your provider. Amplifier supports Anthropic, OpenAI, Azure OpenAI, and Ollama for local models." |
| 3 | Run | `amplifier run "Document this codebase"` | "That's it. Amplifier uses the default bundle. Add `--bundle` to use a specific one." |

---

### Section 3.3: Common Commands
| Element | Content |
|---------|---------|
| **Headline** | "Common commands" |

**Commands:**

| Command | Description |
|---------|-------------|
| `amplifier run "your prompt"` | Run with default bundle |
| `amplifier run --bundle code-reviewer "Review this PR"` | Run with a specific bundle |
| `amplifier bundle list` | See available bundles |
| `amplifier provider list` | See configured providers |

---

### Section 3.4: Providers
| Element | Content |
|---------|---------|
| **Headline** | "Swap providers anytime" |
| **Subhead** | "Change your model without touching your bundles. Each provider is a plug." |
| **Layout** | 3-column grid (6 providers) |

**Providers:**

| Provider | Models | Command |
|----------|--------|---------|
| Anthropic | Claude Sonnet 4, Opus 4, Haiku | `amplifier provider add anthropic` |
| OpenAI | GPT-4o, GPT-4 Turbo, o1 | `amplifier provider add openai` |
| Google Gemini | Gemini Pro, Gemini Flash | `amplifier provider add gemini` |
| Azure OpenAI | Enterprise Azure deployments | `amplifier provider add azure` |
| AWS Bedrock | Claude, Llama, Titan on AWS | `amplifier provider add bedrock` |
| Ollama | Local models, fully private | `amplifier provider add ollama` |

---

### Section 3.5: Forge Teaser
| Element | Content |
|---------|---------|
| **Eyebrow** | "Coming soon" |
| **Headline** | "Forge" |
| **Body** | "A visual interface for Amplifier. Workspace management, guided learning, community bundle browser—all in a desktop application. For now, the CLI is the way to use Amplifier. Forge is in development." |
| **CTA** | "Watch the repo for updates" → GitHub |

---

### Section 3.6: Documentation CTA
| Element | Content |
|---------|---------|
| **Headline** | "Go deeper" |
| **Subhead** | "Full documentation, API reference, and examples." |
| **Primary CTA** | "Documentation" → GitHub |
| **Secondary CTA** | "Ask a question" → GitHub Discussions |

---

## PAGE 4: UPDATES (`/updates`)

### Section 4.1: Hero
| Element | Content |
|---------|---------|
| **Headline** | "Updates" |
| **Subhead** | "What's new in Amplifier. Features, improvements, and announcements." |
| **Links** | "GitHub Releases →" / "Join the discussion →" |

---

### Section 4.2: Updates List
| Element | Content |
|---------|---------|
| **Layout** | Timeline/list of updates |

**Current Updates:**

| Date | Type | Title | Description |
|------|------|-------|-------------|
| Jan 15, 2026 | Announcement | withamplifier.com launches | "The new home for Amplifier documentation, examples, and community." |
| Jan 10, 2026 | New Feature | Design Intelligence bundle | "New bundle for design system architecture, component design, and visual strategy." |
| Jan 5, 2026 | Improvement | Recipe system improvements | "Better context flow between steps, improved approval gates, resumability fixes." |

**Footer:** "For the complete history, see GitHub Releases"

---

### Section 4.3: Stay Updated CTA
| Element | Content |
|---------|---------|
| **Headline** | "Stay updated" |
| **Subhead** | "Watch the repository to get notified of new releases." |
| **CTA** | "Watch on GitHub" |

---

## PAGE 5: SUPPORT (`/support`)

### Section 5.1: Hero
| Element | Content |
|---------|---------|
| **Headline** | "Get help" |
| **Subhead** | "Stuck on something? Find answers, connect with the community, or reach out directly." |

---

### Section 5.2: Help Resources
| Element | Content |
|---------|---------|
| **Layout** | 2x2 card grid |

**Resources:**

| Resource | Description | Link Text |
|----------|-------------|-----------|
| Community Discussions | "Ask questions, share ideas, connect with other builders. The community is active and helpful." | "Join the discussion →" |
| Bug Reports | "Found something broken? Let us know. Good bug reports help us improve Amplifier for everyone." | "Report an issue →" |
| Documentation | "Guides, examples, and API reference. Everything you need to understand and build with Amplifier." | "Read the docs →" |
| Contributing | "Help build Amplifier. Contribute bundles, tools, documentation, or improvements to the core." | "Get involved →" |

---

### Section 5.3: FAQ
| Element | Content |
|---------|---------|
| **Headline** | "Frequently asked" |

**Questions:**

| Question | Answer |
|----------|--------|
| What providers does Amplifier support? | "Anthropic (Claude), OpenAI (GPT-4), Google Gemini, Azure OpenAI, AWS Bedrock, and local models via Ollama. The provider is swappable—change it without rewriting your bundles." |
| Is Amplifier free? | "Amplifier is open source and free. You pay only for the AI providers you use (like Claude or GPT-4 API costs)." |
| What's the difference between Forge and CLI? | "Same capabilities, different interface. Forge is visual with guided learning and workspace management. CLI is terminal-based, scriptable, and fast. Choose what fits your workflow." |
| Can I create my own bundles? | "Yes. Bundles are YAML + markdown. Combine providers, tools, and behaviors to create capabilities specific to your work. Share them back to the community if you like." |
| How is this different from other AI tools? | "Most AI tools are monolithic—one interface, one capability. Amplifier is modular. Swap providers without rewriting. Add tools without permission. Build exactly what you need." |

---

### Section 5.4: Still Stuck CTA
| Element | Content |
|---------|---------|
| **Headline** | "Still stuck?" |
| **Subhead** | "Open an issue on GitHub or start a discussion. We're here to help." |
| **CTA** | "Start a discussion" → GitHub Discussions |

---

## GLOBAL ELEMENTS

### Navigation
| Item | Destination |
|------|-------------|
| Explore | /explore |
| Build | /build |
| Updates | /updates |
| Support | /support |

### Footer
(Not explicitly defined in pages - inherits from layout)

---

## REVIEW CHECKLIST

- [x] 1.1 Hero — Updated with flowing headline
- [x] 1.2 The Problem — Updated headline
- [x] 1.3 The Architecture — Updated headline
- [x] 1.4 Demo — Updated headline
- [x] 1.5 Why This Matters — Updated headline
- [x] 1.6 Ecosystem — Updated headline
- [x] 1.7 CTA — Updated headline
- [x] 2.1 Explore Hero — Updated
- [ ] 2.2 Bundle Browser
- [ ] 2.3 Demo Area
- [x] 2.4 Built with Amplifier — Updated
- [x] 3.1 Build Hero — Updated
- [x] 3.2 Quick Start — Updated
- [ ] 3.3 Common Commands
- [x] 3.4 Providers — Updated with 6 providers
- [ ] 3.5 Forge Teaser
- [ ] 3.6 Documentation CTA
- [ ] 4.1 Updates Hero
- [ ] 4.2 Updates List
- [ ] 4.3 Stay Updated CTA
- [ ] 5.1 Support Hero
- [ ] 5.2 Help Resources
- [ ] 5.3 FAQ — Updated provider list
- [ ] 5.4 Still Stuck CTA

---

## CRITICAL UPDATES REQUIRED (2026-01-19 Review)

Based on site review, the following sections need revision:

### P0 - Must Fix Immediately

#### 1.1 Hero - Add Definition
**Problem:** Never says what Amplifier IS
**Current subhead:** "See how it thinks. Swap what you want. Build something that works the way you do."
**Revised subhead:** "Amplifier is an open-source CLI for building AI agents. See every decision. Swap any part. Make it yours."

#### 2.3 Demo Area - Fix Misleading Label
**Problem:** "Watch it work" implies real AI but shows pre-recorded traces
**Fix:** Add label: "Recorded session demonstrating typical execution"

#### NEW: Social Proof Section (after 1.5)
**Problem:** No proof anyone uses Amplifier
**Add:** "Used by" section with 2-3 testimonials or logos

### P1 - Fix Soon

#### 2.2 Community Bundles - Make Interactive
**Problem:** Cards are not clickable, dead end
**Fix:** Link to GitHub repos or show "Coming soon" state with explanation

#### 3.4 Provider Cards - Add Links
**Problem:** Shows 6 providers but no path to get API keys
**Fix:** Each card links to:
- Provider's API key signup page
- Setup guide on Amplifier docs

#### 3.5 Forge Teaser - Reduce Prominence
**Problem:** Vaporware shouldn't dominate Build page
**Fix:** Move to small note at bottom or remove entirely

### P2 - Fix Eventually

#### 5.2 Help Resources - Differentiate
**Problem:** All 4 cards link to GitHub
**Fix:** Create unique value per card or consolidate to 2 cards

#### 3.6 Documentation CTA - Fix Link
**Problem:** "Documentation" links to GitHub README, not actual docs
**Fix:** Build /docs section or remove button until docs exist

---

## Content Gaps Summary

| Gap | Priority | Section | Fix |
|-----|----------|---------|-----|
| No definition of what Amplifier IS | P0 | 1.1 | Add to subhead |
| Fake demos labeled as real | P0 | 2.3 | Add honest label |
| No social proof | P0 | NEW | Add section |
| Dead-end community bundles | P1 | 2.2 | Make clickable |
| Provider cards not linked | P1 | 3.4 | Add links |
| Forge section too prominent | P1 | 3.5 | Reduce/remove |
| Redundant support links | P2 | 5.2 | Consolidate |
| No actual documentation | P2 | 3.6 | Build or remove |

---

## Revised Homepage Headline Flow

Old flow (narrative, vague):
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

New flow (declarative, specific):
```
AI that's yours for the making.
↓
Amplifier is an open-source CLI for building AI agents.
↓
Most AI tools are black boxes.
↓
Everything is a swappable piece.
↓
One command. Real work.
↓
Control that compounds.
↓
Share what works. Use what others share.
↓
Start in under a minute.
```
