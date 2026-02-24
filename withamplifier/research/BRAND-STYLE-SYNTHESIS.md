# Amplifier Brand Style Synthesis

## Research Sources

| Site | Key Takeaway |
|------|--------------|
| **XREAL 1s** | Scroll-triggered video backgrounds, problem-solution narrative arc |
| **Apple Creator Studio** | Image sequence scroll-scrubbing, "Flow" compression, pacing mastery |
| **MakingSoftware** | Technical diagram storytelling, isometric exploded views, blueprint aesthetic |

---

## The Amplifier Visual Identity

### Core Concept: "The Assembly Manual"

Amplifier's visual story should feel like a **premium technical manual** that comes to life. Imagine if Apple designed IKEA instructions for AI agents.

**Tagline territory:**
- "Assemble intelligence"
- "Building blocks for AI"
- "Compose. Configure. Create."

---

## 1. Diagram Language for Amplifier

### The "Bricks & Studs" Visual System

Amplifier's composition model is inherently visual—bundles snap together like LEGO. This should be THE signature visual.

```
┌─────────────────────────────────────────────────────────────┐
│                    BUNDLE COMPOSITION                        │
│                                                              │
│    ┌──────────┐                                              │
│    │ BUNDLE   │  ← Top-level configuration                   │
│    │ ●  ●  ●  │  ← Studs (connection points)                 │
│    └────┬─────┘                                              │
│         │ snaps onto                                         │
│    ┌────┴─────┐  ┌──────────┐  ┌──────────┐                  │
│    │ PROVIDER │  │  TOOLS   │  │  HOOKS   │                  │
│    │ ○  ○  ○  │  │ ○  ○  ○  │  │ ○  ○  ○  │                  │
│    │ ●  ●  ●  │  │ ●  ●  ●  │  │ ●  ●  ●  │                  │
│    └──────────┘  └──────────┘  └──────────┘                  │
│         ↓              ↓              ↓                      │
│    Can compose    Can compose    Can compose                 │
│    with more      with more      with more                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Isometric Exploded Views

Inspired by MakingSoftware, show Amplifier's architecture as exploded isometric diagrams:

**Hero diagram concept:**
```
                    ┌─────────────┐
                   /             /│
                  /   BUNDLE    / │  ← Configuration layer
                 /─────────────/  │
                │ instructions │  │
                │              │ /
                └──────┬───────┘/
                       │
         ┌─────────────┼─────────────┐
         ↓             ↓             ↓
    ┌─────────┐   ┌─────────┐   ┌─────────┐
   /         /│  /         /│  /         /│
  / PROVIDER/ │ /  TOOLS  / │ /  HOOKS  / │
 /─────────/  │/─────────/  │/─────────/  │
│ anthropic│  ││ bash    │  ││ logging │  │
│ openai   │ / │ grep    │ / │ notify  │ /
└─────────┘/  └─────────┘/  └─────────┘/
     ↓             ↓             ↓
   LLMs        Actions       Events
```

### Connection Lines & Callouts

From MakingSoftware's blueprint style:
- **Leader lines** with dots connecting labels to components
- **Dimension annotations** showing data flow direction
- **Technical callouts** explaining each component's role

---

## 2. Color System

### Signal as Primary Accent

The Signal color (`#5B4DE3`) works well as:
- Active states and interactive elements
- Data flow indicators in diagrams
- Progress markers in scroll animations

### Component Color Coding

| Component | Color | Hex | Purpose |
|-----------|-------|-----|---------|
| **Bundles** | Signal (violet) | `#5B4DE3` | Primary container, configuration |
| **Providers** | Emerald | `#10B981` | LLM connections, intelligence |
| **Tools** | Amber | `#F59E0B` | Actions, capabilities |
| **Hooks** | Cyan | `#06B6D4` | Events, observation |
| **Agents** | Rose | `#F43F5E` | Delegation, sub-tasks |
| **Context** | Slate | `#64748B` | Memory, state |

### Background Strategy

From Apple/XREAL research:
- **Dark mode primary** (`#0A0A0A`) — video content pops, premium feel
- **Light sections** for documentation/text-heavy areas
- **Gradient transitions** between dark video and light content

---

## 3. Animation & Scroll Patterns

### Scroll-Triggered Narrative Arc

Combining XREAL's storytelling with Apple's technical execution:

```
SCROLL DEPTH    CONTENT                      TECHNIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0-10%           HERO                         Video: Abstract data flow
                "Amplify your work"          Auto-play loop on dark bg
                
10-25%          THE PROBLEM                  Scroll-reveal
                Fragmented AI tools          Split-screen: chaos → order
                Context lost, repeat work    
                
25-45%          THE SOLUTION                 Pinned section
                Bundle composition           Animated exploded diagram
                Bricks snapping together     Image sequence scrub
                
45-65%          HOW IT WORKS                 Scroll-linked diagrams
                Provider → Tool → Hook       Each component reveals
                Agent delegation flow        Connection lines animate
                
65-80%          THE ECOSYSTEM                Grid + hover
                Explore bundles              Interactive cards
                Foundation, Python, etc.     
                
80-95%          GET STARTED                  Parallax fade
                Install command              Terminal animation
                First prompt                 Typewriter effect
                
95-100%         CTA                          Fixed footer reveal
                "Start building"             
```

### Animation Techniques

