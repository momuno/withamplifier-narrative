# Content Analysis: Stories Framework Applied

Analysis of withamplifier.com homepage using amplifier-stories storytelling principles.

---

## Executive Summary

The current content is **good but could be stronger**. Key opportunities:

1. **Problem section lacks visceral pain** - Needs concrete scenarios
2. **Solution is abstract** - "perspective written down" needs grounding
3. **Benefits tell, don't show** - Missing before/after comparisons
4. **CTAs are generic** - "Get started now" vs specific action

---

## Section-by-Section Analysis

### HERO

**Current:**
```
Build AI Your Way

Your AI agent is a file you can read, write, and share. 
Not a black box you rent—a tool you own.
```

**Stories Assessment:**
- Strong value prop
- "file you can read, write, share" is concrete
- "black box you rent" creates contrast

**Improvement Opportunity:**
The subhead could create more tension. "Not a black box" is defensive. Lead with the positive.

**Suggested:**
```
Build AI Your Way

Your AI agent is a file. You can read every instruction,
change any behavior, and share it like code.
```

---

### SECTION 2: THE PROBLEM

**Current:**
```
Most AI tools don't let you see how they work.

- You can't read it
  The prompts, the logic, the rules it follows—hidden. When it breaks, you guess why.

- You can't change it  
  Their model, their tools, their decisions. Want to swap the model or add a capability? You can't.

- You can't share it
  Your setup, your learnings, your workflow—locked in their system. Can't hand it to a teammate as a file.
```

**Stories Assessment:**
- Good parallel structure
- But lacks **visceral pain scenarios**
- "When it breaks, you guess why" is the strongest line

**Key Principle Violated:** "Make It Concrete"
> Real examples > abstract descriptions
> Specific numbers > vague claims

**Suggested Rewrite:**
```
Most AI tools don't let you see how they work.

- You can't read it
  It hallucinates. It ignores your instructions. Why? 
  You'll never know—the prompts are hidden.

- You can't change it  
  A better model comes out. A tool you need exists. 
  Too bad—you're locked to their choices.

- You can't share it
  You spent weeks perfecting your setup. 
  Your teammate starts from zero.
```

---

### SECTION 3: THE SOLUTION (Bundle)

**Current:**
```
A bundle is your perspective, written down.

It's a file that defines how your AI agent thinks and works. 
You write it. You own it. You can share it.
```

**Stories Assessment:**
- "perspective written down" is poetic but abstract
- The code example is strong (shows, doesn't tell)
- Missing the **contrast** with the problem

**Key Principle:** "Show Before/After"
> Before: 3 hours debugging a broken production deploy.
> After: 5 minutes testing in shadow, catching the issue before it shipped.

**Suggested Rewrite:**
```
A bundle is your agent in a file.

Everything it knows—the model, the tools, the instructions—
visible in one place. Change a line, change its behavior.
```

The code example already shows well. Add a caption that creates contrast:

**Current caption:** "This file IS the agent. Read it, change it, share it."

**Suggested caption:** "42 lines. That's the entire agent. No hidden layers."

---

### SECTION 4: DEMO

**Current:**
```
Here's how it works.

One command loads your bundle, connects to your model, and gets to work. 
You see everything it does.
```

**Stories Assessment:**
- Good concrete demo
- "You see everything it does" is strong
- Bullet points are okay but generic

**Improvement:** Add the "aha" moment explicitly

**Suggested:**
```
One command. Full visibility.

Your bundle loads, connects to your model, and starts working. 
Every tool call, every decision—visible in your terminal.
```

**Bullet point improvements:**
- Current: "Loads your bundle automatically"
- Suggested: "Your bundle loads in under a second"

- Current: "Shows every tool call and decision"
- Suggested: "See exactly why it chose each action"

- Current: "Works in your terminal or IDE"
- Suggested: "Runs where you already work"

---

### SECTION 5: BENEFITS

**Current:**
```
AI that plans before it acts, validates as it goes, and shows you why.
```

**Stories Assessment:**
- Headline is dense—three ideas competing
- Benefits tell rather than show
- Missing quantification

**Suggested headline:**
```
Control that compounds.
```

Then let the cards do the work with before/after framing:

**Current card:**
```
Debug with confidence

See every prompt, every tool call, every decision. 
When something goes wrong, you can trace exactly why.
```

**Suggested card (with implicit before/after):**
```
Debug in minutes, not hours

Every prompt, every tool call, every decision—logged. 
When it breaks, you trace the exact line that failed.
```

**Current card:**
```
Iterate without limits

New model comes out? Swap it in. Need a custom tool? Write one. 
Your investment in learning compounds.
```

**Suggested:**
```
Swap anything, break nothing

New model? Change one line. Custom tool? Drop it in. 
Your setup evolves as fast as AI does.
```

---

### SECTION 6: ECOSYSTEM

**Current:**
```
What you build can be shared and scaled—while staying personal for everyone who uses it.
```

**Stories Assessment:**
- Long and abstract
- "shared and scaled" is corporate-speak
- The bundle cards are good

**Suggested:**
```
Install a bundle. Publish your own.

Start with someone else's setup. Make it yours. 
Share what works with your team—or the world.
```

---

### SECTION 7: CTA

**Current:**
```
Get started now.

Install Amplifier, connect a model, run your first command. Takes about a minute.
```

**Stories Assessment:**
- Generic "get started"
- "About a minute" is good specificity
- Could be more action-oriented

**Suggested:**
```
Your first agent in 60 seconds.

Install. Connect a model. Run a command. 
You'll have a working agent before you finish your coffee.
```

---

## Semantic Line Break Analysis

Headlines that need intentional breaks for phrasing:

| Current | Issue | Suggested Break |
|---------|-------|-----------------|
| "Most AI tools don't let you see how they work." | "work." orphans | "Most AI tools don't let you see&nbsp;how&nbsp;they&nbsp;work." or break after "see" |
| "A bundle is your perspective, written down." | Natural break ok | Keep as is |
| "AI that plans before it acts, validates as it goes, and shows you why." | Too long, three ideas | Split into shorter headline |
| "What you build can be shared and scaled—while staying personal for everyone who uses it." | Way too long | Complete rewrite needed |

---

## Priority Implementation

### High Impact (Do First)
1. Problem section - add visceral scenarios
2. Benefits headline - simplify to "Control that compounds"
3. Ecosystem headline - shorten dramatically

### Medium Impact
4. Hero subhead - lead with positive, not defensive
5. Benefit cards - add implicit before/after
6. CTA - make it about their outcome, not our product

### Low Impact (Polish)
7. Bundle caption - add contrast
8. Demo bullets - make more specific
9. Semantic line breaks on remaining headlines

---

## Implementation Checklist

- [ ] Rewrite Problem section with concrete scenarios
- [ ] Simplify Section 5 headline
- [ ] Rewrite Section 6 headline  
- [ ] Update benefit cards with before/after framing
- [ ] Add semantic line breaks where needed
- [ ] Update CTA to outcome-focused
