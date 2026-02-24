# Video Artifacts Creative Brief
## withamplifier.com

**Version:** 1.0  
**Created:** January 2026  
**Design System:** Gemini-inspired with Apple motion principles

---

## Executive Summary

This brief defines video artifacts for withamplifier.com - an AI agent framework website. Videos serve as **ambient enhancement**, not primary content delivery. They should feel like "living gradients" - abstract, warm, and suggestive of intelligence and potential.

### Design Principles for Video

1. **Warmth over coldness** - No sterile tech aesthetics. Cream tones, soft edges, organic movement.
2. **Suggestion over explanation** - Abstract motion that evokes concepts, not literal demonstrations.
3. **Stillness with energy** - Most of the frame should be calm; motion should be directional and purposeful.
4. **Seamless loops** - All videos must loop imperceptibly for ambient backgrounds.
5. **Performance-first** - Target 1080p max, highly compressible motion, no complex particle systems.

### Color Palette for Video

| Token | Hex | Usage |
|-------|-----|-------|
| Canvas Warm | `#FDFCFA` | Light backgrounds, diffused areas |
| Depth Obsidian | `#0a0a0a` | Dark sections, shadows |
| Signal Indigo | `#6366F1` | Primary accent, energy sources |
| Signal Light | `#818CF8` | Secondary glow, transitions |
| Warm Orange | `#FB923C` | Accent warmth, diffused tails |
| Soft Pink | `#EC4899` | Gradient endpoints |

---

## Artifact Specifications

### Technical Requirements

- **Format:** MP4 (H.264) + WebM (VP9) for fallback
- **Resolution:** 1920x1080 (scale down for mobile via CSS)
- **Frame Rate:** 30fps (24fps acceptable for ambient)
- **Duration:** 6-10 seconds for seamless loops
- **Compression:** CRF 23-26, prioritize file size under 2MB
- **Audio:** None (all videos silent)

### Implementation Notes

Videos will be implemented as:
```html
<video autoplay muted loop playsinline class="absolute inset-0 object-cover opacity-30">
  <source src="/video/hero-orbs.webm" type="video/webm">
  <source src="/video/hero-orbs.mp4" type="video/mp4">
</video>
```

Opacity will be controlled via CSS (typically 20-40%) to ensure text legibility.

---

## HOME PAGE Artifacts

---

### Artifact #1: Hero Gradient Orbs

**Section:** Hero ("Yours for the making")  
**Placement:** Full-bleed background behind headline, beneath gradient orb CSS elements  
**Purpose:** Reinforce the "expansion from stillness" aesthetic. Suggest latent intelligence awakening.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 25-30%

**Style Direction:**  
Abstract, organic. Two or three soft luminous forms that slowly breathe and interact without touching. Think "aurora borealis meets ink in water" but warmer. The forms should feel like they contain potential energy - intelligent but dormant.

**What Moves:**
- Soft gradient orbs (indigo primary, warm orange secondary)
- Subtle internal luminosity shifts
- Gentle drift/rotation (barely perceptible)

**What Stays Still:**
- Overall composition center of mass
- Edge boundaries (forms stay within frame)
- No particles, no sharp lines

**VEO PROMPT:**
```
Abstract ambient video. Soft luminous orbs in deep indigo (#6366F1) and warm orange (#FB923C) floating against a warm cream background (#FDFCFA). The orbs have diffused edges like watercolor or fog, slowly breathing and pulsing with internal light. Very slow, organic drift movement. No particles. No sharp edges. The forms never touch but seem aware of each other. Dreamy, warm, intelligent feeling. Camera static. Seamless loop. 8 seconds.
```

---

### Artifact #2: Black Box Reveal

**Section:** Problem ("You can't see inside")  
**Placement:** Background behind the 3-column problem grid  
**Purpose:** Visualize opacity/mystery. Something hidden, inaccessible, frustrating.

**Duration:** 6 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 15-20%

**Style Direction:**  
Dark, mysterious, slightly unsettling. A form that suggests depth but refuses to reveal itself. Like trying to see through frosted black glass. The viewer should feel the frustration of opacity.

**What Moves:**
- Subtle internal shimmer behind dark surface
- Faint light trying (and failing) to penetrate
- Slow, frustrated energy movement

**What Stays Still:**
- The dark barrier itself
- Overall darkness level
- No reveals, no answers

