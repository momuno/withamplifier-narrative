# AI Agent SDK Comparison: Copilot SDK vs OpenAI Agents vs Claude Agent SDK vs Google ADK vs Amplifier

> **Research date**: February 20, 2026
> **Sources**: Official documentation, GitHub repositories, PyPI/npm registries, Hacker News, Reddit, developer blogs, framework comparisons, Amplifier ecosystem analysis

---

## Executive Summary

Four major AI vendors have now released SDKs that expose their agentic capabilities as programmable libraries. Two of them (GitHub Copilot SDK and Anthropic Claude Agent SDK) literally wrap their CLI tools as subprocesses. The third (OpenAI Agents SDK) is a lightweight Python library. The fourth (Google ADK) is a code-first Python framework with four official language SDKs and genuine model-agnostic architecture -- alongside Gemini CLI, an open-source terminal agent with ~95,000 GitHub stars.

All four vendor SDKs share a common pattern: they provide developer access to **one vendor's agent ecosystem**, even when that ecosystem technically supports multiple models.

Amplifier takes a fundamentally different architectural approach: a thin kernel (~2,600 lines) that provides mechanisms only, with all policies -- including which LLM provider to use, how the agent loop works, what tools are available, and how observability functions -- living as swappable, composable modules.

| | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **Architecture** | CLI subprocess (JSON-RPC) | Python library (direct API) | CLI subprocess (stdin/stdout) | Python library (direct API) | Kernel + swappable modules |
| **Agent loop** | Opaque (inside binary) | Transparent (Runner class) | Opaque (inside binary) | Transparent (LlmAgent in Python) | Replaceable module |
| **Provider lock-in** | GitHub/BYOK | OpenAI/LiteLLM (100+) | Claude only (4 hosts) | Soft (Gemini-opt., 100+ via LiteLLM) | Any (10 official, simultaneous) |
| **Released** | Jan 2026 | Mar 2025 | Sep 2025 | Apr 2025 | 2024 |
| **Maturity** | Alpha (v0.1.x) | Production (v1.x) | Alpha (v0.1.x) | Production (v0.5.0+) | Production |
| **Philosophy** | Batteries-included | Minimal primitives | Claude Code as library | Model-agnostic, multi-agent | Mechanism, not policy |

---

## Part 1: The Four Vendor SDKs

### 1.1 GitHub Copilot SDK

**What it is**: A multi-platform SDK (Python, TypeScript, Go, .NET) that wraps the Copilot CLI binary, exposing GitHub Copilot's agentic loop as a programmable interface.

**Released**: January 22, 2026 (Technical Preview)
**Stars**: ~7,000 | **License**: MIT | **Status**: Alpha (v0.1.23)

#### Architecture

```
Your Application
       |
  SDK Client (Python/TS/Go/.NET)
       | JSON-RPC (stdio or TCP)
  Copilot CLI (running in server mode)  <-- closed-source binary, bundled in package (~55-60MB)
       |
  LLM APIs (GitHub-hosted or BYOK)
```

The SDK does not contain the agent runtime. It manages the lifecycle of a Copilot CLI process and communicates via JSON-RPC. The agent loop -- planning, tool invocation, multi-turn execution -- lives entirely inside the CLI binary. You cannot inspect, modify, or replace it.

#### Key Abstractions

| Concept | Description |
|---|---|
| `CopilotClient` | Manages CLI process lifecycle, creates sessions |
| `Session` | A conversation with model selection, tools, streaming |
| `Tools` | Custom functions invoked by the LLM via JSON-RPC |
| `Hooks` | 6 lifecycle interceptors (pre/post tool use, prompt, session, error) |
| `ProviderConfig` | BYOK configuration for custom endpoints |
| `MCP Servers` | External tool servers via Model Context Protocol |
| `Custom Agents` | Specialized personas with own prompts and tools |
| `Skills` | Markdown-defined behavior specifications |

#### Provider Support

Not locked to GitHub. Supports BYOK (Bring Your Own Key):
- OpenAI (direct), Azure OpenAI, Azure AI Foundry
- Anthropic (Claude)
- Ollama, vLLM, LiteLLM (any OpenAI-compatible endpoint)

**Caveat**: Still requires the Copilot CLI binary as runtime even in BYOK mode. The CLI is closed-source.

#### Extensibility

- **Custom tools**: Yes, via `@define_tool` decorator with typed parameters
- **Custom agents**: Yes, with own prompts and tool sets
- **Hooks**: 6 total (pre/post tool use, prompt, session start/end, error)
- **MCP integration**: Native, first-class
- **Replace orchestrator**: No. The loop is baked into the CLI binary.
- **Replace context manager**: No. Managed by CLI.
- **System prompt**: Append or replace modes

#### Strengths
- 4 official language SDKs (Python, TS, Go, .NET) -- widest language coverage
- Production-tested loop (same as Copilot CLI)
- Infinite sessions with auto context compaction
- Deep GitHub ecosystem integration
- BYOK means not strictly locked to one provider

#### Weaknesses
- Agent loop is opaque (closed-source CLI)
- 3 weeks old, Alpha status, "may not yet be suitable for production use"
- Soft dependency on GitHub's binary even in BYOK mode
- No production deployment patterns documented
- Management-driven adoption concerns (see developer sentiment)

