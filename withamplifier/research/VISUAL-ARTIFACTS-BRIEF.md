# Visual Artifacts Brief for withamplifier.com

Creative brief for AI-generated video assets using Google Veo.

---

## Design Language

**Aesthetic:** Warm, minimal, sophisticated. Apple meets Linear.
**Palette:** Cream (#FFFBF5), soft gradients, indigo/violet accents
**Motion:** Smooth, deliberate, unhurried. 300-600ms easing.
**Feel:** Calm confidence. Not flashy, not corporate. Thoughtful.

---

## Video Specifications

| Spec | Value |
|------|-------|
| Aspect ratio | 16:9 (desktop), 1:1 (mobile alternate) |
| Duration | 6-12 seconds, seamless loop |
| Resolution | 1080p minimum, 4K preferred |
| Format | MP4 (H.264) or WebM |
| Style | Abstract, ambient, no text overlays |

---

## Artifact 1: Hero Background

**Placement:** Homepage hero section
**Purpose:** Ambient motion that reinforces "yours for the making" — creative, generative energy

**Veo Prompt:**
```
Abstract generative art, soft warm cream and white gradient background, subtle flowing particles of light in indigo and soft violet, organic movement like creative energy forming and reforming, minimal and sophisticated, gentle luminous glow, seamless loop, smooth slow motion, inspired by Apple product videos, no text, no UI elements, cinematic quality, shallow depth of field
```

**Alt Prompt (more geometric):**
```
Abstract minimal animation, warm cream background, soft geometric shapes slowly morphing and connecting, translucent indigo and violet elements floating gently, like modular pieces finding their place, sophisticated and calm, seamless loop, Apple aesthetic, no text
```

---

## Artifact 2: Black Box Problem

**Placement:** Homepage "Most AI tools are black boxes" section
**Purpose:** Visualize opacity, mystery, lack of visibility

**Veo Prompt:**
```
Abstract dark visualization, deep charcoal and obsidian background, a softly glowing opaque cube or sphere, mysterious and impenetrable, subtle particles trying to enter but deflecting, represents hidden complexity, moody atmospheric lighting, seamless loop, cinematic, no text
```

---

## Artifact 3: Modular Assembly

**Placement:** Homepage "Everything is a swappable piece" section
**Purpose:** Show pieces connecting, modularity in action

**Veo Prompt:**
```
Abstract modular assembly animation, warm cream background, three distinct translucent geometric shapes in soft indigo violet and warm amber, smoothly floating and connecting together like LEGO pieces snapping, then gently separating and reconfiguring, represents modularity and flexibility, minimal sophisticated aesthetic, seamless loop, no text
```

**Alt Prompt:**
```
Soft abstract animation, minimal shapes representing provider tool and behavior connecting into a unified form, warm light palette with indigo accents, gentle magnetic attraction between elements, Apple-inspired motion design, seamless loop, no text
```

---

## Artifact 4: Code Flow / Terminal

**Placement:** Homepage "One command. Real work." section (background or accent)
**Purpose:** Subtle energy of code executing, work happening

**Veo Prompt:**
```
Abstract visualization of data flowing, soft streams of light moving horizontally like lines of code being processed, warm cream and soft white with subtle indigo highlights, gentle pulsing rhythm, represents computation and execution, minimal and elegant, seamless loop, no text, no actual code visible
```

---

## Artifact 5: Compounding Growth

**Placement:** Homepage "Control that compounds" section
**Purpose:** Visualize accumulation, building, compounding value

**Veo Prompt:**
```
Abstract growth visualization, dark gradient background charcoal to deep indigo, soft luminous particles slowly accumulating and building upward, organic branching patterns forming like a growing network, represents compounding investment, calm and sophisticated, seamless loop, no text
```

---

## Artifact 6: Ecosystem / Network

**Placement:** Homepage "Share what works" section
**Purpose:** Visualize community, sharing, interconnection

**Veo Prompt:**
```
Abstract network visualization, warm cream background, soft nodes of light in various warm colors gently pulsing and connected by thin translucent lines, nodes occasionally sending soft pulses to each other, represents community and sharing, organic and alive but calm, minimal sophisticated aesthetic, seamless loop, no text
```

---

## Artifact 7: Explore Page Hero

**Placement:** Explore page hero background
**Purpose:** Discovery, browsing, possibility

**Veo Prompt:**
```
Abstract visualization of discovery, warm cream gradient background, soft floating translucent cards or panels gently drifting in 3D space, subtle indigo and violet tints, represents browsing and exploration, one element occasionally comes into focus then recedes, calm and inviting, seamless loop, no text
```

---

## Artifact 8: Build Page Hero

**Placement:** Build page hero background  
**Purpose:** Construction, getting started, hands-on

**Veo Prompt:**
```
Abstract building visualization, warm cream background, soft geometric shapes being placed one by one in a gentle stacking motion, like blocks being carefully arranged, warm amber and soft indigo accents, represents construction and creation, satisfying and calm, seamless loop, no text
```

---

## Artifact 9: Provider Swap

**Placement:** Build page providers section (optional accent)
**Purpose:** Illustrate swapping, interchangeability

**Veo Prompt:**
```
Abstract swap animation, minimal warm background, two soft glowing orbs smoothly trading places in an elegant arc, then settling, represents interchangeability and flexibility, sophisticated minimal motion, seamless loop, no text
```

---

## Artifact 10: Support/Community

**Placement:** Support page hero (optional)
**Purpose:** Help, connection, human warmth

**Veo Prompt:**
```
Abstract connection visualization, warm cream background, two soft luminous shapes gently reaching toward each other and briefly connecting with a soft pulse of light, represents help and human connection, warm and reassuring, seamless loop, no text
```

---

## Usage Notes

### Implementation
- Videos should be muted and autoplay
- Use `<video autoplay muted loop playsinline>` for web
- Provide poster frame for loading state
- Consider reduced-motion media query — fallback to static gradient

### File Naming
```
hero-ambient-loop.mp4
problem-blackbox-loop.mp4
architecture-modular-loop.mp4
demo-codeflow-loop.mp4
benefits-compound-loop.mp4
ecosystem-network-loop.mp4
explore-hero-loop.mp4
build-hero-loop.mp4
providers-swap-loop.mp4
support-connection-loop.mp4
```

### Priority Order
1. **Hero Background** — Highest impact, first impression
2. **Modular Assembly** — Core concept visualization
3. **Ecosystem Network** — Community/sharing story
4. **Explore Hero** — Second most visited page
5. **Build Hero** — Third most visited page
6. Rest as bandwidth allows

---

## Iteration Notes

After generating, evaluate against:
- [ ] Does it feel warm, not cold/corporate?
- [ ] Is motion smooth and unhurried?
- [ ] Does it enhance without distracting?
- [ ] Does it loop seamlessly?
- [ ] Does it work at low opacity as background?

Regenerate with adjusted prompts as needed. Add "slower motion" or "more subtle" if too energetic.

---

## Prompt Modifiers

Add these to any prompt to adjust:

| Need | Add to prompt |
|------|---------------|
| Slower | "very slow gentle motion, meditative pace" |
| Warmer | "warm golden hour lighting, cozy atmosphere" |
| More minimal | "extremely minimal, barely perceptible motion" |
| More depth | "cinematic depth of field, atmospheric haze" |
| Loopable | "perfect seamless loop, no visible cut point" |
