'use client'

import { useEffect, useRef, useState } from 'react'

// The journey steps - inspired by Mr. Rogers at the Crayola factory
const steps = [
  {
    id: 'need',
    label: 'It starts with a need',
    description: 'You want an AI that can help you build, write, analyze, or create.',
    visual: 'spark',
    color: '#ffffff',
  },
  {
    id: 'provider',
    label: 'Pick a provider',
    description: 'This is the brain. Claude, GPT-4, Gemini, Llama — or your own.',
    visual: 'provider',
    color: '#10B981', // Emerald
  },
  {
    id: 'tools',
    label: 'Add tools',
    description: 'These are the hands. File access, web search, code execution.',
    visual: 'tools',
    color: '#F59E0B', // Amber
  },
  {
    id: 'hooks',
    label: 'Add hooks',
    description: 'These watch what happens. Logging, approval gates, safety checks.',
    visual: 'hooks',
    color: '#06B6D4', // Cyan
  },
  {
    id: 'agent',
    label: 'Shape it into an agent',
    description: 'Now it has a persona. A security reviewer, a writer, an architect.',
    visual: 'agent',
    color: '#F43F5E', // Rose
  },
  {
    id: 'behaviors',
    label: 'Give it behaviors',
    description: 'Now it knows how to act. Instructions, patterns, guardrails.',
    visual: 'behaviors',
    color: '#8B5CF6', // Purple
  },
  {
    id: 'bundle',
    label: 'Bundle it',
    description: 'Now it\'s yours. A file you can read, share, and take anywhere.',
    visual: 'bundle',
    color: '#5B4DE3', // Signal
  },
]

// Simple visual representations for each step
function StepVisual({ step, isActive, progress }: { step: typeof steps[0], isActive: boolean, progress: number }) {
  const baseOpacity = isActive ? 1 : 0.3
  
  return (
    <div 
      className="relative w-32 h-32 flex items-center justify-center"
      style={{ 
        opacity: baseOpacity,
        transform: isActive ? 'scale(1)' : 'scale(0.9)',
        transition: 'all 0.5s ease-out'
      }}
    >
      {/* Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ 
          backgroundColor: step.color,
          opacity: isActive ? 0.3 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      />
      
      {/* Core shape */}
      <div 
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ 
          backgroundColor: `${step.color}20`,
          border: `2px solid ${step.color}`,
          boxShadow: isActive ? `0 0 30px ${step.color}40` : 'none',
          transition: 'all 0.5s ease-out'
        }}
      >
        {/* Icon based on step */}
        <StepIcon id={step.id} color={step.color} />
      </div>
    </div>
  )
}

function StepIcon({ id, color }: { id: string, color: string }) {
  const iconProps = { 
    width: 32, 
    height: 32, 
    stroke: color, 
    strokeWidth: 1.5, 
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  }
  
  switch (id) {
    case 'need':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" fill={color} />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      )
    case 'provider':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2a8 8 0 0 1 8 8c0 5.33-8 12-8 12S4 15.33 4 10a8 8 0 0 1 8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'tools':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'hooks':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    case 'agent':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      )
    case 'behaviors':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 7h6M8 11h8" />
        </svg>
      )
    case 'bundle':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
        </svg>
      )
    default:
      return null
  }
}

// The accumulating visual - shows all completed steps
function AccumulatingVisual({ currentStep }: { currentStep: number }) {
  const completedSteps = steps.slice(0, currentStep + 1)
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Layers stack up as you progress */}
      {completedSteps.map((step, index) => {
        const offset = (completedSteps.length - 1 - index) * 8
        const scale = 1 - (completedSteps.length - 1 - index) * 0.05
        const isLatest = index === completedSteps.length - 1
        
        return (
          <div
            key={step.id}
            className="absolute rounded-2xl transition-all duration-700 ease-out"
            style={{
              width: 140 - index * 5,
              height: 140 - index * 5,
              backgroundColor: `${step.color}${isLatest ? '30' : '15'}`,
              border: `2px solid ${step.color}${isLatest ? '' : '60'}`,
              transform: `translateY(${-offset}px) scale(${scale})`,
              zIndex: index,
              boxShadow: isLatest ? `0 0 40px ${step.color}30` : 'none',
            }}
          />
        )
      })}
      
      {/* Current step icon in center */}
      <div 
        className="absolute z-50 transition-all duration-500"
        style={{ transform: `translateY(${-(completedSteps.length - 1) * 8}px)` }}
      >
        <StepIcon id={completedSteps[completedSteps.length - 1].id} color={completedSteps[completedSteps.length - 1].color} />
      </div>
    </div>
  )
}

export default function BundleJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how far through the section we are
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const scrolled = windowHeight - sectionTop
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight * 0.5)))
      
      setScrollProgress(progress)
      
      // Map progress to step index
      const stepIndex = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      )
      setCurrentStep(stepIndex)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const currentStepData = steps[currentStep]
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-[250vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              {/* Progress indicator */}
              <div className="flex gap-2 mb-8 justify-center lg:justify-start">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: index === currentStep ? 32 : 8,
                      backgroundColor: index <= currentStep ? step.color : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              
              {/* Step label */}
              <p 
                className="text-sm font-medium uppercase tracking-wider mb-3 transition-colors duration-500"
                style={{ color: currentStepData.color }}
              >
                Step {currentStep + 1} of {steps.length}
              </p>
              
              {/* Main text - transitions on step change */}
              <h2 
                key={currentStepData.id}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 transition-opacity duration-500"
              >
                {currentStepData.label}
              </h2>
              
              <p 
                key={`${currentStepData.id}-desc`}
                className="text-lg md:text-xl text-white/70 max-w-md mx-auto lg:mx-0 transition-opacity duration-500"
              >
                {currentStepData.description}
              </p>
              
              {/* Final step CTA */}
              {currentStep === steps.length - 1 && (
                <div className="mt-8 animate-fade-in">
                  <a 
                    href="https://github.com/microsoft/amplifier#quick-start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-signal text-white font-medium hover:bg-signal-bright transition-colors"
                  >
                    Start building
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
            
            {/* Right: Visual */}
            <div className="flex justify-center lg:justify-end">
              <AccumulatingVisual currentStep={currentStep} />
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Scroll hint at bottom */}
      {scrollProgress < 0.1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm flex flex-col items-center gap-2 animate-pulse">
          <span>Scroll to see the journey</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}
    </div>
  )
}
