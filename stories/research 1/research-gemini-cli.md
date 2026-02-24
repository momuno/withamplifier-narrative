# Google AI Agent Ecosystem - Research Notes

> **Research date**: February 20, 2026
> **Scope**: Gemini CLI (terminal agent), Google ADK (developer SDK), Google Antigravity (agentic IDE)

---

## Product Overview

Google's agent story spans three interconnected products at different abstraction levels:

| Product | Layer | Analogy |
|---|---|---|
| **Gemini CLI** | Terminal AI agent | Claude Code / GitHub Copilot CLI |
| **Google ADK** | Developer SDK | Claude Agent SDK / OpenAI Agents SDK |
| **Antigravity** | Agentic IDE | Cursor/Windsurf + agent orchestration |

---

## Part 1: Gemini CLI

### Overview
- **Released**: June 25, 2025
- **Architecture**: Open-source TypeScript/Node.js terminal AI agent
- **License**: Apache 2.0
- **Stars**: ~95,100 (fastest-growing terminal AI agent by far; viral launch)
- **Status**: Production (actively developed; hooks added v0.26.0+, Jan 2026)
- **Runtime**: Node.js (`npm install -g @google/gemini-cli`) -- no bundled binary
- **Default model**: Gemini 2.5 Pro / Gemini 3 Pro, 1M token context window
- **Free tier**: Personal Google account -> free Gemini Code Assist license with generous rate limits

### Architecture
```
User Prompt
     |
Gemini CLI (TypeScript, fully open-source Apache 2.0)
     | ReAct loop (Reason + Act) -- inspectable in public repo
     | Direct HTTPS
Google Gemini API (2.5 Pro / 2.5 Flash / Gemini 3)
     |
Built-in Tools + MCP Servers + Extensions
```

**Critical distinction**: Unlike Copilot SDK and Claude Agent SDK, Gemini CLI IS the agent itself -- open-source, no subprocess wrapper, no closed binary. The ReAct loop is inspectable in the public repo.

### Agent Loop (ReAct -- transparent, open source)
1. User sends prompt
2. Gemini reasons about available tools and task decomposition
3. Tool invocation (file, shell, web, MCP, extension, etc.)
4. Tool result incorporated; may call more tools or respond
5. BeforeTool/AfterTool hooks fire synchronously around tool calls
6. AfterAgent hook fires on completion; enables continuous iteration patterns

### Built-in Tools
| Tool | Capability |
|---|---|
| ReadFile, WriteFile, EditFile | Full file I/O |
| Shell / Bash | Terminal command execution |
| WebFetch | Fetch and read URL contents |
| GoogleSearch | Google Search grounding (real-time web) |
| Glob, Grep | Code and file pattern search |
| Memory | Persistent context across sessions |
| Todo | Task tracking |

### Provider Support
- **Locked to Gemini models** (2.5 Pro, 2.5 Flash, Gemini 3 Pro/Flash)
- Model routing: `/model` command, `auto` mode selects best model per request
- Flash auto-fallback under quota load (known user friction point)
- No multi-provider support: cannot use Claude, GPT, Llama, or any non-Gemini model

### Hooks (v0.26.0+, January 28, 2026)
Three lifecycle events:
- `BeforeTool` -- intercept before any tool execution; allow / deny / inject context
- `AfterTool` -- post-process tool results
- `AfterAgent` -- fires when agent completes; enables "Ralph loop" continuous iteration

**Implementation**: External shell scripts or any executable (not typed Python callbacks).
**Configuration**: `.gemini/settings.json`

```json
{
  "hooks": {
    "BeforeTool": [{
      "matcher": "write_file|replace",
      "hooks": [{"name": "secret-scanner", "type": "command",
                 "command": ".gemini/hooks/block-secrets.sh"}]
    }]
  }
}
```

**Decision outputs**: `{"decision": "allow"}` or `{"decision": "deny", "reason": "...", "systemMessage": "..."}`

The `systemMessage` field injects feedback directly into the agent's conversation for self-correction -- functionally equivalent to Amplifier's `inject_context` hook action.

