# Chladni Pattern Background System

## Status: Implementing WebGL Shaders

**Last Updated:** 2026-01-22
**Current Phase:** Transitioning from Canvas 2D to WebGL for visual quality

---

## The Problem with Current Implementation

Canvas 2D approach (200-800 particles at 2-4px) cannot show the geometric beauty of Chladni nodal lines:
- Particles too sparse to form visible continuous lines
- Too large (2-4px) - need grain-like (1px)
- Mobile performance limits particle count
- **Can't see the mathematical beauty**

---

## Decision: WebGL Shader-based Particles

After evaluating 5 approaches (pre-rendered video, WebGL shaders, hybrid, static images, upgraded Canvas), **WebGL shaders** chosen for:

### Why WebGL

| Requirement | Canvas 2D | WebGL Shaders | Pre-rendered Video |
|-------------|-----------|---------------|-------------------|
| Grain-like particles (1px) | ❌ | ✅ | ✅ |
| 5,000-10,000 particles | ❌ | ✅ | ✅ |
| 60fps mobile | ❌ | ✅ | ✅ |
| Pattern transitions | ✅ | ✅ | ❌ |
| Works throughout story | ✅ | ✅ | ⚠️ Complex |
| Interactive (optional) | ✅ | ✅ | ❌ |
| Bundle size | 8KB | +17KB | +500KB-2MB |

### Key Advantages

1. **Visual Quality**: 10,000+ grain-like (1px) particles showing clear geometric nodal lines
2. **Performance**: GPU-parallel processing, 60fps on mobile with 5,000-8,000 particles
3. **Throughout Story**: All sections get beautiful patterns with smooth transitions
4. **Small Bundle**: Three.js tree-shaken (~17KB) vs 500KB+ video
5. **Scalability**: Automatically adapts to viewport sizes

### Fallback Strategy

If WebGL proves GPU-intensive or problematic:
- **Primary fallback**: Pre-rendered video (not Canvas 2D)
- Video gives guaranteed visual quality
- Sacrifices interactivity (acceptable - low priority)
- Would need multiple aspect ratios for responsive

---

## Concept

A scroll-driven background where particles reorganize into Chladni resonance patterns as users navigate through sections. Each section has a unique "frequency" that creates a distinct geometric pattern.

### Inspiration
- Ernst Chladni's acoustic experiments (1787)
- Particles collect at nodal lines (zero vibration points)
- Pattern complexity increases with frequency

### Core Equation
```
cos(n*PI*x/L) * cos(m*PI*y/L) - cos(m*PI*x/L) * cos(n*PI*y/L) = 0
```
Where n,m are integers controlling pattern complexity.

---

## Hero Choreography

**The hero section needs special treatment:**

1. **Page Load**: Particles scattered randomly (chaos state)
2. **2 seconds in**: Particles flow to nodal lines, forming beautiful geometric pattern
3. **Scroll away**: Pattern scatters again (force weakens, fades out)

This creates a "finding order from chaos" moment that sets the tone.

---

## Section-to-Pattern Mapping

| Section | Content | Pattern | Metaphor | Color |
|---------|---------|---------|----------|-------|
| Hero | "Build AI your way" | Chaos→(1,2) | Potential forming | Indigo 30% |
| **Problem** | "AI tools aren't understandable" | Scatter/chaos | Black box opacity | Signal glow 60% |
| Differentiation | "One runtime. Any model." | (2,3) | 3 pillars | Signal glow 60% |
| Platform | "Everything you need" | (3,4) | 4 capabilities | Indigo 40% |
| Demo | "See it in action" | (3,5) | Dynamic action | Violet 35% |
| Bundles | "Package it as a bundle" | (4,4) | Contained, unified | Indigo 25% |
| Impact | "Control that compounds" | (4,6) | Growth/expansion | Amber glow 50% |
| Contrast | "Most AI tools..." | (2,2) | Simple clarity | Indigo 30% |
| Ecosystem | "Start with what works" | (5,6) | Network/community | Violet 40% |
| CTA | "60 seconds" | (6,6) | Resolution/harmony | Signal glow 70% |

