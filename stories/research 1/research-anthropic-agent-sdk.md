# Anthropic Claude Agent SDK - Research Notes

## Overview
- **Released**: September 29, 2025 (alongside Claude Sonnet 4.5)
- **Architecture**: Wraps Claude Code CLI as subprocess (stdin/stdout JSON protocol)
- **Languages**: Python, TypeScript
- **License**: MIT (governed by Anthropic Commercial Terms)
- **Stars**: ~4,700 (Python repo)
- **Status**: Alpha (v0.1.35 Python, v0.1.58 TypeScript)

## Architecture
```
Your Application (Python/TypeScript)
       |
  Public API Layer (query(), ClaudeSDKClient)
       | stdin/stdout JSON protocol
  Claude Code CLI (subprocess, bundled binary ~55-72MB)
       |
  Anthropic API / Bedrock / Vertex AI / Azure Foundry
```

The SDK spawns Claude Code CLI as subprocess. Does NOT directly call Anthropic Messages API. CLI binary is bundled in pip/npm packages.

## Two Entry Points
| Feature | `query()` | `ClaudeSDKClient` |
|---|---|---|
| Session | New each call | Reusable |
| Conversation | Single exchange | Multi-turn |
| Hooks | No | Yes |
| Custom Tools | No | Yes |
| Use Case | One-off tasks | Interactive apps |

## Built-in Tools (from Claude Code)
- File operations: Read, Write, Edit, Glob, Grep
- Shell: Bash
- Web: WebFetch, WebSearch
- Code: Task (subagent spawning)
- Memory tool
- ToolSearch, text editor, computer use

## Custom Tools
Implemented as **in-process MCP servers** using `@tool` decorator:
```python
@tool("greet", "Greet a user", {"name": str})
async def greet_user(args):
    return {"content": [{"type": "text", "text": f"Hello, {args['name']}!"}]}
```

## Provider Lock-in
**LOCKED TO CLAUDE MODELS ONLY**, but supports multiple hosting:
- Anthropic API (direct)
- Amazon Bedrock
- Google Vertex AI
- Microsoft Azure AI Foundry

Cannot use OpenAI, Gemini, Llama, or any non-Claude model.

## Lifecycle Hooks
- PreToolUse, PostToolUse
- UserPromptSubmit
- Stop
- SubagentStart/Stop (TypeScript has more hooks than Python)
- PreCompact
- SessionStart/End (TypeScript only)

## Multi-Agent: Subagents
- Context isolation per subagent
- Parallelization support
- Specialized instructions and tools per subagent
- Model override per subagent
- **Single level of nesting only** (subagents can't spawn subagents)

## Session Management
- Resume existing sessions
- Session forking (branch conversations)
- Multi-turn with persistent state

## Permission System
- Coarse-grained: permission_mode setting
- Fine-grained: can_use_tool callback

## Key Differentiators
- Battle-tested (evolved from Claude Code)
- Rich built-in tools
- Session forking
- Cost tracking (total_cost_usd in ResultMessage)
- Automatic context compaction

## Limitations
- Hard vendor lock-in (Claude only)
- Heavy package (55-72MB)
- Subprocess architecture adds latency
- Python hooks have fewer events than TypeScript
- Alpha maturity
