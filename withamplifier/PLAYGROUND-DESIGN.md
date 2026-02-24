# Amplifier Playground: Interactive Simulation Design

A comprehensive design specification for transforming the playground into an educational, immersive experience that demonstrates Amplifier's value without requiring actual execution.

---

## 1. Recommended Approach: Choreographed Simulation

### Why This Approach

After evaluating all options, I recommend a **Choreographed Simulation** strategy—pre-authored execution traces that play out with rich interactivity, combined with educational annotations. Here's the analysis:

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| Pre-recorded demos | Realistic, shows real output | Passive, no agency | Partial |
| Interactive step-through | Educational, controlled pace | Can feel slow/tedious | Partial |
| Animated diagrams | Great for concepts | Doesn't show real work | No |
| Choose your adventure | Engaging | Complex, potentially confusing | No |
| **Choreographed Simulation** | Best of all: realistic, educational, interactive | Requires content authoring | **Yes** |

### Core Concept

The simulation presents **authentic execution traces** from real Amplifier sessions, choreographed as an interactive experience. Users watch the agent think, use tools, and produce output—but can pause, inspect, and learn at any point.

**Key insight:** The value isn't in "fake" execution—it's in helping users understand the agent loop. By using real traces, we maintain authenticity while adding educational scaffolding.

### Design Philosophy

Aligned with "expansion from stillness":
- **Start calm**: Simple prompt → clear intent
- **Reveal depth**: Agent thinking unfolds naturally
- **Show capability**: Tool usage demonstrates power
- **Deliver value**: Real, useful output appears

---

## 2. Interaction Flow & States

### State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│                        PLAYGROUND STATES                         │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────┐     Select      ┌──────────┐     Start      ┌──────────┐
  │  IDLE    │ ───────────────▶│  READY   │ ───────────────▶│ RUNNING  │
  │          │     Bundle      │          │     Session    │          │
  └──────────┘                 └──────────┘                └────┬─────┘
       ▲                            ▲                          │
       │                            │                          │
       │         Reset              │         Pause            ▼
       │    ┌───────────────────────┴──────────────────┐  ┌──────────┐
       │    │                                          │  │  PAUSED  │
       │    │              ┌──────────┐                │  │          │
       └────┴──────────────│ COMPLETE │◀───────────────┴──┴──────────┘
                           │          │     Finish              Resume
                           └──────────┘
```

### Detailed State Descriptions

#### IDLE State
- Bundle selector visible with 4 options
- No active simulation
- YAML preview shows selected bundle config
- Educational tooltip: "Choose a bundle to see it work"

#### READY State  
- Bundle selected
- Prompt textarea active with suggested prompt
- "Run Simulation" button enabled
- Right panel shows bundle configuration
- Speed control visible (0.5x, 1x, 2x, Skip to end)

#### RUNNING State
- Simulation actively playing
- Agent panel shows streaming "thoughts"
- Tool usage appears with syntax highlighting
- Progress indicator shows steps completed
- Pause/Stop controls available
- Educational annotations appear contextually

#### PAUSED State
- Simulation frozen at current moment
- Current step highlighted with explanation
- "What's happening" panel expanded
- User can inspect tool inputs/outputs
- Resume button prominent

#### COMPLETE State
- Full output displayed
- "Replay" and "Try another" buttons
- Summary of what happened (X tool calls, Y seconds simulated)
- CTA to install Amplifier / try with real code

---

## 3. UI Component Specifications

### Layout Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Logo]                               Start here  Explore  Build       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │     INPUT PANEL                 │  │     EXECUTION PANEL          │  │
│  │                                 │  │                             │  │
│  │  ┌─────────────────────────┐   │  │  ┌─────────────────────────┐ │  │
│  │  │ Bundle Selector (tabs)  │   │  │  │ Agent Thinking Stream   │ │  │
│  │  └─────────────────────────┘   │  │  │                         │ │  │
│  │                                 │  │  │ "I'll analyze the code  │ │  │
│  │  ┌─────────────────────────┐   │  │  │  structure first..."    │ │  │
│  │  │ Prompt Input            │   │  │  └─────────────────────────┘ │  │
│  │  │                         │   │  │                             │  │
│  │  │ [textarea]              │   │  │  ┌─────────────────────────┐ │  │
│  │  │                         │   │  │  │ Tool Call Panel         │ │  │
│  │  └─────────────────────────┘   │  │  │                         │ │  │
│  │                                 │  │  │ ▶ glob("**/*.py")      │ │  │
│  │  ┌─────────────────────────┐   │  │  │   → 23 files found     │ │  │
│  │  │ [Run Simulation]        │   │  │  │                         │ │  │
│  │  └─────────────────────────┘   │  │  │ ▶ read_file(...)       │ │  │
│  │                                 │  │  └─────────────────────────┘ │  │
│  │  ┌─────────────────────────┐   │  │                             │  │
│  │  │ Config Preview (yaml)   │   │  │  ┌─────────────────────────┐ │  │
│  │  │ Collapsed by default    │   │  │  │ Output Panel            │ │  │
│  │  └─────────────────────────┘   │  │  │ (appears progressively) │ │  │
│  │                                 │  │  └─────────────────────────┘ │  │
│  └─────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  PLAYBACK CONTROLS                                              │   │
│  │  [⏮] [⏸ Pause] [⏭]    ●───────────────○ Step 3/7    0.5x 1x 2x │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Details

#### A. Bundle Selector (Enhanced)

```tsx
// Visual treatment: Tab-style with preview on hover
interface BundleSelectorProps {
  bundles: Bundle[]
  selected: string
  onSelect: (id: string) => void
  disabled?: boolean  // During playback
}