**VEO PROMPT:**
```
Abstract dark ambient video. A deep obsidian black (#0a0a0a) surface with subtle depth. Behind it, faint indigo (#6366F1) light pulses and moves, trying to break through but never succeeding. The surface has a frosted glass quality - you sense movement behind it but cannot see clearly. Mysterious, slightly frustrating mood. The light shifts and probes but the darkness remains impenetrable. No text, no particles. Camera static. Seamless loop. 6 seconds.
```

---

### Artifact #3: Modular Assembly

**Section:** Architecture ("Three building blocks")  
**Placement:** Background or inline visual showing components coming together  
**Purpose:** Visualize modularity, composability, the satisfaction of pieces fitting.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9 or 1:1 (square for inline placement)  
**Suggested Opacity:** 30-40% (or full opacity if inline)

**Style Direction:**  
Abstract but with more geometric suggestion than other videos. Soft-edged rounded rectangles or pill shapes that drift, align momentarily, then continue moving. Like watching magnets that gently attract and release. Satisfying, modular, combinatorial.

**What Moves:**
- Rounded abstract shapes (suggesting Providers, Tools, Behaviors)
- Gentle drift and occasional alignment
- Soft glow connections when shapes near each other

**What Stays Still:**
- Background gradient
- Overall visual density
- Shapes stay in loose formation

**VEO PROMPT:**
```
Abstract ambient video showing modularity. Three softly-glowing rounded rectangular shapes in indigo (#6366F1), soft purple (#818CF8), and warm peach (#FB923C) against warm cream background (#FAF8F5). The shapes drift slowly in space, occasionally aligning into formations before gently separating. When shapes approach each other, a subtle connecting glow appears between them. Soft edges, no hard lines. Suggests building blocks that fit together. Dreamy, satisfying, modular feeling. Camera static. Seamless loop. 8 seconds.
```

---

### Artifact #4: Control Compounds (Benefits)

**Section:** Benefits ("Control that compounds")  
**Placement:** Background behind the 2x2 benefit card grid  
**Purpose:** Visualize growth, accumulation, compounding value over time.

**Duration:** 10 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 12-18%

**Style Direction:**  
Dark background (this is a dark section). Abstract visualization of something building on itself. Could be concentric waves emanating slowly, or spiral energy that accumulates. The feeling should be "each cycle adds to the last."

**What Moves:**
- Concentric rings or spiral energy expanding slowly
- Subtle accumulation effect - each wave adds luminosity
- Directional gradient "energy transfer" (sharp leading edge, diffused tail)

**What Stays Still:**
- Origin point
- Overall composition balance
- Background darkness

**VEO PROMPT:**
```
Abstract dark ambient video. Against deep black (#0a0a0a), soft indigo (#6366F1) energy radiates outward from center in slow concentric waves. Each wave has a sharp leading edge that fades to a soft diffused tail - like ripples in dark water lit from below. As waves expand, the overall luminosity slowly builds, suggesting accumulation and compounding. Subtle purple (#818CF8) and pink (#EC4899) color shifts in the outer waves. Meditative, powerful, growing. No particles. Camera static. Seamless loop. 10 seconds.
```

---

### Artifact #5: Network Constellation

**Section:** Ecosystem ("Built by many")  
**Placement:** Background behind bundle pills and community message  
**Purpose:** Visualize community, connection, distributed contribution.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 20-25%

**Style Direction:**  
Light background. Abstract network visualization - not literal nodes and edges, but suggested connections. Points of warm light that seem aware of each other, with faint luminous threads connecting them. Community, not hierarchy.

**What Moves:**
- Soft light points drifting in constellation patterns
- Faint connection threads pulsing
- Gentle overall breathing/pulsing

**What Stays Still:**
- Overall network density
- Background warmth
- No points enter or leave

**VEO PROMPT:**
```
Abstract ambient video. Warm cream background (#FAF8F5) with scattered soft points of indigo (#6366F1) and warm orange (#FB923C) light. The points are connected by extremely faint luminous threads that pulse gently. The points drift slowly, maintaining their connections like a breathing constellation. Suggests community and distributed intelligence. Warm, connected, alive feeling. No sharp lines or geometric shapes. Organic network aesthetic. Camera static. Seamless loop. 8 seconds.
```

---

## EXPLORE PAGE Artifacts

---

### Artifact #6: Infinite Possibilities

**Section:** Hero ("The infinite Lego box")  
**Placement:** Background behind headline  
**Purpose:** Visualize endless combinatorial potential, abundance, discovery.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 20-25%

