# Amplifier Showcase: Your System, Your Way

## The Core Tension

The individual composition demos tell the story of "look what you can build with Lego." But that's not the story. The story is:

**"This system sees you. It shapes itself to who you are. And it helps you create things that only you could create."**

That's not a feature comparison with Claude Code. That's a different category.

## Why Claude Code Isn't the Competitor

Claude Code (and Cursor, Copilot, etc.) answer the question: **"How do I code faster?"** They're tools for developers. A non-technical person will never open Claude Code. The composability those tools offer is composability *within the developer's world* -- MCP servers, custom slash commands, `.claude/` configuration. It's personalization for people who already know what `git commit` means.

Amplifier, as you're describing it, answers a different question: **"What do you want to bring into the world, and how can this system help you do it as yourself?"**

That question doesn't assume you're a developer. It doesn't assume you know what a module is. It assumes you're a person with a perspective, a domain, and something to create.

## The Story That Tells Itself

The showcase shouldn't be "here are N compositions." It should be **one narrative with multiple people flowing through it**, proving the thesis: *the same system becomes a different system for each person, and what they create reflects who they are.*

### The Anchor: Start With Someone Claude Code Can't Serve

**A middle school teacher** who wants to create a science curriculum that's engaging, aligns to their state's standards, and reflects their teaching philosophy (hands-on, inquiry-based, not lecture-driven).

They don't know what YAML is. They don't know what a module is. They say:

> "I teach 8th grade earth science. I believe kids learn by doing, not by listening. I want materials that sound like me, not like a textbook. I need lesson plans, student handouts, and discussion prompts for a unit on plate tectonics."

What happens behind the scenes:

| What the teacher expressed | What Amplifier composed |
|---------------------------|------------------------|
| "Sound like me" | `module-style-extraction` -- fed with their existing handouts to capture voice |
| "Kids learn by doing" | `voice-strategist` agent -- tuned the tone toward active/inquiry language |
| "Lesson plans, handouts, prompts" | `stories` bundle -- multi-format output pipeline |
| "Plate tectonics research" | `tool-web` + `web-research` agent -- gathers source material |
| Visual materials | `design-intelligence` agents -- layout, component design for handouts |

No `tool-bash`. No `tool-lsp`. No `python-check`. No `git-ops`. None of that exists in their world. The composition is *subtractive* as much as additive -- it removes the things that would make the system feel alien.

**Output**: A complete unit plan with student-facing materials, written in their voice, structured around inquiry-based pedagogy. Something they could hand out Monday morning.

**The point**: Claude Code cannot do this. Not because it lacks the raw capability -- but because it's not *for* this person. Its composition assumes a developer context. Amplifier's composition assumes nothing except: who are you, and what do you want to create?

### Then: Someone In Between

**A podcast creator** (semi-technical, comfortable with tools but not a developer) who produces a weekly interview show and wants to systematize their post-production.

> "I record interviews, then I spend 6 hours turning each one into show notes, social clips, a newsletter excerpt, and a blog post. All of it needs to sound like my brand -- informal but insightful, never corporate. I want a system that does this for me, the same way, every week."

What Amplifier composes:

| What they expressed | What Amplifier composed |
|--------------------|------------------------|
| Audio input | `tool-youtube-dl` + `tool-whisper` (community modules: download + transcribe) |
| "Sound like my brand" | `module-style-extraction` -- trained on their past newsletters |
| Multiple output formats | `stories` bundle -- HTML, Word, structured output |
| "The same way, every week" | `recipes` bundle -- a declared workflow they run repeatedly |
| "Informal but insightful" | `voice-strategist` agent -- voice calibration |
| Social media clips | `design-intelligence` agents -- layout for social cards |

**Output**: A repeatable recipe. Every week: drop in the audio file, run the recipe, get show notes + newsletter + social posts + blog draft. All in their voice. All structured the way they like it.

**The point**: This person *could* hack something together with Claude Code + shell scripts. But they wouldn't. Because that's not how they think. They think in workflows and brand voice, not in code and configs. Amplifier meets them there because it composed a system that speaks their language. And the `recipes` concept means their workflow is declared once and runs reliably -- it's not a chat session they have to re-explain every time.

### Then: The Developer

**A senior engineer** who leads a small team and wants code review + security audit as a standard part of their workflow.

> "Every PR should get a code review, a security scan, and a dependency check. I want the results in a structured report. I want approval gates so nothing gets merged without a human sign-off. And I don't want my team's API keys showing up in logs."

What Amplifier composes:

