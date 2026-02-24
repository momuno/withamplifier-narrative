#!/usr/bin/env node

/**
 * Generate deck metadata from HTML files in public/stories/decks/
 * 
 * Features:
 * - Extracts title, description, category from HTML
 * - Auto-detects isNew for recently added decks (configurable expiration)
 * - Supports manual overrides via deck-overrides.json
 * - Excludes category index pages
 * 
 * Outputs to lib/deck-data.ts
 */

const fs = require('fs')
const path = require('path')

const DECKS_DIR = path.join(__dirname, '../public/stories/decks')
const OUTPUT_FILE = path.join(__dirname, '../lib/deck-data.ts')
const OVERRIDES_FILE = path.join(__dirname, '../lib/deck-overrides.json')
const HISTORY_FILE = path.join(__dirname, '../lib/deck-history.json')

// Files to exclude (category index pages, not presentation decks)
const EXCLUDED_FILES = [
  'index.html',
  'index-old.html',
  'devex.html',
  'enterprise.html',
  'features.html',
  'learn.html',
  'showcase.html',
  'tools.html'
]

// Category detection based on keywords in title/description
const CATEGORY_PATTERNS = {
  intro: ['what is', 'getting started', 'introduction', 'how amplifier', 'bundles', 'best practices', 'patterns'],
  platform: ['shadow', 'session', 'recipes', 'workflow', 'context', 'modes', 'forking'],
  tool: ['tool', 'database', 'diagrams', 'github actions', 'mcp', 'notifications'],
  showcase: ['case study', 'showcase', 'experiment', 'demo', 'story'],
  enterprise: ['enterprise', 'm365', 'microsoft 365', 'cortex', 'sandbox'],
  devex: ['vibecoding', 'cost optimization', 'lazy module', 'superpowers', 'deliberate'],
}

// Default isNew expiration in days
const DEFAULT_IS_NEW_EXPIRATION_DAYS = 14

function loadOverrides() {
  try {
    if (fs.existsSync(OVERRIDES_FILE)) {
      return JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf-8'))
    }
  } catch (e) {
    console.warn('Warning: Could not load deck-overrides.json:', e.message)
  }
  return { decks: {}, isNewExpirationDays: DEFAULT_IS_NEW_EXPIRATION_DAYS }
}

function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'))
    }
  } catch (e) {
    console.warn('Warning: Could not load deck-history.json:', e.message)
  }
  return { firstSeen: {} }
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2))
}

function detectCategory(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    for (const pattern of patterns) {
      if (text.includes(pattern)) {
        return category
      }
    }
  }
  return 'platform' // default
}

function extractMetaContent(html, name) {
  // Try og: tags first, then regular meta
  const ogMatch = html.match(new RegExp(`<meta\\s+property=["']og:${name}["']\\s+content=["']([^"']+)["']`, 'i'))
  if (ogMatch) return ogMatch[1]
  
  const metaMatch = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'))
  if (metaMatch) return metaMatch[1]
  
  return null
}

function extractTitle(html) {
  // Try meta title first
  const metaTitle = extractMetaContent(html, 'title')
  if (metaTitle) return metaTitle
  
  // Fall back to <title> tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
  if (titleMatch) return titleMatch[1].replace(' - Amplifier Stories', '').trim()
  
  // Fall back to first h1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  if (h1Match) return h1Match[1].trim()
  
  return null
}

function extractDescription(html) {
  const desc = extractMetaContent(html, 'description')
  if (desc) return desc
  
  // Try to find subtitle/subhead - handles <br> tags inside, extra attrs, and <p>/<div>/<h2>/<h3>
  const subtitleMatch = html.match(/<(?:p|div|h[2-3])\s+[^>]*class="[^"]*(?:subtitle|subhead)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div|h[2-3])>/i)
  if (subtitleMatch) {
    // Strip HTML tags (like <br>), normalize whitespace
    return subtitleMatch[1]
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }
  
  return ''
}