**Style Direction:**  
Abundance without chaos. Many small luminous elements in a field, suggesting infinite variety but organized potential. Like looking into a treasure chest of light.

**What Moves:**
- Field of small soft lights at various depths
- Gentle parallax-like drift (closer elements move more)
- Subtle color shifts between indigo, purple, orange

**What Stays Still:**
- Overall density and composition
- Depth layers relationship
- Frame boundaries

**VEO PROMPT:**
```
Abstract ambient video suggesting infinite possibility. Warm cream background (#FDFCFA) with a field of many small, soft luminous dots at varying depths - some closer and larger, some distant and tiny. Colors shift between indigo (#6366F1), soft purple (#818CF8), and warm orange (#FB923C). Gentle parallax movement - closer dots drift more than distant ones. Creates depth and abundance. Like looking into an infinite field of potential. Dreamy, abundant, inviting. Camera static. Seamless loop. 8 seconds.
```

---

### Artifact #7: Trace Playback Abstract

**Section:** Demo area (when bundle demo is playing)  
**Placement:** Subtle accent behind or beside the PlaygroundSimulation component  
**Purpose:** Visualize the agent "thinking" - processing, deciding, executing.

**Duration:** 6 seconds (seamless loop)  
**Aspect Ratio:** 1:1 (square accent) or 4:3  
**Suggested Opacity:** 30-40%

**Style Direction:**  
More active than other videos. Suggests intelligence at work - processing, considering, acting. Directional flow that implies input-process-output.

**What Moves:**
- Flowing energy streams (left to right or spiral inward)
- Pulse points suggesting decision moments
- Subtle "processing" shimmer

**What Stays Still:**
- Overall flow direction
- Color palette
- Energy level (consistently active)

**VEO PROMPT:**
```
Abstract ambient video showing AI processing. Against warm cream (#FAF8F5), soft streams of indigo (#6366F1) energy flow from left to right, like thoughts moving through a mind. Occasionally the streams pulse brighter at points, suggesting moments of decision or insight. The energy has a sharp leading edge that fades to diffused tail. Movement is smooth and continuous, like watching thought itself. Intelligent, active, purposeful. No particles. Camera static. Seamless loop. 6 seconds.
```

---

## BUILD PAGE Artifacts

---

### Artifact #8: Installation Energy

**Section:** Install section (hero area)  
**Placement:** Subtle background accent  
**Purpose:** Convey the excitement of starting, the energy of beginning a journey.

**Duration:** 6 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 15-20%

**Style Direction:**  
Minimal, focused. A single point of energy that radiates potential. The moment before action.

**What Moves:**
- Central point of soft light gently pulsing
- Subtle radial glow expansion
- Barely perceptible breathing

**What Stays Still:**
- Center point location
- Overall minimalism
- Frame composition

**VEO PROMPT:**
```
Abstract minimal ambient video. Warm cream background (#FAF8F5) with a single soft point of indigo (#6366F1) light at center. The point pulses very gently, with a subtle radial glow that expands and contracts like breathing. Minimal, focused, potential energy. Like a cursor waiting, ready to begin. Clean, simple, inviting. Camera static. Seamless loop. 6 seconds.
```

---

### Artifact #9: Provider Connections

**Section:** Providers (4-card grid)  
**Placement:** Shared background behind provider cards  
**Purpose:** Visualize the flexibility of provider switching, interoperability.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9  
**Suggested Opacity:** 15-20%

**Style Direction:**  
Four subtle anchor points with energy that can flow between any of them. Suggests that any connection is possible, any combination works.

**What Moves:**
- Soft connection threads between four anchor points
- Connections shift and reconfigure
- Subtle glow pulses traveling along connections

**What Stays Still:**
- The four anchor points (corners of loose square)
- Background
- Overall energy level

**VEO PROMPT:**
```
Abstract ambient video showing interoperability. Warm cream background (#FAF8F5) with four soft glowing points arranged in a loose square formation. Faint luminous threads in indigo (#6366F1) connect the points, and these connections slowly shift - sometimes all points connected, sometimes pairs, always reconfiguring. Subtle light pulses travel along the connections. Suggests flexibility and interchangeability. Smooth, modular, adaptable. Camera static. Seamless loop. 8 seconds.
```

---

### Artifact #10: Forge Teaser

**Section:** Forge teaser ("Coming soon")  
**Placement:** Background or inline teaser visual  
**Purpose:** Build anticipation for the desktop app. Something being forged, created.