**Note**: Problem section now position 2, dark background, particles scatter to communicate "black box" opacity.

---

## Technical Approach (WebGL)

### Architecture
```
┌─────────────────────────────────────┐
│      WEBGL RENDERING LAYER          │
│  GPU-parallel particle rendering    │
│  GLSL shaders for physics           │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│       SHADER PHYSICS LAYER          │
│  - Chladni force field (GPU)        │
│  - Pattern interpolation            │
│  - Velocity/damping system          │
│  - (Optional) cursor influence      │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│       INTERACTION LAYER             │
│  - IntersectionObserver (sections)  │
│  - Uniform updates (n,m,transition) │
└─────────────────────────────────────┘
```

### Performance Targets
- Desktop: 60fps, 10,000-20,000 particles at 1px
- Mobile: 60fps, 5,000-8,000 particles at 1px
- Reduced motion: Static gradient fallback

### Key Implementation Details

**Vertex Shader** (chladni.vert):
- Compute Chladni force for each particle in parallel on GPU
- Update particle position/velocity per frame
- Interpolate between patterns during transitions
- Optional: Mouse repulsion (low priority)

**Fragment Shader** (chladni.frag):
- Render particles at 1px with circular shape
- Apply color and opacity based on section
- Additive blending for glow effect on nodal lines

**Three.js Integration**:
- BufferGeometry with position/velocity attributes
- ShaderMaterial with custom GLSL
- Points rendering system
- Uniform updates for pattern changes

---

## Files

- `/lib/chladni.ts` - Math utilities (existing, will be ported to GLSL)
- `/components/ChladniBackground.tsx` - Current Canvas 2D (will be replaced)
- `/components/ChladniWebGL.tsx` - New WebGL implementation
- `/shaders/chladni.vert` - Vertex shader
- `/shaders/chladni.frag` - Fragment shader

---

## Content Restructuring

**New section order:**
1. Hero - "Build AI your way"
2. **Problem** (NEW position) - "AI tools aren't understandable by humans" (dark section)
3. Differentiation - "One runtime. Any model."
4. Platform - "Everything you need"
5. Demo - "See it in action"
6. Bundles - "Package it as a bundle"
7. Impact - "Control that compounds"
8. Ecosystem - "Start with what works"
9. CTA - "60 seconds"

**Problem section updates:**
- Headline: "Today, AI tools aren't built in a way that's understandable by humans"
- Add concept: While you can speak to AI in plain language, you don't understand what's happening behind the scenes
- Keep existing content about black box nature
- Make it dark (section-dark) to contrast with hero
- Particles scatter/chaos to communicate opacity

---

## Implementation Timeline

### Phase 1: WebGL Core (Day 1-2)
- Set up Three.js with Points system
- Port Chladni math to GLSL vertex shader
- Implement basic particle rendering at 1px
- Test 10,000 particles on desktop, 5,000 mobile

### Phase 2: Pattern Transitions (Day 2-3)
- Pattern interpolation in shader
- Section-based uniform updates
- IntersectionObserver integration
- Hero entrance choreography

### Phase 3: Polish & Fallback (Day 3)
- Color adaptation per section
- Reduced motion fallback
- Performance testing across devices
- Canvas 2D fallback for old browsers

### Fallback Plan
If WebGL proves problematic:
- Switch to pre-rendered video approach
- Export from Blender with 20,000+ particles
- Scroll-scrubbed video timeline
- Accept loss of interactivity (acceptable)

---

## Success Criteria

- [ ] Nodal line patterns clearly visible
- [ ] Grain-like particles (1px)
- [ ] 60fps on iPhone 12 and newer
- [ ] Smooth transitions between sections
- [ ] Hero choreography (scatter → pattern → scatter)
- [ ] Works throughout entire site
- [ ] Bundle size under 120KB total

---

## Open Questions

- [ ] Mouse interaction: implement or skip? (LOW priority)
- [ ] Exact particle counts per device tier
- [ ] Pattern transition timing feel
- [ ] Glow intensity on nodal lines
