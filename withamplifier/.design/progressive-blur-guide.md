# Progressive Blur Technique

A guide to creating the smooth, edge-less blur effect used in the Amplifier nav header. Works for fixed headers, floating toolbars, overlay panels — anywhere you want content to blur gradually behind a UI element.

Reference implementation: `components/Navigation.tsx`

---

## The Problem

A single `backdrop-filter: blur()` creates a hard edge — a visible line where blurred meets sharp. It looks cheap, especially over varied content (images, dark sections, text).

## The Solution

Stack multiple blur layers with **decreasing intensity**, each masked to a different vertical band. The result: blur fades smoothly from strong to nothing, with no visible cutoff.

---

## Minimal Example (Copy-Paste Ready)

```tsx
{/* Container: taller than the element it's behind */}
<div className="absolute inset-x-0 top-0 h-32 pointer-events-none">

  {/* Layer 1 — strongest blur, covers the top */}
  <div className="absolute inset-0" style={{
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)',
    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)',
  }} />

  {/* Layer 2 — medium blur, middle zone */}
  <div className="absolute inset-0" style={{
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    maskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)',
  }} />

  {/* Layer 3 — light blur, lower zone */}
  <div className="absolute inset-0" style={{
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    maskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)',
  }} />

  {/* Layer 4 — subtle blur, trailing edge */}
  <div className="absolute inset-0" style={{
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    maskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)',
  }} />

</div>
```

---

## How It Works

### The two properties

Each layer combines:

- **`backdrop-filter: blur(Npx)`** — blurs whatever content is behind the element
- **`mask-image: linear-gradient(...)`** — controls where that blur is visible (`black` = visible, `transparent` = hidden)

### The layer stack

| Layer | Blur | Mask (visible band) | Role |
|-------|------|---------------------|------|
| 1 | 12px | Top 0–50% | Strong blur directly behind the UI element |
| 2 | 8px | 25–70% | Medium blur bridging strong and light zones |
| 3 | 4px | 45–85% | Light blur extending the transition |
| 4 | 2px | 60–100% | Barely-there blur at the trailing edge |

The overlapping mask bands blend into one continuous falloff:

```
Blur intensity:

12px ████████░░░░░░░░░░░░
 8px ░░░░████████░░░░░░░░
 4px ░░░░░░░░████████░░░░
 2px ░░░░░░░░░░░░████████
     ─────────────────────
     Top              Bottom
```

### Why the container is taller than the element

The blur container (`h-32` = 128px) is twice the height of the nav (`h-16` = 64px). The bottom half is the "fade zone" where the blur dissolves. Without it, you'd still get a hard edge at the bottom of the nav.

**Rule of thumb**: Make the blur container **1.5–2x** the height of the element it backs.

---

## Adapting to Your Use Case

### Fixed header (like the nav)

```
Container: absolute, inset-x-0, top-0
Direction: linear-gradient(to bottom, ...)
Height: 1.5-2x nav height
```

### Bottom toolbar / dock

Flip the gradient direction:

```tsx
maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 50%)'
```

And position at the bottom:

```
Container: absolute, inset-x-0, bottom-0
```

### Side panel

Use a horizontal gradient:

```tsx
maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 50%)'
```

### Floating card / overlay

Use a radial gradient for all-edges fade:

```tsx
maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
```

---

## Tuning

### Want a tighter/shorter fade?

- Reduce container height (e.g., `h-24` instead of `h-32`)
- Compress the mask gradient stops closer together
- Use fewer layers (2-3 instead of 4)

### Want a softer/longer fade?

- Increase container height (e.g., `h-40` or `h-48`)
- Spread gradient stops further apart
- Add a 5th layer with `blur(1px)` at the far edge

### Want stronger blur overall?

- Increase blur values (e.g., 16/12/8/4 instead of 12/8/4/2)
- Extend the "solid black" portion of Layer 1's mask

### Want it more subtle?

- Decrease blur values (e.g., 8/6/4/2)
- Narrow Layer 1's solid band

---

## Performance

### The cost

Each `backdrop-filter` layer is a compositing operation. Four layers on every frame during scroll is real GPU work.

### Mobile optimization

Use a single simplified layer on mobile instead of the full stack:

```tsx
{/* Mobile: single layer, simpler mask */}
<div className="md:hidden absolute inset-0" style={{
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 70%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 70%)',
  transform: 'translateZ(0)', // Force GPU layer
}} />

{/* Desktop: full progressive stack */}
<div className="hidden md:block absolute inset-0" style={{ /* Layer 1 */ }} />
<div className="hidden md:block absolute inset-0" style={{ /* Layer 2 */ }} />
<div className="hidden md:block absolute inset-0" style={{ /* Layer 3 */ }} />
<div className="hidden md:block absolute inset-0" style={{ /* Layer 4 */ }} />
```

### Other performance tips

- Add `pointer-events-none` to the blur container so it doesn't intercept clicks
- Use `transform: translateZ(0)` on mobile to promote to a GPU layer
- If the element doesn't scroll (e.g., modal overlay), performance is a non-issue

---

## Browser Support

| Feature | Support |
|---------|---------|
| `backdrop-filter` | All modern browsers (Chrome 76+, Safari 9+, Firefox 103+) |
| `mask-image` | All modern browsers (prefix needed for WebKit) |

Always include both prefixed and unprefixed versions:

```tsx
backdropFilter: 'blur(12px)',
WebkitBackdropFilter: 'blur(12px)',  // Safari
maskImage: 'linear-gradient(...)',
WebkitMaskImage: 'linear-gradient(...)',  // Safari
```

---

## No Background Color

The technique works best with **no background color** on the element. The blur itself acts as the visual separation. Adding a semi-transparent background (like `bg-white/80`) on top of the blur is redundant and muddies the effect.

If you need more contrast for readability, increase the blur intensity rather than adding a background tint.