---

### 1.2 OpenAI Agents Python SDK

**What it is**: A lightweight Python/TypeScript framework for multi-agent AI workflows, built around three primitives: Agents, Handoffs, and Guardrails. Successor to OpenAI's experimental Swarm project.

**Released**: March 11, 2025
**Stars**: ~18,900 | **License**: MIT | **Status**: Production-ready (v1.x+)

#### Architecture

```
Your Application
       |
  Runner class (transparent agent loop)
       | Direct HTTP
  LLM APIs (OpenAI, or 100+ via LiteLLM)
```

No external binary. No subprocess. The agent loop lives in Python code you can read and understand. This is the lightest-weight of the four vendor SDKs.

#### Core Primitives (intentionally minimal -- only 3)

| Primitive | Description |
|---|---|
| **Agents** | LLMs configured with instructions, tools, and settings |
| **Handoffs** | Mechanism for agents to delegate to other agents |
| **Guardrails** | Validation checks on inputs, outputs, and tool calls |

Everything else is composed from these primitives plus standard Python.

#### Agent Loop (transparent)

Managed by the `Runner` class:
1. Call LLM with current agent and input
2. If final output (text, no tool calls) -> return result
3. If handoff -> update agent and input, re-run
4. If tool calls -> execute tools, append results, re-run
5. If `max_turns` exceeded -> raise error (or call handler)

Control mechanisms: `max_turns`, `tool_use_behavior` (stop on first tool, specific tools, custom), `reset_tool_choice`, `error_handlers`, `call_model_input_filter`.

#### Tools (5 categories)

1. **Hosted OpenAI tools**: WebSearch, FileSearch, CodeInterpreter, HostedMCP, ImageGeneration
2. **Local runtime tools**: Computer, Shell, ApplyPatch
3. **Function tools**: Any Python function via `@function_tool`
4. **Agents as tools**: Sub-agents return results to orchestrator
5. **Experimental**: Codex tool

#### Provider Support

**Not locked to OpenAI** despite the name:
- 100+ models via LiteLLM integration (`pip install "openai-agents[litellm]"`)
- Any OpenAI-compatible endpoint via `set_default_openai_client()`
- Per-agent model selection (mix Anthropic and OpenAI in same workflow)

**Caveats**: Hosted tools (WebSearch, FileSearch, CodeInterpreter) are OpenAI-only. Some providers lack structured output support.

#### Multi-Agent Patterns

Two primary patterns:
1. **Manager/Orchestrator** (agents as tools): Centralized control, sub-agents run as tool calls
2. **Handoffs** (peer delegation): Decentralized, agent transfers full conversation control

Supports LLM-driven, code-driven, and hybrid orchestration.

#### Extensibility

- **Custom tools**: Yes, `@function_tool` decorator, full schema auto-generation
- **Custom providers**: Yes, via LiteLLM, custom clients, or Model implementations
- **Guardrails**: 3 types (input, output, tool) with tripwire mechanism
- **Tracing**: Built-in, 25+ external integrations (W&B, Arize, MLflow, LangSmith, etc.)
- **Replace orchestrator**: Partially. Can subclass Runner but not fundamentally replace the loop.
- **Replace context/memory**: No. Sessions provided but not replaceable architecture.

#### Strengths
- Simplest to learn (3 primitives, Python-first design)
- Provider-agnostic despite being OpenAI-branded
- Excellent tracing with 25+ integrations
- Built-in voice/realtime agent support
- Most mature of the four (11 months old)
- Durable workflow integrations (Temporal, Restate, DBOS)

#### Weaknesses
- Not great for complex orchestration (developers report hitting walls)
- GPT models are not the best tool-callers (per multiple practitioners)
- Hosted tools locked to OpenAI
- Limited tooling compared to more mature frameworks like LangGraph

---

### 1.3 Anthropic Claude Agent SDK

**What it is**: Anthropic's official framework that exposes the Claude Code CLI's full agentic capabilities -- including file operations, shell commands, web search, and context management -- as a programmable library.

**Released**: September 29, 2025 (alongside Claude Sonnet 4.5)
**Stars**: ~4,700 | **License**: MIT | **Status**: Alpha (v0.1.35)

#### Architecture

```
Your Application (Python/TypeScript)
       |
  Public API (query(), ClaudeSDKClient)
       | stdin/stdout JSON protocol
  Claude Code CLI (subprocess, bundled binary ~55-72MB)
       |
  Anthropic API / Bedrock / Vertex AI / Azure Foundry
```

Like the Copilot SDK, this wraps a CLI binary as a subprocess. The agent loop, tool execution, and API calls all happen inside the Claude Code binary. The SDK communicates via a bidirectional JSON protocol over stdin/stdout.

#### Key Components

| Component | Description |
|---|---|
| `query()` | Simple async generator for one-shot tasks |
| `ClaudeSDKClient` | Context manager for bidirectional, multi-turn conversations |
| `@tool` decorator | Custom tools as in-process MCP servers |
| `ClaudeAgentOptions` | Configuration (system prompt, allowed tools, permissions, model, hooks) |
| `AgentDefinition` | Subagent definitions with isolated contexts |

#### Built-in Tools (from Claude Code)

