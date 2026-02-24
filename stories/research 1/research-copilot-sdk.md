# GitHub Copilot SDK - Research Notes

## Overview
- **Released**: January 22, 2026 (Technical Preview)
- **Architecture**: SDK wraps Copilot CLI binary via JSON-RPC (stdio/TCP)
- **Languages**: Python, TypeScript/Node.js, Go, .NET (+ community: Java, Rust, C++, Clojure)
- **License**: MIT
- **Stars**: ~7,000 in 3 weeks
- **Status**: Alpha (v0.1.23), "may not yet be suitable for production use"

## Architecture
```
Your Application
       |
  SDK Client (Python/TS/Go/.NET)
       | JSON-RPC (stdio or TCP)
  Copilot CLI (running in server/headless mode)
       |
  LLM APIs (GitHub-hosted models or BYOK)
```

The SDK does NOT contain the agent runtime itself. It manages the lifecycle of a Copilot CLI process running in server mode. Wheels are ~55-60 MB because they bundle the CLI binary.

## Key Abstractions
| Abstraction | Purpose |
|---|---|
| `CopilotClient` | Manages CLI process lifecycle, creates sessions |
| `Session` | A conversation with model selection, tools, streaming |
| `Tools` | Custom functions the LLM can invoke |
| `Hooks` | Lifecycle interceptors (6 total) |
| `ProviderConfig` | BYOK configuration |
| `MCP Servers` | External tool servers via MCP |
| `Custom Agents` | Specialized AI personas |
| `Skills` | Markdown-defined behavior specifications |

## Agent Loop (opaque, inside CLI binary)
1. User sends prompt -> `on_user_prompt_submitted` hook
2. LLM plans -> determines tools
3. Tool invocation -> `on_pre_tool_use` -> execute -> `on_post_tool_use`
4. LLM incorporates results -> may call more tools or respond
5. Response streams back via `assistant.message_delta`
6. Session goes idle -> `session.idle` event

## Provider Support (BYOK)
- OpenAI (direct)
- Azure OpenAI
- Azure AI Foundry
- Anthropic (Claude)
- Ollama (local)
- Any OpenAI-compatible endpoint (vLLM, LiteLLM)

**Caveat**: Still requires the Copilot CLI binary as runtime. CLI is closed-source.

## Hooks (6 total)
- `on_pre_tool_use` - Allow/deny/modify tool calls
- `on_post_tool_use` - Post-process results
- `on_user_prompt_submitted` - Modify prompts
- `on_session_start` - Inject initialization
- `on_session_end` - Cleanup
- `on_error_occurred` - Retry/skip/abort

## Key Features
- Production-grade execution loop
- Multi-model routing
- MCP server integration (native)
- Real-time streaming
- Infinite sessions (auto context compaction)
- Custom agents and skills

## Limitations
- Agent loop is opaque (closed-source CLI)
- Soft dependency on GitHub's binary even in BYOK mode
- Very new (3 weeks old), Alpha status
- No production deployment patterns documented
