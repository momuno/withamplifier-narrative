'use client'

import { useState } from 'react'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="accordion-item"
          data-state={openIndex === index ? 'open' : 'closed'}
        >
          <button
            className="accordion-trigger"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <div className="accordion-content">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