The richest out-of-the-box tool set of any SDK:
- File operations: Read, Write, Edit, Glob, Grep
- Shell: Bash
- Web: WebFetch, WebSearch
- Code: Task (subagent spawning)
- Memory, ToolSearch, text editor, computer use

#### Provider Lock-in

**Locked to Claude models only.** Cannot use OpenAI, Gemini, Llama, or any non-Claude model.

Supports 4 hosting providers for Claude:
- Anthropic API (direct)
- Amazon Bedrock
- Google Vertex AI
- Microsoft Azure AI Foundry

#### Multi-Agent: Subagents

- Context isolation per subagent
- Parallelization support
- Specialized instructions and tools per subagent
- Model override per subagent (Sonnet, Opus, Haiku)
- **Single level of nesting only** (subagents cannot spawn subagents)

#### Extensibility

- **Custom tools**: Yes, via in-process MCP servers (`@tool` decorator)
- **Custom providers**: No. Claude only.
- **Hooks**: Comprehensive lifecycle hooks (more in TypeScript than Python)
- **Permission system**: Coarse-grained modes + fine-grained `can_use_tool` callback
- **Replace orchestrator**: No. Loop is in the CLI binary.
- **Replace context**: No. Managed by CLI.
- **Session forking**: Yes -- branch conversations to explore alternatives

#### Strengths
- Battle-tested (evolved from Claude Code, production since early 2025)
- Richest built-in tool set (file I/O, shell, web, code editing out of box)
- Claude models are the best tool-callers (industry consensus)
- Session forking for branching conversations
- Cost tracking (`total_cost_usd` in ResultMessage)
- Automatic context compaction for long-running agents

#### Weaknesses
- Hard vendor lock-in (Claude models only)
- Heavy package (55-72MB, bundled CLI binary)
- Subprocess architecture adds latency (~12s per query reported)
- Python hooks have fewer events than TypeScript version
- Alpha maturity
- Single-level subagent nesting only

---

### 1.4 Google: Gemini CLI + ADK + Antigravity

Google's agent ecosystem spans three interconnected products at different abstraction levels. The primary SDK-level product is ADK; Gemini CLI is the open-source terminal agent (Google's equivalent of Claude Code); Antigravity is the agentic IDE.

#### 1.4a Google ADK (Agent Development Kit)

**What it is**: An open-source, code-first Python framework for building, evaluating, and deploying sophisticated AI agents and multi-agent systems. Powers Google Agentspace and Customer Engagement Suite (CES) internally.

**Released**: April 9, 2025 (Google Cloud NEXT 2025)
**Stars**: ~6,500 (adk-python) | **License**: Apache 2.0 | **Status**: Production (v0.5.0+)

##### Architecture

```
Your Application (Python / TypeScript / Go / Java)
       |
  ADK Framework (LlmAgent / WorkflowAgent / CustomAgent)
       | Direct API calls
  LLM (Gemini/Vertex AI native, Claude/100+ via LiteLLM)
       |
  Tools (Function / MCP / OpenAPI / Google Search / Code Exec)
```

No subprocess. No binary. The orchestration loop lives in code you own. Four official language SDKs.

##### Five Agent Types

| Type | Behavior |
|---|---|
| `LlmAgent` | LLM-driven; uses tools and auto-transfers to sub-agents by description |
| `SequentialAgent` | Runs sub-agents one at a time in order (deterministic pipeline) |
| `LoopAgent` | Repeats until condition met (convergence / iteration) |
| `ParallelAgent` | Runs sub-agents concurrently |
| `CustomAgent` | Full programmatic control of execution |

##### Agent Loop (LlmAgent -- transparent, in Python)
1. Receive task; call LLM with instructions, tools, and context
2. LLM returns: final response, tool call(s), or agent transfer request
3. If tool call -> execute, append results, re-call LLM
4. If agent transfer -> delegate to matching sub-agent by description match
5. If final response -> return to caller
6. Callbacks fire before/after each phase (6 callback types)

##### Provider Support (Model-Agnostic)
- **Native**: Gemini (all generations via Google AI Studio or Vertex AI)
- **100+ models**: LiteLLM integration (Anthropic, Meta, Mistral, AI21, and more)
- **Vertex AI Model Garden**: Claude, Llama, Gemma, and others
- **Self-hosted**: Ollama, vLLM
- **Multi-provider in one workflow**: Yes -- different agents in the same hierarchy can use different models
- Optimized for Gemini + Vertex AI but no hard lock-in at framework level

##### Callbacks (Python functions)

| Callback | When It Fires |
|---|---|
| `before_agent` | Before agent starts execution |
| `after_agent` | After agent finishes |
| `before_model` | Before LLM API call (can modify prompt) |
| `after_model` | After LLM API response |
| `before_tool` | Before tool execution |
| `after_tool` | After tool returns result |

Typed Python functions with full IDE support. Return modified content or None (pass-through).