| What they expressed | What Amplifier composed |
|--------------------|------------------------|
| Code review | `python-dev` bundle, `zen-architect` agent |
| Security scan | `security-guardian` agent, `comprehensive-review` recipe |
| Structured report | `recipes` bundle -- multi-stage workflow with accumulated context |
| Approval gates | `hooks-approval`, staged recipe with `approve`/`deny` |
| No keys in logs | `hooks-redaction` behavior |
| Team workflow | `careful` mode -- confirm before destructive operations |

**Output**: A recipe that runs on every PR. Code review + security audit + dependency check, with human approval gates between stages, redacted logs safe for the team Slack channel.

**The point for the developer**: Yes, you could approximate this with Claude Code + custom MCP servers + shell hooks. But here's why Amplifier is different -- **you're not alone in this ecosystem.** The teacher, the podcast creator, and you are all using the same system. The modules you build (say, a better code review recipe) could be composed by someone else into a completely different context. And the modules *they* build (say, a better style extraction tool) are available to you when you need to write documentation that sounds human. **The composability isn't just for you -- it's across an entire ecosystem of different kinds of people.**

### Then: The Missing Piece

In each story above, there's a moment where the person needs something that doesn't exist yet:
- The teacher needs a module that checks curriculum alignment against state standards
- The podcast creator needs a module that detects and removes filler words from transcripts
- The developer needs a hook that enforces their team's specific commit message format

And in each case, Amplifier -- because it understands its own architecture -- helps them create it. The `foundation-expert` agent knows bundle structure. The `core-expert` agent knows module protocols. The `zen-architect` agent designs the interface. The `modular-builder` agent writes the code.

For the non-technical teacher, this might mean describing what they need and having Amplifier scaffold it. For the developer, it means implementing the module protocol directly with Amplifier's guidance. Different levels of involvement, same creation mechanism, same result: a new piece that plugs into the ecosystem and is available to everyone.

## What This Changes About the Showcase

The showcase isn't "5 demos of different YAML configurations." It's:

**One system. Three people. Three creations that could only come from those specific people.**

The YAML and module lists are implementation details that the *audience* can inspect if they want to understand the mechanics. But the story being told is:

1. **Identity** -- "Who are you?" drives what gets composed
2. **Expression** -- What you create reflects your perspective, not the tool's defaults
3. **Accessibility** -- A teacher and a developer both use this, and neither is a second-class citizen
4. **Extensibility** -- If the piece you need doesn't exist, the system helps you make it
5. **Ecosystem** -- What one person creates can become a building block for someone else

The Claude Code comparison dissolves because you're not comparing feature lists anymore. You're comparing *who the system is for*. Claude Code is for developers. Amplifier is for anyone who wants to create something.

## The Practical Question

The gap between this vision and today's reality is: **how does the non-technical user actually interact with this?** Today, Amplifier is a CLI. The teacher isn't going to write YAML. So the showcase needs to be honest about that -- the composition mechanics exist, the modules exist (or can be built), but the "who are you?" → automatic composition layer is the frontier. The showcase can demonstrate it as a guided interaction ("tell me about yourself and what you want to build") where Amplifier's self-knowledge does the composition on their behalf, even if the UX for that isn't fully polished yet.

That honesty actually strengthens the story: *the building blocks are here, the composition model works, and the next step is making the front door wider.* That's an invitation, not an apology.

s
---

# Production Plan

## Phase 1: The Developer Story -- BUILT

All artifacts are in `~/amplifier-showcase/`. Status:

| Artifact | Status | Location |
|----------|--------|----------|
| Sample project (Python API with planted issues) | Done | `sample-project/` |
| Thin bundle (20 lines YAML) | Done | `bundle/team-review.md` |
| Behavior (team standards) | Done | `bundle/behaviors/team-standards.yaml` |
| Context (review instructions) | Done | `bundle/context/team-instructions.md` |
| Custom hook (commit convention, 30 lines Python) | Done | `bundle/modules/hooks-commit-convention/` |
| Staged recipe (3 stages, approval gate) | Done, validates clean | `recipe/pr-review.yaml` |
| Maya's story narrative | Done | `story/the-team-lead.md` |
| Project README | Done | `README.md` |

**Next step**: Run the recipe against the sample project to capture real output for the story page.

## Phase 2: The Podcast Creator Story -- NOT STARTED

Composition: `tool-youtube-dl` + `tool-whisper` + `module-style-extraction` + `recipes` + `voice-strategist`

Depends on: demonstrating a non-code workflow using existing community modules.

## Phase 3: The Teacher Story -- NOT STARTED