// Design tokens:
// - Active: bg-ember-soft, border-ember, text-ember
// - Hover: border-canvas-mist → border-ink-fog
// - Disabled: opacity-50, cursor-not-allowed
```

Visual states:
- **Default**: `bg-canvas-stone border-transparent`
- **Hover**: `border-canvas-mist` with slight lift
- **Selected**: `bg-ember-soft border-2 border-ember`
- **Playing**: Subtle pulse animation on selected

#### B. Agent Thinking Panel

```tsx
interface ThinkingPanelProps {
  thoughts: ThoughtChunk[]
  isStreaming: boolean
  onAnnotationClick?: (annotation: string) => void
}

interface ThoughtChunk {
  text: string
  type: 'reasoning' | 'planning' | 'reflection'
  annotation?: string  // Educational tooltip
  timestamp: number
}
```

Visual treatment:
- Dark panel (`bg-depth-charcoal`) to distinguish from input
- Monospace font for authenticity
- Text appears character-by-character (typewriter effect)
- Colored markers for thought types:
  - `reasoning`: Default text color
  - `planning`: `text-ember` subtle highlight
  - `reflection`: `text-ink-fog` italic

#### C. Tool Call Panel

```tsx
interface ToolCallPanelProps {
  calls: ToolCall[]
  currentIndex: number
  expanded: Record<string, boolean>
  onToggle: (id: string) => void
}

interface ToolCall {
  id: string
  name: string
  input: Record<string, unknown>
  output: unknown
  duration: number  // Simulated
  status: 'pending' | 'running' | 'complete'
  annotation: string  // "Finding all Python files..."
}
```

Visual treatment:
```
┌─────────────────────────────────────────────────────┐
│ ▼ glob                                     ✓ 0.3s  │
│   ├─ pattern: "**/*.py"                            │
│   └─ result: 23 files                              │
│      ↳ src/main.py, src/utils.py, ...              │
│                                                     │
│   💡 "The agent searches for Python files to       │
│       understand the codebase structure"           │
├─────────────────────────────────────────────────────┤
│ ▶ read_file                                ● 0.0s  │  ← Currently running
│   └─ path: "src/main.py"                           │
├─────────────────────────────────────────────────────┤
│ ○ grep                                     ○ ---   │  ← Pending
│   └─ pattern: "class.*:"                           │
└─────────────────────────────────────────────────────┘
```

#### D. Playback Controls

```tsx
interface PlaybackControlsProps {
  state: 'idle' | 'playing' | 'paused' | 'complete'
  currentStep: number
  totalSteps: number
  speed: 0.5 | 1 | 2
  onPlay: () => void
  onPause: () => void
  onStep: (direction: 'prev' | 'next') => void
  onSeek: (step: number) => void
  onSpeedChange: (speed: number) => void
  onSkipToEnd: () => void
}
```

Visual treatment:
- Fixed to bottom of execution panel
- Progress bar shows step markers (clickable)
- Current step highlighted with ember accent
- Speed buttons: subtle toggle group

#### E. Educational Annotations

Contextual tooltips that explain what's happening:

```tsx
interface Annotation {
  trigger: 'step' | 'tool' | 'output'
  targetId: string
  title: string
  body: string
  learnMoreUrl?: string
}

