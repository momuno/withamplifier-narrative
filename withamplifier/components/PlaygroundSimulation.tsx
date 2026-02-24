'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SessionTrace, Step, annotations } from '@/lib/demo-traces'

interface PlaygroundSimulationProps {
  trace: SessionTrace
  onComplete?: () => void
}

type PlaybackState = 'idle' | 'playing' | 'paused' | 'complete'

export default function PlaygroundSimulation({ trace, onComplete }: PlaygroundSimulationProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle')
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([])
  const [typedText, setTypedText] = useState('')
  const [speed, setSpeed] = useState(1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [visibleSteps, typedText])

  const typeText = useCallback((text: string, onComplete: () => void) => {
    let index = 0
    const baseSpeed = 20 / speed

    const typeNext = () => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
        timeoutRef.current = setTimeout(typeNext, baseSpeed)
      } else {
        onComplete()
      }
    }
    typeNext()
  }, [speed])

  const playStep = useCallback((stepIndex: number) => {
    if (stepIndex >= trace.steps.length) {
      setPlaybackState('complete')
      onComplete?.()
      return
    }

    const step = trace.steps[stepIndex]
    setCurrentStepIndex(stepIndex)

    if (step.type === 'thinking' && step.thought) {
      setTypedText('')
      typeText(step.thought.text, () => {
        setVisibleSteps(prev => [...prev, step])
        const nextDelay = Math.max(500, step.duration / speed)
        timeoutRef.current = setTimeout(() => playStep(stepIndex + 1), nextDelay)
      })
    } else if (step.type === 'tool_call') {
      setVisibleSteps(prev => [...prev, step])
      const nextDelay = Math.max(300, step.duration / speed)
      timeoutRef.current = setTimeout(() => playStep(stepIndex + 1), nextDelay)
    } else if (step.type === 'output') {
      setTypedText('')
      const content = step.output?.content || ''
      typeText(content, () => {
        setVisibleSteps(prev => [...prev, step])
        timeoutRef.current = setTimeout(() => {
          setPlaybackState('complete')
          onComplete?.()
        }, 500)
      })
    }
  }, [trace.steps, typeText, speed, onComplete])

  const handlePlay = () => {
    if (playbackState === 'idle' || playbackState === 'complete') {
      // Start from beginning
      setVisibleSteps([])
      setTypedText('')
      setCurrentStepIndex(-1)
      setPlaybackState('playing')
      timeoutRef.current = setTimeout(() => playStep(0), 300)
    } else if (playbackState === 'paused') {
      // Resume
      setPlaybackState('playing')
      playStep(currentStepIndex + 1)
    }
  }

  const handlePause = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setPlaybackState('paused')
  }

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisibleSteps([])
    setTypedText('')
    setCurrentStepIndex(-1)
    setPlaybackState('idle')
  }

  const progress = trace.steps.length > 0 
    ? ((currentStepIndex + 1) / trace.steps.length) * 100 
    : 0

  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center justify-between bg-canvas-stone rounded-soft p-4">
        <div className="flex items-center gap-3">
          {playbackState === 'playing' ? (
            <button
              onClick={handlePause}
              className="btn-secondary flex items-center gap-2"
            >
              <PauseIcon className="w-4 h-4" />
              Pause
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="btn-primary flex items-center gap-2"
            >
              <PlayIcon className="w-4 h-4" />
              {playbackState === 'complete' ? 'Replay' : playbackState === 'paused' ? 'Resume' : 'Run'}
            </button>
          )}
          
          {playbackState !== 'idle' && (
            <button
              onClick={handleReset}
              className="text-ink-slate hover:text-ink text-sm"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-micro text-ink-fog">Speed:</span>
            {[0.5, 1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 text-micro rounded ${
                  speed === s 
                    ? 'bg-signal-soft text-signal' 
                    : 'text-ink-slate hover:text-ink'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="text-micro text-ink-fog">
            Step {Math.max(0, currentStepIndex + 1)} / {trace.steps.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-canvas-mist rounded-full overflow-hidden">
        <div 
          className="h-full bg-signal transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Output Area */}
      <div 
        ref={outputRef}
        className="terminal min-h-[400px] max-h-[600px] overflow-y-auto"
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className={`terminal-dot ${playbackState === 'playing' ? 'active' : ''}`} />
            <div className="terminal-dot" />
            <div className="terminal-dot" />
          </div>
          <span className="terminal-label">
            {playbackState === 'idle' && 'Ready to run'}
            {playbackState === 'playing' && 'Running...'}
            {playbackState === 'paused' && 'Paused'}
            {playbackState === 'complete' && 'Complete'}
          </span>
        </div>

        <div className="terminal-body space-y-4">
          {playbackState === 'idle' ? (
            <div className="text-ink-fog text-center py-12">
              <p className="mb-2">Click "Run" to see how Amplifier processes this request</p>
              <p className="text-sm opacity-75">You'll see the agent's thinking, tool calls, and output</p>
            </div>
          ) : (
            <>
              {/* Rendered steps */}
              {visibleSteps.map((step, index) => (
                <StepRenderer key={step.id} step={step} />
              ))}

              {/* Currently typing text */}
              {typedText && playbackState === 'playing' && (
                <div className="font-mono">
                  {currentStepIndex >= 0 && trace.steps[currentStepIndex]?.type === 'thinking' && (
                    <ThinkingDisplay text={typedText} typing />
                  )}
                  {currentStepIndex >= 0 && trace.steps[currentStepIndex]?.type === 'output' && (
                    <OutputDisplay content={typedText} typing />
                  )}
                </div>
              )}

              {/* Cursor when playing */}
              {playbackState === 'playing' && (
                <span className="terminal-cursor" />
              )}
            </>
          )}
        </div>
      </div>

      {/* Educational annotations panel */}
      {playbackState !== 'idle' && currentStepIndex >= 0 && (
        <AnnotationPanel step={trace.steps[currentStepIndex]} />
      )}
    </div>
  )
}

// Step rendering components
function StepRenderer({ step }: { step: Step }) {
  if (step.type === 'thinking' && step.thought) {
    return <ThinkingDisplay text={step.thought.text} />
  }
  if (step.type === 'tool_call' && step.tool) {
    return <ToolCallDisplay tool={step.tool} />
  }
  if (step.type === 'output' && step.output) {
    return <OutputDisplay content={step.output.content} format={step.output.format} />
  }
  return null
}

function ThinkingDisplay({ text, typing }: { text: string; typing?: boolean }) {
  return (
    <div className="agent-state thinking">
      <div className={`agent-icon ${typing ? 'thinking' : ''}`}>
        <ThinkIcon className="w-5 h-5" />
      </div>
      <div>
        <span className="text-micro font-medium text-signal block mb-1">Thinking</span>
        <p className="text-sm text-[#E8E8E6]">{text}</p>
      </div>
    </div>
  )
}

function ToolCallDisplay({ tool }: { tool: Step['tool'] }) {
  if (!tool) return null
  
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="tool-call">
      <div 
        className="tool-call-header cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <ToolIcon className="w-4 h-4 text-signal" />
          <span className="tool-name">{tool.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="tool-status success">Complete</span>
          <ChevronIcon className={`w-4 h-4 text-ink-fog transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      
      {expanded && (
        <div className="tool-call-body">
          <div className="tool-params">
            <span className="tool-param-key">Input: </span>
            <code>{JSON.stringify(tool.input, null, 2)}</code>
          </div>
          {tool.output !== undefined && (
            <div className="tool-result">
              <span className="text-micro text-ink-fog block mb-2">Output</span>
              <code className="text-sm text-[#E8E8E6] whitespace-pre-wrap">
                {(() => {
                  const outputStr = typeof tool.output === 'string' 
                    ? tool.output 
                    : JSON.stringify(tool.output, null, 2)
                  return outputStr.slice(0, 200) + (outputStr.length > 200 ? '...' : '')
                })()}
              </code>
            </div>
          )}
          {tool.annotation && (
            <p className="mt-3 text-micro text-ink-fog italic">{tool.annotation}</p>
          )}
        </div>
      )}
    </div>
  )
}

function OutputDisplay({ content, format, typing }: { content: string; format?: string; typing?: boolean }) {
  return (
    <div className={`p-4 rounded-soft ${typing ? '' : 'bg-depth-obsidian'}`}>
      <span className="text-micro font-medium text-green-400 block mb-2">
        {typing ? 'Generating output...' : 'Output'}
      </span>
      <div className="prose prose-invert prose-sm max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-[#E8E8E6] font-mono">
          {content}
        </pre>
      </div>
    </div>
  )
}

function AnnotationPanel({ step }: { step: Step }) {
  let annotation = null
  
  if (step.type === 'thinking') {
    annotation = annotations.concepts.thinking
  } else if (step.type === 'tool_call' && step.tool) {
    const toolName = step.tool.name as keyof typeof annotations.tools
    annotation = annotations.tools[toolName]
  }
  
  if (!annotation) return null

  return (
    <div className="bg-signal-soft border border-signal/20 rounded-soft p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-signal/20 flex items-center justify-center flex-shrink-0">
          <InfoIcon className="w-4 h-4 text-signal" />
        </div>
        <div>
          <h4 className="font-medium text-ink text-sm">{annotation.title}</h4>
          <p className="mt-1 text-ink-slate text-sm">{annotation.body}</p>
        </div>
      </div>
    </div>
  )
}

// Simple icons
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  )
}

function ThinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function ToolIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}
