# Particle Color Strategy: Homepage Narrative Journey

**Created:** 2026-01-22  
**Status:** Active  
**Context:** Scroll-driven particle system for Amplifier homepage

---

## Design Philosophy

**Principle:** Color as emotional choreography, not decoration.

The particle system should act as an **ambient emotional layer** that:
- ✅ Reinforces the narrative arc without competing with content
- ✅ Transitions smoothly to guide the user's emotional journey
- ✅ Uses restraint—particles support, they don't dominate
- ✅ Works harmoniously against white backgrounds

**Against white:** Colors need enough presence to be felt, enough subtlety to avoid visual noise.

---

## The Narrative Arc

```
Emotion:   Inviting → Tension → Liberation → Clarity → Grounded → Refined
Intensity:   ■■■■□     ■■■■■■    ■■■■■■■■      ■■■■■       ■■□        ■■■□
Color:      Fresh     Friction   Breaking     Organized   Neutral    Elegant
                                    ▲ CLIMAX
```

**Story beats:**
1. **Hero** - Open invitation (welcoming)
2. **Problem** - Rising tension (constraint)
3. **Differentiation** - **CLIMAX** - Breaking free (liberation) ← Peak visual intensity
4. **Platform** - Calm structure (organized power)
5. **Demo** - Practical grounding (functional)
6. **Bundles** - Elegant resolution (refined sophistication)

---

## Section-by-Section Strategy

### 1. Hero - "Build AI Your Way"

**Emotional Goal:** Inviting, open, full of potential

**Color Strategy:**
```css
Primary Color:    #00D67D  /* Softer brand green (was #00ff88) */
Opacity:          0.4
Prominence:       Subtle
Particle Size:    2px
```

**Rationale:**
- **Desaturated brand green** - Familiar but not aggressive
- **Low opacity (0.4)** - Hero text is primary; particles are ambient texture
- **Subtle presence** - Welcoming without overwhelming first impression
- **Against white** - Just enough presence to feel alive, not compete

**Transition:** N/A (entry state)

---

### 2. Problem - "Most AI tools are black boxes"

**Emotional Goal:** Frustration, constraint, trapped

**Color Strategy:**
```css
Primary Color:    #CC3333  /* Desaturated red (was #ff4444) */
Opacity:          0.5
Prominence:       Medium
Particle Size:    2px
```

**Rationale:**
- **Muted red** - Tension without alarm (not error-red)
- **Increased opacity (0.5)** - Particles gain presence as tension rises
- **Medium prominence** - Reinforces frustration but doesn't overpower message
- **Against white** - Enough saturation to feel uncomfortable, not jarring

**Transition:** **Smooth fade (800ms)** - Gradual darkening as user scrolls into problem space

---

### 3. Differentiation - "Amplifier is open by design"

**Emotional Goal:** Liberation, transparency, breaking free ← **CLIMAX**

**Color Strategy:**
```css
Primary Color:    #00C4E8  /* Bright cyan (slightly toned from #00d4ff) */
Opacity:          0.7
Prominence:       Prominent
Particle Size:    2.5px  /* Slightly larger for emphasis */
```

**Rationale:**
- **Bright cyan** - Sky, openness, clarity, breaking through
- **High opacity (0.7)** - CLIMAX of narrative - particles are most visible
- **Prominent** - This is the "aha!" moment - visual reinforcement is key
- **Larger particles** - Increased presence at emotional peak
- **Against white** - Maximum visual intensity while maintaining elegance

**Transition:** **Distinct shift (400ms)** - Clear moment of transformation from red→cyan (tension→release)

---

### 4. Platform - "Built from composable pieces"

**Emotional Goal:** Organized power, clarity, modular precision

**Color Strategy:**
```css
Primary Color:    #6B2FC7  /* Refined purple (desaturated from #7c3aed) */
Opacity:          0.5
Prominence:       Medium
Particle Size:    2px
```

**Rationale:**
- **Deeper purple** - Sophistication, structure, architectural thinking
- **Reduced opacity (0.5)** - Calming after climax; organized, not chaotic
- **Medium prominence** - Present but allowing platform pillars to shine
- **Against white** - Feels technical, precise, considered