Hooks are also first-class in Extensions -- authors bundle hooks for one-command installation.

### Extension System (October 2025)
Extensions package: prompts, MCP servers, custom commands, themes, hooks, sub-agents, agent skills.
```bash
gemini extensions install https://github.com/gemini-cli-extensions/workspace
```
Gallery at geminicli.com/extensions. Community-driven, GitHub-hosted, one-command install.

### Key Features
- Subagents (experimental): isolated context, parallelization, remote subagents
- Checkpointing + Rewind: session save / resume / rollback to prior state
- Plan mode (experimental): explicit task planning before execution
- GEMINI.md: project context files (persistent per-project instructions)
- MCP first-class integration
- IDE integration via Gemini Code Assist
- Sandboxing mode (tool execution isolation)
- Token caching
- Conductor (Feb 2026): formalize specs/plans in Markdown for code consistency; automated reviews

### Limitations
- Hard locked to Gemini models only
- TypeScript/Node.js (no Python library API for Gemini CLI)
- Hooks use shell scripts (no typed callback API; less IDE/autocomplete support)
- Subagents are experimental -- not production-ready
- Flash auto-fallback creates non-deterministic model behavior mid-session
- No built-in declarative workflow orchestration (no recipe/YAML layer)

---

## Part 2: Google ADK (Agent Development Kit)

### Overview
- **Released**: April 9, 2025 (Google Cloud NEXT 2025)
- **Architecture**: Python library -- code-first, no bundled binary
- **Languages**: Python (primary), TypeScript, Go, Java (four official SDKs)
- **License**: Apache 2.0
- **Stars**: ~6,500 (adk-python repo)
- **Status**: Production (v0.5.0+)
- **Install**: `pip install google-adk` (lightweight; no binary)
- **Powers**: Google Agentspace and Customer Engagement Suite (CES) internally

### Architecture
```
Your Application (Python / TypeScript / Go / Java)
     |
ADK Framework (LlmAgent / WorkflowAgent / CustomAgent)
     | Direct API calls
LLM (Gemini/Vertex AI native, Claude/Ollama/100+ via LiteLLM)
     |
Tools (Function / MCP / OpenAPI / Search / Code Exec)
```

No subprocess. No binary. The orchestration loop lives in code you own and can read.

### Five Agent Types
| Type | Behavior |
|---|---|
| `LlmAgent` | LLM-driven; auto-transfers to sub-agents based on descriptions |
| `SequentialAgent` | Runs sub-agents one at a time in order (deterministic pipeline) |
| `LoopAgent` | Repeats until condition met (convergence/iteration) |
| `ParallelAgent` | Runs sub-agents concurrently |
| `CustomAgent` | Full programmatic control of execution loop |

### Provider Support (Model-Agnostic)
- **Native / optimized**: Gemini (all generations via Google AI Studio or Vertex AI)
- **100+ models**: LiteLLM integration (Anthropic, Meta, Mistral, AI21, and more)
- **Vertex AI Model Garden**: Claude, Llama, Gemma, and others hosted on Google Cloud
- **Self-hosted**: Ollama, vLLM
- **Multi-provider in one workflow**: Yes -- different agents in same hierarchy can use different models
- Soft bias toward Google/Vertex but no hard lock-in at the framework level

### Callbacks (Python functions)
| Callback | When |
|---|---|
| `before_agent` | Before agent starts |
| `after_agent` | After agent finishes |
| `before_model` | Before LLM API call |
| `after_model` | After LLM API response |
| `before_tool` | Before tool execution |
| `after_tool` | After tool returns |

Typed Python functions; can modify content or return None (pass-through). Unlike Gemini CLI hooks, these have full IDE support and type checking.

