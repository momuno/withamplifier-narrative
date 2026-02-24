# Interactive Playground Component Specifications

## Design System Audit Summary

### Current State
The withamplifier.com design system is well-established with:
- **Typography:** Syne (headings), Epilogue (body), JetBrains Mono (code)
- **Colors:** Canvas backgrounds, Ink text hierarchy, Ember accent, Depth dark surfaces
- **Components:** btn-primary, btn-secondary, card, code-block, RevealOnScroll
- **Motion:** Subtle reveals, staggered animations, hover states

### Identified Gaps for Interactive Playground
1. No terminal/output streaming component
2. No progress/step indicators for multi-step workflows
3. No agent state visualization (thinking, executing, complete)
4. No tool call visualization
5. No collapsible explanation panels
6. No loading/skeleton states
7. No status badges for success/error/warning

---

## New Component Specifications

### 1. Terminal Output Component

**Purpose:** Display streaming agent output with syntax highlighting and visual feedback.

#### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│ ● ● ●                                    agent output   │  ← Header bar
├─────────────────────────────────────────────────────────┤
│                                                         │
│  > Analyzing codebase structure...                      │  ← Command echo
│                                                         │
│  Found 23 TypeScript files                              │  ← Output text
│  Scanning for patterns...                               │
│  ▋                                                      │  ← Cursor (blinking)
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Background | `depth-charcoal` (#2A2A28) |
| Header | `depth-obsidian` (#0F0F0E) |
| Text | #E8E8E6 (light gray) |
| Command text | `ember` (#D4642A) |
| Border radius | `rounded-soft` (12px) |
| Font | JetBrains Mono, 14px |
| Line height | 1.6 |
| Padding | 24px |
| Min height | 200px |
| Max height | 500px (scrollable) |

#### States

| State | Visual Treatment |
|-------|------------------|
| **Idle** | Static content, no cursor |
| **Streaming** | Blinking cursor (▋), smooth text append |
| **Complete** | Cursor fades out, subtle checkmark in header |
| **Error** | Red tint on header, error icon |

#### Animation Behavior

```css
/* Cursor blink */
@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Text streaming - character by character fade-in */
.terminal-char {
  animation: char-appear 0.05s ease-out forwards;
}

/* Smooth scroll to bottom on new content */
scroll-behavior: smooth;
```

#### CSS Implementation

```css
.terminal {
  @apply rounded-soft overflow-hidden shadow-elevate;
  background-color: var(--depth-charcoal);
  font-family: 'JetBrains Mono', monospace;
}

.terminal-header {
  @apply px-5 py-3 flex items-center justify-between;
  background-color: var(--depth-obsidian);
  border-bottom: 1px solid var(--depth-iron);
}

.terminal-dots {
  @apply flex gap-2;
}

.terminal-dot {
  @apply w-3 h-3 rounded-full;
  background-color: var(--depth-iron);
}

.terminal-dot.active {
  background-color: var(--ember);
}

.terminal-body {
  @apply p-6 overflow-y-auto;
  color: #E8E8E6;
  font-size: 14px;
  line-height: 1.6;
  max-height: 500px;
}

.terminal-command {
  color: var(--ember);
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 18px;
  background-color: var(--ember);
  animation: cursor-blink 1s infinite;
  vertical-align: text-bottom;
}

.terminal-cursor.hidden {
  opacity: 0;
  transition: opacity 0.3s ease-out;
}
```

#### Responsive Considerations
- Mobile: Full-width, reduce padding to 16px
- Reduce font size to 13px on small screens
- Touch: Add horizontal scroll for long lines

---

### 2. Step Indicator / Progress Component

**Purpose:** Show multi-step workflow progress with clear state indication.

#### Visual Design

```
Horizontal (default):
┌─────────────────────────────────────────────────────────┐
│  ✓ Bundle      →  ● Executing     ○ Tools      ○ Done   │
│  loaded           step 2 of 4                           │
└─────────────────────────────────────────────────────────┘

Vertical (sidebar):
┌──────────────────┐
│  ✓  Bundle       │
│  │   loaded      │
│  ●  Executing    │  ← Current step
│  │   analyzing   │
│  ○  Tools        │
│  │               │
│  ○  Complete     │
└──────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Step circle size | 32px |
| Connector line | 2px, canvas-mist |
| Active connector | 2px, ember |
| Step spacing | 48px (horizontal), 24px (vertical) |
| Label font | Epilogue, 14px, medium |
| Sublabel font | Epilogue, 12px, ink-fog |

#### States

| State | Circle | Label | Connector |
|-------|--------|-------|-----------|
| **Pending** | Hollow, canvas-mist border | ink-fog | canvas-mist |
| **Current** | Filled ember, pulse animation | ink | ember (animated) |
| **Complete** | Filled with checkmark, ember-soft bg | ink-slate | ember |
| **Error** | Red border, error icon | Red text | Red |

#### Animation Behavior

```css
/* Current step pulse */
@keyframes step-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 100, 42, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(212, 100, 42, 0); }
}

/* Connector fill animation */
@keyframes connector-fill {
  from { width: 0%; }
  to { width: 100%; }
}

/* Checkmark draw animation */
@keyframes check-draw {
  from { stroke-dashoffset: 24; }
  to { stroke-dashoffset: 0; }
}
```

#### CSS Implementation

```css
.step-indicator {
  @apply flex items-center;
}

.step-indicator.vertical {
  @apply flex-col items-start;
}

.step {
  @apply flex items-center gap-3;
}

.step-circle {
  @apply w-8 h-8 rounded-full flex items-center justify-center;
  @apply border-2 transition-all duration-300;
  border-color: var(--canvas-mist);
  background-color: transparent;
}

.step-circle.pending {
  border-color: var(--canvas-mist);
}

.step-circle.current {
  border-color: var(--ember);
  background-color: var(--ember);
  animation: step-pulse 2s ease-in-out infinite;
}

.step-circle.current::after {
  content: '';
  @apply w-2 h-2 rounded-full;
  background-color: white;
}

.step-circle.complete {
  border-color: var(--ember);
  background-color: var(--ember-soft);
}

.step-connector {
  @apply h-0.5 flex-1 mx-2;
  background-color: var(--canvas-mist);
  position: relative;
  min-width: 40px;
}

.step-connector.active::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--ember);
  animation: connector-fill 0.5s ease-out forwards;
}