**Transition:** **Smooth fade (1000ms)** - Gradual calm as system reveals its structure

---

### 5. Demo - "How it works"

**Emotional Goal:** Practical, grounded, real-world application

**Color Strategy:**
```css
Primary Color:    #8B8B8B  /* Neutral gray (was #fbbf24 amber) */
Opacity:          0.25
Prominence:       Subtle (nearly invisible)
Particle Size:    2px
```

**Rationale:**
- **Neutral gray** - Steps back completely; code examples are hero here
- **Very low opacity (0.25)** - Ambient texture only, not distraction
- **Subtle** - Demo needs clarity; particles fade into background
- **Against white** - Barely perceptible movement, purely atmospheric

**Special Consideration:**
- Consider **fadeout trigger** at demo code blocks (opacity → 0.15)
- Particles should feel like "getting out of the way" for practical content

**Transition:** **Long smooth fade (1200ms)** - Deliberate retreat as focus shifts to code

---

### 6. Bundles - "Capture your workflow as code"

**Emotional Goal:** Refined, sophisticated, elegant resolution

**Color Strategy:**
```css
Primary Color:    #A68BB5  /* Muted mauve (desaturated from #ec4899 pink) */
Opacity:          0.45
Prominence:       Subtle-Medium
Particle Size:    2px
```

**Rationale:**
- **Muted mauve** - Sophisticated, refined, elegant (not playful pink)
- **Gentle opacity (0.45)** - Refined presence; cards are primary
- **Subtle-medium** - Supports elegant showcase without competing
- **Against white** - Feels premium, considered, complete

**Transition:** **Smooth gradual fade (1000ms)** - Gentle emergence of elegance

---

## Transition Choreography

### Scroll Trigger Points

```
Section Start → Trigger transition when section is 20% into viewport
Full Effect → Complete transition when section is 40% into viewport
```

**Why 20-40%?**
- Gives users time to register section change
- Transitions feel connected to scroll momentum
- Avoids jarring shifts at exact section boundaries

### Transition Styles Summary

| From → To | Style | Duration | Easing | Rationale |
|-----------|-------|----------|--------|-----------|
| **Hero → Problem** | Smooth fade | 800ms | ease-in-out | Gradual darkening |
| **Problem → Differentiation** | Distinct shift | 400ms | ease-out | CLIMAX moment |
| **Differentiation → Platform** | Smooth fade | 1000ms | ease-in-out | Calming structure |
| **Platform → Demo** | Long fade | 1200ms | ease-in | Deliberate retreat |
| **Demo → Bundles** | Smooth fade | 1000ms | ease-out | Gentle refinement |

---

## Visual Intensity Graph

```
Opacity
0.7 |              ●  (Differentiation - CLIMAX)
    |            ╱   ╲
0.5 |         ●         ●  (Problem)    (Platform)
    |       ╱             ╲
0.45|                        ╲___________●  (Bundles)
0.4 |    ●                                  (Hero)
    |                          ╲
0.25|                            ●  (Demo - retreat)
    |
    +----1----2----3----4----5----6----> Section
```

**Emotional beats visualized:**
- **Peak intensity** at Differentiation (breaking free)
- **Lowest intensity** at Demo (practical focus)
- **Refined resolution** at Bundles (elegant close)

---

## Implementation Tokens

```typescript
export const PARTICLE_SECTIONS = {
  hero: {
    color: '#00D67D',     // Soft brand green
    opacity: 0.4,
    prominence: 'subtle',
    particleSize: 2,
    transitionDuration: 0, // Entry state
    transitionEasing: 'ease-in-out',
  },
  problem: {
    color: '#CC3333',     // Muted red
    opacity: 0.5,
    prominence: 'medium',
    particleSize: 2,
    transitionDuration: 800,
    transitionEasing: 'ease-in-out',
  },
  differentiation: {
    color: '#00C4E8',     // Bright cyan
    opacity: 0.7,
    prominence: 'prominent',
    particleSize: 2.5,    // CLIMAX emphasis
    transitionDuration: 400,
    transitionEasing: 'ease-out',
  },
  platform: {
    color: '#6B2FC7',     // Refined purple
    opacity: 0.5,
    prominence: 'medium',
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-in-out',
  },
  demo: {
    color: '#8B8B8B',     // Neutral gray
    opacity: 0.25,
    prominence: 'subtle',
    particleSize: 2,
    transitionDuration: 1200,
    transitionEasing: 'ease-in',
    // Special: Reduce to 0.15 at code blocks
  },
  bundles: {
    color: '#A68BB5',     // Muted mauve
    opacity: 0.45,
    prominence: 'subtle-medium',
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-out',
  },
}

// Scroll trigger thresholds
export const TRANSITION_TRIGGERS = {
  startThreshold: 0.2,   // Begin transition at 20% viewport
  completeThreshold: 0.4, // Complete transition at 40% viewport
}
```

