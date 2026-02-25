# Developer Pitch: Three Needs (v4)

> **Purpose**: The developer-facing story for withamplifier.com.
> Three screens. Each one earns the next click.
> Audience: Engineers who are already building with AI and feeling the friction.
>
> **The arc**:
> 1. Three needs you already feel -- named in your language, not ours
> 2. An architecture built around those three needs
> 3. Three doors into making it yours -- go as deep as you want
>
> **Evolution from prior versions**:
> - v2: Five pain points (provider lock-in, opaque loops, weak hooks,
>   no workflows, nothing composes). Thorough but too many to hold.
> - v3: Two structural walls (orchestration + memory). Architecturally
>   precise but framed from our perspective, not the developer's.
> - v4: Three felt needs (portability, control, composability). Ordered
>   by when developers hit them. Led by their experience, not our
>   architecture. The architecture is the answer, not the headline.
>
> **Source material**: Comparative architecture analysis of Claude Agent SDK,
> Gemini CLI, MS Agent Framework, OpenAI Agents SDK, Google ADK, and Amplifier.
> Source-code verification of all Amplifier claims. External citations from
> Docker State of Agentic AI Report, Ronacher (Flask/Sentry), GitHub Copilot
> agent decisions, Stack Overflow / Mozilla.ai on enterprise lock-in concerns.

---

## Slide 1: Three Needs