| Technique | Use For | Implementation |
|-----------|---------|----------------|
| **Image sequence scrub** | Hero, composition demo | Canvas + RAF, 60 frames |
| **CSS scroll-driven** | Parallax, fade reveals | Native API (Chrome 115+) |
| **GSAP ScrollTrigger** | Pinned sections, timelines | Library fallback |
| **Intersection Observer** | Lazy load, trigger states | Native, lightweight |

### Diagram Animations

From MakingSoftware, but with scroll control:

1. **Bundle Assembly**
   - Components float in space (exploded)
   - Scroll brings them together
   - Final snap with subtle bounce

2. **Data Flow**
   - Dotted lines trace paths
   - Particles flow along connections
   - Speed varies with scroll velocity

3. **Agent Delegation**
   - Task splits into sub-tasks
   - Child agents appear
   - Results flow back up

---

## 4. Typography

### Font Pairing

Inspired by MakingSoftware's Departure Mono + New York:

| Use | Font | Style |
|-----|------|-------|
| **Hero headlines** | Inter Display | 700, -0.02em tracking |
| **Code/technical** | JetBrains Mono | 400, for diagrams |
| **Body** | Inter | 400, high readability |
| **Diagram labels** | JetBrains Mono | Uppercase, 11px |

### Scale

```css
--text-hero: clamp(48px, 8vw, 96px);
--text-display: clamp(36px, 5vw, 64px);
--text-heading: clamp(24px, 3vw, 36px);
--text-body: clamp(16px, 1.5vw, 18px);
--text-micro: 12px;
```

---

## 5. Unique Differentiators

### What Makes Amplifier's Style Distinct

| Influence | We Take | We Add |
|-----------|---------|--------|
| MakingSoftware | Technical illustration style | Interactive exploration |
| Apple | Scroll-sync precision | Warmer, more accessible |
| XREAL | Problem-solution narrative | Technical depth |

### Signature Elements

1. **The Brick Grid**
   - Subtle isometric grid as background pattern
   - Connotes composition, modularity
   - Appears in dark sections

2. **Connection Particles**
   - Data flows visualized as particles
   - Signal color (`#5B4DE3`) glowing dots
   - Move along connection paths

3. **Exploded Composition**
   - Components hover apart
   - User scroll assembles them
   - Satisfying "snap" animations

4. **Terminal Integration**
   - Real terminal aesthetic for code
   - Matches CLI experience
   - Typewriter reveals

---

## 6. Video Content Suggestions

For the videos you'll create:

### Hero Video (0-10% scroll)
- **Content:** Abstract visualization of data transforming
- **Style:** Dark background, Signal-colored light trails
- **Loop:** Yes, 4-6 second seamless loop
- **Size:** <2MB WebM

### Problem Section (10-25%)
- **Content:** Split screen showing fragmented workflow
- **Style:** Slightly desaturated, chaotic feeling
- **Trigger:** Scroll-reveal, not loop

### Solution/Composition (25-45%)
- **Content:** 3D blocks assembling into structure
- **Style:** Isometric view, clean white/gray
- **Format:** Image sequence (60 frames) for scrub control

### How It Works (45-65%)
- **Content:** Data flow through system components
- **Style:** Diagram-style, connection lines lighting up
- **Format:** SVG animation or image sequence

---

## 7. Implementation Phases

### Phase 1: Foundation (Current)
✅ Signal color system
✅ Basic page structure
✅ Playground simulation

### Phase 2: Diagram System
- [ ] Create SVG diagram components
- [ ] Build isometric illustration library
- [ ] Implement connection line animations

### Phase 3: Scroll Experience
- [ ] Add GSAP ScrollTrigger
- [ ] Create image sequence for hero
- [ ] Build pinned section components

### Phase 4: Video Integration
- [ ] Integrate hero video (you provide)
- [ ] Add scroll-synced video sections
- [ ] Implement reduced-motion fallbacks

### Phase 5: Polish
- [ ] Performance optimization
- [ ] Mobile adaptations
- [ ] Accessibility audit

---

## 8. Technical Requirements

### Asset Specifications

| Asset Type | Resolution | Format | Target Size |
|------------|------------|--------|-------------|
| Hero video | 1920×1080 | WebM/MP4 | <2MB |
| Image sequence | 1920×1080 | WebP | 30-50KB/frame |
| SVG diagrams | Vector | SVG | <50KB each |
| Background grid | Tileable | SVG/CSS | <10KB |

### Browser Support

| Feature | Chrome | Safari | Firefox | Fallback |
|---------|--------|--------|---------|----------|
| Scroll-driven CSS | ✅ 115+ | ✅ 26+ | ❌ | GSAP |
| Image sequence | ✅ | ✅ | ✅ | Static image |
| WebM video | ✅ | ⚠️ | ✅ | MP4 |

### Performance Budgets

- **Initial load:** <500KB (above fold)
- **Total page:** <5MB (with lazy loading)
- **Time to interactive:** <3s
- **Largest contentful paint:** <2.5s

---

## Summary

Amplifier's visual identity combines:
- **MakingSoftware's** technical illustration craft
- **Apple's** scroll-sync precision
- **XREAL's** narrative storytelling

Into something unique:
- **Interactive assembly diagrams** that respond to scroll
- **Signal-colored** data flow visualizations
- **Premium technical manual** aesthetic
- **Accessible and performant** implementation

The key differentiator: **You're not just watching—you're assembling.** The scroll becomes an act of composition, mirroring Amplifier's core metaphor of bricks and studs.