### Multi-Agent Patterns
- **Hierarchical**: `sub_agents=[...]` defines relationships; LLM auto-routes by agent descriptions
- **Description-driven delegation**: No code routing required; LLM matches task to description
- **Agents as tools**: Any agent callable from the tool slot of another agent
- **Unlimited nesting depth** (unlike Claude Agent SDK's single level)
- **A2A Protocol** (April 2025): Open Agent2Agent protocol for cross-framework agent communication

### Tools
- Function tools (Python function + docstring = auto-generated schema)
- MCP servers (full integration)
- OpenAPI tools (generate from spec)
- Google Search grounding + Vertex AI Search
- Code Execution (sandboxed)
- LangChain and LlamaIndex tool integration

### Sessions & Memory
- Session state with rewind and migrate
- In-session state (per-turn context)
- Persistent memory (cross-session)
- Artifacts: structured files/data produced and consumed by agents

### Deployment
- **Vertex AI Agent Engine**: Fully managed, auto-scaling (recommended)
- Cloud Run, GKE, Docker (any container runtime)
- ADK Web: local development UI (not for production)
- Built-in evaluation: `AgentEvaluator`, `adk eval` CLI, trajectory + response quality testing

### Limitations
- Gemini-optimized: Vertex AI Agent Engine only supports Gemini models natively
- LiteLLM adds dependency overhead for non-Google models
- No declarative workflow YAML (all code; no recipe layer)
- TypeScript/Go/Java have partial feature parity vs Python
- A2A protocol adoption still early
- Fewer community tutorials vs OpenAI Agents SDK

---

## Part 3: Google Antigravity

### Overview
- **Released**: November 18-20, 2025
- **Architecture**: VS Code fork (same lineage as Cursor/Windsurf)
- **Status**: Public Preview (free for individuals)
- **Platforms**: macOS, Windows, Linux
- **Download**: antigravity.google/download
- **Models**: Gemini 3 Pro (default), Claude Sonnet 4.5, OpenAI GPT-OSS (user choice)

### Two Surfaces
| Surface | What It Is |
|---|---|
| **Editor View** | AI-powered IDE: tab completions, inline commands, synchronous workflow |
| **Manager Surface** | Agent orchestration: spawn, observe, direct multiple async agents |

The Manager Surface is the key innovation: agents work autonomously across editor + terminal + browser while you observe via Artifacts, not raw tool call logs.

### Key Concepts
- **Artifacts**: Tangible deliverables (task lists, plans, screenshots, browser recordings)
- **Comment on Artifacts**: Leave feedback directly; agent incorporates without stopping execution
- **Knowledge Base**: Agents save useful context/snippets across tasks to improve future work
- **Cross-surface agents**: Single agent can plan in editor, execute in terminal, verify in browser
- **Conductor** (Feb 2026 update): Automated code consistency reviews; specs in Markdown

### Model Strategy
Antigravity is explicitly model-agnostic -- no lock-in to Gemini:
- Gemini 3 Pro (default, generous rate limits)
- Anthropic Claude Sonnet 4.5 (full support)
- OpenAI GPT-OSS (full support)

### Limitations
- Public Preview (not production-ready)
- An IDE, not an SDK -- cannot embed in your own application
- VS Code fork raises open-source community concerns
- No programmatic extension/plugin API yet
- Agent trust model still early (Artifacts are the trust mechanism)

---

## Google Ecosystem: Lock-in Assessment

| Product | LLM Lock-in | Platform Lock-in |
|---|---|---|
| **Gemini CLI** | Hard (Gemini only) | Low (runs anywhere, Apache 2.0) |
| **ADK** | Soft (Gemini-optimized, 100+ via LiteLLM) | Moderate (Vertex AI for managed deploy) |
| **Antigravity** | None (3 models) | None (cross-platform, free) |

---

## Sources
- Gemini CLI GitHub: https://github.com/google-gemini/gemini-cli
- Gemini CLI launch blog (Jun 25, 2025): https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/
- Gemini CLI hooks blog (Jan 28, 2026): https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/
- Gemini CLI extensions docs: https://geminicli.com/docs/extensions/
- ADK announcement (Apr 9, 2025): https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/
- ADK docs: https://google.github.io/adk-docs/
- Antigravity announcement (Nov 20, 2025): https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
- Antigravity site: https://antigravity.google/
