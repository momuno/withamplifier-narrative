'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Types
interface Message {
  role: 'user' | 'assistant'
  content: string
}

type LoadingStep = 'idle' | 'webgpu' | 'pyodide' | 'model' | 'amplifier' | 'ready' | 'error'

interface ModelOption {
  id: string
  name: string
  size: string
  recommended?: boolean
}

// Available models (same as amplifier-stories)
const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'Phi-3.5-mini-instruct-q4f16_1-MLC', name: 'Phi 3.5 Mini', size: '2.2GB', recommended: true },
  { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 3B', size: '1.8GB' },
  { id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', name: 'Qwen 2.5 1.5B', size: '1.0GB' },
  { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B', size: '0.7GB' },
]

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/'

const SYSTEM_PROMPT = `You are a helpful assistant for the Amplifier website (withamplifier.com). You run locally in the browser via WebGPU. Answer questions ONLY based on the information below. If you don't know something, say "I don't have that information - check the Learn page or GitHub."

---

## WHAT IS AMPLIFIER?

Amplifier is an open-source AI agent framework from Microsoft. The tagline is: "Build AI Your Way."

Your AI agent is a file you can read, write, and share. Not a black box you rent. A tool you own.

Install: uv tool install git+https://github.com/microsoft/amplifier
GitHub: github.com/microsoft/amplifier

---

## CORE PRINCIPLES

**No black boxes. Ever.**
Most AI tools hide how they work. Amplifier shows you everything. Inspect any component, swap any piece, own the whole stack.

- **Use any model** - The model is a component, not a cage. Switch providers (Anthropic, OpenAI, Google, Azure, Ollama) without rewriting anything.
- **See everything** - Watch it think. Every decision logged, every tool call visible. When something breaks, you know exactly where and why.
- **Own your setup** - Your agent is a file you can read, version, and share. Not a subscription. Not a black box. Yours.

---

## THE PLATFORM (Composable Pieces)

**Providers** - Connect to any LLM: Claude, GPT-4, Gemini, Llama, or bring your own.

**Tools** - Give your agent capabilities: file access, web search, code execution, bash, grep, or build custom tools.

**Agents** - Specialized personas for specific tasks: explorer, architect, security reviewer, writer, analyst.

**Recipes** - Multi-step workflows with checkpoints. Chain agents together, add approval gates, resume anytime.

---

## BUNDLES

A bundle is a markdown file that defines your agent's complete configuration - providers, tools, behaviors, context. Think of it like .bashrc for AI.

Bundles compose. Start with a foundation, add capabilities, customize behavior. Share with your team via git.

---

## LEARN MORE

The Learn page (withamplifier.com/learn) has interactive presentations covering:
- What is Amplifier? (intro)
- How Amplifier Thinks (the agent loop)
- Getting Started Guide
- Bundles & Agents
- Shadow Environments (isolated testing)
- Recipes & Workflows
- Tool modules (database, diagrams, GitHub Actions)
- Enterprise examples (M365, Cortex)

---

## ABOUT THIS CHAT

You're running locally via WebGPU - no API calls, no server. The model runs entirely in your browser.

Keep answers concise. Point users to the Learn page for deeper topics. If asked about something not covered above, say you don't have that information.`

// Declare globals for Pyodide
declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>
  }
}