function slugToTitle(slug) {
  return slug
    .replace(/-deck$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function isNewDeck(slug, history, overrides, expirationDays) {
  // 1. Check manual override first (highest priority)
  if (overrides.decks && overrides.decks[slug] && typeof overrides.decks[slug].isNew === 'boolean') {
    return overrides.decks[slug].isNew
  }
  
  // 2. If expirationDays is 0 or negative, disable auto-isNew entirely
  if (expirationDays <= 0) {
    return false
  }
  
  // 3. Check auto-detection based on firstSeen date
  const firstSeen = history.firstSeen[slug]
  if (!firstSeen) {
    // New deck - will be marked as new
    return true
  }
  
  const firstSeenDate = new Date(firstSeen)
  const now = new Date()
  const daysSinceFirstSeen = (now - firstSeenDate) / (1000 * 60 * 60 * 24)
  
  return daysSinceFirstSeen < expirationDays
}

function parseDecks() {
  const overrides = loadOverrides()
  const history = loadHistory()
  const expirationDays = typeof overrides.isNewExpirationDays === 'number' ? overrides.isNewExpirationDays : DEFAULT_IS_NEW_EXPIRATION_DAYS
  
  const files = fs.readdirSync(DECKS_DIR)
    .filter(f => f.endsWith('.html') && !EXCLUDED_FILES.includes(f))
    .sort()
  
  const decks = []
  const now = new Date().toISOString()
  
  for (const file of files) {
    const filePath = path.join(DECKS_DIR, file)
    const html = fs.readFileSync(filePath, 'utf-8')
    const slug = file.replace('.html', '')
    
    // Track first seen date for new files
    if (!history.firstSeen[slug]) {
      history.firstSeen[slug] = now
      console.log(`  New deck detected: ${slug}`)
    }
    
    const title = extractTitle(html) || slugToTitle(slug)
    const description = extractDescription(html)
    
    // Check for category override, else auto-detect
    const category = (overrides.decks && overrides.decks[slug] && overrides.decks[slug].category) 
      || detectCategory(title, description)
    
    const isNew = isNewDeck(slug, history, overrides, expirationDays)
    
    decks.push({
      id: slug,
      title,
      description,
      category,
      href: `/stories/decks/${file}`,
      isNew,
    })
  }
  
  // Save updated history
  saveHistory(history)
  
  return decks
}

function generateTypeScript(decks) {
  const deckEntries = decks.map(d => {
    const desc = d.description.replace(/'/g, "\\'").replace(/\n/g, ' ')
    const isNewField = d.isNew ? `\n    isNew: true,` : ''
    return `  {
    id: '${d.id}',
    title: '${d.title.replace(/'/g, "\\'")}',
    description: '${desc}',
    category: '${d.category}',
    href: '${d.href}',${isNewField}
  }`
  }).join(',\n')

  return `// Auto-generated by scripts/generate-deck-metadata.js
// Do not edit manually - run: node scripts/generate-deck-metadata.js
//
// To mark a deck as "new" or override its category, edit lib/deck-overrides.json
// isNew is auto-detected for decks added within the last 14 days (configurable)

import { Deck } from '@/components/LearnCard'

export const decks: Deck[] = [
${deckEntries}
]

export const lastSynced = '${new Date().toISOString()}'
`
}

// Main
console.log('Generating deck metadata...')
console.log(`  Source: ${DECKS_DIR}`)
console.log(`  Excluded: ${EXCLUDED_FILES.join(', ')}`)

const decks = parseDecks()
const output = generateTypeScript(decks)
fs.writeFileSync(OUTPUT_FILE, output)

const newDecks = decks.filter(d => d.isNew)
console.log(`\nGenerated metadata for ${decks.length} decks`)
if (newDecks.length > 0) {
  console.log(`  ${newDecks.length} marked as new: ${newDecks.map(d => d.id).join(', ')}`)
}
console.log(`Output: ${OUTPUT_FILE}`)