Composition: `design-intelligence` + `module-style-extraction` + `stories` + `voice-strategist`

Depends on: solving the UX question of how a non-technical user interacts with the system.
This is the frontier -- the "who are you?" to automatic composition layer.

---

# Site Integration Plan

withamplifier.com

## What the Site Already Does

The site tells a developer story well: composable pieces, transparency, own your setup. The "Stories"
section showcases community projects (Transcribe, Blog Creator, Voice Assistant, Playground, etc.). The
"Built by different minds. Ready for yours." section is the closest thing to the broader vision -- but it's
a gallery, not a narrative.

The gap: the site shows what people built but not who they are and why their composition reflects their
perspective. The stories are product cards, not human stories.

# Start with dev persona

## How the Dev Persona Fits as Chapter One

The trick is: you CAN lead with the developer, but you frame it so the reader understands they're seeing one
instance of a larger pattern. The developer story isn't "here's what Amplifier does." It's "here's what
Amplifier became for one person -- and it becomes something completely different for the next."

Concretely, I'd propose this structure:

A "Stories" Landing Page Reframe

Before any individual story, a short framing statement. Something like:

- Every setup below started the same way: someone said who they are and what they wanted to build. The
- system shaped itself around them. These are their stories.

That's it. Three sentences. It sets the expectation that the dev story is the first of many, and that the
interesting thing isn't the technology -- it's how the technology disappeared into someone's specific need.

## The Developer Story (Phase 1 -- Build Now)

This becomes the first deep story. Not a product card -- a narrative with a beginning, middle, and end.

The structure of the story page:

 1. WHO (2-3 sentences)
    "Maya leads a 4-person backend team. Their PRs move fast,
     but security review is inconsistent. She wants a standard
     that runs automatically and leaves an audit trail."

 2. WHAT SHE COMPOSED (visual: the bundle, annotated)
    Show the actual thin bundle YAML (~20 lines)
    Annotate each section: "this gives her...", "this ensures..."
    Call out what's ABSENT (no design agents, no style tools --
    this setup is hers, not everyone's)

 3. WHAT IT PRODUCED (the actual output)
    The recipe running: code-review stage → security audit stage
    → approval gate → report
    Show real terminal output or rendered report

 4. THE MISSING PIECE (the moment she extends it)
    Her team has a commit message convention.
    No module for it. She describes it. Amplifier helps her
    build a custom hook. ~30 lines of Python.
    Now it's part of her bundle. She pushes it.
    Her teammate pulls it into their setup.

 5. THE INVITATION (one paragraph)
    "Maya's setup is 20 lines of YAML and one custom hook.
    It reflects how her team works. Yours will look different --
    because you're different. That's the point."


## What We Actually Build (Deliverables)

| Artifact | Status | Location |
|----------|--------|----------|
| Artifact | What It Is | Purpose |
|----------|------------|---------|
| The bundle | A real, functional team-review.md bundle YAML | The shareable composition -- lives on GitHub |
| The recipe | A real pr-review.yaml recipe composing code-review + security-audit + approval gates  The repeatable workflow |
| The custom hook | A real hooks-commit-convention module (~30 lines Python) | Proves the "build what's missing" arc |
| The story page | Narrative content for withamplifier.com/stories | The human story wrapping the technical artifacts |
| The demo output | Actual rendered output from running the recipe against a sample repo | The proof that it works |


## What We Don't Build Yet (But Set Up)

The story page has a visual hint -- maybe a sidebar, maybe a footer -- showing two greyed-out future
stories:

- Coming next: A podcast creator who turned 6 hours of post-production into a 1-click recipe. And a
- teacher who built curriculum materials in her own voice without touching a line of code.

This does two things: it signals the broader vision without requiring the work now, and it creates
anticipation. The reader understands the developer story is chapter one, not the whole book.


# The Production Sequence

Step 1: Build the artifacts (we can do much of this in-session)

 - Write the team-review.md bundle
 - Write the pr-review.yaml recipe (can compose existing code-review + security-audit recipes)
 - Write the custom commit convention hook
 - Run it against a sample codebase and capture the output

Step 2: Write the narrative

 - The Maya story (~500-800 words)
 - Annotated bundle walkthrough
 - Before/after: what her workflow looked like before vs. after

Step 3: Design the presentation

 - How this sits on withamplifier.com (story page format)
 - The framing statement for the Stories section
 - The "coming next" teaser for the other two personas

Step 4: Validate

 - Does the bundle actually run?
 - Does the recipe produce a useful report?
 - Does the custom hook work?
 - Can someone clone the repo and reproduce it?