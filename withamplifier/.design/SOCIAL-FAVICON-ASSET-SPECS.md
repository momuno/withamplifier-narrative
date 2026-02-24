# Social Sharing & Favicon Asset Specifications

**Created:** 2026-01-30  
**Status:** Ready for Production  
**Project:** withamplifier.com

---

## Brand Foundation

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Signal Purple** | `#5B4DE3` | Primary accent, logo background |
| **Deep Black** | `#0A0A0B` | Primary dark background |
| **Warm White** | `#FAFAFA` | Text on dark, light elements |
| **Cream** | `#FAF8F5` | Warm background alternative |
| **Charcoal** | `#171717` | Elevated dark surfaces |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headlines** | Syne | 600-700 | "Amplifier" wordmark |
| **Body** | Epilogue | 400-500 | Tagline text |
| **Monospace** | JetBrains Mono | 400 | Code references |

### Logo Asset

**Source:** `/Users/alexlopez/Library/CloudStorage/OneDrive-Microsoft/Desktop/AmplifierAppIcon.jpg`  
**Dimensions:** 822 × 822 pixels  
**Format:** JPEG, 72 DPI  
**Visual:** Stylized ampersand (&) with radiating flourishes

---

## Part 1: Favicon Set Specifications

### Overview

Favicons need to work across multiple contexts—browser tabs, bookmarks, home screens, and app launchers. The key challenge: the ampersand logo has fine flourishes that may become illegible at small sizes.

### Simplification Strategy

**Recommendation: Three-tier approach**

| Tier | Sizes | Treatment |
|------|-------|-----------|
| **Micro** | 16×16, 32×32 | Simplified ampersand, no flourishes |
| **Standard** | 48×48, 180×180, 192×192 | Full logo with subtle flourishes |
| **Large** | 512×512 | Full detail, radiating flourishes preserved |

**Micro tier rationale:**  
At 16px, even 2px line details become 12.5% of the total canvas. Flourishes become visual noise. A clean, bold ampersand with Signal Purple background maintains brand recognition while ensuring clarity.

---

### Individual Asset Specifications

#### 1. favicon.ico (Multi-size ICO)

**Contains:** 16×16 + 32×32 (both required for legacy browser support)

**16×16 Specification:**
```
Canvas:         16 × 16 px
Background:     #5B4DE3 (Signal Purple) - solid fill
Corner Radius:  2px (subtle softness)
Logo:           Simplified ampersand only
Logo Color:     #FAFAFA (Warm White)
Logo Size:      ~12px height, centered
Safe Zone:      2px padding all sides
```

**32×32 Specification:**
```
Canvas:         32 × 32 px
Background:     #5B4DE3 (Signal Purple) - solid fill
Corner Radius:  4px
Logo:           Simplified ampersand, minimal flourish hints
Logo Color:     #FAFAFA (Warm White)
Logo Size:      ~24px height, centered
Safe Zone:      4px padding all sides
```

---

#### 2. favicon-16x16.png

**Purpose:** Modern browsers, high-DPI tabs
```
Canvas:         16 × 16 px
Format:         PNG-24 with transparency
Background:     #5B4DE3 (Signal Purple) - solid fill
Corner Radius:  2px
Logo:           Simplified ampersand (no flourishes)
Logo Color:     #FAFAFA
Export:         Optimized, <1KB target
```

---

#### 3. favicon-32x32.png

**Purpose:** Standard browser tabs, bookmarks
```
Canvas:         32 × 32 px
Format:         PNG-24 with transparency
Background:     #5B4DE3 (Signal Purple)
Corner Radius:  4px
Logo:           Simplified ampersand, hint of flourishes
Logo Color:     #FAFAFA
Export:         Optimized, <2KB target
```

---

#### 4. apple-touch-icon.png (180×180)

**Purpose:** iOS home screen, Safari bookmarks  
**Critical:** iOS applies its own corner radius (~38px visible). Design for full-bleed.

```
Canvas:         180 × 180 px
Format:         PNG-24, NO transparency (iOS requirement)
Background:     #5B4DE3 (Signal Purple) - solid fill, edge-to-edge
Corner Radius:  0px (iOS applies ~17.5% radius automatically)
Logo:           Full ampersand with flourishes
Logo Color:     #FAFAFA
Logo Size:      ~120px height, centered
Safe Zone:      20px from edges (iOS crops corners)
Export:         High quality, <20KB
```