// Example annotations:
const annotations = {
  'glob-tool': {
    title: 'File Discovery',
    body: 'The glob tool finds files matching a pattern. Here, the agent is locating all Python files to understand the codebase structure.',
    learnMoreUrl: '/docs/tools/glob'
  },
  'thinking-planning': {
    title: 'Agent Planning',
    body: 'Before acting, the agent creates a mental plan. This reasoning happens in every turn and helps ensure systematic, thorough work.',
  }
}
```

Visual treatment:
- Appear as slide-up cards from bottom
- Semi-transparent dark background
- Dismiss on click or after 5 seconds
- Don't interrupt flow, just augment

#### F. Output Panel

Progressive reveal of generated content:

```tsx
interface OutputPanelProps {
  content: OutputChunk[]
  isComplete: boolean
  format: 'markdown' | 'code' | 'mixed'
}

interface OutputChunk {
  type: 'heading' | 'paragraph' | 'code' | 'list'
  content: string
  sourceStep?: number  // Which tool call generated this
}
```

Visual treatment:
- Starts collapsed/hidden
- Expands as output is generated
- Markdown rendered beautifully
- Code blocks with syntax highlighting
- "Generated by Amplifier" watermark (subtle)

---

## 4. Animation & Timing Choreography

### Timing Principles

Following the "expansion from stillness" philosophy:
- **Deliberate pace**: Not rushed, not sluggish
- **Breathing room**: Pauses between major phases
- **Attention guidance**: Motion draws eye to important changes

### Phase Timing (at 1x speed)

```
Phase                    Duration    Description
─────────────────────────────────────────────────────────────────
1. Initialization         800ms     Bundle loads, UI prepares
2. Agent awakening        600ms     Thinking panel activates
3. First thought        1200ms     Initial reasoning appears
4. Planning             1500ms     Multi-step plan shows
5. Tool call (each)     800-2000ms Varies by tool complexity
6. Inter-step pause       400ms     Breathing room
7. Output generation    2000ms+    Progressive reveal
8. Completion flourish    500ms     Success indicator
```

### Micro-animations

#### Typewriter Effect (Thinking)
```css
.thought-text {
  /* Characters appear at 40ms intervals */
  /* Punctuation causes 100ms pause */
  /* New lines cause 200ms pause */
}
```

#### Tool Call Lifecycle
```
┌─ PENDING ──────────────────────────────────────────┐
│  opacity: 0.5                                      │
│  icon: ○ (hollow circle)                           │
└────────────────────────────────────────────────────┘
        │
        ▼  (200ms ease-out)
┌─ RUNNING ──────────────────────────────────────────┐
│  opacity: 1.0                                      │
│  icon: ● (pulsing dot, ember color)                │
│  border-left: 2px solid ember (animates in)        │
└────────────────────────────────────────────────────┘
        │
        ▼  (300ms ease-out)
┌─ COMPLETE ─────────────────────────────────────────┐
│  opacity: 1.0                                      │
│  icon: ✓ (checkmark, fades in)                     │
│  output expands (if collapsed)                     │
│  duration badge appears                            │
└────────────────────────────────────────────────────┘
```

#### Output Reveal
```css
.output-chunk {
  animation: revealChunk 400ms ease-out forwards;
}

