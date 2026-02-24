# Isometric Diagram Research for Amplifier Site

## Reference: MakingSoftware Style

The MakingSoftware site uses isometric exploded-view diagrams to explain technical concepts. These create a sense of depth and make complex systems feel tangible and understandable.

---

## CSS Techniques for Isometric Design

### Core Transform Formula

The magic numbers for true isometric projection:

```css
/* Container that holds all isometric elements */
.isometric-container {
  transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
  transform-style: preserve-3d;
}

/* Individual elements need preserve-3d to stack correctly */
.isometric-element {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
```

### The 0.864 Scale Factor

For proper isometric projection, vertical elements must be scaled by **0.864** (≈ cos(30°)):

```css
.isometric-face {
  transform: rotate(210deg) skewX(-30deg) scaleY(0.864);
  transform-origin: 0 0;
}
```

### Three-Face Cube Pattern

```css
/* Top face - neutral tone */
.cube-top {
  transform: rotate(210deg) skewX(-30deg) scaleY(0.864);
  background: #085bb5;
}

/* Right face - shadow side */
.cube-right {
  transform: rotate(-30deg) skewX(-30deg) translate(0, -113px) scaleY(0.864);
  background: #043468;
}

/* Left face - highlight side */
.cube-left {
  transform: rotate(90deg) skewX(-30deg) scaleY(0.864) translate(-130.5px, 0);
  background: #4fa0f8;
}
```

---

## Depth & Shadow Techniques

### Levitation Effect

Use `translate3d` on the Z-axis to lift elements:

```css
.floating-element {
  transform: translate3d(0, 0, 20px); /* 20px "above" the floor */
  transition: transform 0.3s ease;
}

.floating-element:hover {
  transform: translate3d(0, 0, 50px); /* Lift higher on hover */
}
```

### Dynamic Shadows

Shadows should respond to element "height":

```css
/* Close to floor - tight, dark shadow */
.shadow-low {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
}

/* Lifted up - diffuse, lighter shadow */
.shadow-high {
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.6;
}
```

---

## Isometric Grid Guide

For precise placement, use a repeating gradient grid:

```css
.isometric-grid {
  background: 
    repeating-linear-gradient(150deg, #ccc, #bbb 0.5px, transparent 1px, transparent 40px),
    repeating-linear-gradient(30deg, #ccc, #bbb 0.5px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, #ccc, #bbb 1px, transparent 1px, transparent 41px);
  background-size: 81px 46px;
}
```

---

## Application Ideas for Amplifier Site

### 1. "How It Works" Loop Diagram

Show the Amplifier loop as an isometric cycle:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│    ┌──────────┐                                 │
│    │  THINK   │ ←─── LLM processes context      │
│    └────┬─────┘                                 │
│         │                                       │
│         ▼                                       │
│    ┌──────────┐                                 │
│    │   ACT    │ ←─── Tools execute actions      │
│    └────┬─────┘                                 │
│         │                                       │
│         ▼                                       │
│    ┌──────────┐                                 │
│    │ OBSERVE  │ ←─── Results feed back          │
│    └────┬─────┘                                 │
│         │                                       │
│         └──────────────────────────────────────►│
│                                                 │
└─────────────────────────────────────────────────┘
```

In isometric: Three cubes arranged in a cycle, with animated connection lines showing data flow.

### 2. Bundle Composition Exploded View

Show how bundles compose:

- Base layer: Foundation bundle (flat plane)
- Middle layer: Behaviors floating above (recipes, tools)
- Top layer: Your custom agent (the final composition)

### 3. Provider Abstraction Diagram

Show the same agent connecting to different providers:

- One agent cube at top
- Arrows fanning down to multiple provider cubes (Anthropic, OpenAI, Azure, Ollama)
- Visual metaphor: "Write once, run anywhere"

### 4. Observability/Events Diagram

Show events flowing from agent actions:

- Agent cube in center
- Event streams radiating outward to:
  - Logging cube
  - Hooks cube
  - Dashboard cube

---

## Implementation Approach

### Option A: Pure CSS (Simpler, Limited)

Good for static diagrams. Use the transform techniques above.

**Pros:**
- No dependencies
- Fast to implement
- Works everywhere

**Cons:**
- Hard to animate complex sequences
- Manual positioning

### Option B: Three.js with Isometric Camera (More Powerful)

Good for animated, interactive diagrams.

```javascript
// Isometric camera setup
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  -aspect, aspect, 1, -1, 0.1, 1000
);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
```

**Pros:**
- Full animation control
- Interactive (rotate, zoom)
- Can do complex scenes

**Cons:**
- Heavier (Three.js library)
- More complex to build

### Option C: SVG + CSS Animation (Balanced)

Pre-create isometric SVGs, animate with CSS.

**Pros:**
- Crisp at any resolution
- Lightweight
- Good animation support

**Cons:**
- Need to create SVGs (Figma/Illustrator)
- Less dynamic than Three.js

---

## Recommended Approach for Amplifier

**Start with Option C (SVG + CSS Animation):**

1. Design isometric components in Figma using 30° angles
2. Export as optimized SVGs
3. Animate with CSS (fade in, translate, glow effects)
4. Use the existing particle system as ambient background

**Component Library to Build:**

| Component | Use For |
|-----------|---------|
| `IsometricCube` | Generic building block |
| `IsometricStack` | Layered composition (bundles) |
| `IsometricFlow` | Connected process (loop diagram) |
| `IsometricGrid` | Background reference grid |

---

## Color Mapping for Amplifier Components

Using existing brand colors in isometric:

| Component | Top Face | Right (Shadow) | Left (Highlight) |
|-----------|----------|----------------|------------------|
| **Bundles** | Signal `#5B4DE3` | `#3D33A8` | `#8B7EF0` |
| **Providers** | Emerald `#10B981` | `#0A8A5F` | `#4AE3A8` |
| **Tools** | Amber `#F59E0B` | `#B87708` | `#FFBE4D` |
| **Hooks** | Cyan `#06B6D4` | `#04899F` | `#4DD4EC` |
| **Agents** | Rose `#F43F5E` | `#B82F46` | `#F87A90` |

---

## Next Steps

1. [ ] Create Figma file with isometric grid template
2. [ ] Design first diagram: "The Amplifier Loop"
3. [ ] Export SVG components
4. [ ] Build React wrapper components
5. [ ] Add to "How It Works" section on site

---

## Resources

- [CSS 3D Transforms Tutorial](https://webdesign.tutsplus.com/create-an-isometric-layout-with-3d-transforms--cms-27134t)
- [Isometric Cube CSS](https://www.pyxofy.com/css-art-creating-an-isometric-cube-using-css-transform/)
- [Three.js Isometric Camera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)
