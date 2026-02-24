# Mobile-First Responsive Strategy
## withamplifier.com Apple-Style Page Redesign

---

## Table of Contents

1. [Foundation & Breakpoints](#foundation--breakpoints)
2. [100vh Section Strategy](#100vh-section-strategy)
3. [Home Page Sections](#home-page-sections)
4. [Explore Page Sections](#explore-page-sections)
5. [Horizontal Scroll Patterns](#horizontal-scroll-patterns)
6. [Touch vs Mouse Interactions](#touch-vs-mouse-interactions)
7. [Performance Guidelines](#performance-guidelines)
8. [CSS Implementation](#css-implementation)

---

## Foundation & Breakpoints

### Tailwind Breakpoint Strategy

```
Mobile-First Approach:
Base styles     → < 640px   (mobile phones)
sm:             → ≥ 640px   (large phones, small tablets)
md:             → ≥ 768px   (tablets portrait)
lg:             → ≥ 1024px  (tablets landscape, small laptops)
xl:             → ≥ 1280px  (laptops, desktops)
2xl:            → ≥ 1536px  (large displays)
```

### Custom Breakpoints for Apple-Style Pages

Add to `tailwind.config.js`:

```js
screens: {
  'xs': '375px',      // iPhone SE minimum
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  // Height breakpoints for 100vh concerns
  'short': { 'raw': '(max-height: 700px)' },
  'tall': { 'raw': '(min-height: 900px)' },
}
```

---

## 100vh Section Strategy

### The Mobile Browser Chrome Problem

Mobile browsers have dynamic toolbars that change `100vh` meaning:
- Safari iOS: Address bar + toolbar = ~90px
- Chrome Android: Address bar = ~56px
- When scrolling, these collapse/expand

### Solution: CSS Custom Properties + `dvh`

```css
/* In globals.css */
:root {
  /* Fallback for older browsers */
  --vh: 1vh;
  
  /* Modern solution */
  --section-height: 100dvh; /* Dynamic viewport height */
}

/* For browsers without dvh support */
@supports not (height: 100dvh) {
  :root {
    --section-height: calc(var(--vh, 1vh) * 100);
  }
}

/* Full-page section base */
.section-full {
  min-height: var(--section-height);
  min-height: 100dvh; /* Modern browsers */
}
```

### JavaScript Fallback for Legacy Browsers

```tsx
// hooks/useViewportHeight.ts
import { useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);
}
```

### Safe Area Insets (iPhone Notch/Dynamic Island)

```css
.section-full {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* For sections with fixed CTAs at bottom */
.section-cta-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 24px);
}
```

### Scroll Snap Considerations

```css
/* Container */
.scroll-snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100dvh;
}

/* Individual sections */
.scroll-snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* Prevents skipping sections */
}

/* MOBILE OVERRIDE: Disable snap on small screens */
@media (max-width: 768px) {
  .scroll-snap-container {
    scroll-snap-type: none; /* Natural scroll on mobile */
  }
}

/* Re-enable only for tablets+ in landscape */
@media (min-width: 1024px) and (min-height: 700px) {
  .scroll-snap-container {
    scroll-snap-type: y mandatory;
  }
}
```

**Key Decision:** Disable scroll-snap on mobile. Apple's product pages DON'T use snap scrolling on mobile - they use natural scroll with parallax effects.

---

## Home Page Sections

### Section 1: Hero (100vh)

**Content:** Large centered typography, subtle animation, scroll indicator

#### Mobile Layout (< 640px)

```
┌─────────────────────────────┐
│                             │
│     [Ampersand Logo]        │  ← 48px, centered
│                             │
│   "AI that's yours         │  ← text-3xl (30px)
│    for the making."        │     max-w-[280px]
│                             │
│   Modular AI framework.     │  ← text-base, 2-3 lines
│   Combine, share, own.      │     px-6
│                             │
│   ┌─────────────────────┐   │
│   │ pip install amplif… │   │  ← Truncated command
│   └─────────────────────┘   │
│                             │
│      [ How it works ]       │  ← Full-width button
│                             │
│           ↓                 │  ← Scroll indicator
│          ○○○                │     animated bounce
└─────────────────────────────┘
```

**Tailwind Implementation:**

```tsx
<section className="section-full flex flex-col items-center justify-center px-6 py-12 sm:px-8 md:px-12">
  {/* Logo */}
  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-8 sm:mb-12">
    <AmpersandLogo />
  </div>
  
  {/* Headline */}
  <h1 className="
    text-3xl sm:text-4xl md:text-5xl lg:text-hero xl:text-hero-lg
    text-center max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl
    font-heading leading-tight
  ">
    AI that's yours for the making.
  </h1>
  
  {/* Subhead */}
  <p className="
    mt-4 sm:mt-6 md:mt-8
    text-base sm:text-lg md:text-body-lg
    text-ink-slate text-center
    max-w-[300px] sm:max-w-md md:max-w-xl lg:max-w-2xl
    px-4
  ">
    A modular AI agent framework...
  </p>
  
  {/* CTA Group */}
  <div className="
    mt-8 sm:mt-10 md:mt-12
    flex flex-col sm:flex-row gap-4 
    w-full sm:w-auto
    px-4 sm:px-0
  ">
    <code className="code-block px-4 py-3 text-sm sm:text-base text-center truncate max-w-full">
      pip install amplifier
    </code>
    <button className="btn-secondary w-full sm:w-auto">
      How it works
    </button>
  </div>
  
  {/* Scroll Indicator - hidden on short screens */}
  <div className="
    absolute bottom-8 sm:bottom-12
    hidden short:hidden md:flex
    flex-col items-center gap-2
    animate-bounce
  ">
    <span className="text-micro text-ink-fog">Scroll to explore</span>
    <ChevronDown className="w-5 h-5 text-ink-fog" />
  </div>
</section>
```

#### Tablet Layout (640px - 1024px)

- Typography scales up (text-4xl to text-5xl)
- Buttons go side-by-side (flex-row)
- More breathing room (larger max-widths)
- Scroll indicator appears

#### Desktop Layout (1024px+)

- Full hero typography (text-hero-lg)
- Animated background elements visible
- Scroll indicator prominent

#### Animation Considerations

| Animation | Mobile | Tablet+ |
|-----------|--------|---------|
| Background particles | OFF | ON |
| Logo reveal | Simplified fade | Full emergence animation |
| Text stagger | Faster (200ms) | Standard (350ms) |
| Scroll indicator | Hidden on short | Visible with bounce |

---

### Section 2: Quick Highlights (100vh)

**Content:** 5 cards - Modular, Transparent, Shareable, Your Rules, Community

#### Mobile Layout (< 640px)

**Transform horizontal row → vertical stack with swipe hint**

```
┌─────────────────────────────┐
│                             │
│   Quick Highlights          │  ← Section title
│                             │
│ ┌─────────────────────────┐ │
│ │ ⚡ Modular               │ │  ← Full-width card
│ │ Swap providers without  │ │     visible
│ │ rewriting code.         │ │
│ └─────────────────────────┘ │
│                             │
│ ┌──────────────────────[ │  │  ← Horizontal scroll
│ │ 🔍 Transparent         [ │  │     with peek hint
│ │ See every decision...  [ │  │
│ └──────────────────────[ │  │
│                             │
│     ○ ● ○ ○ ○              │  ← Dot indicators
│                             │
└─────────────────────────────┘
```

**Two Options for Mobile:**

**Option A: Horizontal Scroll Carousel**
```tsx
<section className="section-full py-16 px-0 overflow-hidden">
  <h2 className="text-title text-center px-6 mb-8">Quick Highlights</h2>
  
  {/* Horizontal scroll container */}
  <div className="
    flex gap-4 overflow-x-auto snap-x snap-mandatory
    px-6 pb-4
    scrollbar-hide
    sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none
    lg:grid-cols-5 lg:gap-4
  ">
    {highlights.map((item, i) => (
      <div 
        key={i}
        className="
          flex-shrink-0 w-[280px] sm:w-auto
          snap-center
          p-6 bg-canvas-stone rounded-gentle
        "
      >
        <div className="text-2xl mb-3">{item.icon}</div>
        <h3 className="text-heading">{item.title}</h3>
        <p className="text-sm text-ink-slate mt-2">{item.description}</p>
      </div>
    ))}
  </div>
  
  {/* Dot indicators - mobile only */}
  <div className="flex justify-center gap-2 mt-4 sm:hidden">
    {highlights.map((_, i) => (
      <div key={i} className="w-2 h-2 rounded-full bg-canvas-mist" />
    ))}
  </div>
</section>
```

**Option B: Stacked Cards (Simpler)**
```tsx
<div className="
  grid grid-cols-1 gap-4 px-6
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-5 lg:gap-4
">
  {/* Cards stack vertically on mobile, grid on larger */}
</div>
```

**Recommendation:** Option A (carousel) for engagement, Option B for accessibility.

#### Touch Considerations

- Horizontal scroll needs momentum scrolling: `-webkit-overflow-scrolling: touch`
- Add visual "peek" (show partial next card) to indicate scrollability
- Dot indicators sync with scroll position via Intersection Observer
- Swipe gesture should feel native

#### 100vh Concern

On mobile, 5 stacked cards won't fit in 100vh. Solutions:
1. Use carousel (Option A)
2. Drop 100vh requirement, use `min-h-screen` with natural scroll
3. Show 2-3 cards with "see all" expansion

---

### Section 3: The Problem (100vh)

**Content:** Dark contrast section, "closed box" visual that breaks apart

#### Mobile Layout (< 640px)

```
┌─────────────────────────────┐
│█████████████████████████████│  ← Dark background
│                             │
│     The Problem             │
│                             │
│   ┌───────────────────┐     │
│   │    ┌─────────┐    │     │  ← Simplified "box"
│   │    │  ? ? ?  │    │     │     visual
│   │    │ LOCKED  │    │     │
│   │    └─────────┘    │     │
│   └───────────────────┘     │
│                             │
│   "Your AI tools are        │  ← Problem statement
│    closed boxes. You        │     large text
│    can't see inside."       │
│                             │
│   • No control              │  ← Pain points
│   • No visibility           │     as list
│   • No ownership            │
│                             │
└─────────────────────────────┘
```

**Tailwind Implementation:**

```tsx
<section className="
  section-full 
  bg-depth-obsidian text-canvas
  flex flex-col items-center justify-center
  px-6 py-16 sm:py-20
">
  {/* Visual - simplified on mobile */}
  <div className="
    relative w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64
    mb-8 sm:mb-12
  ">
    {/* Box visual - CSS-only on mobile, animated on desktop */}
    <ClosedBoxVisual 
      animate={!isMobile} // Prop to disable animation
    />
  </div>
  
  {/* Problem statement */}
  <h2 className="
    text-2xl sm:text-3xl md:text-title lg:text-display
    text-center max-w-xs sm:max-w-md lg:max-w-2xl
    mb-6 sm:mb-8
  ">
    Your AI tools are closed boxes.
  </h2>
  
  {/* Pain points - list on mobile, spread on desktop */}
  <ul className="
    flex flex-col gap-3 sm:flex-row sm:gap-8
    text-canvas-stone text-sm sm:text-base
  ">
    <li className="flex items-center gap-2">
      <XIcon className="w-4 h-4 text-error" />
      No control
    </li>
    <li className="flex items-center gap-2">
      <XIcon className="w-4 h-4 text-error" />
      No visibility  
    </li>
    <li className="flex items-center gap-2">
      <XIcon className="w-4 h-4 text-error" />
      No ownership
    </li>
  </ul>
</section>
```

#### Animation: Box Breaking Apart

| Device | Animation |
|--------|-----------|
| Mobile | Static → Fade transition to "open" state on scroll |
| Tablet | Simplified break (2-3 pieces) |
| Desktop | Full particle/fragment animation |

```css
/* Reduced motion alternative */
@media (prefers-reduced-motion: reduce) {
  .box-break-animation {
    animation: none;
    /* Show end state immediately */
    opacity: 0.5;
  }
}
```

---

### Section 4: How It Works (100vh)

**Content:** Animated diagram - Providers + Tools + Behaviors → Bundle

#### Mobile Layout (< 640px)

**Problem:** Complex diagram doesn't fit. Solution: Vertical stepped reveal.

```
┌─────────────────────────────┐
│                             │
│   How It Works              │
│                             │
│   ┌─────────────────────┐   │
│   │  ⚡ PROVIDERS       │   │  ← Step 1
│   │  Claude, GPT, etc   │   │     expanded
│   └─────────────────────┘   │
│            ↓                │
│   ┌─────────────────────┐   │
│   │  🔧 TOOLS           │   │  ← Step 2
│   │  File, search, etc  │   │
│   └─────────────────────┘   │
│            ↓                │
│   ┌─────────────────────┐   │
│   │  🎯 BEHAVIORS       │   │  ← Step 3
│   │  Code review, docs  │   │
│   └─────────────────────┘   │
│            ↓                │
│   ╔═════════════════════╗   │
│   ║  📦 BUNDLE          ║   │  ← Final result
│   ║  Your complete      ║   │     highlighted
│   ║  capability         ║   │
│   ╚═════════════════════╝   │
│                             │
└─────────────────────────────┘
```

**Tailwind Implementation:**

```tsx
<section className="section-full py-16 px-6">
  <h2 className="text-title text-center mb-8 sm:mb-12">How It Works</h2>
  
  {/* Mobile: Vertical flow */}
  {/* Desktop: Horizontal diagram */}
  <div className="
    flex flex-col gap-4
    sm:hidden
  ">
    {/* Vertical stepped cards */}
    {steps.map((step, i) => (
      <div key={i} className="relative">
        <StepCard step={step} />
        {i < steps.length - 1 && (
          <div className="flex justify-center py-2">
            <ArrowDown className="w-6 h-6 text-ink-fog" />
          </div>
        )}
      </div>
    ))}
  </div>
  
  {/* Tablet/Desktop: Horizontal animated diagram */}
  <div className="hidden sm:block">
    <HowItWorksDiagram />
  </div>
</section>
```

#### Tablet Layout (768px - 1024px)

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌────────┐   ┌────────┐   ┌────────┐     │
│   │Provider│ + │ Tools  │ + │Behavior│     │
│   └────────┘   └────────┘   └────────┘     │
│        └──────────┼──────────┘              │
│                   ↓                         │
│            ╔═══════════╗                    │
│            ║  BUNDLE   ║                    │
│            ╚═══════════╝                    │
│                                             │
└─────────────────────────────────────────────┘
```

#### Desktop Layout (1024px+)

Full animated diagram with:
- Isometric 3D blocks
- Animated connection lines
- Hover states for exploration
- Scroll-triggered assembly animation

---

### Section 5: See It Run (100vh)

**Content:** Terminal showing auto-playing execution trace

#### Mobile Layout (< 640px)

**Terminal must be readable on small screens.**

```
┌─────────────────────────────┐
│                             │
│   See It Run                │
│                             │
│ ┌───────────────────────────┐
│ │ ● ● ●          execution │ ← Terminal header
│ ├───────────────────────────┤
│ │                           │
│ │ > amplifier run           │ ← Smaller font (13px)
│ │   "Document this"         │
│ │                           │
│ │ ✓ Loading bundle...       │
│ │ ✓ Analyzing files...      │
│ │ → Writing docs...         │ ← Current step
│ │   █                       │   with cursor
│ │                           │
│ │                           │
│ └───────────────────────────┘
│                             │
│   Watch the agent work      │  ← Brief explainer
│   in real-time              │
│                             │
└─────────────────────────────┘
```

**Key Mobile Adaptations:**

1. **Font size:** 13px minimum (not 14px)
2. **Line height:** 1.5 (tighter than desktop 1.6)
3. **Horizontal scroll:** For long lines, NOT wrapping
4. **Height:** Cap at 60vh to leave room for context
5. **Auto-scroll:** Smooth scroll to follow new content

```tsx
<section className="section-full flex flex-col justify-center px-4 sm:px-6 py-12">
  <h2 className="text-title text-center mb-6 sm:mb-10">See It Run</h2>
  
  <div className="
    terminal
    w-full max-w-4xl mx-auto
    max-h-[60vh] sm:max-h-[70vh]
  ">
    <div className="terminal-header">
      <div className="terminal-dots">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot active" />
      </div>
      <span className="terminal-label">execution trace</span>
    </div>
    
    <div className="
      terminal-body
      text-[13px] sm:text-sm
      leading-[1.5] sm:leading-[1.6]
      overflow-x-auto overflow-y-auto
      whitespace-pre
    ">
      {/* Execution trace content */}
    </div>
  </div>
  
  <p className="text-center text-ink-slate text-sm mt-6 px-4">
    Watch the agent work in real-time
  </p>
</section>
```

#### Touch Considerations

- **Pause on touch:** Stop auto-play when user touches terminal
- **Manual scroll:** Allow user to scroll back through output
- **Resume button:** "Resume auto-scroll" floating button

---

### Section 6: The Ecosystem (100vh)

**Content:** Horizontal scroll of bundle cards (official + community)

#### Mobile Layout (< 640px)

**Full-width horizontal carousel with momentum scroll**

```
┌─────────────────────────────┐
│                             │
│   The Ecosystem             │
│   Built by many             │
│                             │
│ ←─────────────────────────→ │  ← Swipe hint
│                             │
│ ┌────────┐┌────────┐┌─────  │
│ │  Doc   ││ Review ││ Dev   │  ← Cards peek
│ │ Writer ││  Bot   ││ Kit   │
│ │        ││        ││       │
│ │ ★★★★☆ ││ ★★★★★ ││ ★★★☆  │
│ │  347   ││  892   ││  156  │
│ └────────┘└────────┘└─────  │
│                             │
│     ○ ○ ● ○ ○ ○ ○          │  ← Scroll position
│                             │
│   [ Explore All Bundles ]   │  ← CTA button
│                             │
└─────────────────────────────┘
```

**Implementation:**

```tsx
<section className="section-full py-16 overflow-hidden">
  <div className="px-6 mb-8">
    <h2 className="text-title">The Ecosystem</h2>
    <p className="text-ink-slate mt-2">Built by many, better for everyone</p>
  </div>
  
  {/* Horizontal scroll container */}
  <div 
    className="
      flex gap-4 overflow-x-auto snap-x snap-mandatory
      px-6 pb-4
      scrollbar-hide
      -webkit-overflow-scrolling-touch
    "
    ref={scrollContainerRef}
  >
    {bundles.map((bundle, i) => (
      <BundleCard 
        key={i}
        bundle={bundle}
        className="
          flex-shrink-0 
          w-[260px] sm:w-[300px] lg:w-[320px]
          snap-center sm:snap-start
        "
      />
    ))}
    
    {/* "See more" card at end */}
    <div className="
      flex-shrink-0 w-[200px]
      flex items-center justify-center
      bg-canvas-stone rounded-gentle
    ">
      <Link href="/explore" className="text-signal font-medium">
        See all bundles →
      </Link>
    </div>
  </div>
  
  {/* Scroll indicators */}
  <ScrollIndicators 
    containerRef={scrollContainerRef}
    itemCount={bundles.length}
    className="mt-6 sm:hidden"
  />
  
  <div className="px-6 mt-8 text-center">
    <Link href="/explore" className="btn-primary">
      Explore All Bundles
    </Link>
  </div>
</section>
```

#### Horizontal Scroll CSS

```css
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Momentum scrolling on iOS */
.scroll-touch {
  -webkit-overflow-scrolling: touch;
}

/* Card peek effect */
.scroll-container {
  /* Right padding creates peek of next card */
  padding-right: 24px;
  /* Scroll padding for snap alignment */
  scroll-padding-left: 24px;
}
```

---

### Section 7: Get Started (100vh)

**Content:** Install command with copy button, two CTAs

#### Mobile Layout (< 640px)

```
┌─────────────────────────────┐
│                             │
│   Get Started               │
│                             │
│   Ready to build?           │
│                             │
│ ┌───────────────────────────┐
│ │ $ pip install amplifier  │ │  ← Copy button
│ │                      [📋]│ │     inside
│ └───────────────────────────┘
│                             │
│   "Copied!" (toast)         │  ← Feedback
│                             │
│ ┌───────────────────────────┐
│ │    Quick Start Guide      │  ← Primary CTA
│ │           →               │     full width
│ └───────────────────────────┘
│                             │
│ ┌───────────────────────────┐
│ │    View Documentation     │  ← Secondary CTA
│ │           →               │     full width
│ └───────────────────────────┘
│                             │
│   Questions? Join Discord   │  ← Tertiary link
│                             │
└─────────────────────────────┘
```

**Implementation:**

```tsx
<section className="
  section-full 
  flex flex-col items-center justify-center
  px-6 py-16
  bg-canvas-stone
">
  <h2 className="text-title text-center mb-4">Get Started</h2>
  <p className="text-ink-slate text-center mb-8">Ready to build?</p>
  
  {/* Install command */}
  <div className="
    w-full max-w-md
    relative
  ">
    <code className="
      code-block 
      w-full 
      pr-12 
      text-sm sm:text-base
    ">
      pip install amplifier
    </code>
    <button 
      onClick={copyToClipboard}
      className="
        absolute right-3 top-1/2 -translate-y-1/2
        p-2 rounded hover:bg-depth-iron
        transition-colors
      "
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  </div>
  
  {/* CTAs */}
  <div className="
    w-full max-w-md
    flex flex-col gap-4
    mt-8
    sm:flex-row sm:max-w-lg
  ">
    <Link href="/start" className="btn-primary flex-1 text-center">
      Quick Start Guide
    </Link>
    <Link href="/docs" className="btn-secondary flex-1 text-center">
      Documentation
    </Link>
  </div>
  
  {/* Tertiary */}
  <p className="mt-8 text-sm text-ink-fog">
    Questions? <Link href="/discord" className="link-signal">Join our Discord</Link>
  </p>
</section>
```

#### Touch Consideration: Copy Button

- Large tap target (44x44px minimum)
- Visual feedback on tap (scale down)
- Haptic feedback on copy success (if available)
- Toast notification positioned to not cover content

---

## Explore Page Sections

### Section 1: Architecture Deep-Dive (100vh)

**Content:** Isometric/3D interactive diagram of how pieces connect

#### Mobile Layout (< 640px)

**3D diagram won't work on mobile. Alternative approaches:**

**Option A: Simplified 2D Diagram**
```
┌─────────────────────────────┐
│                             │
│   Architecture              │
│                             │
│   ┌─────────────────────┐   │
│   │      BUNDLE         │   │  ← Flat representation
│   │   ┌────┬────┬────┐  │   │
│   │   │Prov│Tool│Hook│  │   │
│   │   └────┴────┴────┘  │   │
│   └─────────────────────┘   │
│                             │
│   Tap to explore ↓         │
│                             │
│   ┌─────────────────────┐   │
│   │ ⚡ Providers         │   │  ← Expandable
│   │    Claude, GPT...   ▼│   │     sections
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │ 🔧 Tools            │   │
│   │    File, bash...   ▼│   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**Option B: Tabbed Interface**
```tsx
<section className="section-full py-16 px-6">
  <h2 className="text-title text-center mb-8">Architecture</h2>
  
  {/* Mobile: Tabbed exploration */}
  <div className="sm:hidden">
    <div className="flex border-b border-canvas-mist mb-6">
      {['Overview', 'Providers', 'Tools', 'Hooks'].map(tab => (
        <button 
          key={tab}
          className={`flex-1 py-3 text-sm ${activeTab === tab ? 'border-b-2 border-signal' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
    <TabContent tab={activeTab} />
  </div>
  
  {/* Desktop: Full 3D diagram */}
  <div className="hidden sm:block">
    <IsometricArchitectureDiagram />
  </div>
</section>
```

**Option C: Vertical Scroll Story**

Each component becomes a scroll section with simple illustrations.

#### Touch vs Click

| Interaction | Mouse | Touch |
|-------------|-------|-------|
| Explore component | Hover to highlight | Tap to expand |
| View details | Click opens modal | Tap opens inline expansion |
| Rotate diagram | Click-drag | Disabled / simplified view |
| Zoom | Scroll wheel | Pinch-to-zoom or disabled |

---

### Section 2: Try Bundles (Variable Height)

**Content:** Horizontal bundle selector → Simulator as focal point below

#### Mobile Layout (< 640px)

```
┌─────────────────────────────┐
│                             │
│   Try a Bundle              │
│                             │
│   ← [Doc] [Review] [Dev] → │  ← Horizontal pills
│                             │
│ ┌───────────────────────────┐
│ │ Documentation Writer      │ ← Selected bundle
│ │ Creates comprehensive     │    info card
│ │ documentation for your... │
│ │                           │
│ │ Tools: file, grep, web    │
│ └───────────────────────────┘
│                             │
│ ┌───────────────────────────┐
│ │ Try it:                   │
│ │ ┌───────────────────────┐ │
│ │ │ Document the auth     │ │ ← Input field
│ │ │ module                │ │
│ │ └───────────────────────┘ │
│ │      [ Run Simulation ]   │
│ └───────────────────────────┘
│                             │
│ ┌───────────────────────────┐
│ │ ● ● ●      simulation    │ ← Terminal output
│ ├───────────────────────────┤    (scrollable)
│ │ > Loading bundle...       │
│ │ > Analyzing...            │
│ │ > Writing documentation...│
│ │ █                         │
│ └───────────────────────────┘
│                             │
└─────────────────────────────┘
```

**Note:** This section should NOT be 100vh constrained - let content determine height.

**Implementation:**

```tsx
<section className="min-h-screen py-16 px-4 sm:px-6">
  <h2 className="text-title text-center mb-8">Try a Bundle</h2>
  
  {/* Bundle selector - horizontal scroll on mobile */}
  <div className="
    flex gap-2 overflow-x-auto pb-4 mb-6
    scrollbar-hide snap-x
    sm:flex-wrap sm:justify-center sm:overflow-visible
  ">
    {bundles.map(bundle => (
      <button
        key={bundle.id}
        className={`
          flex-shrink-0 px-4 py-2 rounded-full
          text-sm font-medium snap-start
          transition-colors
          ${selected === bundle.id 
            ? 'bg-signal text-white' 
            : 'bg-canvas-stone text-ink-slate hover:bg-canvas-mist'
          }
        `}
      >
        {bundle.name}
      </button>
    ))}
  </div>
  
  {/* Bundle info */}
  <div className="max-w-2xl mx-auto mb-8">
    <BundleInfoCard bundle={selectedBundle} />
  </div>
  
  {/* Simulator */}
  <div className="max-w-4xl mx-auto">
    <SimulatorInput onSubmit={runSimulation} />
    
    <div className="mt-6">
      <Terminal 
        output={simulationOutput}
        className="max-h-[50vh]"
      />
    </div>
  </div>
</section>
```

#### Terminal/Simulator Readability on Small Screens

| Property | Mobile | Tablet+ |
|----------|--------|---------|
| Font size | 13px | 14px |
| Line height | 1.5 | 1.6 |
| Max height | 50vh | 70vh |
| Padding | 16px | 24px |
| Word wrap | `pre` (horizontal scroll) | `pre-wrap` on wide screens |

---

### Section 3: Community Showcase (100vh)

**Content:** Grid of showcase cards

#### Mobile Layout (< 640px)

```
┌─────────────────────────────┐
│                             │
│   Community Showcase        │
│   See what others built     │
│                             │
│ ┌───────────────────────────┐
│ │ 🏢 Enterprise Docs Bot    │  ← Featured card
│ │ by @techcorp              │     (larger)
│ │ ★★★★★ (234 stars)        │
│ │ "Automated our entire..." │
│ └───────────────────────────┘
│                             │
│ ┌────────────┐┌────────────┐│
│ │ Code Audit ││ API Gen    ││  ← 2-column grid
│ │ @security  ││ @devtools  ││
│ │ ★★★★☆     ││ ★★★★★     ││
│ └────────────┘└────────────┘│
│ ┌────────────┐┌────────────┐│
│ │ Test Suite ││ PR Review  ││
│ │ @testing   ││ @workflow  ││
│ │ ★★★☆☆     ││ ★★★★☆     ││
│ └────────────┘└────────────┘│
│                             │
│   [ View All Community ]    │
│                             │
└─────────────────────────────┘
```

**Implementation:**

```tsx
<section className="section-full py-16 px-6">
  <div className="text-center mb-8">
    <h2 className="text-title">Community Showcase</h2>
    <p className="text-ink-slate mt-2">See what others have built</p>
  </div>
  
  {/* Featured card - full width on mobile */}
  <div className="mb-6">
    <ShowcaseCard 
      bundle={featured}
      variant="featured"
      className="w-full"
    />
  </div>
  
  {/* Grid of cards */}
  <div className="
    grid grid-cols-2 gap-4
    sm:grid-cols-3 sm:gap-6
    lg:grid-cols-4
  ">
    {showcaseBundles.slice(0, 6).map(bundle => (
      <ShowcaseCard 
        key={bundle.id}
        bundle={bundle}
        variant="compact"
      />
    ))}
  </div>
  
  <div className="text-center mt-8">
    <Link href="/community" className="btn-secondary">
      View All Community Bundles
    </Link>
  </div>
</section>
```

---

## Horizontal Scroll Patterns

### Universal Horizontal Scroll Component

```tsx
// components/HorizontalScroll.tsx
interface HorizontalScrollProps {
  children: React.ReactNode;
  showIndicators?: boolean;
  className?: string;
}

export function HorizontalScroll({ 
  children, 
  showIndicators = true,
  className 
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  // Intersection Observer to track visible item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const items = container.children;
    setItemCount(items.length);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target as Element);
            setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    
    Array.from(items).forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [children]);
  
  return (
    <div className={className}>
      <div 
        ref={containerRef}
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory
          pb-4 scrollbar-hide scroll-touch
          scroll-pl-6
        "
        style={{ scrollPaddingLeft: '24px' }}
      >
        {children}
      </div>
      
      {showIndicators && itemCount > 1 && (
        <div className="flex justify-center gap-2 mt-4 sm:hidden">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${i === activeIndex ? 'bg-signal' : 'bg-canvas-mist'}
              `}
              onClick={() => {
                containerRef.current?.children[i]?.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center'
                });
              }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

### CSS for Horizontal Scroll

```css
/* globals.css additions */

/* Horizontal scroll container */
.scroll-x {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-padding-left: 1.5rem;
  padding-bottom: 1rem; /* Space for touch */
}

.scroll-x::-webkit-scrollbar {
  display: none;
}

/* Items in horizontal scroll */
.scroll-x > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}

/* Snap to center on mobile (feels more natural) */
@media (max-width: 640px) {
  .scroll-x-center > * {
    scroll-snap-align: center;
  }
}

/* Peek effect - show partial next item */
.scroll-x-peek {
  padding-right: 3rem; /* Shows ~48px of next card */
}

/* Fade edges to indicate scrollability */
.scroll-x-fade {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 24px,
    black calc(100% - 48px),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 24px,
    black calc(100% - 48px),
    transparent
  );
}
```

---

## Touch vs Mouse Interactions

### Interaction Map

| Element | Mouse Hover | Mouse Click | Touch Tap | Touch Long Press |
|---------|-------------|-------------|-----------|------------------|
| Card | Lift + shadow | Navigate | Navigate | Preview/context |
| Button | Color change | Action | Action | - |
| Diagram node | Tooltip | Expand details | Expand details | - |
| Code block | - | Select text | Select text | Copy menu |
| Terminal | - | - | Pause auto-scroll | - |
| Carousel | Arrow buttons visible | Navigate | Swipe | - |

### Implementing Touch-Aware Interactions

```tsx
// hooks/useInteractionType.ts
import { useState, useEffect } from 'react';

export function useInteractionType() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Check for touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    
    // Also listen for actual touch events to be sure
    const handleTouch = () => setIsTouchDevice(true);
    window.addEventListener('touchstart', handleTouch, { once: true });
    
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);
  
  return { isTouchDevice };
}
```

### Touch-Optimized Components

```tsx
// Card with touch-aware interactions
function Card({ children, href }: { children: React.ReactNode; href: string }) {
  const { isTouchDevice } = useInteractionType();
  
  return (
    <Link 
      href={href}
      className={`
        card
        ${isTouchDevice 
          ? 'active:scale-[0.98] active:bg-canvas-stone' // Touch feedback
          : 'hover:shadow-float hover:-translate-y-1'   // Mouse hover
        }
      `}
    >
      {children}
    </Link>
  );
}
```

### Tap Target Sizes

```css
/* Ensure minimum tap targets */
.tap-target {
  min-width: 44px;
  min-height: 44px;
}

/* For inline elements that need larger tap areas */
.tap-target-expand {
  position: relative;
}

.tap-target-expand::before {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
```

---

## Performance Guidelines

### Animation Budget by Device

| Device | Max Concurrent Animations | Particle Count | Video |
|--------|---------------------------|----------------|-------|
| Mobile (< 640px) | 2 | 0 | Poster only |
| Tablet (640-1024px) | 4 | 20 | Auto-play, low quality |
| Desktop (1024px+) | 8+ | 50+ | Auto-play, high quality |

### Implementation

```tsx
// hooks/useAnimationBudget.ts
import { useEffect, useState } from 'react';

interface AnimationBudget {
  maxConcurrent: number;
  particleCount: number;
  enableVideo: boolean;
  enableComplexAnimations: boolean;
}

export function useAnimationBudget(): AnimationBudget {
  const [budget, setBudget] = useState<AnimationBudget>({
    maxConcurrent: 2,
    particleCount: 0,
    enableVideo: false,
    enableComplexAnimations: false,
  });
  
  useEffect(() => {
    const width = window.innerWidth;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) {
      setBudget({
        maxConcurrent: 0,
        particleCount: 0,
        enableVideo: false,
        enableComplexAnimations: false,
      });
      return;
    }
    
    if (width >= 1024) {
      setBudget({
        maxConcurrent: 8,
        particleCount: 50,
        enableVideo: true,
        enableComplexAnimations: true,
      });
    } else if (width >= 640) {
      setBudget({
        maxConcurrent: 4,
        particleCount: 20,
        enableVideo: true,
        enableComplexAnimations: false,
      });
    } else {
      setBudget({
        maxConcurrent: 2,
        particleCount: 0,
        enableVideo: false,
        enableComplexAnimations: false,
      });
    }
  }, []);
  
  return budget;
}
```

### Lazy Loading Sections

```tsx
// components/LazySection.tsx
import { useInView } from 'react-intersection-observer';

function LazySection({ children, fallback }: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px', // Load slightly before visible
  });
  
  return (
    <div ref={ref}>
      {inView ? children : (fallback || <SectionSkeleton />)}
    </div>
  );
}
```

### Image Optimization

```tsx
// Use Next.js Image with responsive sizes
<Image
  src="/hero-visual.webp"
  alt="Amplifier diagram"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

### Critical CSS / Code Splitting

```tsx
// Dynamic import for heavy components
const IsometricDiagram = dynamic(
  () => import('@/components/IsometricDiagram'),
  { 
    loading: () => <DiagramSkeleton />,
    ssr: false // Don't SSR heavy 3D components
  }
);

const TerminalSimulation = dynamic(
  () => import('@/components/TerminalSimulation'),
  { loading: () => <TerminalSkeleton /> }
);
```

---

## CSS Implementation

### Add to tailwind.config.js

```js
// tailwind.config.js
module.exports = {
  content: [/* ... */],
  theme: {
    extend: {
      // Existing config...
      
      // Add responsive section heights
      height: {
        'screen-safe': '100dvh',
        'screen-fallback': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'screen-safe': '100dvh',
        'section': 'min(100dvh, 800px)', // Cap for very tall screens
      },
      maxHeight: {
        'terminal-mobile': '60vh',
        'terminal-desktop': '70vh',
      },
      
      // Responsive spacing
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Animation variants
      animation: {
        // Existing...
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // Custom plugin for scroll snap utilities
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scroll-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
        '.snap-x-mandatory': {
          'scroll-snap-type': 'x mandatory',
        },
        '.snap-y-mandatory': {
          'scroll-snap-type': 'y mandatory',
        },
      });
    },
  ],
};
```

### Add to globals.css

```css
/* ============================================
   100vh Section System
   ============================================ */

/* Dynamic viewport height with fallbacks */
.section-full {
  min-height: 100vh; /* Fallback */
  min-height: 100dvh; /* Modern browsers */
  min-height: calc(var(--vh, 1vh) * 100); /* JS fallback */
  
  /* Safe area padding */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* For sections that shouldn't exceed screen */
.section-contained {
  min-height: min(100dvh, 900px);
  max-height: 100dvh;
  overflow: hidden;
}

/* ============================================
   Scroll Snap System
   ============================================ */

/* Full-page scroll snap container */
.scroll-snap-pages {
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  overscroll-behavior: contain;
}

/* Disable snap on mobile - natural scroll feels better */
@media (max-width: 768px) {
  .scroll-snap-pages {
    scroll-snap-type: none;
    height: auto;
    overflow: visible;
  }
}

/* Re-enable for tablet+ with sufficient height */
@media (min-width: 1024px) and (min-height: 700px) {
  .scroll-snap-pages {
    scroll-snap-type: y mandatory;
  }
}

/* Individual snap sections */
.scroll-snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ============================================
   Horizontal Scroll System
   ============================================ */

.horizontal-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-padding-left: 1.5rem;
  padding: 0.5rem 1.5rem 1rem;
}

.horizontal-scroll::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}

/* Center snap on mobile */
@media (max-width: 640px) {
  .horizontal-scroll > * {
    scroll-snap-align: center;
  }
}

/* ============================================
   Touch Optimization
   ============================================ */

/* Minimum tap target */
.tap-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Touch feedback */
@media (hover: none) and (pointer: coarse) {
  .touch-feedback:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  /* Disable hover effects on touch */
  .hover-effect:hover {
    transform: none;
    box-shadow: none;
  }
}

/* ============================================
   Responsive Terminal
   ============================================ */

.terminal-responsive {
  font-size: 13px;
  line-height: 1.5;
  max-height: 60vh;
}

@media (min-width: 640px) {
  .terminal-responsive {
    font-size: 14px;
    line-height: 1.6;
    max-height: 70vh;
  }
}

/* ============================================
   Motion Preferences
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .section-full {
    /* Remove scroll-linked effects */
    scroll-snap-type: none !important;
  }
  
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .horizontal-scroll {
    scroll-snap-type: none;
  }
}

/* ============================================
   Loading States for Sections
   ============================================ */

.section-skeleton {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--canvas) 0%,
    var(--canvas-stone) 100%
  );
}
```

---

## Summary Checklist

### Before Launch

- [ ] Test on iPhone SE (375px) - smallest target
- [ ] Test on iPhone 14 Pro Max (430px) - notch/dynamic island
- [ ] Test on iPad Mini (768px) - tablet portrait
- [ ] Test on iPad Pro (1024px) - tablet landscape
- [ ] Test with iOS Safari address bar visible/hidden
- [ ] Test with Chrome Android with/without toolbar
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Test with slow 3G network throttling
- [ ] Verify all tap targets ≥ 44x44px
- [ ] Verify horizontal scrolls have visual affordance
- [ ] Verify terminal readable at 13px
- [ ] Lighthouse mobile score ≥ 90

### Key Decisions Summary

| Concern | Decision |
|---------|----------|
| 100vh on mobile | Use `100dvh` with JS fallback |
| Scroll snap on mobile | **Disabled** - use natural scroll |
| Scroll snap on desktop | Enabled for 1024px+ with 700px+ height |
| Horizontal scroll | Snap to center on mobile, start on desktop |
| Complex animations | Mobile: simplified/disabled, Desktop: full |
| Terminal font | 13px mobile, 14px desktop |
| Card grids | 1 col → 2 col (sm) → 3 col (lg) → 5 col (xl) |
| 3D diagrams | 2D fallback or tabbed interface on mobile |