.step-label {
  @apply text-sm font-medium;
  color: var(--ink-fog);
}

.step.current .step-label {
  color: var(--ink);
}

.step.complete .step-label {
  color: var(--ink-slate);
}
```

---

### 3. Agent State Indicator

**Purpose:** Show real-time agent status with semantic visual feedback.

#### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│  ◐ Thinking...                                          │  ← Animated spinner
│  Analyzing file structure and dependencies              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ⚡ Executing                                            │  ← Pulse animation
│  Running grep search on src/**/*.ts                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ✓ Complete                                             │  ← Static checkmark
│  Task finished in 3.2s                                  │
└─────────────────────────────────────────────────────────┘
```

#### States & Specifications

| State | Icon | Color | Animation | Background |
|-------|------|-------|-----------|------------|
| **Idle** | Circle outline | ink-fog | None | transparent |
| **Thinking** | Spinning dots | ember | Rotate 1s | ember-soft |
| **Executing** | Lightning bolt | ember | Pulse 0.5s | ember-soft |
| **Complete** | Checkmark | Green (#3D8B40) | Draw-in | Green soft |
| **Error** | X mark | Red (#C53030) | Shake | Red soft |
| **Waiting** | Pause icon | ink-slate | Fade pulse | canvas-stone |

#### CSS Implementation

```css
.agent-state {
  @apply px-4 py-3 rounded-soft flex items-center gap-3;
  @apply transition-all duration-300;
}

.agent-state.idle {
  background-color: transparent;
}

.agent-state.thinking {
  background-color: var(--ember-soft);
}

.agent-state.executing {
  background-color: var(--ember-soft);
}

.agent-state.complete {
  background-color: rgba(61, 139, 64, 0.08);
}

.agent-state.error {
  background-color: rgba(197, 48, 48, 0.08);
}

/* Thinking spinner */
@keyframes thinking-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.agent-icon.thinking {
  animation: thinking-spin 1s linear infinite;
}

/* Executing pulse */
@keyframes executing-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.agent-icon.executing {
  animation: executing-pulse 0.5s ease-in-out infinite;
  color: var(--ember);
}

/* Complete checkmark draw */
@keyframes check-appear {
  from { 
    stroke-dashoffset: 24;
    opacity: 0;
  }
  to { 
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

/* Error shake */
@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.agent-icon.error {
  animation: error-shake 0.3s ease-in-out;
  color: #C53030;
}

.agent-label {
  @apply text-sm font-medium;
}

.agent-sublabel {
  @apply text-micro;
  color: var(--ink-slate);
}
```

---

### 4. Tool Call Visualization

**Purpose:** Show which tools the agent is invoking with parameters and results.

#### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│  ⚙ Tool Call                                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  grep                                          running  │
│  ├─ pattern: "export.*function"                         │
│  ├─ path: "src/**/*.ts"                                 │
│  └─ type: "typescript"                                  │
│                                                         │
│  ┌─ Result ─────────────────────────────────────────┐   │
│  │  Found 12 matches across 4 files                 │   │
│  │  > src/components/Terminal.tsx:23                │   │
│  │  > src/components/StepIndicator.tsx:15           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Container | card style, canvas background |
| Tool name | Heading size, ink color, monospace |
| Parameters | Tree structure, 12px mono, ink-slate |
| Status badge | Pill shape, state-dependent color |
| Result box | Inset, canvas-stone background |
| Border | 1px canvas-mist, ember on hover |

#### States

| State | Badge Color | Icon |
|-------|-------------|------|
| **Pending** | canvas-stone, ink-fog text | Clock |
| **Running** | ember-soft, ember text | Spinner |
| **Success** | Green soft, green text | Checkmark |
| **Error** | Red soft, red text | X mark |

#### CSS Implementation

```css
.tool-call {
  @apply rounded-soft border overflow-hidden;
  border-color: var(--canvas-mist);
  background-color: var(--canvas);
  transition: border-color 0.3s ease;
}

.tool-call:hover {
  border-color: var(--ember-glow);
}

.tool-call-header {
  @apply px-5 py-3 flex items-center justify-between;
  @apply border-b;
  border-color: var(--canvas-mist);
  background-color: var(--canvas-stone);
}

.tool-name {
  @apply font-mono font-medium;
  color: var(--ink);
}

.tool-status {
  @apply px-3 py-1 rounded-full text-micro font-medium;
}

.tool-status.pending {
  background-color: var(--canvas-stone);
  color: var(--ink-fog);
}

.tool-status.running {
  background-color: var(--ember-soft);
  color: var(--ember);
}

.tool-status.success {
  background-color: rgba(61, 139, 64, 0.08);
  color: #3D8B40;
}

.tool-status.error {
  background-color: rgba(197, 48, 48, 0.08);
  color: #C53030;
}

.tool-call-body {
  @apply p-5;
}

.tool-params {
  @apply font-mono text-sm;
  color: var(--ink-slate);
}

.tool-param {
  @apply flex items-start gap-2 py-1;
}

.tool-param-key {
  color: var(--ink-fog);
}

.tool-param-value {
  color: var(--ink);
}

.tool-result {
  @apply mt-4 p-4 rounded-subtle;
  background-color: var(--canvas-stone);
  border: 1px solid var(--canvas-mist);
}

.tool-result-header {
  @apply text-micro font-medium uppercase tracking-wider mb-2;
  color: var(--ink-fog);
}
```

---

### 5. Collapsible Explanation Panel

**Purpose:** Expandable sections for detailed explanations without cluttering the UI.

#### Visual Design

```
Collapsed:
┌─────────────────────────────────────────────────────────┐
│  ▶ What's happening here?                               │
└─────────────────────────────────────────────────────────┘

Expanded:
┌─────────────────────────────────────────────────────────┐
│  ▼ What's happening here?                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  The agent is using the grep tool to search for         │
│  exported functions in TypeScript files. This helps     │
│  understand the codebase structure before making        │
│  documentation suggestions.                             │
│                                                         │
│  Learn more about tools →                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Header padding | 16px 20px |
| Content padding | 20px |
| Icon | Chevron, 16px, rotates 90° |
| Header font | Epilogue, 15px, medium |
| Content font | Epilogue, 14px, regular |
| Border | 1px canvas-mist |
| Border radius | rounded-soft |
| Background | canvas (collapsed), canvas-stone (expanded header) |

#### Animation Behavior

```css
/* Height animation with max-height technique */
.panel-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease-out, padding 0.35s ease-out;
}

.panel.expanded .panel-content {
  max-height: 500px; /* Adjust based on content */
  padding: 20px;
}

/* Chevron rotation */
.panel-icon {
  transition: transform 0.25s ease-out;
}

.panel.expanded .panel-icon {
  transform: rotate(90deg);
}
```

#### CSS Implementation

```css
.panel {
  @apply rounded-soft border overflow-hidden;
  border-color: var(--canvas-mist);
}

.panel-header {
  @apply px-5 py-4 flex items-center justify-between cursor-pointer;
  @apply transition-colors duration-200;
  background-color: var(--canvas);
}

.panel-header:hover {
  background-color: var(--canvas-stone);
}

.panel.expanded .panel-header {
  background-color: var(--canvas-stone);
  border-bottom: 1px solid var(--canvas-mist);
}

.panel-title {
  @apply text-[15px] font-medium flex items-center gap-3;
  color: var(--ink);
}

.panel-icon {
  @apply w-4 h-4;
  color: var(--ink-fog);
  transition: transform 0.25s var(--ease-out);
}

.panel.expanded .panel-icon {
  transform: rotate(90deg);
}

.panel-content {
  @apply overflow-hidden;
  max-height: 0;
  padding: 0 20px;
  transition: max-height 0.35s var(--ease-out),
              padding 0.35s var(--ease-out);
}

.panel.expanded .panel-content {
  max-height: 500px;
  padding: 20px;
}

.panel-text {
  @apply text-sm leading-relaxed;
  color: var(--ink-slate);
}

.panel-link {
  @apply mt-4 inline-flex text-sm font-medium;
  color: var(--ember);
}
```

---

## Additional Utility Components

### 6. Status Badge

```css
.badge {
  @apply px-2.5 py-1 rounded-full text-micro font-medium;
  @apply inline-flex items-center gap-1.5;
}

.badge.info {
  background-color: var(--canvas-stone);
  color: var(--ink-slate);
}

.badge.success {
  background-color: rgba(61, 139, 64, 0.1);
  color: #3D8B40;
}

.badge.warning {
  background-color: rgba(212, 160, 42, 0.1);
  color: #B8860B;
}

.badge.error {
  background-color: rgba(197, 48, 48, 0.1);
  color: #C53030;
}

.badge.ember {
  background-color: var(--ember-soft);
  color: var(--ember);
}
```

### 7. Skeleton Loading

```css
.skeleton {
  @apply rounded-subtle;
  background: linear-gradient(
    90deg,
    var(--canvas-stone) 25%,
    var(--canvas-mist) 50%,
    var(--canvas-stone) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

.skeleton-text {
  @apply h-4 w-full;
}

.skeleton-title {
  @apply h-6 w-3/4;
}

.skeleton-circle {
  @apply w-10 h-10 rounded-full;
}
```

### 8. Tooltip

```css
.tooltip-trigger {
  position: relative;
}

.tooltip {
  @apply absolute z-50 px-3 py-2 rounded-subtle;
  @apply text-micro whitespace-nowrap;
  background-color: var(--depth-charcoal);
  color: #E8E8E6;
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-trigger:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  margin-bottom: 8px;
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| **sm** | 640px | Stack step indicator vertically |
| **md** | 768px | Side-by-side playground layout |
| **lg** | 1024px | Full horizontal layout |

### Mobile-Specific Adjustments

```css
@media (max-width: 768px) {
  .terminal-body {
    font-size: 13px;
    padding: 16px;
    max-height: 300px;
  }
  
  .step-indicator {
    flex-direction: column;
  }
  
  .step-connector {
    width: 2px;
    height: 24px;
    min-width: auto;
  }
  
  .tool-call-body {
    padding: 16px;
  }
  
  .panel-header {
    padding: 12px 16px;
  }
}
```

---

## Animation Principles

1. **Duration scale:**
   - Micro interactions: 150-200ms
   - Standard transitions: 300-350ms
   - Complex reveals: 500ms
   - Staggered children: +80ms per item

2. **Easing:**
   - Entrances: `ease-out` or custom `cubic-bezier(0.16, 1, 0.3, 1)`
   - Exits: `ease-in`
   - State changes: `ease-smooth` (`cubic-bezier(0.4, 0, 0.2, 1)`)

3. **Reduced motion:**
   - All animations respect `prefers-reduced-motion`
   - Instant state changes, no motion
   - Already implemented in globals.css

---

## Color Reference (Extended)

### Success States
```css
--success: #3D8B40;
--success-soft: rgba(61, 139, 64, 0.08);
--success-glow: rgba(61, 139, 64, 0.18);
```

### Error States
```css
--error: #C53030;
--error-soft: rgba(197, 48, 48, 0.08);
--error-glow: rgba(197, 48, 48, 0.18);
```

### Warning States
```css
--warning: #B8860B;
--warning-soft: rgba(184, 134, 11, 0.08);
--warning-glow: rgba(184, 134, 11, 0.18);
```

---

## Implementation Priority

1. **Phase 1 - Core Playground**
   - Terminal component
   - Agent state indicator
   - Basic streaming support

2. **Phase 2 - Workflow Visualization**
   - Step indicator
   - Tool call visualization
   - Collapsible panels

3. **Phase 3 - Polish**
   - Skeleton loading states
   - Status badges
   - Tooltips
   - Mobile optimizations

---

## File Organization Recommendation

```
components/
├── playground/
│   ├── Terminal.tsx
│   ├── AgentState.tsx
│   ├── StepIndicator.tsx
│   ├── ToolCall.tsx
│   └── CollapsiblePanel.tsx
├── ui/
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   └── Tooltip.tsx
├── Navigation.tsx
├── Footer.tsx
└── RevealOnScroll.tsx
```