@keyframes revealChunk {
  0% {
    opacity: 0;
    transform: translateY(8px);
    max-height: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
}
```

### Attention Management

```
Priority system for animations:

HIGH PRIORITY (user should notice):
- New tool call starting
- Output appearing
- Error or pause state
→ Use: ember accent, scale bump, subtle sound (optional)

MEDIUM PRIORITY (contextual awareness):
- Thinking text streaming
- Tool call completing
- Progress advancing
→ Use: smooth transitions, no accent color

LOW PRIORITY (ambient):
- Cursor blink in thinking
- Progress bar fill
- Time elapsed update
→ Use: subtle, continuous, non-distracting
```

### Pause State Choreography

When user pauses:
1. Current animation completes gracefully (200ms)
2. Spotlight effect on current element (300ms ease-out)
3. Educational annotation slides up (400ms)
4. Dim non-focused elements to 60% opacity
5. Pause icon pulses gently

Resume:
1. Annotation slides away (200ms)
2. Spotlight fades (200ms)
3. Full opacity restores (200ms)
4. Animation continues from exact position

---

## 5. Content & Data Requirements

### Session Trace Format

Each demo requires a structured trace file:

```typescript
interface SessionTrace {
  id: string
  bundle: string
  prompt: string
  totalDuration: number  // Simulated real-time
  steps: Step[]
  finalOutput: OutputBlock[]
  metadata: {
    toolCallCount: number
    tokensUsed: number  // Simulated
    filesAccessed: string[]
  }
}

interface Step {
  id: string
  type: 'thinking' | 'tool_call' | 'output'
  timestamp: number  // Relative to start
  duration: number
  
  // For thinking
  thought?: {
    text: string
    chunks: ThoughtChunk[]  // For typewriter effect
  }
  
  // For tool_call
  tool?: {
    name: string
    input: Record<string, unknown>
    output: unknown
    annotation: string
  }
  
  // For output
  output?: {
    format: 'markdown' | 'code'
    content: string
  }
}
```

### Required Demo Traces

#### 1. Documentation Bundle Demo
```yaml
prompt: "Document the architecture of this codebase"
steps:
  - thinking: "I'll start by understanding the project structure..."
  - tool: glob("**/*.py") → 23 files
  - tool: read_file("src/main.py") → [content]
  - tool: read_file("README.md") → [existing readme]
  - thinking: "I see a Flask application with MVC pattern..."
  - tool: grep("class.*:") → [class definitions]
  - thinking: "Now I'll structure the documentation..."
  - output: [Architecture documentation in markdown]
duration: ~45 seconds at 1x
```

#### 2. Code Reviewer Bundle Demo
```yaml
prompt: "Review this code for security vulnerabilities"
steps:
  - thinking: "I'll scan for common security patterns..."
  - tool: glob("**/*.py") → files
  - tool: grep("SQL|query|execute") → potential SQL injection
  - tool: read_file("src/database.py") → [vulnerable code]
  - thinking: "I found a SQL injection vulnerability..."
  - tool: grep("password|secret|key") → hardcoded secrets
  - output: [Security report with findings]
duration: ~35 seconds at 1x
```

#### 3. Developer Bundle Demo
```yaml
prompt: "Create a script that analyzes log files for errors"
steps:
  - thinking: "I'll create a Python script for log analysis..."
  - tool: glob("logs/*.log") → sample logs
  - tool: read_file("logs/app.log") → [sample content]
  - thinking: "I see the log format, I'll parse timestamps..."
  - output: [Python script, progressively revealed]
  - tool: bash("python analyze.py --test") → [test output]
duration: ~50 seconds at 1x
```

#### 4. Presentation Bundle Demo
```yaml
prompt: "Create a technical presentation on our architecture"
steps:
  - thinking: "I'll research the architecture and create slides..."
  - tool: glob("**/*.py") → codebase structure
  - tool: read_file("src/main.py") → [main entry]
  - tool: web_search("microservices architecture patterns") → [results]
  - thinking: "I'll structure this as a 10-slide deck..."
  - output: [Slide outline, then full content]
duration: ~55 seconds at 1x
```

### Annotation Library

Pre-written educational content for each tool and concept:

```typescript
const annotationLibrary = {
  tools: {
    glob: {
      title: "Pattern Matching",
      body: "Glob finds files matching patterns like `**/*.py`. The agent uses this to discover code structure.",
      icon: "search"
    },
    read_file: {
      title: "File Reading", 
      body: "The agent reads files to understand content. It can handle any text-based file.",
      icon: "file"
    },
    grep: {
      title: "Content Search",
      body: "Searches inside files for patterns. More powerful than Ctrl+F—supports regex.",
      icon: "search-code"
    },
    bash: {
      title: "Command Execution",
      body: "Runs shell commands. The agent can build, test, and interact with your system.",
      icon: "terminal"
    },
    web_search: {
      title: "Web Research",
      body: "Searches the internet for current information. Useful for docs, best practices, examples.",
      icon: "globe"
    }
  },
  concepts: {
    thinking: {
      title: "Agent Reasoning",
      body: "Before each action, the agent thinks through its approach. This planning ensures systematic, thorough work."
    },
    tool_selection: {
      title: "Tool Selection",
      body: "The agent chooses tools based on the task. Bundles define which tools are available."
    },
    iteration: {
      title: "Iterative Refinement",
      body: "Agents often make multiple passes—gathering info, then refining their approach based on what they learn."
    }
  }
}
```

### Content Authoring Guidelines

For creating new demo traces:

1. **Authenticity**: Use real Amplifier sessions, then edit for clarity
2. **Pacing**: Include natural pauses and reflection moments
3. **Variety**: Show different tool combinations per bundle
4. **Teachable moments**: Include at least one "interesting" tool use
5. **Valuable output**: End result should be genuinely useful
6. **Length**: 30-60 seconds at 1x speed (5-8 tool calls max)

---

## 6. Implementation Roadmap

### Phase 1: Core Simulation Engine (Week 1)
- [ ] Session trace data structure
- [ ] Playback state machine
- [ ] Basic timing/choreography system
- [ ] Thinking panel with typewriter effect

### Phase 2: Tool Visualization (Week 1-2)
- [ ] Tool call panel component
- [ ] Expand/collapse interactions
- [ ] Status indicators and animations
- [ ] Input/output formatting

### Phase 3: Educational Layer (Week 2)
- [ ] Annotation system
- [ ] Contextual tooltips
- [ ] "What's happening" explainers
- [ ] Pause-and-learn mode

### Phase 4: Output & Polish (Week 2-3)
- [ ] Output panel with markdown rendering
- [ ] Progressive reveal animations
- [ ] Playback controls refinement
- [ ] Speed control implementation

### Phase 5: Content Creation (Week 3)
- [ ] Record real Amplifier sessions
- [ ] Author 4 demo traces
- [ ] Write annotation content
- [ ] Test timing and pacing

### Phase 6: Integration & Testing (Week 3-4)
- [ ] Mobile responsiveness
- [ ] Accessibility review
- [ ] Performance optimization
- [ ] User testing and iteration

---

## 7. Success Metrics

### Primary Goals
- **Understanding**: Users can explain how Amplifier works after watching
- **Value perception**: Users see real, useful output being generated
- **Engagement**: >50% of visitors watch at least one full demo
- **Conversion**: Increased clicks to install/download from playground

### Measurement Points
- Time spent on playground page
- Demo completion rate
- Pause/replay frequency
- Click-through to installation
- Bundle exploration (how many tried)

---

## 8. Alternative Considerations

### Rejected Approaches

**Full fake execution**: Considered generating fake tool outputs dynamically. Rejected because:
- Outputs would lack authenticity
- Harder to maintain quality
- Users might try inputs that break the illusion

**Video recordings**: Considered embedding video. Rejected because:
- Not interactive
- Large file sizes
- Can't inspect details

**Server-side execution**: Considered sandboxed real execution. Rejected because:
- Security complexity
- Cost at scale
- Latency issues

### Future Enhancements

1. **User-contributed traces**: Let users share interesting sessions
2. **Comparison mode**: Show same task with different bundles
3. **"Make it real" button**: Deep-link to CLI/Forge with same prompt
4. **Voice-over option**: Audio narration for accessibility

---

## Summary

The Choreographed Simulation approach delivers:

1. **Authenticity**: Real execution traces, not fake demos
2. **Education**: Annotations explain the "why" behind each action
3. **Engagement**: Interactive controls let users explore at their pace
4. **Value demonstration**: Useful output shows what Amplifier actually produces
5. **Brand alignment**: Deliberate pacing matches "expansion from stillness"

The result: visitors don't just see Amplifier—they understand it.
