/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Epilogue', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Syne', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        // Canvas - The Foundation
        canvas: {
          DEFAULT: '#FAFAF8',  // Warm white base
          stone: '#F5F5F3',     // Secondary surfaces
          mist: '#EAEAE6',      // Borders, dividers
        },
        // Ink - Typography & UI
        ink: {
          DEFAULT: '#1A1A18',   // Graphite - primary text
          slate: '#4A4A46',     // Secondary text
          fog: '#8A8A86',       // Tertiary text
        },
        // Signal - Accent & Emphasis (Deep Violet Blue)
        signal: {
          DEFAULT: '#5B4DE3',   // Primary accent
          light: '#8578F0',     // Hover states
          dark: '#4338B8',      // Active/pressed states
          soft: 'rgba(91, 77, 227, 0.08)',    // Backgrounds
          glow: 'rgba(91, 77, 227, 0.18)',    // Hover backgrounds
        },
        // Depth - Dark surfaces
        depth: {
          obsidian: '#0F0F0E',  // Dark mode surfaces
          charcoal: '#2A2A28',  // Code blocks
          iron: '#3A3A38',      // Secondary dark
        },
      },
      spacing: {
        // Extended spacing scale
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
      },
      fontSize: {
        // Type scale with tracking
        'hero': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'hero-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'title': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '500' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'micro': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        'reading': '42rem',    // 672px - optimal reading width
        'content': '60rem',    // 960px - standard content
        'wide': '75rem',       // 1200px - feature showcases
        'full': '90rem',       // 1440px - maximum
      },
      borderRadius: {
        'subtle': '0.375rem',  // 6px
        'soft': '0.75rem',     // 12px
        'gentle': '1rem',      // 16px
      },
      boxShadow: {
        'lift': '0 2px 8px -2px rgba(26, 26, 24, 0.08), 0 4px 16px -4px rgba(26, 26, 24, 0.06)',
        'elevate': '0 4px 12px -4px rgba(26, 26, 24, 0.1), 0 8px 24px -8px rgba(26, 26, 24, 0.08)',
        'float': '0 8px 24px -8px rgba(26, 26, 24, 0.12), 0 16px 48px -16px rgba(26, 26, 24, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'gentle': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
