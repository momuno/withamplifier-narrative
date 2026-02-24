/**
 * Community Showcase Data
 * 
 * Single source of truth for the ecosystem carousel on withamplifier.com
 * 
 * To validate URLs: npm run validate:showcase
 * To regenerate from MODULES.md: Use the website-content-generation recipe
 * 
 * Last validated: 2026-02-04
 */

export interface ShowcaseItem {
  name: string;
  type: 'bundle' | 'app' | 'provider' | 'tool' | 'hook';
  description: string;
  author: string;
  authorAvatar: string;
  repoUrl: string;
  badge?: 'official' | 'experimental' | 'popular';
}

/**
 * Helper to generate GitHub avatar URL
 */
const ghAvatar = (username: string, size = 40) => 
  username === 'microsoft' 
    ? `https://avatars.githubusercontent.com/u/6154722?s=${size}`
    : `https://github.com/${username}.png?size=${size}`;

/**
 * Curated showcase items organized by category
 * All URLs verified working as of 2026-02-04
 */
export const showcaseItems: ShowcaseItem[] = [
  // ============================================
  // OFFICIAL BUNDLES (Microsoft)
  // ============================================
  {
    name: 'Recipes',
    type: 'bundle',
    description: 'Multi-step AI agent orchestration with checkpoints and approval gates',
    author: 'microsoft',
    authorAvatar: ghAvatar('microsoft'),
    repoUrl: 'https://github.com/microsoft/amplifier-bundle-recipes',
    badge: 'official'
  },
  {
    name: 'Design Intelligence',
    type: 'bundle',
    description: 'Specialized agents for design systems, components, and UI work',
    author: 'microsoft',
    authorAvatar: ghAvatar('microsoft'),
    repoUrl: 'https://github.com/microsoft/amplifier-bundle-design-intelligence',
    badge: 'official'
  },
  {
    name: 'Issues',
    type: 'bundle',
    description: 'Issue management and triage workflows',
    author: 'microsoft',
    authorAvatar: ghAvatar('microsoft'),
    repoUrl: 'https://github.com/microsoft/amplifier-bundle-issues',
    badge: 'official'
  },

  // ============================================
  // APPLICATIONS - Real products built on Amplifier
  // ============================================
  {
    name: 'Transcribe',
    type: 'app',
    description: 'Transform YouTube videos and audio files into searchable transcripts with AI-powered insights',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-app-transcribe',
  },
  {
    name: 'Blog Creator',
    type: 'app',
    description: 'AI-powered blog creation with style-aware generation and rich markdown editor',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-app-blog-creator',
  },
  {
    name: 'Voice Assistant',
    type: 'app',
    description: 'Desktop voice assistant with native speech-to-speech via OpenAI Realtime API',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-app-voice',
    badge: 'experimental'
  },
  {
    name: 'Tool Generator',
    type: 'app',
    description: 'AI-powered tool generator for creating custom Amplifier tools',
    author: 'samueljklee',
    authorAvatar: ghAvatar('samueljklee'),
    repoUrl: 'https://github.com/samueljklee/amplifier-app-tool-generator',
  },
  {
    name: 'Playground',
    type: 'app',
    description: 'Interactive environment for building, configuring, and testing Amplifier AI agent sessions',
    author: 'samueljklee',
    authorAvatar: ghAvatar('samueljklee'),
    repoUrl: 'https://github.com/samueljklee/amplifier-playground',
  },
  {
    name: 'Session Analyzer',
    type: 'app',
    description: 'Analyze Amplifier session logs and generate usage metrics and insights',
    author: 'DavidKoleczek',
    authorAvatar: ghAvatar('DavidKoleczek'),
    repoUrl: 'https://github.com/DavidKoleczek/amplifier-app-session-analyzer',
  },
  {
    name: 'Benchmarks',
    type: 'app',
    description: 'Benchmarking and evaluation suite for Amplifier performance',
    author: 'DavidKoleczek',
    authorAvatar: ghAvatar('DavidKoleczek'),
    repoUrl: 'https://github.com/DavidKoleczek/amplifier-app-benchmarks',
  },
  {
    name: 'Lakehouse',
    type: 'app',
    description: 'Amplifier on top of your data - daemon and webapp for data integration',
    author: 'payneio',
    authorAvatar: ghAvatar('payneio'),
    repoUrl: 'https://github.com/payneio/lakehouse',
  },

  // ============================================
  // PROVIDERS - Use any model
  // ============================================
  {
    name: 'AWS Bedrock',
    type: 'provider',
    description: 'AWS Bedrock integration with cross-region inference support for Claude models',
    author: 'brycecutt-msft',
    authorAvatar: ghAvatar('brycecutt-msft'),
    repoUrl: 'https://github.com/brycecutt-msft/amplifier-module-provider-bedrock',
  },
  {
    name: 'OpenAI Realtime',
    type: 'provider',
    description: 'OpenAI Realtime API for native speech-to-speech with ultra-low latency',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-provider-openai-realtime',
    badge: 'experimental'
  },

  // ============================================
  // COMMUNITY BUNDLES - Curated capabilities
  // ============================================
  {
    name: 'Memory',
    type: 'bundle',
    description: 'Persistent memory system with automatic capture and progressive disclosure',
    author: 'michaeljabbour',
    authorAvatar: ghAvatar('michaeljabbour'),
    repoUrl: 'https://github.com/michaeljabbour/amplifier-bundle-memory',
  },
  {
    name: 'Expert Cookbook',
    type: 'bundle',
    description: 'Achieve state-of-the-art results with best practices and patterns',
    author: 'DavidKoleczek',
    authorAvatar: ghAvatar('DavidKoleczek'),
    repoUrl: 'https://github.com/DavidKoleczek/amplifier-expert-cookbook',
  },

  // ============================================
  // TOOLS - Extend capabilities
  // ============================================
  {
    name: 'Image Generation',
    type: 'tool',
    description: 'Multi-provider AI image generation with DALL-E, Imagen, and GPT-Image-1',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-image-generation',
  },
  {
    name: 'YouTube Download',
    type: 'tool',
    description: 'Download audio and video from YouTube with metadata extraction',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-tool-youtube-dl',
  },
  {
    name: 'Whisper',
    type: 'tool',
    description: 'Speech-to-text transcription using OpenAI Whisper API',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-tool-whisper',
  },
  {
    name: 'Style Extraction',
    type: 'tool',
    description: 'Extract and apply writing styles from text samples',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-style-extraction',
  },
  {
    name: 'Markdown Utils',
    type: 'tool',
    description: 'Markdown parsing, injection, and metadata extraction utilities',
    author: 'robotdad',
    authorAvatar: ghAvatar('robotdad'),
    repoUrl: 'https://github.com/robotdad/amplifier-module-markdown-utils',
  },

  // ============================================
  // ADVANCED - Power user capabilities
  // ============================================
  {
    name: 'RLM',
    type: 'tool',
    description: 'Process 10M+ token contexts via Recursive Language Model and sandboxed REPL',
    author: 'michaeljabbour',
    authorAvatar: ghAvatar('michaeljabbour'),
    repoUrl: 'https://github.com/michaeljabbour/amplifier-module-tool-rlm',
  },
  {
    name: 'Tool Memory',
    type: 'tool',
    description: 'Persistent memory tool for storing and retrieving facts across sessions',
    author: 'michaeljabbour',
    authorAvatar: ghAvatar('michaeljabbour'),
    repoUrl: 'https://github.com/michaeljabbour/amplifier-module-tool-memory',
  },
  {
    name: 'Event Broadcast',
    type: 'hook',
    description: 'Transport-agnostic event broadcasting for streaming UI applications',
    author: 'michaeljabbour',
    authorAvatar: ghAvatar('michaeljabbour'),
    repoUrl: 'https://github.com/michaeljabbour/amplifier-module-hooks-event-broadcast',
  },
  {
    name: 'Explanatory Mode',
    type: 'hook',
    description: 'Inject explanatory output style with educational Insight blocks',
    author: 'michaeljabbour',
    authorAvatar: ghAvatar('michaeljabbour'),
    repoUrl: 'https://github.com/michaeljabbour/amplifier-module-hooks-explanatory',
  },
];

/**
 * Get items by type for filtered views
 */
export const getItemsByType = (type: ShowcaseItem['type']) => 
  showcaseItems.filter(item => item.type === type);

/**
 * Get official items only
 */
export const getOfficialItems = () => 
  showcaseItems.filter(item => item.badge === 'official');

/**
 * Get community items (non-official)
 */
export const getCommunityItems = () => 
  showcaseItems.filter(item => item.badge !== 'official');