---

## Special Considerations

### 1. **Demo Section Fade-Out**

When user scrolls to code examples within Demo section:
```typescript
// Reduce particle opacity further for code clarity
if (isCodeBlockVisible) {
  targetOpacity = 0.15  // From 0.25 → 0.15
}
```

### 2. **Mobile Adjustments**

On smaller screens, consider:
- **Reduce base opacity by 0.1** across all sections (less visual competition)
- **Smaller particle sizes** (1.5px vs 2px) for performance
- **Faster transitions** (reduce durations by 200ms) for snappier feel

### 3. **Accessibility**

For users with motion sensitivity:
```css
@media (prefers-reduced-motion: reduce) {
  /* Instant transitions, no smooth fades */
  transition-duration: 0ms !important;
  
  /* Further reduce opacity for less visual movement */
  opacity: opacity * 0.7;
}
```

---

## Color Palette Reference

### Against White Background Testing

| Section | Hex | RGB | HSL | Contrast | Visual Feel |
|---------|-----|-----|-----|----------|-------------|
| **Hero** | `#00D67D` | `0, 214, 125` | `155°, 100%, 42%` | ✓ Good | Fresh, inviting |
| **Problem** | `#CC3333` | `204, 51, 51` | `0°, 60%, 50%` | ✓ Good | Tension, not alarm |
| **Differentiation** | `#00C4E8` | `0, 196, 232` | `189°, 100%, 45%` | ✓ Excellent | Clear, liberating |
| **Platform** | `#6B2FC7` | `107, 47, 199` | `264°, 62%, 48%` | ✓ Good | Sophisticated, structured |
| **Demo** | `#8B8B8B` | `139, 139, 139` | `0°, 0%, 55%` | ✓ Neutral | Functional, grounded |
| **Bundles** | `#A68BB5` | `166, 139, 181` | `279°, 23%, 63%` | ✓ Good | Elegant, refined |

**All colors tested at specified opacities against #FFFFFF background.**

---

## Success Criteria

This color strategy succeeds when:

✅ Users feel the emotional journey without consciously noticing color changes
✅ Content remains primary; particles support but never compete
✅ Transitions feel smooth and connected to scroll momentum
✅ The climax moment (Differentiation) has clear visual peak
✅ Demo section particles "get out of the way" for code focus
✅ Overall journey feels cohesive, intentional, and refined

---

## Evolution Notes

**Current Phase:** Initial strategy based on narrative arc analysis

**Future Considerations:**
- User testing: Does color journey reinforce or distract?
- Performance: Monitor transition smoothness on mobile devices
- Accessibility: Validate with motion-sensitive users
- A/B testing: Alternative palettes for different emotional tones

**Update this guide when:**
- Narrative structure changes
- User feedback indicates color conflicts with content
- Brand colors evolve
- New sections are added to homepage

---

## Visual Summary

**The Journey:**
1. **Hero** - Soft green invitation (0.4 opacity)
2. **Problem** - Muted red tension (0.5 opacity)
3. **Differentiation** - **Bright cyan liberation** (0.7 opacity) ← PEAK
4. **Platform** - Refined purple structure (0.5 opacity)
5. **Demo** - Neutral gray retreat (0.25 opacity) ← LOWEST
6. **Bundles** - Muted mauve elegance (0.45 opacity)

**Color tells the story your words begin.**

---

*End of Particle Color Strategy*
