# Homepage Content Review - Story Arc Analysis

## Current Story Flow

### 1. HERO - "Build your way with Amplifier"
**Purpose:** Open invitation, introduce core concept
**Content:**
- Headline: "Build your way / with Amplifier"
- Subhead: "Your AI agent is a file you can read, write, and share. Not a black box you rent. A tool you own."
- Install command

**✅ GOOD:** Clear, welcoming, establishes "file not black box" concept
**⚠️ CHECK:** Is "file you can read/write/share" clear enough or confusing?

---

### 2. PROBLEM - "Most AI tools are black boxes"
**Purpose:** State the problem, create contrast
**Content:**
- "They work. They respond. But you don't understand what's happening."
- "They lock you to one model. Hide how they work. Keep your setup trapped."
- "When something breaks, you're guessing. When something better comes along, you start over."

**✅ GOOD:** 
- Ends with problem (no solution jump)
- Should feel constraining, dark
- Sets up the answer

**⚠️ CHECK:** Could this be more visceral? More felt?

---

### 3. DIFFERENTIATION (THE ANSWER) - "Here's how Amplifier is different"
**Purpose:** The liberation moment - answer to the problem
**Content:**
- Headline: "Here's how Amplifier is different."
- Big text: "Open. Visible. Yours." (callback to Problem ending)
- Subhead: "You see everything. You can change anything. Works with whatever model you choose."
- Three pillars:
  - Use any model
  - See everything
  - Own your setup

**✅ GOOD:**
- Explicit callback creates connection
- Three pillars are clear differentiation
- Directly answers Problem section

**⚠️ CHECK:** Does this feel liberating enough? Should the transition be more dramatic?

---

### 4. PLATFORM - "Everything you need to build AI agents"
**Purpose:** Show breadth and completeness
**Content:**
- Four quadrants: Providers, Tools, Agents, Recipes
- Each with description and examples

**✅ GOOD:** Shows the platform is complete
**⚠️ POTENTIAL ISSUE:** Is this too much detail too soon? Does it distract from the story?

---

### 5. DEMO - "See it in action"
**Purpose:** Show it working, prove visibility
**Content:**
- Terminal showing security review
- "Every tool call logged / Every decision explained / Swap models mid-session"
- Shows provider switch command

**✅ GOOD:** Concrete example of the "visibility" promise
**❌ POTENTIAL ISSUE:** This reinforces DIFFERENTIATION point #2 (see everything). Is that redundant or reinforcing?

---

### 6. BUNDLE - "Package it as a bundle"
**Purpose:** Introduce the bundle concept + show benefits
**Content:**
- "A bundle captures your entire setup... Everything in plain text."
- "The more you use it, the more it becomes yours."
- Code example showing bundle.md
- Benefits grid:
  - Debug in minutes (visibility)
  - Swap anything (flexibility)
  - Share like code (format)
  - Your data stays yours (ownership)

**⚠️ REDUNDANCY ALERT:**
- "Debug in minutes" = repeats DIFFERENTIATION pillar #2 (See everything)
- "Swap anything" = repeats DIFFERENTIATION pillar #1 (Use any model)
- "Your data stays yours" = repeats DIFFERENTIATION pillar #3 (Own your setup)
- "Share like code" = new concept (bundle as file)

**DECISION NEEDED:** Should benefits grid focus ONLY on bundle-specific benefits, not repeat differentiation?

---

### 7. ECOSYSTEM - "Start with what works"
**Purpose:** Show community, network effect
**Content:**
- "Install a bundle from the community. Make it yours. Share what you build."
- Grid of example bundles

**✅ GOOD:** Shows abundance, you're not alone

---

### 8. CTA - "Your first agent in 60 seconds"
**Purpose:** Call to action
**Content:**
- Time promise
- Install command
- Links to guide and GitHub

**✅ GOOD:** Clear, focused action

---

## Story Arc Issues to Address

