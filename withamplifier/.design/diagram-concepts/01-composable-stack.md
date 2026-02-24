# Diagram Concept: The Composable Stack

## Location
Homepage → Platform section ("Built from composable pieces")

## Problem It Solves
We're TELLING people it's composable. We should SHOW the composition.

## Concept: Isometric Exploded View

```
                    ┌─────────────────┐
                    │     BUNDLE      │  ← Your complete setup
                    │  (the output)   │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌───────────┐    ┌───────────┐    ┌───────────┐
    │  AGENTS   │    │ BEHAVIORS │    │  RECIPES  │
    │           │    │           │    │           │
    └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ PROVIDERS │  │   TOOLS   │  │   HOOKS   │
    │  (LLMs)   │  │ (actions) │  │(lifecycle)│
    └───────────┘  └───────────┘  └───────────┘
```

## Visual Treatment (Isometric)

**Style:** MakingSoftware-inspired
- 3D isometric blocks floating in space
- Subtle shadows for depth
- Connection lines showing assembly
- Color-coded by component type

**Color Mapping:**
| Component | Color | Hex |
|-----------|-------|-----|
| Bundle (output) | Signal violet | `#5B4DE3` |
| Providers | Emerald | `#10B981` |
| Tools | Amber | `#F59E0B` |
| Agents | Rose | `#F43F5E` |
| Hooks | Cyan | `#06B6D4` |
| Behaviors | Purple | `#8B5CF6` |
| Recipes | Orange | `#F97316` |

**Animation (optional):**
- On scroll: blocks float up from bottom, assemble into stack
- Subtle hover: blocks lift slightly, show connections
- Or: static but with dotted connection lines that pulse

## Layout Options

### Option A: Replace the 4 cards
Remove the Providers/Tools/Agents/Recipes cards entirely. Let the diagram do the work.

Pros: Clean, visual-first
Cons: Loses the detail text

### Option B: Diagram above, cards below
Keep cards but add diagram above them as the hero visual for this section.

Pros: Best of both — visual hook + detail
Cons: Longer section

### Option C: Diagram left, cards right (desktop)
Side-by-side layout. Diagram shows the whole, cards provide detail.

Pros: Efficient use of space
Cons: Complex responsive behavior

**Recommendation:** Option B — diagram as hero, cards as supporting detail.

## Technical Approach

### Pure CSS/SVG (Recommended)
- SVG for the shapes
- CSS transforms for isometric projection
- CSS animations for hover/scroll effects
- Fully responsive

```css
/* Isometric transform */
.isometric {
  transform: rotateX(60deg) rotateZ(-45deg);
}

/* Or true isometric with scale */
.isometric-true {
  transform: 
    rotateX(54.74deg) 
    rotateY(0deg) 
    rotateZ(-45deg)
    scale(0.816);
}
```

### Three.js (If we want more)
- Real 3D with camera control
- Smoother animations
- But heavier, more complex

**Start with CSS/SVG.** Upgrade to Three.js only if needed.

## Content for Each Block

**Providers (Emerald)**
- Icon: Plug/connection
- Label: "Any LLM"
- Subtext: Claude, GPT-4, Gemini, Llama

**Tools (Amber)**
- Icon: Wrench
- Label: "Capabilities"
- Subtext: filesystem, bash, web, grep

**Hooks (Cyan)**
- Icon: Anchor/hook
- Label: "Lifecycle"
- Subtext: logging, approval, redaction

**Agents (Rose)**
- Icon: Person
- Label: "Personas"
- Subtext: explorer, architect, reviewer

**Behaviors (Purple)**
- Icon: Brain/pattern
- Label: "Instructions"
- Subtext: security-focused, technical-writing

**Recipes (Orange)**
- Icon: Book/flow
- Label: "Workflows"
- Subtext: multi-step, checkpoints, approval gates

**Bundle (Signal)**
- Icon: Package/box
- Label: "Your Setup"
- Subtext: One file. Portable. Yours.

## Interaction Ideas

1. **Hover on a block:** Highlights all connected blocks, shows brief tooltip
2. **Click on a block:** Scrolls to that card below (if cards kept)
3. **Scroll-triggered assembly:** Blocks float into place as you scroll

## Next Steps

1. Create SVG mockup of the diagram
2. Build React component with CSS transforms
3. Test responsive behavior
4. Add subtle animations
5. Integrate into homepage

---

## Reference

MakingSoftware diagrams: https://www.siteinspire.com/website/13257-making-software

Key techniques from research:
- True isometric uses rotateX(54.74deg) + scale(0.816)
- Three-face cubes: top (lightest), left (medium), right (darkest)
- Floating effect: translateY(-20px) + blur shadow
- Assembly animation: stagger each block's entry
