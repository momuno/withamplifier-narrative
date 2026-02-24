// Demo execution traces for the playground simulation
// These represent realistic Amplifier session flows

export interface ThoughtChunk {
  text: string
  type: 'reasoning' | 'planning' | 'reflection'
  annotation?: string
}

export interface ToolCall {
  id: string
  name: string
  input: Record<string, unknown>
  output: unknown
  duration: number // milliseconds
  annotation: string
}

export interface Step {
  id: string
  type: 'thinking' | 'tool_call' | 'output'
  timestamp: number // milliseconds from start
  duration: number
  
  // For thinking steps
  thought?: {
    text: string
    chunks: ThoughtChunk[]
  }
  
  // For tool_call steps
  tool?: ToolCall
  
  // For output steps
  output?: {
    format: 'markdown' | 'code'
    content: string
  }
}

export interface SessionTrace {
  id: string
  bundle: string
  prompt: string
  totalDuration: number
  steps: Step[]
  finalOutput: string
  metadata: {
    toolCallCount: number
    filesAccessed: string[]
  }
}

// Annotation library for educational tooltips
export const annotations = {
  tools: {
    glob: {
      title: 'Pattern Matching',
      body: 'Glob finds files matching patterns like **/*.py. The agent uses this to discover code structure without reading every file.',
      icon: 'search'
    },
    read_file: {
      title: 'File Reading',
      body: 'The agent reads files to understand their content. It selectively reads what it needs rather than loading everything.',
      icon: 'file'
    },
    grep: {
      title: 'Content Search',
      body: 'Searches inside files for patterns. More powerful than Ctrl+F—supports regex and searches across entire codebases.',
      icon: 'search-code'
    },
    bash: {
      title: 'Command Execution',
      body: 'Runs shell commands. The agent can build, test, and interact with your development environment.',
      icon: 'terminal'
    },
    web_search: {
      title: 'Web Research',
      body: 'Searches the internet for current information. Useful for docs, best practices, and examples.',
      icon: 'globe'
    }
  },
  concepts: {
    thinking: {
      title: 'Agent Reasoning',
      body: 'Before each action, the agent thinks through its approach. This planning ensures systematic, thorough work.'
    },
    tool_selection: {
      title: 'Tool Selection',
      body: 'The agent chooses tools based on the task. Bundles define which tools are available.'
    },
    iteration: {
      title: 'Iterative Refinement',
      body: 'Agents often make multiple passes—gathering info, then refining their approach based on what they learn.'
    }
  }
}