**Duration:** 8 seconds (seamless loop)  
**Aspect Ratio:** 16:9 or 4:3  
**Suggested Opacity:** 25-35%

**Style Direction:**  
Warmer than other videos. Suggests creation, crafting, something being formed. Could have subtle "forge fire" warmth with indigo/orange interplay.

**What Moves:**
- Warm orange and indigo energies interacting
- Suggesting something being shaped or formed
- Building intensity (within seamless loop)

**What Stays Still:**
- Central formation area
- Overall warmth level
- Frame composition

**VEO PROMPT:**
```
Abstract ambient video suggesting creation and forging. Warm stone background (#F5F3F0) with interacting energies in warm orange (#FB923C) and deep indigo (#6366F1). The energies swirl gently around a central point, as if something is being formed or crafted. Occasional brighter pulses suggest moments of creation. Warm, anticipatory, crafting feeling. Like watching something valuable being made. No hard shapes, purely energetic. Camera static. Seamless loop. 8 seconds.
```

---

## Priority Ranking

Based on visual impact and page importance:

| Priority | Artifact | Section | Impact |
|----------|----------|---------|--------|
| 1 | Hero Gradient Orbs | Home Hero | First impression, brand identity |
| 2 | Black Box Reveal | Home Problem | Emotional resonance, problem statement |
| 3 | Modular Assembly | Home Architecture | Core concept visualization |
| 4 | Control Compounds | Home Benefits | Value proposition support |
| 5 | Network Constellation | Home Ecosystem | Community feeling |
| 6 | Infinite Possibilities | Explore Hero | Page identity |
| 7 | Forge Teaser | Build Page | Anticipation builder |
| 8 | Installation Energy | Build Hero | Momentum |
| 9 | Provider Connections | Build Providers | Flexibility visualization |
| 10 | Trace Playback Abstract | Explore Demo | Active state enhancement |

---

## Implementation Checklist

### Phase 1: Core Brand Videos (Priority 1-3)
- [ ] Generate Hero Gradient Orbs
- [ ] Generate Black Box Reveal
- [ ] Generate Modular Assembly
- [ ] Compress and optimize all three
- [ ] Implement with appropriate opacity and positioning
- [ ] Test on mobile (ensure performance)

### Phase 2: Supporting Videos (Priority 4-7)
- [ ] Generate Control Compounds
- [ ] Generate Network Constellation
- [ ] Generate Infinite Possibilities
- [ ] Generate Forge Teaser
- [ ] Compress and optimize
- [ ] Implement with lazy loading for below-fold content

### Phase 3: Enhancement Videos (Priority 8-10)
- [ ] Generate Installation Energy
- [ ] Generate Provider Connections
- [ ] Generate Trace Playback Abstract
- [ ] Final optimization pass
- [ ] Performance audit

---

## Quality Checklist for Each Video

Before implementation, verify each video meets these criteria:

- [ ] Loops seamlessly (no visible cut point)
- [ ] Colors match design system tokens
- [ ] Motion is subtle enough at intended opacity
- [ ] File size under 2MB (ideally under 1MB)
- [ ] No visual artifacts or banding
- [ ] Works against both light and dark backgrounds (if applicable)
- [ ] Maintains quality when scaled down for mobile
- [ ] Does not distract from text content
- [ ] Enhances emotional tone of section

---

## Notes for Veo Generation

1. **Run each prompt multiple times** - Generative video has variance. Generate 3-5 versions and select the best.

2. **Seamless loops are critical** - If Veo doesn't produce a clean loop, use video editing to crossfade the endpoints.

3. **Color accuracy matters** - Veo may interpret hex codes differently. Be prepared to color-grade output to match the design system.

4. **Less is more** - If output is too busy, re-prompt with additional constraints: "minimal," "very subtle," "barely perceptible movement."

5. **Test at target opacity** - A video that looks good at 100% may be invisible at 20%. Conversely, a subtle video may be perfect when dimmed.

---

## Appendix: CSS Implementation Patterns

### Background Video Pattern
```css
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .video-background {
    display: none;
  }
}

/* Performance: pause when not visible */
.video-background:not(:visible) {
  animation-play-state: paused;
}
```

### Responsive Video Considerations
```css
/* Hide video on low-powered devices */
@media (max-width: 768px) {
  .video-background-optional {
    display: none;
  }
}

/* Use reduced quality on mobile */
@media (max-width: 1024px) {
  .video-background {
    opacity: 0.15; /* Lighter for performance perception */
  }
}
```

---

*End of Creative Brief*