**iOS Corner Crop Zone:**
```
     ████████████████████████
   ██░░░░░░░░░░░░░░░░░░░░░░░░██
  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
│         SAFE ZONE              │
│      (keep logo here)          │
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
   ██░░░░░░░░░░░░░░░░░░░░░░░░██
     ████████████████████████
```

---

#### 5. android-chrome-192x192.png

**Purpose:** Android home screen, Chrome app launcher
```
Canvas:         192 × 192 px
Format:         PNG-24 with transparency
Background:     #5B4DE3 (Signal Purple)
Corner Radius:  0px (Android applies adaptive icon masking)
Logo:           Full ampersand with flourishes
Logo Color:     #FAFAFA
Logo Size:      ~130px height, centered
Safe Zone:      24px from edges (adaptive icon safe zone)
Export:         High quality, <25KB
```

---

#### 6. android-chrome-512x512.png

**Purpose:** Android splash screen, high-DPI launchers, PWA install
```
Canvas:         512 × 512 px
Format:         PNG-24 with transparency
Background:     #5B4DE3 (Signal Purple)
Corner Radius:  0px (system applies masking)
Logo:           Full ampersand with all flourish details
Logo Color:     #FAFAFA
Logo Size:      ~340px height, centered
Safe Zone:      64px from edges
Export:         High quality, <50KB
```

---

## Part 2: Open Graph Image Specification

### og-image.png (1200×630)

**Purpose:** Facebook, LinkedIn, Discord, iMessage, Slack link previews

**Critical Constraints:**
- Image often displayed at ~600px or smaller
- Text must be legible at 50% scale
- Avoid text near edges (platforms crop inconsistently)

---

### Layout Specification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                                                                 │     │
│     │                                                                 │     │
│     │           [AMPERSAND LOGO]                                      │     │
│     │              ~180px                                             │     │
│     │                                                                 │     │
│     │           ─────────────────                                     │     │
│     │                                                                 │     │
│     │           Amplifier                                             │     │
│     │           (Syne Bold, 72px)                                     │     │
│     │                                                                 │     │
│     │           Build AI Your Way                                     │     │
│     │           (Epilogue Medium, 36px)                               │     │
│     │                                                                 │     │
│     │                                                                 │     │
│     │                                                                 │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│                                                    withamplifier.com        │
│                                                    (Epilogue, 18px)         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specifications

```
Canvas:           1200 × 630 px
Format:           PNG-24 (JPEG acceptable for smaller file size)

BACKGROUND
─────────
Base:             #0A0A0B (Deep Black)
Gradient:         Subtle radial glow from center
                  - Center: rgba(91, 77, 227, 0.15)
                  - Edge: transparent
                  - Radius: 60% of canvas width

LOGO (Ampersand)
────────────────
Position:         Centered horizontally, ~25% from top
Size:             180px height
Color:            #FAFAFA (Warm White)
                  OR #5B4DE3 (Signal Purple) if preferred
Style:            Full flourishes visible

WORDMARK "Amplifier"
────────────────────
Font:             Syne
Weight:           700 (Bold)
Size:             72px
Color:            #FAFAFA
Letter-spacing:   -0.02em
Position:         Centered, 24px below logo

TAGLINE "Build AI Your Way"
───────────────────────────
Font:             Epilogue
Weight:           500 (Medium)
Size:             36px
Color:            rgba(250, 250, 250, 0.7) - 70% opacity
Letter-spacing:   -0.015em
Position:         Centered, 16px below wordmark

DOMAIN "withamplifier.com"
──────────────────────────
Font:             Epilogue
Weight:           400 (Regular)
Size:             18px
Color:            rgba(250, 250, 250, 0.5) - 50% opacity
Position:         Bottom-right, 40px padding from edges

SAFE ZONES
──────────
Top:              60px
Bottom:           80px (accounts for platform UI overlays)
Left/Right:       80px
```

### Visual Hierarchy

1. **Primary:** Ampersand logo (eye enters here)
2. **Secondary:** "Amplifier" wordmark (brand recognition)
3. **Tertiary:** Tagline (value proposition)
4. **Quaternary:** Domain (utility information)

### Thumbnail Test

At 300px width (common preview size):
- Logo should be clearly recognizable (~45px)
- "Amplifier" text readable (~18px)
- Tagline may be small but present (~9px)