##### Multi-Agent Architecture
- **Hierarchical**: `sub_agents=[...]` defines relationships; LLM auto-routes by agent descriptions
- **Description-driven delegation**: No code routing required -- LLM matches task to description
- **Agents as tools**: Any agent callable from the tool slot of another agent
- **Unlimited nesting depth** (unlike Claude Agent SDK's single level)
- **A2A Protocol** (April 2025): Open Agent2Agent protocol for cross-framework agent communication

##### Tools
- Function tools (Python function + docstring = auto-generated schema)
- MCP servers (full integration), OpenAPI tools (auto-generate from spec)
- Google Search grounding + Vertex AI Search, Code Execution (sandboxed)
- LangChain and LlamaIndex tool integration

##### Sessions & Memory
- Session state with rewind and migrate, persistent memory (cross-session)
- Artifacts: structured files/data produced and consumed by agents
- Events system, Plugins system

##### Deployment
- **Vertex AI Agent Engine**: Fully managed, auto-scaling (production-recommended)
- Cloud Run, GKE, Docker (any container runtime)
- Built-in evaluation: `AgentEvaluator`, trajectory + response quality testing

##### Strengths
- Genuine multi-language support (Python, TypeScript, Go, Java)
- Model-agnostic architecture (100+ models via LiteLLM)
- Multi-agent as a first-class design principle
- A2A Protocol for cross-framework agent interop
- Bidirectional streaming (audio + video)
- Comprehensive deployment path to Vertex AI Agent Engine
- Battle-tested internally (powers Google Agentspace and CES)
- Built-in evaluation framework

##### Weaknesses
- Gemini-optimized: Vertex AI Agent Engine natively supports Gemini only
- No declarative workflow YAML (all code; no recipe layer)
- TypeScript/Go/Java have partial feature parity vs Python
- A2A protocol adoption still early
- Fewer community tutorials vs OpenAI Agents SDK
- `CustomAgent` required for full orchestrator control (not pluggable by design)

---

#### 1.4b Gemini CLI (context: Google's terminal-layer agent)

**What it is**: Google's open-source terminal AI agent -- the equivalent of Claude Code or the Copilot CLI, but fully open-source.

**Released**: June 25, 2025
**Stars**: ~95,100 | **License**: Apache 2.0 | **Status**: Production

```
User Prompt
     |
Gemini CLI (TypeScript, open-source -- inspectable ReAct loop)
     | Direct HTTPS
Google Gemini API (2.5 Pro / Gemini 3)
     |
Built-in Tools + MCP + Extensions
```

**Key distinction**: Unlike Copilot CLI and Claude Code (both closed-source binaries), Gemini CLI's agent loop is open-source and inspectable. However, it is locked to Gemini models.

**Hooks** (v0.26.0+, Jan 2026): `BeforeTool`, `AfterTool`, `AfterAgent` -- implemented as external shell scripts. The `systemMessage` field in hook responses injects context directly into the agent conversation (equivalent to Amplifier's `inject_context`).

**Extensions** (Oct 2025): Package prompts, MCP servers, commands, themes, hooks, sub-agents, and agent skills into installable units.

**Limitation**: Locked to Gemini models only. No Python library API -- TypeScript/Node.js only.

---

#### 1.4c Antigravity (context: Google's agentic IDE)

**What it is**: An agent-first IDE (VS Code fork) launched November 2025 with two surfaces -- traditional Editor View and a Manager Surface for orchestrating multiple async agents. Supports Gemini 3 Pro, Claude Sonnet 4.5, and OpenAI GPT-OSS. **Not an SDK** -- cannot be embedded in your application.

---

## Part 2: Cross-SDK Comparison

### 2.1 Architecture Comparison

| Dimension | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **Runtime** | CLI subprocess | Python library | CLI subprocess | Python library | Python library + modules |
| **Agent loop location** | Inside binary (opaque) | In Runner class (transparent) | Inside binary (opaque) | In Python code (transparent) | Replaceable module (transparent) |
| **Binary dependency** | Yes (~55-60MB) | No | Yes (~55-72MB) | No | No |
| **Communication** | JSON-RPC | Direct function calls | stdin/stdout JSON | Direct function calls | Direct function calls |
| **Loop controllability** | Hooks only | Subclass Runner | Hooks only | Swap agent type / CustomAgent | Replace entire orchestrator |
| **Kernel size** | Unknown (closed binary) | ~5K lines (estimate) | Unknown (closed binary) | Full framework | ~2,600 lines (auditable) |

### 2.2 Provider & Model Support

| Dimension | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **Default provider** | GitHub Copilot | OpenAI | Anthropic | Gemini (Vertex AI) | None (you choose) |
| **Alternative providers** | BYOK (OpenAI, Anthropic, Ollama, etc.) | 100+ via LiteLLM | None (Claude only, 4 hosts) | 100+ via LiteLLM, Vertex AI Model Garden | 10 official + community |
| **Multi-provider in one session** | No (one per session) | Yes (per-agent) | No | Yes (per-agent in hierarchy) | Yes (simultaneous, with routing) |
| **Cost-aware routing** | No | No | No | No | Yes (hooks-scheduler-cost-aware) |
| **Provider as swappable module** | No | No | No | No | Yes |

### 2.3 Extensibility Deep Dive

| Capability | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **Custom tools** | Yes (JSON-RPC) | Yes (@function_tool) | Yes (MCP/@tool) | Yes (Python function) | Yes (Protocol class) |
| **Replace orchestrator** | No | Partially (subclass) | No | Partially (CustomAgent) | Yes (module) |
| **Custom hooks/middleware** | 6 event hooks | Guardrails (3 types) | Lifecycle hooks | 6 callbacks (before/after agent, model, tool) | 5-action composable hooks (11 built-in) |
| **Custom context/memory** | No | No | No | Yes (session state, memory, artifacts) | Yes (Protocol class) |
| **Custom providers** | BYOK config only | LiteLLM/custom client | No | LiteLLM/custom client | Protocol class (any) |
| **Context injection** | No | No | No | Via before_model callback | Yes (hooks inject into agent conversation) |
| **Approval gates** | No built-in | Human-in-the-loop | Permission callbacks | Action confirmations | Yes (hooks + recipes) |
| **Workflow orchestration** | No | Manual code | No | Yes (Sequential/Loop/Parallel agents, code-based) | Recipe system (YAML, loops, conditions, gates) |
| **Bundle/composition system** | No | No | No | No | Yes (composable bundles) |
| **Event system** | JSON-RPC events | Tracing system | Limited | Events + A2A Protocol | JSONL + hook control plane |

### 2.4 Multi-Agent Patterns

| Pattern | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **Agent delegation** | Custom agents (personas) | Handoffs (peer) + agents-as-tools | Subagents (context isolated) | Sub-agents (description-driven auto-transfer) | Session forking + tool-task + recipes |
| **Nesting depth** | Unclear | Unlimited handoff chains | 1 level only | Unlimited | Unlimited (configurable) |
| **Parallel agents** | No | Yes (asyncio.gather) | Yes (parallel subagents) | Yes (ParallelAgent) | Yes (parallel delegation) |
| **Workflow orchestration** | No | Manual code | No | Code-based (Sequential/Loop/Parallel agents) | Recipes (YAML, loops, conditions, gates) |
| **Context sharing** | Within session | Conversation history transfer | Isolated | Session state (parent-child) | Configurable (none/recent/all, scope control) |
| **Agent composition** | Config objects | Agent objects | AgentDefinition + .claude/ files | Agent objects + sub_agents list | Bundles (composable YAML + markdown) |
| **Cross-framework interop** | No | No | No | A2A Protocol | No (own protocol) |

### 2.5 Built-in Capabilities

| Capability | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| **File operations** | Via CLI tools | No built-in | Read, Write, Edit, Glob, Grep | No built-in (custom tools) | tool-filesystem |
| **Shell execution** | Via CLI tools | ShellTool/LocalShellTool | Bash | No built-in (custom tools) | tool-bash |
| **Web search/fetch** | Via CLI tools | WebSearchTool (OpenAI hosted) | WebFetch, WebSearch | Google Search grounding | tool-web |
| **Code search** | Via CLI tools | No | Grep, Glob | No built-in | tool-search (grep/glob) |
| **MCP support** | Native | Built-in | Native | Yes | tool-mcp |
| **Streaming** | Yes | Yes | Yes | Yes (bidirectional audio/video) | Yes (loop-streaming) |
| **Context compaction** | Yes (infinite sessions) | No built-in | Yes (automatic) | Yes (context compression) | Yes (context module) |
| **Tracing/observability** | JSON-RPC events | 25+ integrations | Limited | Google Cloud Logging + OpenTelemetry | JSONL + hooks |
| **Session persistence** | No | SQLite/SQLAlchemy | Yes (resume, fork) | Yes (rewind, migrate) | context-persistent |
| **Evaluation/testing** | No | No | No | Yes (AgentEvaluator, trajectories) | No built-in |
| **Todo/accountability** | No | No | No | No | tool-todo |
| **Skills/knowledge** | Copilot skills | No | Claude skills (.claude/) | ADK Skills | tool-skills |

---

## Part 3: Amplifier -- The Platform Difference

### 3.1 The Architectural Distinction

The four vendor SDKs share a common DNA: they expose **one vendor's agentic AI** as a programmable interface. They answer the question: "How do I use [vendor]'s agent in my application?"

Google ADK is the most architecturally sophisticated of the four -- genuinely model-agnostic, multi-language, with multiple agent type patterns and a real deployment story. Yet it still answers the same question: "How do I build with Google's agent framework?"

Amplifier answers a different question: "How do I build agentic AI systems from interchangeable components?"

```
Vendor SDKs:
  Your App --> [Vendor SDK] --> [Vendor's Agent Loop] --> [Vendor's API]
                                  (fixed or partially extensible)

Amplifier:
  Your App --> [Kernel] --> [Orchestrator Module] --> [Provider Module(s)]
                              (replaceable)            (replaceable, multiple)
                           --> [Tool Modules]        --> [Hook Modules]
                              (composable)              (composable)
                           --> [Context Module]
                              (replaceable)
```

### 3.2 The Five Module Types

Amplifier defines exactly 5 module types, each with a Protocol contract:

| Type | Contract | What It Controls | Vendor SDK Equivalent |
|---|---|---|---|
| **Provider** | `complete(request) -> response` | Which LLM answers | Fixed to vendor (or LiteLLM wrapper) |
| **Tool** | `execute(input) -> result` | What the AI can do | Custom tools |
| **Orchestrator** | `execute(prompt, context, ...)` | How the agent loop runs | Fixed (opaque, library, or typed classes) |
| **Hook** | `__call__(event, data) -> HookResult` | Observation and control | Callbacks / guardrails / event handlers |
| **Context** | `add/get/set_messages, compact` | How memory works | Fixed (managed, or session state) |

The key insight: in all four vendor SDKs, the orchestrator and context manager are **fixed or partially extensible**. In Amplifier, they're **modules you can replace**.

Google ADK is the closest competitor here: `CustomAgent` gives full control, and callbacks give six interception points. But ADK's orchestration classes are not pluggable modules with stable contracts -- they're framework primitives you subclass or replace entirely.

### 3.3 What "Mechanism, Not Policy" Means in Practice

The Amplifier kernel makes **zero decisions** about:
- Which LLM to use (Provider module decides)
- How the agent loop works (Orchestrator module decides)
- What tools are available (Tool modules decide)
- What gets logged or blocked (Hook modules decide)
- How memory works (Context module decides)

The kernel only provides:
- Module loading/unloading
- Session lifecycle (`initialize -> execute -> cleanup`)
- Event dispatch
- Hook registration and precedence resolution
- Stable Protocol contracts

**Litmus test**: "Could two teams want different behavior?" If yes, it's policy, so it's a module.

### 3.4 The Bundle System (No Vendor Equivalent)

Bundles are composable configuration packages that produce mount plans:

```
Bundle --> to_mount_plan() --> Mount Plan --> AmplifierSession
```

A bundle packages tools, providers, hooks, agents, instructions, context files, and spawn policies. Bundles compose via `includes:` with deterministic merge rules.

**The thin bundle pattern**: Most bundles inherit from foundation and add only unique capabilities. The recipes bundle is only 14 lines of YAML.

**Agents ARE bundles**: Same file format (markdown + YAML frontmatter), same `load_bundle()` function. Agents can override providers, tools, and instructions. When spawned, they compose with the parent's configuration.

No vendor SDK has anything equivalent to this composition system. Google ADK's closest concept is `sub_agents` lists -- but these require code, not declarative YAML composition.

### 3.5 The Recipe System (No Vendor Equivalent)

Recipes are declarative YAML workflows for multi-step agent orchestration:

| Feature | Description |
|---|---|
| Sequential steps | Execute in order with context accumulation |
| foreach loops | Iterate over lists (with parallel option) |
| while/convergence | Iterate until condition met |
| Conditional execution | Skip steps based on context |
| Approval gates | Pause for human approval between stages |
| Error handling | Continue, retry with backoff, timeouts |
| Checkpointing | Auto-checkpoint for resumability |
| Sub-recipes | Recipes invoke other recipes |

Google ADK has `SequentialAgent`, `LoopAgent`, and `ParallelAgent` -- code-based workflow patterns. These are powerful but require Python, version control, and testing like any code. Amplifier's recipe system is declarative YAML that non-engineers can read, modify, and compose. None of the four vendor SDKs have built-in human approval gates with resumability.

### 3.6 The Hook System (Beyond Callbacks)

Amplifier's hooks are a full **control plane**, not just interception:

| Action | Type | What It Does | Vendor Equivalent |
|---|---|---|---|
| `deny` | Blocking | Short-circuit, block operation | Guardrail tripwire (OpenAI) |
| `ask_user` | Blocking | Interactive approval with options | Permission callback (Claude) |
| `inject_context` | Non-blocking | Add feedback to agent conversation | systemMessage in Gemini CLI hooks |
| `modify` | Non-blocking | Transform event data in-flight | before_model callback (ADK) |
| `continue` | Non-blocking | Pass-through | Default |

The `inject_context` action is unique in the SDK space: hooks can automatically inject linter errors, validation results, or status information directly into the agent's conversation. Gemini CLI's `systemMessage` in BeforeTool hooks is the closest analog, but it operates only at tool boundaries, not at arbitrary lifecycle events.

Multiple hooks compose with deterministic precedence (blocking always wins).

### 3.7 Provider Agnosticism at the Kernel Level

| Capability | Amplifier | Google ADK | OpenAI Agents |
|---|---|---|---|
| Providers as modules | Yes (10 official + community) | No (LiteLLM integration) | No (LiteLLM integration) |
| Multiple providers simultaneously | Yes (with routing) | Yes (per-agent in hierarchy) | Yes (per-agent) |
| Cost-aware routing between providers | Yes (hooks-scheduler-cost-aware) | No | No |
| Provider glob matching for delegation | Yes (`claude-haiku-*`) | No | No |
| Write your own provider | Yes (implement Protocol) | Partially (LiteLLM custom) | Partially |
| Zero provider assumption in kernel | Yes | No (Gemini-optimized) | No (OpenAI-named) |

---

## Part 4: Industry & Developer Sentiment

### 4.1 The "Do You Even Need a Framework?" Counter-Narrative

The loudest theme in the developer community. Armin Ronacher (Flask creator, Sentry CTO, November 2025):

> "At this point we would not make that choice again [using a higher-level SDK]. The differences between models are significant enough that you will need to build your own agent abstraction."

This counter-narrative actually supports Amplifier's approach: if the right abstraction hasn't been found, you need a system where you can build, swap, and compose your own abstractions. That's what the module system enables.

### 4.2 Per-SDK Developer Sentiment

**GitHub Copilot SDK**:
- Praised: GitHub ecosystem integration, BYOK support, 4 language SDKs
- Criticized: Vendor lock-in, management-driven adoption, too new for trust
- Position: Platform play for Microsoft enterprise ecosystem

**OpenAI Agents SDK**:
- Praised: Simplicity, low barrier, provider-agnostic (surprisingly), clean handoffs
- Criticized: Not great for complex orchestration, GPT not best for agentic loops
- Position: Solid starting point, outgrown quickly by advanced users

**Claude Agent SDK**:
- Praised: Battle-tested heritage, best tool-calling models, rich built-in tools, MCP
- Criticized: Subprocess wrapper, latency, Claude-only, fewer production case studies
- Position: Most production-mature of the three subprocess SDKs

**Google ADK**:
- Praised: Genuine model-agnosticism (100+ via LiteLLM), multi-language, multi-agent by design, A2A Protocol, deployment story to Vertex AI Agent Engine
- Criticized: Gemini-optimized in practice despite framework flexibility; no declarative workflow layer; Python callback API less discoverable than OpenAI's 3 primitives
- Position: The most architecturally serious of the four vendor SDKs; production-ready with enterprise deployment story

**Gemini CLI**:
- Praised: Open-source loop (inspectable, no closed binary), 95k stars, generous free tier with 1M context window, hooks + extensions ecosystem emerging
- Criticized: Hard-locked to Gemini models; shell-script hooks lack type safety; subagents still experimental
- Position: Google's Claude Code; fastest-growing terminal AI agent by GitHub stars

### 4.3 Key Industry Themes

1. **Claude models win the agentic loop**: Remarkable consensus that Sonnet/Haiku are the best tool-callers. Even GitHub's own Copilot coding agent uses Claude 3.7 Sonnet under the hood.

2. **Vendor lock-in is the primary strategic concern**: Every comparison surfaces this. MCP and open protocols are seen as the escape valve. Google ADK's LiteLLM integration reduces this concern.

3. **The "right abstraction" hasn't been found yet**: Every SDK's abstractions reportedly break under real-world conditions. Testing and evals called "the hardest problem."

4. **Google has the most distributed agent strategy**: Three products at three layers (CLI, SDK, IDE), with open protocols (A2A) suggesting a platform play rather than a single product bet.

5. **Framework landscape is fragmenting, not consolidating**: As of early 2026: OpenAI Agents, Claude Agent SDK, Copilot SDK, Google ADK, LangGraph, PydanticAI, Microsoft Agent Framework, CrewAI, AutoGen, Semantic Kernel, SmolAgents, Strands Agents, and more. No clear consensus emerging.

### 4.4 Practitioner Decision Framework

| Need | Industry Recommendation |
|---|---| 
| Quick multi-agent prototype | OpenAI Agents SDK |
| Production single-agent (code/files) | Claude Agent SDK |
| Complex workflows with HITL | LangGraph |
| Microsoft/GitHub enterprise | GitHub Copilot SDK |
| Multi-language agent SDK, Google Cloud deploy | Google ADK |
| Free open-source terminal agent, huge community | Gemini CLI |
| Maximum control, no lock-in | Raw provider SDKs directly |
| Composable platform for AI systems | **Amplifier** |

---

## Part 5: The Verdict

### Where Vendor SDKs Win

- **Time to first agent**: If you just need to embed one vendor's agent in your app, their SDK is the fastest path. `pip install`, configure, go.
- **Optimization**: Vendor SDKs can deeply optimize for their specific model's strengths.
- **Built-in capabilities**: Claude Agent SDK's rich tool set (file I/O, shell, web) works immediately. ADK has a full deployment story to managed infrastructure.
- **Vendor investment**: Massive engineering teams behind each SDK. ADK is battle-tested inside Google.
- **Multi-agent patterns**: Google ADK's five agent types (Sequential, Loop, Parallel, LLM, Custom) offer the most expressive code-based multi-agent orchestration of the four.
- **Language breadth**: Copilot SDK (Go, .NET) and ADK (Python, TypeScript, Go, Java) cover more runtime environments.
- **Evaluation**: ADK's built-in `AgentEvaluator` is uniquely useful for systematic agent quality testing.

### Where Amplifier Wins

- **No vendor lock-in**: Use any provider. Use multiple simultaneously. Switch without code changes.
- **Replaceable orchestrator**: The only system where you can fundamentally change how the agent loop works -- not just switch between pre-built types, but replace the loop itself.
- **Composable architecture**: Bundles, behaviors, and the thin bundle pattern enable systematic reuse. No vendor SDK has a composition system.
- **Workflow orchestration**: The recipe system (declarative YAML, approval gates, resumability) has no equivalent in any vendor SDK. ADK's agent types are the closest but remain imperative code.
- **Control plane**: Hooks that don't just observe but block, modify, inject, and approve -- composably. ADK's callbacks come closest but lack the `inject_context` action and composable precedence rules.
- **Custom memory**: Context is a replaceable module, not a fixed implementation.
- **Multi-agent depth**: Kernel-level session forking + app-layer delegation + declarative recipes.
- **Philosophy alignment**: When the industry says "the right abstraction hasn't been found," Amplifier's answer is: that's why the abstraction layer is replaceable.

### The Fundamental Distinction

Vendor SDKs give you **access to one vendor's agentic AI ecosystem**.
Amplifier gives you **a kernel for building agentic AI systems** from interchangeable components.

Google ADK is the most sophisticated vendor SDK in this comparison -- genuinely multi-language, model-agnostic in design, and multi-agent by default. But it remains a framework: a set of well-designed classes and patterns you build within. The orchestration layer is framework code, not modules with stable contracts.

Amplifier is a platform -- a thin, stable kernel where the orchestrator, providers, tools, hooks, context, and composition system are all modules you control.

**The center stays still so the edges can move fast.**

---

## Appendix A: Quick Reference

### Installation

```bash
# Copilot SDK
pip install github-copilot-sdk          # Python (~55-60MB, bundles CLI)
npm install @github/copilot-sdk         # TypeScript

# OpenAI Agents SDK
pip install openai-agents               # Python (lightweight)
pip install "openai-agents[litellm]"    # With multi-provider support

# Claude Agent SDK
pip install claude-agent-sdk            # Python (~55-72MB, bundles CLI)
npm install @anthropic-ai/claude-agent-sdk  # TypeScript

# Google ADK
pip install google-adk                  # Python (lightweight)
npm install @google/adk                 # TypeScript

# Gemini CLI (terminal agent, not an embeddable SDK)
npm install -g @google/gemini-cli       # Node.js CLI

# Amplifier
uv tool install amplifier               # CLI + kernel + module system
```

### Maturity Timeline

| SDK | First Release | Current Version | Status | Stars |
|---|---|---|---|---|
| Google ADK | Apr 2025 | v0.5.0+ | Production | ~6,500 |
| OpenAI Agents | Mar 2025 | v1.x | Production | ~18,900 |
| Gemini CLI | Jun 2025 | v0.26.0+ | Production | ~95,100 |
| Claude Agent SDK | Sep 2025 | v0.1.35 | Alpha | ~4,700 |
| Copilot SDK | Jan 2026 | v0.1.23 | Alpha | ~7,000 |
| Amplifier | 2024 | Production | Production | -- |

### Language Support

| Language | Copilot SDK | OpenAI Agents | Claude Agent SDK | Google ADK | Amplifier |
|---|---|---|---|---|---|
| Python | Official | Official | Official | Official | Official |
| TypeScript | Official | Official | Official | Official | -- |
| Go | Official | -- | -- | Official | -- |
| .NET | Official | -- | -- | -- | -- |
| Java | -- | -- | -- | Official | -- |
| Community | Java, Rust, C++, Clojure | -- | -- | -- | -- |

### Hook / Callback Events

| SDK | Lifecycle Events |
|---|---|
| Copilot SDK | 6: pre/post tool use, prompt, session start/end, error |
| OpenAI Agents | 3 guardrail types (input, output, tool) |
| Claude Agent SDK | PreToolUse, PostToolUse, UserPromptSubmit, Stop, SubagentStart/Stop, PreCompact |
| Google ADK | 6 callbacks: before/after agent, model, tool |
| Gemini CLI | 3 hooks: BeforeTool, AfterTool, AfterAgent (shell scripts) |
| Amplifier | 5 actions × 11+ events: deny, ask_user, inject_context, modify, continue |

---

## Appendix B: Sources

### Official Documentation
- GitHub Copilot SDK: https://github.com/github/copilot-sdk
- OpenAI Agents SDK: https://openai.github.io/openai-agents-python/
- Claude Agent SDK: https://platform.claude.com/docs/en/agent-sdk/overview
- Google ADK: https://google.github.io/adk-docs/
- Google ADK GitHub: https://github.com/google/adk-python
- Gemini CLI: https://github.com/google-gemini/gemini-cli
- Gemini CLI docs: https://geminicli.com/docs/
- Antigravity: https://antigravity.google/
- Amplifier: https://github.com/microsoft/amplifier

### Google Product Announcements
- Gemini CLI launch (Jun 25, 2025): https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/
- ADK announcement (Apr 9, 2025): https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/
- Gemini CLI hooks (Jan 28, 2026): https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/
- Antigravity (Nov 20, 2025): https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
- Conductor update (Feb 13, 2026): https://developers.googleblog.com/ (Conductor: Introducing Automated Reviews)

### Key Developer Analysis
- Armin Ronacher, "Agent Design Is Still Hard" (Nov 2025): https://lucumr.pocoo.org/2025/11/21/agents-are-hard/
- Enhancial Substack, AI Framework Comparison: https://enhancial.substack.com/p/choosing-the-right-ai-framework-a
- Victor Dibia, Multi-Framework Benchmark: https://newsletter.victordibia.com/p/autogen-vs-crewai-vs-langgraph-vs
- iKala Gemini CLI analysis: https://ikala.ai/blog/ai-trends/google-gemini-cli-in-depth-analysis-the-ai-agent-ecosystem-war-for-the-developer-terminal/

### Community Discussions
- HN: "Anyone using Claude Agent SDK in production?": https://news.ycombinator.com/item?id=46679473
- HN: "GitHub Copilot Coding Agent" (564 pts): https://news.ycombinator.com/item?id=44031432
- HN: "Coding agents have replaced every framework" (371 pts): https://news.ycombinator.com/item?id=46923543