interface PyodideInterface {
  loadPackage: (pkg: string) => Promise<void>
  pyimport: (pkg: string) => { install: (pkg: string) => Promise<void> }
  runPythonAsync: (code: string) => Promise<string>
  globals: {
    set: (name: string, value: unknown) => void
  }
  FS: {
    writeFile: (path: string, data: Uint8Array) => void
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MLCEngine = any

export default function AmplifierChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle')
  const [loadingDetail, setLoadingDetail] = useState('')
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pyodideRef = useRef<PyodideInterface | null>(null)
  const engineRef = useRef<MLCEngine | null>(null)
  const initializedModelRef = useRef<string | null>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens and is ready
  useEffect(() => {
    if (isOpen && loadingStep === 'ready') {
      inputRef.current?.focus()
    }
  }, [isOpen, loadingStep])

  const initializeChat = useCallback(async () => {
    if (loadingStep !== 'idle' && loadingStep !== 'error') return
    
    setError(null)
    
    try {
      // Step 1: Check WebGPU
      setLoadingStep('webgpu')
      setLoadingDetail('Checking WebGPU support...')
      
      if (!navigator.gpu) {
        throw new Error('WebGPU not supported. Use Chrome 113+ or Edge 113+.')
      }
      const adapter = await navigator.gpu.requestAdapter()
      if (!adapter) {
        throw new Error('No WebGPU adapter found.')
      }

      // Step 2: Load Pyodide
      setLoadingStep('pyodide')
      setLoadingDetail('Loading Python runtime...')
      
      // Load Pyodide script if not already loaded
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = `${PYODIDE_URL}pyodide.js`
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Pyodide'))
          document.head.appendChild(script)
        })
      }

      setLoadingDetail('Starting Python...')
      const pyodide = await window.loadPyodide!({ indexURL: PYODIDE_URL })
      pyodideRef.current = pyodide

      // Install packages
      setLoadingDetail('Installing packages...')
      await pyodide.loadPackage('micropip')
      const micropip = pyodide.pyimport('micropip')

      for (const pkg of ['pydantic', 'pyyaml', 'typing-extensions']) {
        setLoadingDetail(`Installing ${pkg}...`)
        await micropip.install(pkg)
      }

      // Step 3: Load WebLLM model
      setLoadingStep('model')
      setLoadingDetail('Loading LLM engine...')
      
      // Dynamic import of web-llm
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm')
      
      const engine = await CreateMLCEngine(selectedModel, {
        initProgressCallback: (p: { progress?: number; text?: string }) => {
          if (p.progress !== undefined) {
            setLoadingDetail(`${Math.round(p.progress * 100)}%`)
          } else if (p.text) {
            setLoadingDetail(p.text.substring(0, 30))
          }
        }
      })
      engineRef.current = engine
      initializedModelRef.current = selectedModel

      // Step 4: Set up Amplifier
      setLoadingStep('amplifier')
      setLoadingDetail('Starting Amplifier...')

      // Set up JS-Python bridge for LLM calls
      pyodide.globals.set('js_llm_complete', async (messagesJson: string) => {
        const msgs = JSON.parse(messagesJson)
        const response = await engine.chat.completions.create({
          messages: msgs,
          temperature: 0.7,
          max_tokens: 2048,
        })
        return JSON.stringify({
          content: response.choices[0].message.content || '',
          usage: response.usage,
          finish_reason: response.choices[0].finish_reason,
        })
      })

      // Simple chat without full amplifier-core (for now - can embed wheel later)
      // This provides the chat experience without requiring the full wheel
      setLoadingStep('ready')
      setLoadingDetail('')
      
      // Welcome message
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm Amplifier, running locally in your browser via WebGPU. Ask me anything about Amplifier, or explore the Learn page for interactive stories and demos."
      }])

    } catch (err) {
      console.error('Chat initialization error:', err)
      setLoadingStep('error')
      setError(err instanceof Error ? err.message : 'Failed to initialize chat')
    }
  }, [loadingStep, selectedModel])

  const sendMessage = async () => {
    if (!input.trim() || isGenerating || !engineRef.current) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsGenerating(true)

    try {
      // Build conversation history for context
      const conversationHistory = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ]

      const response = await engineRef.current.chat.completions.create({
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 2048,
      })

      const assistantMessage = response.choices[0].message.content || 'I encountered an issue generating a response.'
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch (err) {
      console.error('Message error:', err)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsGenerating(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(prev => !prev)
    if (!isOpen && loadingStep === 'idle') {
      // Don't auto-initialize - let user click "Start Chat"
    }
  }

  const LoadingIndicator = () => {
    const steps = [
      { key: 'webgpu', label: 'Check WebGPU' },
      { key: 'pyodide', label: 'Load Python Runtime' },
      { key: 'model', label: 'Download LLM Model' },
      { key: 'amplifier', label: 'Start Amplifier' },
    ]

    const currentIndex = steps.findIndex(s => s.key === loadingStep)

    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
        <div className="text-lg font-medium text-ink">Initializing Amplifier...</div>
        <div className="w-full max-w-xs space-y-3">
          {steps.map((step, i) => {
            const isActive = step.key === loadingStep
            const isDone = currentIndex > i
            
            return (
              <div 
                key={step.key}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-signal/10' : isDone ? 'bg-green-500/10' : 'bg-canvas-stone'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {isDone ? (
                    <span className="text-green-500">✓</span>
                  ) : isActive ? (
                    <div className="w-4 h-4 border-2 border-signal border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-ink-slate/50">○</span>
                  )}
                </div>
                <span className={isDone ? 'text-green-500' : isActive ? 'text-ink' : 'text-ink-slate/50'}>
                  {step.label}
                </span>
                {isActive && loadingDetail && (
                  <span className="ml-auto text-xs text-ink-slate">{loadingDetail}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-signal text-white 
                   shadow-lg hover:bg-signal/90 transition-all duration-200
                   flex items-center justify-center
                   focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
        aria-label={isOpen ? 'Close chat' : 'Open chat with Amplifier'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-150px)]
                        bg-canvas border border-canvas-mist rounded-2xl shadow-2xl
                        flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-canvas-mist bg-canvas-stone">
            <div className="w-8 h-8 rounded-full bg-signal flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
            <div className="flex-1">
              <div className="font-medium text-ink text-sm">Chat with Amplifier</div>
              <div className="text-xs text-ink-slate">
                {loadingStep === 'ready' ? 'Running locally via WebGPU' : 'Browser-based AI'}
              </div>
            </div>
            {loadingStep === 'ready' && (
              <div className="text-xs text-ink-slate bg-canvas-mist px-2 py-1 rounded">
                {AVAILABLE_MODELS.find(m => m.id === initializedModelRef.current)?.name || 'Local'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {loadingStep === 'idle' ? (
              // Initial state - model selection
              <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                <div className="text-center">
                  <div className="text-lg font-medium text-ink mb-2">Chat with Amplifier</div>
                  <p className="text-sm text-ink-slate">
                    Run Amplifier locally in your browser. No API keys needed.
                  </p>
                </div>
                
                <div className="w-full max-w-xs">
                  <label className="block text-xs text-ink-slate mb-2">Select Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-canvas-stone border border-canvas-mist 
                               text-ink text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                  >
                    {AVAILABLE_MODELS.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.size}){model.recommended ? ' ★' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={initializeChat}
                  className="px-6 py-3 bg-signal text-white rounded-lg font-medium
                             hover:bg-signal/90 transition-colors
                             focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
                >
                  Start Chat
                </button>

                <p className="text-xs text-ink-slate/70 text-center max-w-xs">
                  First load downloads the model (~{AVAILABLE_MODELS.find(m => m.id === selectedModel)?.size}). 
                  Requires WebGPU (Chrome/Edge 113+).
                </p>
              </div>
            ) : loadingStep === 'error' ? (
              // Error state
              <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-500 text-xl">!</span>
                </div>
                <div className="text-ink font-medium">Initialization Failed</div>
                <p className="text-sm text-ink-slate">{error}</p>
                <button
                  onClick={() => { setLoadingStep('idle'); setError(null); }}
                  className="px-4 py-2 text-sm text-signal hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : loadingStep !== 'ready' ? (
              // Loading state
              <LoadingIndicator />
            ) : (
              // Chat interface
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-ink text-canvas' : 'bg-signal text-white'
                      }`}>
                        {msg.role === 'user' ? 'U' : 'A'}
                      </div>
                      <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-ink text-canvas rounded-br-md' 
                          : 'bg-canvas-stone text-ink rounded-bl-md'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-signal flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="bg-canvas-stone rounded-2xl rounded-bl-md px-3 py-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-ink-slate/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-ink-slate/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-ink-slate/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-canvas-mist">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Amplifier anything..."
                      disabled={isGenerating}
                      className="flex-1 px-3 py-2 rounded-lg bg-canvas-stone border border-canvas-mist
                                 text-ink text-sm placeholder:text-ink-slate/50
                                 focus:outline-none focus:ring-2 focus:ring-signal
                                 disabled:opacity-50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isGenerating || !input.trim()}
                      className="px-4 py-2 bg-signal text-white rounded-lg text-sm font-medium
                                 hover:bg-signal/90 transition-colors
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
