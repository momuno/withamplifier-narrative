# Section Color Scheme Plan

## Story-Driven Color Progression

Each section's background should support the emotional beat. BLACK only for Problem (the darkest moment).

### Proposed Scheme

| Section | Background | Emotion | Reasoning |
|---------|-----------|---------|-----------|
| **HERO** | Light (`section-light-glow`) | Freedom, expansion, beauty | Open invitation |
| **PROBLEM** | **Black** (`bg-[#0A0A0A]` custom) | Constraining, dark, hard to see | THE dark moment - only true black |
| **DIFFERENTIATION** | Light gradient (`section-gradient-flow`) | Ray of light, clarity emerging | Breaking free from darkness |
| **PLATFORM** | Light (`section-light-glow`) | Clear, complete, organized | Shows breadth in clarity |
| **DEMO** | Stone/Neutral (`section-stone`) | Grounded, working, real | Practical demonstration |
| **BUNDLE** | Light (`section-light-glow`) | Clean, elegant, simple | Beauty of simplicity |
| **ECOSYSTEM** | Gradient (`section-gradient-flow`) | Abundant, connected | Network of possibilities |
| **CTA** | Dark (`section-dark`) | Focused, decisive | Call to action (but not black - softer than Problem) |

## Key Principles

1. **BLACK only for Problem** - This is the only section that should feel truly dark/constraining
2. **Alternate light/dark** - But use the style system (gradients, stone, light-glow, etc.)
3. **Progression**: Light → BLACK → Light (breaking free) → alternating light tones → Dark CTA
4. **Contrast**: Each section should be visually distinct from neighbors

## Current State vs Proposed

| Section | Current | Proposed | Change? |
|---------|---------|----------|---------|
| HERO | Light-ish (gradient overlay) | `section-light-glow` | ✅ More clearly light |
| PROBLEM | `section-dark` | `bg-[#0A0A0A]` (black) | ✅ Darker, more constraining |
| DIFFERENTIATION | `section-dark` | `section-gradient-flow` | ✅ Lighter - ray of light |
| PLATFORM | `section-gradient-flow` | `section-light-glow` | ✅ Clearer, lighter |
| DEMO | `section-stone` | `section-stone` | ✅ Keep (good contrast) |
| BUNDLE | `section-light-glow` | `section-light-glow` | ✅ Keep |
| ECOSYSTEM | `section-gradient-flow` | `section-gradient-flow` | ✅ Keep |
| CTA | `section-dark` | `section-dark` | ✅ Keep |

## Navigation Detection

The navigation needs to detect section backgrounds and adjust:
- **On light sections**: Dark text, subtle background
- **On dark/black sections**: Light text, different styling
- **Smooth transitions** as user scrolls

Current implementation uses `data-section` attributes. We need to add background type detection:
- Add `data-theme="light"` or `data-theme="dark"` to sections
- Navigation IntersectionObserver watches these
- Updates nav styling based on current section's theme

## Content Contrast Verification

Need to verify:
- Hero text on light-glow ✅
- Problem text on black (needs to be bright white) ✅
- Differentiation text on gradient ✅
- All other sections ✅

## Implementation Steps

1. Update section classes with new backgrounds
2. Add `data-theme` attributes to sections
3. Update Navigation component to detect theme
4. Verify text contrast on all backgrounds
5. Test smooth transitions
