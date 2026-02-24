# withamplifier.com Brand Development

## Current State

Site is live with:
- **Signal color system** (`#5B4DE3` violet blue) - replacing Claude-like orange
- **Interactive playground** with execution trace simulation
- **GitHub Pages workflow** added for deployment

## Brand Direction (In Progress)

### The Ampersand Symbol

The Amplifier logo centers on a **stylized ampersand (&)** with:
- Flowing, calligraphic strokes (organic curves, sweeping movement)
- **Radiating flourishes** that spiral outward (wave-like, art nouveau quality)
- Represents: connection, "you AND AI", partnership, composition
- Plays on "amplifier" = sound waves / ripple effect

**Logo file:** `/Users/alexlopez/Library/CloudStorage/OneDrive-Microsoft/Desktop/AmplifierAppIcon.jpg`

**Color treatment:** Cream/off-white (`~#F5F1E8`) on deep black - high contrast, minimalist

### Brand Meaning

| Concept | Expression |
|---------|------------|
| Ampersand | Connection, "you & AI", full-stack enablement |
| Ripples | Amplification, outcomes that create ripple effects |
| Metacognitive | AI that partners with YOUR perspective |
| Not just generation | Reality creation through collaboration |

### Scroll Experience Vision

**Hero behavior:**
1. Top: Clean headline, pristine (no logo visible)
2. Scroll: Ampersand emerges "like coming out of sand"
3. Continue: Flourishes/ripples animate outward
4. Complete: Full symbol revealed, ripples settle into ambient motion

### Design Layers

| Layer | Feel |
|-------|------|
| **Home / Start Here** | Ultra-refined, cinematic, premium - "unlike anything today" |
| **Build / Explore** | Technical but beautiful, diagrams, architecture |
| **Playground / Docs** | Functional, developer-focused |

## Research Completed

See `research/BRAND-STYLE-SYNTHESIS.md` for full synthesis.

**Reference sites analyzed:**
- **XREAL 1s** - Scroll-triggered video, problem-solution narrative
- **Apple Creator Studio** - Image sequence scroll-scrubbing, "Flow" compression
- **MakingSoftware** - Technical diagram storytelling, isometric exploded views

**Key technical decisions:**
- Use image sequences (not video) for scroll-sync
- GSAP ScrollTrigger + Canvas + RAF
- 60 frames per scroll section, ~30-50KB each
- Always respect `prefers-reduced-motion`

## Video Content Needed

| Section | Content | Format |
|---------|---------|--------|
| Hero | Abstract data flow, Signal-colored light trails | 4-6s loop, <2MB |
| Composition | 3D blocks assembling (bricks & studs) | 60-frame image sequence |
| Data flow | Connections lighting up | SVG animation |

## Component Color Coding (Proposed)

| Component | Color | Hex |
|-----------|-------|-----|
| Bundles | Signal (violet) | `#5B4DE3` |
| Providers | Emerald | `#10B981` |
| Tools | Amber | `#F59E0B` |
| Hooks | Cyan | `#06B6D4` |
| Agents | Rose | `#F43F5E` |

## Next Steps

1. Use `designintel-system` bundle tools to formalize brand tokens from logo
2. Generate complete color palette from logo + mood
3. Export to Tailwind config
4. Build scroll infrastructure with GSAP
5. Create diagram component library (isometric exploded views)

## Skills Available

- `image-vision` - Analyze images (used to analyze logo)
- `playwright` - Browser automation
- `curl` - API testing
- `image-search` - Find reference images
- `word` - Document generation

## Bundles

- `designintel-system` - Design system tools (analyze-image, generate-color-palette, export-tailwind, etc.)
- `amplifier-dev` - Current active bundle
- `design-intelligence` - Design agents (art-director, component-designer, etc.)