### 🔴 MAJOR: Bundle Benefits Grid Redundancy
The four benefits in BUNDLE section are:
1. Debug in minutes ← Already covered in DIFFERENTIATION ("See everything")
2. Swap anything ← Already covered in DIFFERENTIATION ("Use any model")
3. Share like code ← NEW (bundle-specific)
4. Your data stays yours ← Already covered in DIFFERENTIATION ("Own your setup")

**OPTIONS:**
A. Remove benefits grid entirely - let the bundle.md example speak for itself
B. Replace with bundle-SPECIFIC benefits (shareable, versionable, composable, inspectable)
C. Reframe as "Why this matters" tied to the bundle format specifically

**RECOMMENDATION:** Option B - Focus on what the BUNDLE FORMAT enables that wasn't covered yet:
- Share like code (git, PRs, collaboration)
- Version and evolve (git history)
- Compose from other bundles (building blocks)
- Inspect and understand (plain text)

### 🟡 MEDIUM: Platform Section Depth
The platform section shows breadth (4 quadrants with examples). Is this too much detail before we've shown it working?

**CONSIDERATION:** Move DEMO before PLATFORM?
- HERO → PROBLEM → ANSWER → **DEMO** → PLATFORM → BUNDLE → ECOSYSTEM → CTA

This would show "here's the answer" → "here it is working" → "here's everything in it"

### 🟡 MEDIUM: DEMO vs DIFFERENTIATION
DEMO section reinforces "see everything" which is differentiation pillar #2. Is this:
- ✅ Good reinforcement with concrete example?
- ❌ Redundant repetition?

**CONSIDERATION:** DEMO should show the EXPERIENCE, not just repeat the feature. Current content is good - it DEMONSTRATES visibility, doesn't just claim it.

### 🟢 MINOR: Hero Subhead Clarity
"Your AI agent is a file you can read, write, and share" - is this immediately clear?

**CONSIDERATION:** Some users might not understand "agent as file" concept yet. But it's intriguing enough to keep reading.

---

## Recommended Changes

### 1. Fix Bundle Benefits Grid (HIGH PRIORITY)
Replace current benefits with bundle-format-specific benefits:

```
Benefits grid should emphasize what BUNDLE FORMAT enables:

1. **Evolve with confidence**
   Git history. Version control. Roll back when needed. Your agent grows like your code.

2. **Collaborate naturally**
   Share in git. Review in PRs. Hand to teammates. No screenshots, no wikis.

3. **Compose and build up**
   Include other bundles. Mix and match capabilities. Stand on others' shoulders.

4. **Inspect and understand**
   Plain text. No compilation. Read it like you read code.
```

### 2. Consider Section Reordering (MEDIUM PRIORITY)
Test this flow:
- HERO → PROBLEM → ANSWER → **DEMO** (show it working) → PLATFORM (here's what's in it) → BUNDLE → ECOSYSTEM → CTA

This keeps momentum: problem → answer → proof → details

### 3. Problem Section Emotion (LOW PRIORITY)
Current problem section is clear but maybe not visceral enough. Could add more feeling:

"You're locked in. Guessing at failures. Starting over with each new tool. **Trapped in someone else's system.**"

---

## Story Arc Summary

**Current Arc:**
Invitation → Problem (trapped) → Answer (liberation) → Breadth (platform) → Proof (demo) → Format (bundle) → Community (ecosystem) → Action (CTA)

**Potential Improved Arc:**
Invitation → Problem (trapped) → Answer (liberation) → Proof (demo) → Breadth (platform) → Format (bundle) → Community (ecosystem) → Action (CTA)

Moves proof before breadth to maintain momentum from liberation → demonstration.

---

## Next Steps

1. ✅ Fix Bundle benefits grid - remove redundancy, focus on format-specific benefits
2. [ ] Consider reordering DEMO before PLATFORM
3. [ ] Optional: Add more visceral language to Problem section