*Goal: Name the friction they already feel. Not architectural
observations -- felt experiences. Ordered by when a developer
hits each one: portability first (you picked a framework, the
landscape shifted), control next (you need production behavior,
the loop won't let you), composability last (you built something
good, you can't scale it to the team). They stay or leave in
10 seconds based on whether they recognize themselves.*

---

### Headline

**You need three things from your AI framework. No one gives you all three.**

### Body

You picked a framework. It got you to a demo fast. Then the model
landscape shifted, or you needed production-grade behavior, or your
teammate asked how to reuse your setup. And you found that the
framework had opinions about things you needed to own.

These aren't edge cases. They're the three needs that every
developer building with AI agents hits -- in this order.

---

### 1. Portability

**The model you chose isn't the model you need.**

You built on one SDK. Then a different model turned out to be
significantly better for your use case. This isn't hypothetical --
the model landscape shifts quarterly. GitHub chose Claude Sonnet
as the base model for its Copilot coding agent -- not a Microsoft
model [1]. Armin Ronacher (Flask creator, Sentry CTO) put it
directly: "I think Haiku and Sonnet are still the best tool
callers available" [2]. Tomorrow it might be Gemini or a
fine-tuned Llama.

Switching means rewriting your agent logic, your tool interfaces,
your error handling. Not because the *problem* changed, but because
the *framework* assumed your provider was permanent.

The lock-in varies, but it's structural everywhere:

| SDK | What switching costs |
|-----|---------------------|
| Claude Agent SDK | Everything. Locked to Claude models. Four hosting providers for Claude (Anthropic API, Bedrock, Vertex, Foundry) but no non-Claude models [3]. |
| Gemini CLI | Everything. Locked to Gemini models. No multi-provider support [4]. |
| Copilot SDK | Soft lock. BYOK supported (OpenAI, Anthropic, Ollama) but requires the closed-source Copilot CLI binary as runtime [5]. |
| OpenAI Agents SDK | Low at framework level -- 100+ models via LiteLLM [6]. But hosted tools (WebSearch, FileSearch, CodeInterpreter) are OpenAI-only [7]. |
| Google ADK | Low at framework level -- LiteLLM integration [8]. But Vertex AI Agent Engine (managed deploy) auto-recognizes only Gemini natively [9]. |

Developer surveys confirm this matters: 76% of developers report
active concerns about vendor lock-in. In France it's 88%, Japan
83%, UK 82% [10]. The best model for any given task changes
quarterly. If your architecture encodes a provider choice as a
structural dependency, every model improvement in the industry is
a rewrite for you.

> **References (web-verified 2026-02-20):**
> [1] GitHub chose Claude Sonnet as base model for Copilot coding agent. Launched with Claude 3.7 Sonnet at Microsoft Build (May 2025), evolved to Claude Sonnet 4.6 GA (Feb 2026). GitHub CEO Thomas Dohmke confirmed. Nuance: Copilot is multi-model (GPT-4.1 for general chat); the *coding agent specifically* uses Claude. -- GitHub Changelog, TechHQ, Under the Hood blog
> [2] Armin Ronacher, "Agent Design Is Still Hard" (Nov 21, 2025). Exact quote verified. -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/
> [3] Claude Agent SDK: model selection restricted to `'sonnet' | 'opus' | 'haiku' | 'inherit'`. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [4] Gemini CLI: `/model` command shows only Gemini variants. Docs: communicates with "the Gemini API and its AI models." -- https://geminicli.com/docs/cli/model/
> [5] Copilot SDK: PyPI states "Python SDK for programmatic control of GitHub Copilot CLI via JSON-RPC." CLI binary required. -- https://pypi.org/project/github-copilot-sdk/
> [6] OpenAI Agents SDK: "provider-agnostic, supporting... 100+ other LLMs." LiteLLM optional extra. -- https://github.com/openai/openai-agents-python
> [7] OpenAI Agents SDK: Hosted tools require OpenAIResponsesModel specifically. -- https://openai.github.io/openai-agents-python/tools/
> [8] Google ADK: "LiteLLM acts as a consistent interface to over 100 different LLMs." -- https://google.github.io/adk-docs/tutorials/agent-team/
> [9] Google ADK: Vertex AI Agent Engine auto-recognizes Gemini natively. Others require explicit registration or LiteLLM wrappers. -- https://google.github.io/adk-docs/agents/models/vertex/
> [10] Docker "State of Agentic AI Report" (Feb 20, 2026, n=800+): "76% of global respondents report active concerns about vendor lock-in." -- https://www.docker.com/blog/state-of-agentic-ai-key-findings/

---

### 2. Control

**You can see what's happening. You can't change it.**

Your framework gives you an agent loop: prompt the model, get tool
calls, execute them, feed results back. It works -- until you need
the agent to pause and ask for human approval, or consult a second
model for verification, or plan before executing, or handle long
conversations differently than silent truncation.

The level of control varies, but the pattern is consistent --
the two most important behaviors (how the agent reasons and what
it remembers) are the two you control the least:

**The agent loop.** In every major framework, the execution loop
is sealed infrastructure:

| SDK | What you see | What you can change |
|-----|-------------|---------------------|
| Copilot SDK | Opaque. Closed-source binary (~55-60MB) [11]. | 6 lifecycle hooks. Cannot replace the loop [12]. |
| Claude Agent SDK | Opaque. CLI binary as subprocess [13]. | Hooks (PreToolUse, PostToolUse, etc.). Cannot replace orchestration [14]. |
| OpenAI Agents SDK | Transparent. Python `Runner` class [15]. | Configurable via `RunConfig`. Core loop logic is fixed [16]. |
| Google ADK | Transparent. Five agent types [17]. | `CustomAgent` gives programmatic control via subclassing [18]. Closest to replaceable -- but framework classes, not swappable modules. |
| Gemini CLI | Transparent. Open-source TypeScript [19]. | 12 hook event types [20]. Readable but not replaceable without forking. |

The agent loop is where the decisions happen. It's the most
important part of an AI system. Ronacher captured it:
"SDK abstractions break once you hit real tool use" [21].

**The memory.** How the system decides what the model remembers and
what it forgets. Every framework bakes in one strategy and gives
you no way to change it. Need summarization instead of truncation?
RAG-backed retrieval? Compliance-aware retention? The memory
strategy is an internal implementation detail you can't access.

**The lifecycle.** Every framework gives you some form of hooks or
callbacks. But there's a spectrum from "observe and log" to
"intercept and control" -- and most frameworks cluster on the
observation end:

| SDK | Can block operations? | Can modify in-flight? | Can inject into agent's reasoning? |
|-----|:--------------------:|:--------------------:|:---------------------------------:|
| Copilot SDK | Yes (pre-tool) | Limited | No |
| Claude Agent SDK | Yes (permissions) | Limited | No |
| OpenAI Agents SDK | Yes (tripwire halts) | No | No |
| Google ADK | Yes (callbacks) | Yes (callbacks) | Partial (before_model only) |
| Gemini CLI | Yes (deny decision) | No | Partial (systemMessage) |

The gap between "I can see that a tool was called" and "I can feed
the linter results back into the conversation so the agent fixes
its own mistakes" is the gap between monitoring and a control plane.
Most frameworks give you monitoring.

> **References (web-verified 2026-02-20):**
> [11] Copilot SDK: PyPI wheels 51.6-61.0 MB. No source distributions -- binary wheels only. -- https://pypi.org/project/github-copilot-sdk/#files
> [12] Copilot SDK: SDK wrappers MIT; CLI binary proprietary. Issue #248 confirms. -- https://github.com/github/copilot-sdk/issues/248
> [13] Claude Agent SDK: PyPI wheels 55.2-72.9 MB. Source tarball 61.6 KB. -- https://pypi.org/project/claude-agent-sdk/#files
> [14] Claude Agent SDK: "The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code." -- https://platform.claude.com/docs/en/agent-sdk/overview
> [15] OpenAI Agents SDK: `Runner` with `run()`, `run_sync()`, `run_streamed()`. Source at `src/agents/run.py`. -- https://openai.github.io/openai-agents-python/running_agents/
> [16] OpenAI Agents SDK: Runner uses static methods. Core loop fixed. -- https://openai.github.io/openai-agents-python/running_agents/
> [17] Google ADK: LLM Agents, Workflow Agents (Sequential, Parallel, Loop), Custom Agents. -- https://google.github.io/adk-docs/agents/
> [18] Google ADK: Custom agents: full programmatic control via BaseAgent inheritance. -- https://google.github.io/adk-docs/agents/custom-agents/
> [19] Gemini CLI: Open-source TypeScript, Apache 2.0. ~95,100 stars. -- https://github.com/google-gemini/gemini-cli
> [20] Gemini CLI: 12 hook event types as external shell scripts. -- https://geminicli.com/docs/hooks/
> [21] Ronacher: "SDK abstractions break once you hit real tool use." -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/

---

### 3. Composability

**What you build doesn't travel.**

You figured out a great setup: the right model, the right tools,
the right system prompt, a custom hook that enforces your team's
standards. Your teammate wants the same setup but with a different
model and an extra tool for their frontend work.

How do you share it? Copy the config. Manually edit it. Keep two
copies in sync. There's no inheritance. No override semantics. No
way to say "start from this setup, add this tool, swap that
provider."

| SDK | Share a setup | Extend someone else's |
|-----|:------------:|:--------------------:|
| Copilot SDK | No standard mechanism [22] | No |
| Claude Agent SDK | `.claude/` project files [23] | No inheritance [24] |
| OpenAI Agents SDK | Python code [25] | No composition system [26] |
| Google ADK | Python code + sub_agents [27] | Hierarchy, but requires code [28] |
| Gemini CLI | Extensions (installable packages) [29] | Flat -- no nesting or inheritance [30] |

Gemini CLI's extension system is the closest to a real answer --
installable packages of prompts, tools, hooks, and skills with
one-command install [31]. But extensions are flat (no composition
of extensions from extensions) and locked to the Gemini ecosystem.

The framework landscape itself proves the problem. As of early
2026, developers choose between OpenAI Agents SDK, Claude Agent
SDK, Copilot SDK, Google ADK, LangGraph, PydanticAI, MS Agent
Framework, CrewAI, AutoGen, Semantic Kernel, SmolAgents, Strands
Agents -- with no clear consensus [32]. Each requires its own
configuration model. Nothing is portable between them.

Ronacher's assessment: "The differences between models are
significant enough that you will need to build your own agent
abstraction" [33]. But there's no shared substrate for those
custom abstractions to compose on top of.

Software engineering solved this decades ago with package managers,
imports, and dependency composition. AI development tooling hasn't
caught up.

> **References (web-verified 2026-02-20):**
> [22] Copilot SDK: No composition or packaging system in docs. -- https://pypi.org/project/github-copilot-sdk/
> [23] Claude Agent SDK: `.claude/` for project files; `AgentDefinition` for subagents. -- https://platform.claude.com/docs/en/agent-sdk/subagents
> [24] Claude Agent SDK: No composition or inheritance system. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [25] OpenAI Agents SDK: Agents are Python objects. -- https://openai.github.io/openai-agents-python/
> [26] OpenAI Agents SDK: No bundle/composition system. -- https://openai.github.io/openai-agents-python/
> [27] Google ADK: `sub_agents=[...]` hierarchy. -- https://google.github.io/adk-docs/agents/
> [28] Google ADK: Hierarchy is code-based. New experimental Agent Config (YAML, since v1.11.0) is flat, not composable. -- https://google.github.io/adk-docs/agents/config/
> [29] Gemini CLI: Extensions package prompts, MCP servers, hooks, skills. One-command install. -- https://google-gemini.github.io/gemini-cli/docs/extensions/
> [30] Gemini CLI: Extensions are flat -- no nesting or inheritance. -- https://google-gemini.github.io/gemini-cli/docs/extensions/
> [31] Gemini CLI: `gemini extensions install https://github.com/...` -- https://google-gemini.github.io/gemini-cli/docs/extensions/
> [32] Langfuse comparison (updated through 2026) lists 12+ frameworks. LinkedIn: "a proliferation of agent SDKs... eerily like the Javascript framework wars of the 2010s." -- https://langfuse.com/blog/2025-03-19-ai-agent-comparison
> [33] Ronacher: "The differences between models are significant enough that you will need to build your own agent abstraction. We have not found any of the solutions from these SDKs that build the right abstraction." -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/

---

### Transition

Three needs. Portability, because the model landscape moves faster
than your framework. Control, because the most important behaviors
are the ones you own the least. Composability, because what you
build should travel.

*What if the architecture was built around all three?*

[Next: How Amplifier works -->]

---

## Slide 2: The Architecture

*Goal: Show how one architecture answers all three needs. Not three
separate solutions -- one structural idea (mechanism, not policy)
that makes portability, control, and composability fall out as
natural consequences. The diagram and the protocol contracts are
the hero. Developers who get it will get it in 30 seconds.*

---

### Headline

**A kernel that provides mechanisms. Everything else is a module you own.**

### The core idea

Amplifier is modeled on the Linux kernel philosophy: a tiny, stable
center that provides mechanisms, with all policies living at the
edges as replaceable modules.

The kernel is ~2,600 lines of Python. It does four things:
1. Loads and unloads modules
2. Manages session lifecycle
3. Dispatches events to hooks
4. Resolves hook precedence

That's it. It makes **zero decisions** about which model to use,
how the agent loop works, what tools are available, what gets
logged or blocked, or how memory is managed.

The design principle:

> *"Could two teams want different behavior? Then it's a module,
> not the kernel."*

This one principle answers all three needs:

- **Portability**: Providers are modules. The kernel has zero vendor
  code. Switching providers means swapping one module reference.
- **Control**: The agent loop is a module. Memory is a module. Hooks
  are a control plane. Everything behavioral is yours to replace.
- **Composability**: Modules snap together through stable contracts.
  Bundles compose modules into shareable, layerable configurations.

### The diagram

```
Vendor SDKs:

  [Your Code] --> [Vendor SDK]  --> [Agent Loop]  --> [Memory]  --> [Vendor API]
                                     (sealed)         (sealed)      (often locked)

                  You control this.   You can't change these.        You might not
                                                                     choose this.

Amplifier:

  [Your Code] --> [Kernel]  --> [Orchestrator]  --> [Context]  --> [Provider(s)]
                   2,600         Module.             Module.        Module(s).
                   lines         Your loop.          Your memory.   Any LLM.

                            --> [Tools]          --> [Hooks]
                                Modules.             Modules.
                                Your capabilities.   Your control plane.
```

### Need 1 answered: Portability through module contracts

The kernel contains zero vendor-specific code. Every LLM backend
implements the same Provider protocol:

```python
class Provider(Protocol):
    @property
    def name(self) -> str: ...
    def get_info(self) -> ProviderInfo: ...
    async def list_models(self) -> list[ModelInfo]: ...
    async def complete(self, request: ChatRequest) -> ChatResponse: ...
    def parse_tool_calls(self, response: ChatResponse) -> list[ToolCall]: ...
```

Five methods. Implement them and the kernel treats your module
identically to the Anthropic or OpenAI providers. You can run
multiple providers simultaneously and route between them. Switching
from Claude to GPT means swapping one module reference. Your tools,
hooks, orchestrator, and context don't change -- because they
never knew which model was answering.

```yaml
# Switch provider: change one line
providers:
  - module: provider-anthropic       # <-- swap to provider-openai
    config:
      model: claude-sonnet-4-5       # <-- swap to gpt-4o

# Or run both simultaneously
providers:
  - module: provider-anthropic
    config: { model: claude-sonnet-4-5 }
  - module: provider-openai
    config: { model: gpt-4o }
```

If a provider can't load (missing API key), the session continues
without it. Graceful degradation, not fatal error.

### Need 2 answered: Control through replaceable layers

Three layers of control, from shallow to deep:

**Layer 1: Hooks -- the control plane.**

Hooks aren't callbacks. They return a `HookResult` with five
possible actions:

| Action | What it does | Example |
|--------|-------------|---------|
| `continue` | Pass through | Logging, metrics |
| `deny` | Block the operation | "Don't execute rm -rf" |
| `modify` | Transform data in-flight | Redact API keys from logs |
| `inject_context` | Feed information into the agent's reasoning | Linter errors after file writes |
| `ask_user` | Pause for human approval | "This modifies 47 files. Proceed?" |

Multiple hooks compose with deterministic precedence: `deny` >
`ask_user` > `inject_context` > `modify` > `continue`. Layer
hooks independently. They don't know about each other and they
don't conflict.

The `inject_context` action has no real equivalent in vendor SDKs.
It means hooks participate in the agent's *reasoning*, not just
the logging. A linter hook runs after every file write, injects
errors into the conversation, and the agent self-corrects on
its next turn. No prompt engineering required.

**Layer 2: Memory -- the context module.**

The ContextManager protocol:

```python
class ContextManager(Protocol):
    async def add_message(self, message: dict) -> None: ...
    async def get_messages_for_request(
        self, token_budget: int | None = None, provider: Any | None = None
    ) -> list[dict]: ...
    async def get_messages(self) -> list[dict]: ...
    async def set_messages(self, messages: list[dict]) -> None: ...
    async def clear(self) -> None: ...
```

Five methods. The kernel has **zero lines of compaction code** --
verified by searching the source. The docstring states it directly:
*"Context managers own memory policy. Orchestrators ask for
messages; context managers decide how to fit them within limits."*

The default module has an 8-level progressive compaction strategy.
Replace it with summarization, RAG retrieval, compliance-aware
storage, or domain-specific memory. Same interface, different
behavior.

No other major framework exposes memory as a replaceable module.
This matters because context management is domain-specific, evolving
rapidly, and privacy-critical.

**Layer 3: The agent loop -- the orchestrator module.**

The Orchestrator protocol:

```python
class Orchestrator(Protocol):
    async def execute(
        self,
        prompt: str,
        context: ContextManager,
        providers: dict[str, Provider],
        tools: dict[str, Tool],
        hooks: HookRegistry,
    ) -> str: ...
```

The kernel calls `execute()` and returns the string result.
Everything between those points is yours. The default orchestrator
runs a standard agentic loop with streaming. Replace it with:

- A **verification loop** that consults two models and picks the
  better response
- A **cost-aware loop** that routes simple tasks to cheaper models
- A **planning loop** with chain-of-thought before tool execution
- Anything. Same kernel, same tools, same hooks. Different behavior.

No other framework treats the agent loop as a swappable module
with a stable contract.

### Need 3 answered: Composability through bundles

Bundles are declarative packages that compose modules, context,
and agents into shareable configurations. The format is markdown
with YAML frontmatter -- human-readable, diffable, version-
controllable.

Composition follows algebraic merge rules:
- Module lists merge by ID (add new, deep-merge existing configs)
- Dicts deep-merge recursively (child overrides parent)
- Context accumulates with namespace isolation
- Instructions replace entirely (your bundle always wins)

The thin bundle pattern: declare only what's uniquely yours.
Inherit everything else:

```yaml
bundle:
  name: my-team
  version: 1.0.0

includes:
  - foundation        # 30+ agents, 7 tools, streaming UI, event logging
  - recipes            # declarative YAML workflows
  - python-dev         # linting, types, LSP

providers:
  - module: provider-anthropic
    config: { model: claude-sonnet-4-5 }

hooks:
  - module: hooks-approval
```

14 lines. A complete system. Your teammate takes your bundle,
swaps the provider, adds a tool:

```yaml
includes:
  - my-team                     # everything from your setup

providers:
  - module: provider-openai     # swapped
    config: { model: gpt-4o }

tools:
  - module: tool-browser-test   # added
```

Inherited: 30+ agents, 7 tools, streaming UI, workflows, Python
tools, approval hooks. Changed: provider, one tool. No duplication.
Composition, not configuration.

### The comparison

| Capability | Claude SDK | Gemini CLI | OpenAI Agents | Google ADK | MS Agent Fw | **Amplifier** |
|-----------|:----------:|:----------:|:-------------:|:----------:|:-----------:|:-------------:|
| Swap LLM provider | No | No | Yes | Yes | Yes | **Module** |
| Swap the agent loop | No | No | No | Subclass | Partially | **Module** |
| Swap memory strategy | No | No | No | No | No | **Module** |
| Hooks can block | Yes | Yes | Tripwire | Yes | Middleware | **Yes** |
| Hooks can modify data | Limited | No | No | Yes | Middleware | **Yes** |
| Hooks can inject context | No | Partial | No | Partial | No | **Yes** |
| Hooks can request approval | Yes | No | No | No | No | **Yes** |
| Composable config sharing | No | Extensions | No | No | No | **Bundles** |

### Transition

Architecture is a claim until you can touch it. Here's how you
go from reading about it to building through it.

[Next: Three doors -->]

---

## Slide 3: Three Doors

*Goal: The experimental layer. Three doors into the architecture,
each matching a different depth of engagement. A developer picks
the door that matches their current need. They can enter any door
at any time.*

*Compose (minutes) -> Intercept (hours) -> Replace (a day).*
*Each door is an action with real code, not a concept.*

---

### Headline

**Compose. Intercept. Replace. Go as deep as you want.**

---

### Door 1: Compose

*Minutes to first result. Assemble existing modules into a working
system. Learn that composition is not configuration.*

**Write a bundle.**

```yaml
bundle:
  name: my-dev-setup
  version: 0.1.0

includes:
  - foundation           # 30+ agents, 7 tools, streaming UI
  - recipes              # declarative YAML workflows
  - python-dev           # linting, type-checking, LSP

providers:
  - module: provider-anthropic
    config:
      model: claude-sonnet-4-5

hooks:
  - module: hooks-approval       # ask before destructive operations
  - module: hooks-redaction      # strip secrets from logs
```

That single `includes: [foundation]` gives you filesystem tools,
shell execution, web search, agent delegation, streaming UI, event
logging, and 30+ specialist agents (explorer, bug hunter, architect,
builder, security reviewer, and more). The thin bundle pattern
means you only declare what's uniquely yours.

**Run a recipe.**

Recipes are declarative workflows -- repeatable, version-controlled,
shareable:

```yaml
name: pr-review
stages:
  review:
    steps:
      - agent: python-dev
        prompt: "Review {repo_path} for code quality and correctness"
      - agent: security-guardian
        prompt: "Audit {repo_path} for security vulnerabilities"

  approve:
    needs_approval: true
    # Execution pauses. A human reviews. Approves or denies.

  report:
    steps:
      - agent: technical-writer
        prompt: "Synthesize all findings into a structured report"
```

Approval gates. Context that accumulates across steps. Resumability
after interruption. Commit it to your repo. Your teammate runs the
same recipe. No vendor SDK provides declarative YAML workflows with
built-in human approval gates and automatic checkpointing [34].

**From this door, you can:**
- Assemble a working system from existing modules in minutes
- Override any part selectively (provider, tools, hooks)
- Share your bundle; teammates extend it without duplicating
- Run repeatable workflows with approval gates

> [34] OpenAI Agents SDK offers durable workflows via external infrastructure (Temporal, Restate, DBOS). Google ADK has experimental YAML Agent Config (since v1.11.0) but without approval gates or resumability.

---

### Door 2: Intercept

*Hours to first result. Write hooks that control agent behavior.
Learn the difference between monitoring and a control plane.*

**A hook that teaches.**

Enforce commit conventions -- not by blocking, but by injecting
context so the agent self-corrects:

```python
async def commit_convention_hook(event, data):
    if event != "tool:pre" or data.get("tool_name") != "bash":
        return HookResult(action="continue")

    command = data.get("tool_input", {}).get("command", "")
    if not command.startswith("git commit"):
        return HookResult(action="continue")

    if not re.match(r'git commit -m ["\']?(feat|fix|docs|refactor)', command):
        return HookResult(
            action="inject_context",
            context_injection="Commit messages must follow conventional "
                "format: feat|fix|docs|refactor|test|chore: description",
        )

    return HookResult(action="continue")
```

The agent writes a bad commit message. The hook feeds the
convention into the conversation. The agent reformats and retries.
25 lines. No prompt engineering. No orchestrator modification.

**A hook that guards.**

Human approval for production file writes:

```python
async def production_guard(event, data):
    if event != "tool:pre" or data.get("tool_name") not in ("Write", "Edit"):
        return HookResult(action="continue")

    file_path = data.get("tool_input", {}).get("file_path", "")
    if "/production/" not in file_path:
        return HookResult(action="continue")

    return HookResult(
        action="ask_user",
        approval_prompt=f"Allow write to production file: {file_path}?",
        approval_options=["Allow once", "Allow always", "Deny"],
        approval_default="deny",
    )
```

Execution pauses. The developer approves or denies. A real
approval gate in the agent loop, not a log entry.

**A hook that creates feedback loops.**

Run the linter after every file write, feed errors back
automatically:

```python
async def linter_feedback(event, data):
    if event != "tool:post" or data.get("tool_name") not in ("Write", "Edit"):
        return HookResult(action="continue")

    file_path = data["tool_input"]["file_path"]
    result = subprocess.run(["ruff", "check", file_path], capture_output=True)

    if result.returncode != 0:
        return HookResult(
            action="inject_context",
            context_injection=f"Linter errors in {file_path}:\n{result.stderr.decode()}",
            context_injection_role="system",
            user_message=f"Linting issues found in {file_path}",
        )

    return HookResult(action="continue")
```

The agent writes a file. The linter runs. Errors appear in the
agent's conversation as a system message. The agent sees them on
its next turn and fixes them. The developer didn't intervene. A
closed feedback loop between the agent and the environment.

This is the architectural payoff of `inject_context`. No vendor
SDK has it -- their hooks can observe and sometimes block, but
they can't feed information back into the agent's reasoning.

**From this door, you can:**
- Write hooks that teach (inject standards and conventions)
- Write hooks that guard (approval gates for sensitive operations)
- Write hooks that create feedback loops (linter, types, tests)
- Layer multiple hooks independently (deterministic precedence)

---

### Door 3: Replace

*A day to first result. Write a module that replaces a framework
layer. Learn that the kernel has no opinions and the contracts
are real.*

**Replace the memory.**

A context module that summarizes old messages instead of truncating:

```python
class SummarizingContext:
    """Compress old context via LLM summarization instead of truncation."""

    def __init__(self, summarizer_provider):
        self.messages = []
        self.summarizer = summarizer_provider

    async def add_message(self, message):
        self.messages.append(message)

    async def get_messages_for_request(self, token_budget=None, provider=None):
        if len(self.messages) < 50:
            return list(self.messages)

        old, recent = self.messages[:-20], self.messages[-20:]
        summary = await self._summarize(old)
        return [{"role": "system", "content": summary}] + recent

    async def get_messages(self):
        return list(self.messages)           # full history, always

    async def set_messages(self, messages):
        self.messages = list(messages)

    async def clear(self):
        self.messages = []

    async def _summarize(self, messages):
        request = ChatRequest(messages=[
            {"role": "system", "content": "Summarize this conversation concisely."},
            {"role": "user", "content": format_messages(messages)},
        ])
        response = await self.summarizer.complete(request)
        return response.content[0].text
```

Five methods. Mount it at the `"context"` slot. The kernel doesn't
know the difference between this and the default. The orchestrator
calls `get_messages_for_request()` and gets back messages that fit.
How they were compacted is the module's decision.

To change the compaction strategy in any other framework: fork the
framework. Here: implement five methods.

**Replace the agent loop.**

A verification orchestrator that consults two models:

```python
class VerificationOrchestrator:
    """Consult two providers. Pick the better response."""

    async def execute(self, prompt, context, providers, tools, hooks):
        await context.add_message({"role": "user", "content": prompt})
        messages = await context.get_messages_for_request()

        request = ChatRequest(messages=messages, tools=get_schemas(tools))

        primary = providers["anthropic"]
        verifier = providers["openai"]

        response_a, response_b = await asyncio.gather(
            primary.complete(request),
            verifier.complete(request),
        )

        best = self._pick_best(response_a, response_b)
        await context.add_message({"role": "assistant", "content": best.text})
        await hooks.emit("orchestrator:complete", {
            "turn_count": 1, "status": "success"
        })
        return best.text
```

Same tools. Same hooks. Same memory. Two providers used
simultaneously. Completely different execution behavior. The
kernel called `execute()` and got back a string.

**Write a custom tool.**

Connect the agent to your internal systems:

```python
class InternalDocsSearch:
    name = "internal-docs"
    description = "Search internal team documentation and knowledge base"

    async def execute(self, input):
        results = await your_search_api(input["query"])
        return ToolResult(success=True, output=format_results(results))
```

The model now has access to your internal docs. Composes with
every tool, hook, and orchestrator.

**Package everything.**

```yaml
bundle:
  name: my-team-platform
  version: 1.0.0

includes:
  - foundation
  - recipes
  - python-dev

session:
  context:
    module: ./modules/summarizing-context

tools:
  - module: ./modules/internal-docs

hooks:
  - module: ./modules/commit-convention
  - module: ./modules/linter-feedback
  - module: hooks-redaction
```

Your teammate clones this repo. They get your memory strategy,
your tools, your hooks, your standards. They override the
provider. They add their own tools. The bundle composes.

If your modules are useful beyond your team, publish them. Someone
building a completely different system can pull in your summarizing
context module because modules are independent of the context
they're used in.

**From this door, you can:**
- Write a context module that changes how the agent remembers
- Write an orchestrator that changes how the agent reasons
- Write tools that connect to your internal systems
- Write providers for your own models or endpoints
- Package everything into a composable, shareable bundle

---

## Design Notes

### The three-needs framing

**Why these three, in this order:**

| Need | When they hit it | Why it's pressing now |
|------|-----------------|---------------------|
| Portability | First framework choice | Model landscape shifts quarterly. 76% vendor lock-in concern. |
| Control | After the demo works | Production requires approval gates, feedback loops, custom reasoning. |
| Composability | After something works well | Teams need to standardize, share, iterate. |

**What was deprioritized:**

- *Memory modularity* (v3's "Wall 2") is now surfaced under Control
  (one of the layers you can replace) and in Door 3 (the context
  module example). It's a powerful differentiator but not a
  top-of-mind developer frustration -- it shows up as a "wow" once
  they're already interested, not as the hook that gets them
  interested.

- *Workflow orchestration* (v2's problem #4) is now a proof point
  under Composability (the recipe example in Door 1). Important
  but not a standalone need at the level of the top three.

### The three-door framing

| Door | Action | Time | Depth |
|------|--------|------|-------|
| Compose | Assemble existing modules | Minutes | Configuration layer |
| Intercept | Write hooks that control behavior | Hours | Extension layer |
| Replace | Write modules that swap layers | A day | Platform layer |

Doors imply non-linearity. A developer who needs a custom context
module doesn't need to master hooks first. They go to Door 3.

### How the three needs map to the three doors

| | Compose | Intercept | Replace |
|--|---------|-----------|---------|
| **Portability** | Swap a provider line in YAML | -- | Write a custom provider |
| **Control** | Choose orchestrator + context modules | Write hooks (teach/guard/feedback) | Write custom orchestrator or context module |
| **Composability** | Bundle inheritance, thin bundles, recipes | Share hooks as modules | Publish modules to the ecosystem |

Every door addresses every need at a different depth. The grid
is the skeleton of the experimental layer.

### Tone

- Technical, not breathless. No "revolutionary" or "game-changing."
- Respect the reader's intelligence. They can evaluate architecture.
- Honest about what Amplifier is (a platform/kernel) and isn't
  (a batteries-included product).
- Confident but not combative. The comparison table is factual.
  Acknowledge where competitors are strong (ADK's CustomAgent,
  OpenAI's LiteLLM, Gemini CLI's extensions).
- Show real code. Developers trust code more than prose.
- **Lead with their need, not our feature.** Every section names
  the developer's experience first, then shows the architecture.

### Visual direction

- **Slide 1**: Three sections, each led by a scenario in second
  person ("You built on..."). Comparison tables are secondary
  evidence, not the lead. Maybe a subtle visual per need: a model
  swap that breaks, a locked loop, two copies of the same config.
- **Slide 2**: The diagram is the spatial hero. The three protocol
  contracts (Provider, ContextManager, Orchestrator) are the
  technical proof. Each maps to a need with a label ("Need 1
  answered", "Need 2 answered", "Need 3 answered").
- **Slide 3**: Three columns or tabs. Each door has a time
  estimate, a verb, and code. The developer clicks the door that
  matches their depth. Code is syntax-highlighted, copy-able.

### What this does NOT cover (intentionally)

- The broader "anyone can create" vision (retention/ecosystem story)
- Non-developer personas (come after dev buy-in)
- The CLI itself (the platform is the story)
- Exhaustive feature lists
- Deep recipe system docs (deserves its own page)
- The event/JSONL observability system (important but not top-three)

### Lineage

| Version | Framing | Lead insight |
|---------|---------|-------------|
| v2 | Five pain points | Breadth of limitations across SDKs |
| v3 | Two structural walls | Orchestration + memory are the hidden moats |
| v4 | Three felt needs | Portability, control, composability -- ordered by developer journey |

All prior research and references are preserved. The v2 reference
corpus (65 citations) is the evidence base; v4 cites the subset
most relevant to the three-need framing.

### Open questions

1. **Slide 1 density.** Each need has a comparison table. Three
   tables on one screen may be too dense. Options: collapse tables
   into expandable sections, or move all tables to Slide 2 and
   keep Slide 1 as pure narrative.

2. **Ordering for enterprise audiences.** The current order
   (portability -> control -> composability) follows the developer
   journey. For enterprise buyers, composability (team standardization,
   governance) might be #1. Consider audience-dependent ordering.

3. **Door 3 as a separate page.** The custom orchestrator and
   context module examples are the deepest differentiators but the
   most demanding. Developers at Door 1 depth may not scroll there.
   Consider whether Door 3 should be a linked deep-dive rather
   than inline.

4. **The "three needs" as a recurring motif.** The three needs
   could structure more than the pitch deck -- they could be the
   organizing principle for documentation, tutorials, and the
   getting-started guide. "Getting started with portability."
   "Getting started with control." "Getting started with
   composability."

5. **Competitive fairness check.** Google ADK's CustomAgent and
   experimental Agent Config, MS Agent Framework's middleware +
   graph system, and Gemini CLI's extension ecosystem are all
   evolving. The comparison table should be re-verified quarterly.
   Claims about what competitors can't do have a shelf life.