---

## Part 3: Twitter Card Specification

### twitter-card.png (1200×600)

**Recommendation:** Use the same image as og-image.png (1200×630).

**Rationale:**
- Twitter displays 1200×600, but accepts larger with cropping
- The 30px difference is negligible
- Maintaining one image simplifies asset management
- Twitter crops from center, so our centered layout works perfectly

**If separate asset needed:**

```
Canvas:           1200 × 600 px
Format:           PNG-24 or JPEG (quality 85+)
Layout:           Identical to og-image, vertically compressed
Adjustment:       Reduce top/bottom padding by 15px each
```

---

## Part 4: File Structure & Naming

### Directory Structure

```
public/
├── favicon.ico              # Multi-size ICO (16x16 + 32x32)
├── favicon-16x16.png        # Browser tabs (high-DPI)
├── favicon-32x32.png        # Browser tabs (standard)
├── apple-touch-icon.png     # iOS home screen (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── og-image.png             # Open Graph (1200x630)
├── twitter-card.png         # Twitter (can symlink to og-image.png)
└── site.webmanifest         # PWA manifest
```

### HTML Implementation

Add to `<head>` in layout:

```html
<!-- Favicons -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Amplifier - Build AI Your Way">
<meta property="og:description" content="Your AI agent is a file you can read, write, and share.">
<meta property="og:image" content="https://withamplifier.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://withamplifier.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Amplifier - Build AI Your Way">
<meta name="twitter:description" content="Your AI agent is a file you can read, write, and share.">
<meta name="twitter:image" content="https://withamplifier.com/og-image.png">
```

### site.webmanifest

```json
{
  "name": "Amplifier",
  "short_name": "Amplifier",
  "description": "Build AI Your Way",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#5B4DE3",
  "background_color": "#0A0A0B",
  "display": "standalone",
  "start_url": "/"
}
```

---

## Part 5: Production Checklist

### Before Export

- [ ] Source logo converted to vector (SVG) for lossless scaling
- [ ] Simplified ampersand variant created for micro sizes
- [ ] All colors match brand tokens exactly
- [ ] Syne and Epilogue fonts embedded/outlined in OG image

### Export Settings

| Asset | Format | Compression | Target Size |
|-------|--------|-------------|-------------|
| favicon.ico | ICO | N/A | <5KB |
| favicon-16x16.png | PNG-24 | Optimized | <1KB |
| favicon-32x32.png | PNG-24 | Optimized | <2KB |
| apple-touch-icon.png | PNG-24 | Quality 90 | <20KB |
| android-chrome-192x192.png | PNG-24 | Quality 90 | <25KB |
| android-chrome-512x512.png | PNG-24 | Quality 90 | <50KB |
| og-image.png | PNG-24 or JPEG | Quality 85 | <150KB |
| twitter-card.png | PNG-24 or JPEG | Quality 85 | <150KB |

### Validation

- [ ] Test favicon in Chrome, Safari, Firefox, Edge
- [ ] Test apple-touch-icon on iOS device
- [ ] Test android-chrome icons on Android device
- [ ] Validate og-image with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Validate twitter-card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test link preview in Slack, Discord, iMessage, Teams

---

## Alternative Design Direction

### Light Mode Variant (Optional)

If brand requires light background social images:

```
Background:       #FAF8F5 (Cream)
Logo:             #5B4DE3 (Signal Purple)
Wordmark:         #1A1A1A (Ink)
Tagline:          rgba(26, 26, 26, 0.7)
Domain:           rgba(26, 26, 26, 0.5)
```

This provides contrast for platforms with dark UI while maintaining brand warmth.

---

## Summary

| Asset | Dimensions | Key Treatment |
|-------|------------|---------------|
| favicon.ico | 16+32 | Simplified ampersand, purple bg |
| favicon-16x16.png | 16×16 | Simplified, purple bg |
| favicon-32x32.png | 32×32 | Simplified, purple bg |
| apple-touch-icon.png | 180×180 | Full logo, purple bg, edge-to-edge |
| android-chrome-192x192.png | 192×192 | Full logo, purple bg |
| android-chrome-512x512.png | 512×512 | Full detail, purple bg |
| og-image.png | 1200×630 | Logo + wordmark + tagline, dark bg with purple glow |
| twitter-card.png | 1200×600 | Same as og-image or symlink |

---

**End of Asset Specifications**
