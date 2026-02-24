# OpenAI Agents Python SDK - Research Notes

## Overview
- **Released**: March 11, 2025 (successor to Swarm)
- **Architecture**: Direct API client library (no external binary)
- **Languages**: Python (primary), TypeScript/JS (June 2025)
- **License**: MIT
- **Stars**: ~18,900
- **Status**: Production-ready (v1.x+)

## Design Philosophy
1. "Enough features to be worth using, but few enough primitives to make it quick to learn."
2. "Works great out of the box, but you can customize exactly what happens."

## Core Primitives (intentionally minimal - only 3)
| Primitive | What It Is |
|---|---|
| **Agents** | LLMs configured with instructions, tools, settings |
| **Handoffs** | Mechanism for agents to delegate to other agents |
| **Guardrails** | Validation checks on inputs and outputs |

## Agent Loop (transparent, in Runner class)
1. Call LLM for current agent with input
2. If final output (text, no tool calls) -> loop ends
3. If handoff -> update agent and input, re-run
4. If tool calls -> execute tools, append results, re-run
5. If max_turns exceeded -> raise error

Control mechanisms:
- `max_turns` - hard limit
- `tool_use_behavior` - stop on first tool, specific tools, custom function
- `reset_tool_choice` - prevents infinite loops
- `error_handlers` - custom fallback
- `call_model_input_filter` - edit model input before each call

## Tools (5 categories)
1. **Hosted OpenAI tools**: WebSearch, FileSearch, CodeInterpreter, HostedMCP, ImageGeneration
2. **Local runtime tools**: Computer, Shell, ApplyPatch
3. **Function tools**: Any Python function via `@function_tool`
4. **Agents as tools**: Sub-agents run and return results
5. **Experimental**: Codex tool

## Provider Support
- **NOT locked to OpenAI** - supports 100+ models via LiteLLM
- Can set custom OpenAI-compatible clients
- Per-agent or per-run model selection
- Mix and match models in same workflow

## Multi-Agent Patterns
1. **Manager/Orchestrator** (agents as tools) - centralized control
2. **Handoffs** (peer delegation) - decentralized control
3. Hybrid: LLM-driven + code-driven orchestration

## Guardrails (3 types)
- Input guardrails (validate user input)
- Output guardrails (validate agent output)
- Tool guardrails (validate tool calls)

## Tracing
- Built-in, enabled by default
- 25+ external integrations (W&B, Arize, MLflow, LangSmith, etc.)
- Free OpenAI tracing dashboard even with non-OpenAI models

## Key Features
- Structured outputs (Pydantic)
- Streaming support
- Voice/Realtime agents
- Sessions (SQLite, SQLAlchemy, Encrypted)
- Human-in-the-loop
- Durable workflows (Temporal, Restate, DBOS)

## Lock-in Assessment
- LLM models: None (100+ via LiteLLM)
- Hosted tools: Moderate (OpenAI-specific)
- Tracing: Low (replaceable)
- Core framework: None