// Demo trace: Documentation bundle
export const documentationTrace: SessionTrace = {
  id: 'demo-documentation',
  bundle: 'documentation',
  prompt: 'Document the architecture of this codebase',
  totalDuration: 45000,
  steps: [
    {
      id: 'step-1',
      type: 'thinking',
      timestamp: 0,
      duration: 2000,
      thought: {
        text: "I'll start by understanding the project structure. Let me find all the main source files and get an overview of the codebase organization.",
        chunks: [
          { text: "I'll start by understanding the project structure.", type: 'planning' },
          { text: "Let me find all the main source files and get an overview of the codebase organization.", type: 'reasoning' }
        ]
      }
    },
    {
      id: 'step-2',
      type: 'tool_call',
      timestamp: 2000,
      duration: 800,
      tool: {
        id: 'tool-1',
        name: 'glob',
        input: { pattern: '**/*.{ts,tsx,py,js}' },
        output: { total_files: 23, matches: ['src/main.py', 'src/utils.py', 'src/api/routes.py', 'src/models/user.py', '...'] },
        duration: 800,
        annotation: 'Finding all source files to understand project scope'
      }
    },
    {
      id: 'step-3',
      type: 'tool_call',
      timestamp: 2800,
      duration: 600,
      tool: {
        id: 'tool-2',
        name: 'read_file',
        input: { file_path: 'src/main.py' },
        output: '# Main application entry point\nfrom flask import Flask\nfrom src.api import routes\n...',
        duration: 600,
        annotation: 'Reading the main entry point to understand application structure'
      }
    },
    {
      id: 'step-4',
      type: 'thinking',
      timestamp: 3400,
      duration: 1500,
      thought: {
        text: "I see this is a Flask application with a modular structure. There's an API layer with routes, a models layer, and utilities. Let me examine the API structure more closely.",
        chunks: [
          { text: "I see this is a Flask application with a modular structure.", type: 'reflection' },
          { text: "There's an API layer with routes, a models layer, and utilities.", type: 'reasoning' },
          { text: "Let me examine the API structure more closely.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-5',
      type: 'tool_call',
      timestamp: 4900,
      duration: 500,
      tool: {
        id: 'tool-3',
        name: 'grep',
        input: { pattern: 'class.*:', path: 'src/' },
        output: { matches: ['src/models/user.py:5: class User:', 'src/models/session.py:8: class Session:', 'src/api/routes.py:12: class AuthRouter:'] },
        duration: 500,
        annotation: 'Finding class definitions to map the object model'
      }
    },
    {
      id: 'step-6',
      type: 'thinking',
      timestamp: 5400,
      duration: 1800,
      thought: {
        text: "Now I have a clear picture. This is a Flask REST API with User and Session models, using a router pattern for endpoints. I'll structure the documentation with an overview, architecture diagram description, and component breakdown.",
        chunks: [
          { text: "Now I have a clear picture.", type: 'reflection' },
          { text: "This is a Flask REST API with User and Session models, using a router pattern for endpoints.", type: 'reasoning' },
          { text: "I'll structure the documentation with an overview, architecture diagram description, and component breakdown.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-7',
      type: 'output',
      timestamp: 7200,
      duration: 3000,
      output: {
        format: 'markdown',
        content: `# Architecture Documentation

## Overview

This is a Flask-based REST API following a modular architecture pattern. The application separates concerns into distinct layers for maintainability and testability.

## Project Structure

\`\`\`
src/
├── main.py          # Application entry point
├── api/
│   └── routes.py    # HTTP endpoint definitions
├── models/
│   ├── user.py      # User domain model
│   └── session.py   # Session management
└── utils/           # Shared utilities
\`\`\`

## Core Components

### Application Layer (main.py)
The entry point initializes Flask, registers routes, and configures middleware.

### API Layer (api/)
RESTful endpoints using the router pattern. Each router handles a specific domain.

### Model Layer (models/)
Domain objects with validation and business logic. Currently includes:
- **User**: Authentication and profile management
- **Session**: Token-based session handling

## Data Flow

1. Request → Router → Service → Model → Database
2. Response ← Router ← Service ← Model ← Database`
      }
    }
  ],
  finalOutput: '# Architecture Documentation\n\n## Overview\n\nThis is a Flask-based REST API...',
  metadata: {
    toolCallCount: 3,
    filesAccessed: ['src/main.py', 'src/api/routes.py', 'src/models/user.py']
  }
}

// Demo trace: Code Reviewer bundle
export const codeReviewerTrace: SessionTrace = {
  id: 'demo-code-reviewer',
  bundle: 'code-reviewer',
  prompt: 'Review this code for security vulnerabilities',
  totalDuration: 35000,
  steps: [
    {
      id: 'step-1',
      type: 'thinking',
      timestamp: 0,
      duration: 1800,
      thought: {
        text: "I'll scan for common security patterns first—SQL injection, hardcoded secrets, and authentication issues. Let me search for database queries and credential handling.",
        chunks: [
          { text: "I'll scan for common security patterns first—SQL injection, hardcoded secrets, and authentication issues.", type: 'planning' },
          { text: "Let me search for database queries and credential handling.", type: 'reasoning' }
        ]
      }
    },
    {
      id: 'step-2',
      type: 'tool_call',
      timestamp: 1800,
      duration: 600,
      tool: {
        id: 'tool-1',
        name: 'grep',
        input: { pattern: 'execute|query|sql', path: 'src/', '-i': true },
        output: { matches: ['src/database.py:45: cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")', 'src/database.py:67: query = "INSERT INTO logs..."'] },
        duration: 600,
        annotation: 'Searching for SQL query patterns that might be vulnerable'
      }
    },
    {
      id: 'step-3',
      type: 'tool_call',
      timestamp: 2400,
      duration: 500,
      tool: {
        id: 'tool-2',
        name: 'read_file',
        input: { file_path: 'src/database.py', offset: 40, limit: 30 },
        output: 'def get_user(user_id):\n    cursor = db.cursor()\n    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")\n    return cursor.fetchone()',
        duration: 500,
        annotation: 'Reading the vulnerable code to confirm the issue'
      }
    },
    {
      id: 'step-4',
      type: 'thinking',
      timestamp: 2900,
      duration: 1500,
      thought: {
        text: "Found a SQL injection vulnerability. The query uses f-string interpolation instead of parameterized queries. This is a critical security issue. Let me also check for hardcoded credentials.",
        chunks: [
          { text: "Found a SQL injection vulnerability.", type: 'reflection', annotation: 'Critical security finding' },
          { text: "The query uses f-string interpolation instead of parameterized queries. This is a critical security issue.", type: 'reasoning' },
          { text: "Let me also check for hardcoded credentials.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-5',
      type: 'tool_call',
      timestamp: 4400,
      duration: 500,
      tool: {
        id: 'tool-3',
        name: 'grep',
        input: { pattern: 'password|secret|api_key|token', path: 'src/', '-i': true },
        output: { matches: ['src/config.py:12: API_KEY = "sk-1234567890abcdef"', 'src/config.py:13: DB_PASSWORD = "admin123"'] },
        duration: 500,
        annotation: 'Searching for hardcoded secrets'
      }
    },
    {
      id: 'step-6',
      type: 'thinking',
      timestamp: 4900,
      duration: 1200,
      thought: {
        text: "Two hardcoded secrets found in config.py. These should be environment variables. I have enough to write a comprehensive security report.",
        chunks: [
          { text: "Two hardcoded secrets found in config.py.", type: 'reflection' },
          { text: "These should be environment variables. I have enough to write a comprehensive security report.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-7',
      type: 'output',
      timestamp: 6100,
      duration: 2500,
      output: {
        format: 'markdown',
        content: `# Security Review Report

## Critical Issues

### 1. SQL Injection Vulnerability
**Location:** \`src/database.py:45\`
**Severity:** 🔴 Critical

\`\`\`python
# VULNERABLE CODE
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
\`\`\`

**Risk:** Attackers can execute arbitrary SQL commands, potentially accessing or modifying all database records.

**Fix:**
\`\`\`python
# SECURE CODE
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
\`\`\`

### 2. Hardcoded Secrets
**Location:** \`src/config.py:12-13\`
**Severity:** 🔴 Critical

Found hardcoded credentials:
- API key exposed in source code
- Database password in plain text

**Fix:** Move to environment variables:
\`\`\`python
import os
API_KEY = os.environ.get('API_KEY')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
\`\`\`

## Summary

| Issue | Severity | Status |
|-------|----------|--------|
| SQL Injection | Critical | Needs fix |
| Hardcoded Secrets | Critical | Needs fix |

**Recommendation:** Address these issues before any production deployment.`
      }
    }
  ],
  finalOutput: '# Security Review Report\n\n## Critical Issues...',
  metadata: {
    toolCallCount: 3,
    filesAccessed: ['src/database.py', 'src/config.py']
  }
}

// Demo trace: Developer bundle
export const developerTrace: SessionTrace = {
  id: 'demo-developer',
  bundle: 'developer',
  prompt: 'Create a script that analyzes log files for errors',
  totalDuration: 50000,
  steps: [
    {
      id: 'step-1',
      type: 'thinking',
      timestamp: 0,
      duration: 1500,
      thought: {
        text: "I'll create a Python script for log analysis. First, let me check what log files exist and understand their format.",
        chunks: [
          { text: "I'll create a Python script for log analysis.", type: 'planning' },
          { text: "First, let me check what log files exist and understand their format.", type: 'reasoning' }
        ]
      }
    },
    {
      id: 'step-2',
      type: 'tool_call',
      timestamp: 1500,
      duration: 400,
      tool: {
        id: 'tool-1',
        name: 'glob',
        input: { pattern: 'logs/**/*.log' },
        output: { total_files: 3, matches: ['logs/app.log', 'logs/error.log', 'logs/access.log'] },
        duration: 400,
        annotation: 'Finding log files to analyze'
      }
    },
    {
      id: 'step-3',
      type: 'tool_call',
      timestamp: 1900,
      duration: 500,
      tool: {
        id: 'tool-2',
        name: 'read_file',
        input: { file_path: 'logs/app.log', limit: 20 },
        output: '2024-01-15 10:23:45 INFO Starting application\n2024-01-15 10:23:46 DEBUG Loading config\n2024-01-15 10:23:47 ERROR Database connection failed: timeout\n2024-01-15 10:23:48 WARN Retrying connection...',
        duration: 500,
        annotation: 'Reading sample log to understand format'
      }
    },
    {
      id: 'step-4',
      type: 'thinking',
      timestamp: 2400,
      duration: 1200,
      thought: {
        text: "The logs follow a standard format: timestamp, level, message. I'll write a script that parses this format, filters errors, and provides summary statistics.",
        chunks: [
          { text: "The logs follow a standard format: timestamp, level, message.", type: 'reflection' },
          { text: "I'll write a script that parses this format, filters errors, and provides summary statistics.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-5',
      type: 'output',
      timestamp: 3600,
      duration: 4000,
      output: {
        format: 'code',
        content: `#!/usr/bin/env python3
"""Log analyzer - finds and summarizes errors in log files."""

import re
import sys
from pathlib import Path
from collections import Counter
from datetime import datetime

LOG_PATTERN = re.compile(
    r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)'
)

def parse_log_line(line: str) -> dict | None:
    """Parse a single log line into components."""
    match = LOG_PATTERN.match(line.strip())
    if match:
        return {
            'timestamp': datetime.fromisoformat(match.group(1)),
            'level': match.group(2),
            'message': match.group(3)
        }
    return None

def analyze_logs(log_path: Path) -> dict:
    """Analyze a log file and return statistics."""
    stats = {
        'total_lines': 0,
        'by_level': Counter(),
        'errors': [],
        'warnings': []
    }
    
    with open(log_path, 'r') as f:
        for line in f:
            stats['total_lines'] += 1
            entry = parse_log_line(line)
            if entry:
                stats['by_level'][entry['level']] += 1
                if entry['level'] == 'ERROR':
                    stats['errors'].append(entry)
                elif entry['level'] == 'WARN':
                    stats['warnings'].append(entry)
    
    return stats

def print_report(stats: dict, filename: str):
    """Print a formatted report."""
    print(f"\\n{'='*50}")
    print(f"Log Analysis: {filename}")
    print('='*50)
    print(f"Total lines: {stats['total_lines']}")
    print(f"\\nBy level:")
    for level, count in stats['by_level'].most_common():
        print(f"  {level}: {count}")
    
    if stats['errors']:
        print(f"\\n🔴 Errors ({len(stats['errors'])}):")
        for err in stats['errors'][:5]:
            print(f"  [{err['timestamp']}] {err['message']}")

if __name__ == '__main__':
    log_dir = Path('logs')
    for log_file in log_dir.glob('*.log'):
        stats = analyze_logs(log_file)
        print_report(stats, log_file.name)`
      }
    },
    {
      id: 'step-6',
      type: 'tool_call',
      timestamp: 7600,
      duration: 1500,
      tool: {
        id: 'tool-3',
        name: 'bash',
        input: { command: 'python3 analyze_logs.py --test' },
        output: '==================================================\nLog Analysis: app.log\n==================================================\nTotal lines: 1247\n\nBy level:\n  INFO: 892\n  DEBUG: 234\n  ERROR: 87\n  WARN: 34\n\n🔴 Errors (87):\n  [2024-01-15 10:23:47] Database connection failed: timeout\n  [2024-01-15 10:45:12] Authentication failed for user admin',
        duration: 1500,
        annotation: 'Testing the script on actual log files'
      }
    },
    {
      id: 'step-7',
      type: 'thinking',
      timestamp: 9100,
      duration: 800,
      thought: {
        text: "Script works correctly. Found 87 errors in the log files. The script is ready for use.",
        chunks: [
          { text: "Script works correctly. Found 87 errors in the log files.", type: 'reflection' },
          { text: "The script is ready for use.", type: 'reasoning' }
        ]
      }
    }
  ],
  finalOutput: '#!/usr/bin/env python3\n"""Log analyzer...',
  metadata: {
    toolCallCount: 3,
    filesAccessed: ['logs/app.log', 'logs/error.log', 'logs/access.log']
  }
}

// Demo trace: Presentation Creator bundle
export const presentationTrace: SessionTrace = {
  id: 'demo-presentation',
  bundle: 'presentation',
  prompt: 'Create a technical presentation on our architecture',
  totalDuration: 55000,
  steps: [
    {
      id: 'step-1',
      type: 'thinking',
      timestamp: 0,
      duration: 1800,
      thought: {
        text: "I'll create a presentation that explains the architecture clearly. Let me first understand the codebase structure, then research best practices for technical presentations.",
        chunks: [
          { text: "I'll create a presentation that explains the architecture clearly.", type: 'planning' },
          { text: "Let me first understand the codebase structure, then research best practices for technical presentations.", type: 'reasoning' }
        ]
      }
    },
    {
      id: 'step-2',
      type: 'tool_call',
      timestamp: 1800,
      duration: 600,
      tool: {
        id: 'tool-1',
        name: 'glob',
        input: { pattern: 'src/**/*' },
        output: { total_files: 18, matches: ['src/main.py', 'src/api/', 'src/models/', 'src/services/', 'src/utils/'] },
        duration: 600,
        annotation: 'Surveying codebase structure for presentation content'
      }
    },
    {
      id: 'step-3',
      type: 'tool_call',
      timestamp: 2400,
      duration: 500,
      tool: {
        id: 'tool-2',
        name: 'read_file',
        input: { file_path: 'README.md' },
        output: '# Project Name\n\nA scalable microservices platform built with Python and Flask.\n\n## Features\n- RESTful API\n- JWT Authentication\n- PostgreSQL database\n- Redis caching',
        duration: 500,
        annotation: 'Reading project overview for context'
      }
    },
    {
      id: 'step-4',
      type: 'tool_call',
      timestamp: 2900,
      duration: 1200,
      tool: {
        id: 'tool-3',
        name: 'web_search',
        input: { query: 'microservices architecture presentation best practices' },
        output: { results: ['Use diagrams to show service boundaries', 'Explain data flow with concrete examples', 'Include performance considerations'] },
        duration: 1200,
        annotation: 'Researching presentation best practices'
      }
    },
    {
      id: 'step-5',
      type: 'thinking',
      timestamp: 4100,
      duration: 2000,
      thought: {
        text: "I have a good understanding now. This is a Flask microservices platform with JWT auth and caching. I'll structure the presentation as: Overview → Architecture → Components → Data Flow → Scaling → Q&A.",
        chunks: [
          { text: "I have a good understanding now. This is a Flask microservices platform with JWT auth and caching.", type: 'reflection' },
          { text: "I'll structure the presentation as: Overview → Architecture → Components → Data Flow → Scaling → Q&A.", type: 'planning' }
        ]
      }
    },
    {
      id: 'step-6',
      type: 'output',
      timestamp: 6100,
      duration: 4500,
      output: {
        format: 'markdown',
        content: `# Technical Architecture Presentation

## Slide 1: Title
**Our Platform Architecture**
*A Deep Dive into How It Works*

---

## Slide 2: Overview
**What We've Built**
- Scalable microservices platform
- RESTful API design
- Built for growth

*Speaker notes: Start with the "why" - this architecture was chosen for its flexibility and scalability.*

---

## Slide 3: Architecture Diagram
\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Gateway   │────▶│   Services  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │    Redis    │     │  PostgreSQL │
                    └─────────────┘     └─────────────┘
\`\`\`

*Speaker notes: Walk through each component. Explain why we chose this separation.*

---

## Slide 4: Authentication Flow
**JWT-Based Security**
1. User submits credentials
2. Gateway validates & issues token
3. Token used for subsequent requests
4. Redis stores session data

*Visual suggestion: Sequence diagram showing token flow*

---

## Slide 5: Data Layer
**PostgreSQL + Redis**
- PostgreSQL: Source of truth
- Redis: Session cache, rate limiting
- Read replicas for scaling

---

## Slide 6: Performance
**How We Scale**
- Horizontal service scaling
- Database connection pooling
- Cached frequent queries
- 99.9% uptime target

---

## Slide 7: Q&A
**Questions?**

*Speaker notes: Anticipate questions about: Why not GraphQL? How do services communicate? What's the deployment strategy?*`
      }
    }
  ],
  finalOutput: '# Technical Architecture Presentation...',
  metadata: {
    toolCallCount: 3,
    filesAccessed: ['README.md', 'src/main.py']
  }
}

// Export all traces by bundle ID
export const demoTraces: Record<string, SessionTrace> = {
  'documentation': documentationTrace,
  'code-reviewer': codeReviewerTrace,
  'developer': developerTrace,
  'presentation': presentationTrace
}

// Helper to get trace by bundle ID
export function getTraceForBundle(bundleId: string): SessionTrace | undefined {
  return demoTraces[bundleId]
}
