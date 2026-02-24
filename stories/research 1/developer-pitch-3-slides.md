# Developer Pitch: 3-Slide Structure (v2)

> **Purpose**: The developer-facing story for withamplifier.com.
> Three screens. Each one earns the next click.
> Audience: Engineers who are already building with AI and feeling the friction.
>
> **The arc**:
> 1. The problem you already feel
> 2. How Amplifier is architecturally different
> 3. How you understand it, use it, and make it yours

---

## Slide 1: The Problem

*Goal: Name the pain they already feel. Not abstract labels -- real scenarios
they've lived through. This is the landing screen. They stay or leave in
10 seconds based on whether they recognize themselves.*

---

### Headline

**You're building AI systems on foundations that assume too much.**

### Body

You picked a framework. It got you to a demo fast.
Then you hit the parts that aren't yours to change.

### The problems (each one is a scenario, not a label)

---

**1. The model you started with isn't the model you need.**

You built on OpenAI's SDK. Then Claude turned out to be significantly
better at tool-calling for your use case. This isn't a niche opinion --
there's remarkable industry convergence that Anthropic's Sonnet and
Haiku are the best tool-callers available [1]. Even GitHub chose
Claude Sonnet as the base model for its Copilot coding agent --
not a Microsoft model [2]. Armin Ronacher (Flask creator, Sentry CTO)
put it bluntly: "I think Haiku and Sonnet are still the best tool
callers available, so they make for excellent choices in the agent
loop" [3].

But switching means rewriting your agent logic, your tool interfaces,
your error handling. Not because the *problem* changed, but because
the *framework* assumed your provider was permanent.

The lock-in varies by SDK, but it's structural everywhere:

| SDK | Provider constraint | What switching costs you |
|-----|---------------------|------------------------|
| Claude Agent SDK | Claude models only. Cannot use OpenAI, Gemini, Llama, or any non-Claude model. Supports 4 hosting providers for Claude (Anthropic API, Bedrock, Vertex, Azure Foundry) [4] | Everything. Different SDK, different tool interfaces, different agent lifecycle. |
| Gemini CLI | Locked to Gemini models only (2.5 Pro, 2.5 Flash, Gemini 3). No multi-provider support [5] | Everything. TypeScript-only, no Python API, completely different extension model. |
| Copilot SDK | BYOK supported (OpenAI, Anthropic, Ollama, etc.) but still requires the closed-source Copilot CLI binary as runtime [6] | Soft lock: you can change the model but not escape the binary. |
| OpenAI Agents | 100+ models via LiteLLM integration [7] | Lowest lock-in of the vendor SDKs, but hosted tools (WebSearch, FileSearch, CodeInterpreter) are OpenAI-only [8] |
| Google ADK | 100+ models via LiteLLM, Vertex AI Model Garden (Claude, Llama, Gemma) [9] | Low at framework level, but Vertex AI Agent Engine (managed deploy) only supports Gemini natively [10] |

Developer surveys confirm this matters: vendor lock-in is the
primary strategic concern across all agent SDK evaluations [11].
The best model for any given task changes quarterly. If your
architecture encodes a provider choice as a structural dependency,
every model improvement in the industry is a rewrite for you.

> **References (web-verified 2026-02-20):**
> [1] Multiple practitioners converge on Claude models for tool-calling. Ronacher: "I think Haiku and Sonnet are still the best tool callers available, so they make for excellent choices in the agent loop." -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/
> [2] GitHub chose Claude Sonnet as base model for its Copilot coding agent. Launched with Claude 3.7 Sonnet at Microsoft Build (May 2025), evolved to Claude Sonnet 4 as base. GitHub CEO Thomas Dohmke confirmed at Build. Latest: Claude Sonnet 4.6 GA in Copilot (Feb 17, 2026). -- GitHub Changelog: https://github.blog/changelog/2025-05-22-anthropic-claude-sonnet-4-and-claude-opus-4-are-now-in-public-preview-in-github-copilot/ | TechHQ: https://techhq.com/news/ai-agents-take-centre-stage-at-microsoft-build-2025/ | Under the Hood: https://github.blog/ai-and-ml/github-copilot/under-the-hood-exploring-the-ai-models-powering-github-copilot/ | **Nuance**: Copilot is multi-model (GPT-4.1 default for general chat); the *coding agent specifically* uses Claude Sonnet as its base.
> [3] Armin Ronacher, "Agent Design Is Still Hard" (Nov 21, 2025). Exact quote verified by fetching the page directly. -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/
> [4] Claude Agent SDK: model selection restricted to `'sonnet' | 'opus' | 'haiku' | 'inherit'` per AgentDefinition type. Four hosting providers documented: Anthropic API, Amazon Bedrock, Google Vertex AI, Microsoft Azure AI Foundry. -- Anthropic docs: https://platform.claude.com/docs/en/agent-sdk/overview | Subagents: https://platform.claude.com/docs/en/agent-sdk/subagents
> [5] Gemini CLI: `/model` command only shows Gemini variants (2.5 Pro, 2.5 Flash, Gemini 3 Pro/Flash). Docs describe it as communicating with "the Gemini API and its AI models." No third-party model support. -- https://geminicli.com/docs/cli/model/
> [6] Copilot SDK: PyPI README states "Python SDK for programmatic control of GitHub Copilot CLI via JSON-RPC." Requirements: "GitHub Copilot CLI installed and accessible." BYOK documented for OpenAI, Azure, Anthropic, Ollama -- but CLI binary still required as runtime. -- PyPI: https://pypi.org/project/github-copilot-sdk/ | Discussion: https://github.com/github/copilot-sdk/discussions/231
> [7] OpenAI Agents SDK: GitHub README states "provider-agnostic, supporting... 100+ other LLMs." LiteLLM is optional extra. Acknowledgments section credits "LiteLLM (unified interface for 100+ LLMs)." -- GitHub: https://github.com/openai/openai-agents-python | Docs: https://openai.github.io/openai-agents-python/models/litellm/
> [8] OpenAI Agents SDK: Hosted tools (WebSearchTool, FileSearchTool, CodeInterpreterTool, HostedMCPTool, ImageGenerationTool) require OpenAIResponsesModel specifically. Guardrails docs: "Tool guardrails apply only to function tools... hosted tools do not use this guardrail pipeline." -- https://openai.github.io/openai-agents-python/tools/ | https://openai.github.io/openai-agents-python/guardrails/
> [9] Google ADK: "LiteLLM acts as a consistent interface to over 100 different LLMs." Launch blog: "framework also offers LiteLLM integration letting you choose from a wide selection of models." -- ADK tutorial: https://google.github.io/adk-docs/tutorials/agent-team/ | LiteLLM docs: https://docs.litellm.ai/docs/projects/Google+ADK
> [10] Google ADK: Vertex AI Agent Engine auto-recognizes Gemini natively. Claude, Llama, and others work via Vertex AI with explicit `LLMRegistry.register()` or LiteLLM wrappers. **Correction from original claim**: not "Gemini-only" but "Gemini auto-recognized; others require additional config." -- https://google.github.io/adk-docs/agents/models/vertex/
> [11] Docker "State of Agentic AI Report" (Feb 20, 2026, n=800+): "76% of global respondents report active concerns about vendor lock-in, rising to 88% in France, 83% in Japan, and 82% in the UK." -- https://www.docker.com/blog/state-of-agentic-ai-key-findings/ | Stack Overflow Podcast, Mozilla.ai CEO: "enterprises love open-source software because you can avoid vendor lock-in... That same pitch is actually resonating with enterprises now." -- https://stackoverflow.blog/2025/10/21/open-source-is-giving-you-choices-with-your-agent-systems/

---

**2. You can't change how your agent thinks.**

Your framework gives you an agent loop: prompt the model, get tool
calls, execute them, feed results back. It works -- until it doesn't.
Maybe you need the agent to pause and ask for human approval before
executing a destructive tool call. Maybe you need it to consult a
second model for verification. Maybe you need it to back off and
summarize when context gets too long, instead of silently truncating.

The level of control you get over this loop varies dramatically:

| SDK | Agent loop visibility | What you can change |
|-----|----------------------|---------------------|
| Copilot SDK | **Opaque.** The loop runs inside a closed-source CLI binary (~55-60MB bundled in pip packages) [12]. You communicate via JSON-RPC. | Hooks only (6 lifecycle events). Cannot inspect, modify, or replace the loop itself [13]. |
| Claude Agent SDK | **Opaque.** The loop runs inside the Claude Code CLI binary (~55-72MB) as a subprocess [14]. You communicate via stdin/stdout JSON protocol. | Hooks only (PreToolUse, PostToolUse, etc.). "Replace orchestrator: No. Loop is in the CLI binary" [15]. |
| OpenAI Agents | **Transparent.** The loop lives in the Python `Runner` class (static methods delegating to `AgentRunner`), which you can read [16]. | You can configure the loop via `RunConfig` (model overrides, guardrails, input filters, error handlers) but the core loop logic is fixed and not designed for replacement [17]. |
| Google ADK | **Transparent.** The loop lives in Python code across 5 agent types (LlmAgent, SequentialAgent, LoopAgent, ParallelAgent, CustomAgent) [18]. | `CustomAgent` gives full programmatic control [19]. Closest to replaceable, but these are framework classes you subclass, not modules with stable contracts you swap [20]. |
| Gemini CLI | **Transparent.** Open-source TypeScript ReAct loop, inspectable in the public repo [21]. | 12 hook event types (BeforeTool, AfterTool, BeforeAgent, AfterAgent, BeforeModel, AfterModel, SessionStart, SessionEnd, etc.) implemented as external shell scripts [22]. You can read the loop but can't replace it without forking. |

The agent loop is the most important part of an AI system. It's
where the decisions happen. And in every major framework, it's
the part you control the least. Armin Ronacher's observation
captures why this matters: "SDK abstractions break once you hit
real tool use" [23] -- and the loop is the abstraction you hit
hardest.

> **References (web-verified 2026-02-20):**
> [12] Copilot SDK: PyPI wheel sizes range 51.6-61.0 MB across platforms (macOS ARM64: 54.9 MB, Linux x86-64: 59.2 MB, Windows x86-64: 53.6 MB). No source distributions on PyPI -- only platform-specific binary wheels. Issue #471 references "the bundled CLI binary." -- PyPI: https://pypi.org/project/github-copilot-sdk/#files | Issue: https://github.com/github/copilot-sdk/issues/471
> [13] Copilot SDK: SDK wrappers are MIT open-source, but the CLI binary (the agent runtime) is proprietary. Issue #248 "GitHub Copilot SDK as a dependency free core library" confirms community recognizes the binary dependency as a limitation. Hooks provide 6 extension points but cannot replace the core planner or execution loop. -- https://github.com/github/copilot-sdk/issues/248
> [14] Claude Agent SDK: PyPI wheel sizes: macOS ARM64 55.2 MB, Linux ARM64 70.0 MB, Linux x86-64 70.6 MB, Windows x86-64 72.9 MB. Source tarball is only 61.6 KB -- confirming the overwhelming majority of wheel size is the bundled CLI binary. Build script (`scripts/build_wheel.py`) downloads the Claude Code CLI binary and bundles it. -- PyPI: https://pypi.org/project/claude-agent-sdk/#files
> [15] Claude Agent SDK overview: "The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code." Loop executes inside the bundled binary. No abstract AgentLoop interface, no callback for loop iteration, no way to swap in custom orchestration logic. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [16] OpenAI Agents SDK: `Runner` class exposes `run()`, `run_sync()`, `run_streamed()` as static methods. All delegate to a global `AgentRunner` instance. Loop algorithm fully documented: call LLM -> if final output, return -> if handoff, switch agent -> if tool calls, execute tools -> check max_turns. Source open at `src/agents/run.py`. -- Docs: https://openai.github.io/openai-agents-python/running_agents/ | Source: https://github.com/openai/openai-agents-python/blob/main/src/agents/run.py | **Note**: SDK is at v0.9.2 (never reached v1.0), despite docs calling it "a production-ready upgrade of Swarm." -- PyPI: https://pypi.org/project/openai-agents/#history
> [17] OpenAI Agents SDK: Runner uses static methods -- not designed for subclass-based extension. The loop is configurable via `RunConfig` (model overrides, guardrails, input filters, error handlers, handoff config) and lifecycle hooks, but the core loop logic (LLM -> tools -> handoffs -> repeat) is fixed. -- Docs: https://openai.github.io/openai-agents-python/running_agents/ | DeepWiki analysis: https://deepwiki.com/openai/openai-agents-python/3.2-runner-and-execution-flow
> [18] Google ADK: Agents categorized into three groups: LLM Agents (`LlmAgent`), Workflow Agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`), and Custom Agents (inherit from `BaseAgent`). **Correction**: CustomAgent is a pattern/base class, not a concrete type like the other four. -- https://google.github.io/adk-docs/agents/ | Custom agents: https://google.github.io/adk-docs/agents/custom-agents/
> [19] Google ADK: Custom agents inherit from `BaseAgent` with "specialized, non-LLM logic" -- full programmatic control. But these are framework classes you subclass, not modules with stable contracts you swap independently. -- https://google.github.io/adk-docs/agents/custom-agents/
> [20] Google ADK: **~17,900 stars** (17.9k) and 2,900 forks as of Feb 2026. Apache 2.0 license. Powers Google Agentspace and CES internally per launch blog: "ADK is the same framework powering agents within Google products." -- GitHub: https://github.com/google/adk-python | Launch blog: https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/
> [21] Gemini CLI: Open-source TypeScript, Apache 2.0. ~95,100 stars and 11,400 forks. "Unlike Copilot SDK and Claude Agent SDK" it IS the agent -- no subprocess wrapper, no closed binary. ReAct loop inspectable in the public repo. -- GitHub: https://github.com/google-gemini/gemini-cli | TechCrunch launch coverage: https://techcrunch.com/2025/06/25/google-unveils-gemini-cli-an-open-source-ai-tool-for-terminals/
> [22] Gemini CLI hooks: v0.26.0 released 2026-01-27. **Correction**: Actually 12 hook event types, not 3 (SessionStart, SessionEnd, BeforeAgent, AfterAgent, BeforeModel, AfterModel, BeforeToolSelection, BeforeTool, AfterTool, PreCompress, Notification, plus more). Implemented as external shell scripts (`"type": "command"`) communicating via stdin/stdout JSON. -- Hooks docs: https://geminicli.com/docs/hooks/ | Google blog: https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/
> [23] Ronacher: "SDK abstractions break once you hit real tool use." -- Exact quote from the TL;DR bullet points. Verified by fetching the page directly. -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/

---

**3. You can't control what happens around the model.**

You want to add a rule: "before any file write, check with the user."
Or: "inject the project's linting errors into the agent's context so
it fixes them proactively." Or: "redact API keys from all logs." Or
even: "if this tool call would cost more than $0.50, route it to a
cheaper model."

Every SDK gives you some form of hooks or callbacks. But there's a
spectrum from "observe and log" to "intercept and control" -- and
most frameworks cluster on the observation end:

| SDK | Hook/callback system | Can block? | Can modify in-flight? | Can inject into conversation? |
|-----|---------------------|------------|----------------------|-------------------------------|
| Copilot SDK | 6 lifecycle hooks (pre/post tool, prompt, session start/end, error) [24] | Yes, `on_pre_tool_use` can deny [25] | Limited | No |
| OpenAI Agents | 3 guardrail types (input, output, tool) with tripwire mechanism [26] | Yes, tripwire stops execution [27] | No (validate, not transform) | No |
| Claude Agent SDK | Lifecycle hooks (PreToolUse, PostToolUse, UserPromptSubmit, Stop, etc.) [28] | Yes, permission callbacks can deny [29] | Limited | No |
| Google ADK | 6 typed Python callbacks (before/after agent, model, tool) [30] | `before_model` can modify prompt [31] | Yes, callbacks can return modified content [32] | Via `before_model` only (at model call boundaries) [33] |
| Gemini CLI | 12 hook event types (BeforeTool, AfterTool, BeforeAgent, AfterAgent, BeforeModel, AfterModel, etc.) as shell scripts [34] | Yes, `"decision": "deny"` [35] | No | Yes, via `systemMessage` field -- but only at specific hook boundaries [36] |

The gap: most frameworks let you see events and sometimes block
them. Almost none let you *inject information back into the agent's
reasoning*. Google ADK's `before_model` callback can modify the
prompt, and Gemini CLI's `systemMessage` can feed context back --
but both operate only at specific boundaries, not at arbitrary
lifecycle events.

The difference between "I can see what's happening" and "I can
change what's happening" is the difference between monitoring and
a control plane. Most frameworks give you monitoring. None provide
composable hook actions (block + modify + inject + approve) with
deterministic precedence resolution where multiple hooks layer
independently [37].

> **References (web-verified 2026-02-20):**
> [24] Copilot SDK: PyPI README lists exactly 6 hooks under "Available hooks:" with full code examples: `on_pre_tool_use`, `on_post_tool_use`, `on_user_prompt_submitted`, `on_session_start`, `on_session_end`, `on_error_occurred`. -- https://pypi.org/project/github-copilot-sdk/
> [25] Copilot SDK: `on_pre_tool_use` can "Intercept tool calls before execution; allow/deny/modify arguments" per PyPI docs. -- https://pypi.org/project/github-copilot-sdk/
> [26] OpenAI Agents SDK: Guardrails page documents three types: Input guardrails (run on initial user input), Output guardrails (run on final agent output), Tool guardrails (wrap function tools, validate before/after). **Note**: Docs intro page only mentions two (input, output); tool guardrails documented separately on the same page. -- https://openai.github.io/openai-agents-python/guardrails/
> [27] OpenAI Agents SDK: "If the input or output fails the guardrail, the Guardrail can signal this with a tripwire. As soon as we see a guardrail that has triggered the tripwires, we immediately raise a {Input,Output}GuardrailTripwireTriggered exception and halt the Agent execution." -- https://openai.github.io/openai-agents-python/guardrails/
> [28] Claude Agent SDK: 12 hook event types total. Python SDK supports 7: PreToolUse, PostToolUse, UserPromptSubmit, Stop, SubagentStop, PreCompact, plus others. TypeScript SDK supports all 12 including SessionStart, SessionEnd, SubagentStart, PermissionRequest, Notification, PostToolUseFailure. -- Hooks: https://platform.claude.com/docs/en/agent-sdk/hooks | Python HookEvent: https://platform.claude.com/docs/en/agent-sdk/python
> [29] Claude Agent SDK: "Fine-grained: can_use_tool callback" for permission control. `permission_mode` setting for coarse-grained control. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [30] Google ADK: Exactly 6 callback hooks in 3 pairs confirmed: `before_agent_callback`/`after_agent_callback`, `before_model_callback`/`after_model_callback`, `before_tool_callback`/`after_tool_callback`. Typed Python functions with specific signatures and return types. -- https://google.github.io/adk-docs/callbacks/
> [31] Google ADK: `before_model_callback` takes `CallbackContext` + `LlmRequest`, returns `Optional[LlmResponse]`. Can modify prompt before LLM call. -- https://google.github.io/adk-docs/callbacks/
> [32] Google ADK: Callbacks can "Return modified content or None (pass-through)." Each has well-defined contract for skipping or overriding behavior. -- https://google.github.io/adk-docs/callbacks/
> [33] Google ADK: Context injection limited to `before_model_callback` boundary (modifying the LlmRequest). No arbitrary lifecycle injection equivalent to Amplifier's `inject_context`. -- https://google.github.io/adk-docs/callbacks/
> [34] Gemini CLI: **Correction**: 12 hook event types (not 3 as originally claimed). Full list: SessionStart, SessionEnd, BeforeAgent, AfterAgent, BeforeModel, AfterModel, BeforeToolSelection, BeforeTool, AfterTool, PreCompress, Notification. Implemented as external shell scripts or executables. -- https://geminicli.com/docs/hooks/
> [35] Gemini CLI: Hook responses use `{"decision": "allow"}` or `{"decision": "deny", "reason": "...", "systemMessage": "..."}`. -- https://geminicli.com/docs/hooks/ | Google blog: https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/
> [36] Gemini CLI: `systemMessage` field injects feedback directly into the agent's conversation for self-correction. Docs note: "If stdout contains non-JSON text... The CLI will default to 'Allow' and treat the entire output as a systemMessage." GitHub issues confirm injection behavior. -- https://geminicli.com/docs/hooks/ | Issue: https://github.com/google-gemini/gemini-cli/issues/15413
> [37] No vendor SDK provides composable multi-action hooks with deterministic precedence resolution. Copilot SDK: allow/deny per tool call. OpenAI: tripwire halts. Claude: permission callback. ADK: modify-or-pass-through callbacks. Gemini CLI: allow/deny + systemMessage. None offer layered hooks where multiple independent hooks compose (block + modify + inject + approve) with precedence rules. -- **UNABLE TO FIND single web source that directly compares hook composability across all SDKs.** This claim is synthesized from individual SDK documentation listed above. Recommend verifying by examining each SDK's hook docs directly.

---

**4. Your AI workflow is a conversation you restart every time.**

You spent 45 minutes getting an agent to review your code exactly
the way you want: check for security issues first, then style, then
performance, pause for your approval before writing a summary. It
worked. Tomorrow you need to do it again for a different PR. You
re-explain the whole thing from scratch.

There's no way to capture that workflow as a repeatable artifact.
No way to version-control it. No way to hand it to a teammate and
say "run this." No way to add an approval gate that pauses the
workflow and waits for a human decision before continuing.

The landscape for workflow orchestration across SDKs:

| SDK | Workflow support | Approval gates | Resumability |
|-----|-----------------|----------------|--------------|
| Copilot SDK | None [38] | No built-in [39] | No |
| OpenAI Agents | Manual code. Durable workflow integrations (Temporal, Restate, DBOS) available but require external infrastructure [40] | Human-in-the-loop via external tools [41] | Via external durable workflow engine only |
| Claude Agent SDK | None [42] | Permission callbacks (tool-level, not workflow-level) [43] | No |
| Google ADK | Code-based: SequentialAgent, LoopAgent, ParallelAgent compose multi-step workflows in Python [44] | Action confirmations [45] | Session state with rewind [46] |
| Gemini CLI | None. No declarative workflow layer [47] | No built-in | Checkpointing + rewind (session-level, not workflow-level) [48] |

Google ADK is the strongest here -- its workflow agent types
(Sequential, Loop, Parallel) plus CustomAgent offer genuine workflow
orchestration [49]. But these are Python code: they require testing
infrastructure, version control, and Python expertise. They're
software projects, not shareable configurations a teammate can
pick up and modify [50].

**Correction**: Google ADK has since added experimental YAML-based
"Agent Config" (since v1.11.0) that allows building agents via YAML
without code [50b]. This narrows the gap, but Agent Config currently
only supports Gemini models and Python for custom tools, and does not
include approval gates or resumability.

No vendor SDK has declarative YAML workflows with built-in human
approval gates (pause, review, approve/deny, resume) and automatic
checkpointing for resumability after interruption [51].

> **References (web-verified 2026-02-20):**
> [38] Copilot SDK: No workflow orchestration features found in PyPI docs or GitHub repo. SDK focuses on session management, tools, hooks, and streaming -- no multi-step pipeline or workflow abstraction. -- https://pypi.org/project/github-copilot-sdk/ | https://github.com/github/copilot-sdk
> [39] Copilot SDK: No built-in approval gates documented. `on_pre_tool_use` hook can allow/deny individual tool calls but no workflow-level pause/resume/approve mechanism. -- https://pypi.org/project/github-copilot-sdk/
> [40] OpenAI Agents SDK: Running Agents docs has dedicated "Long running agents & human-in-the-loop" section with subsections for Temporal, Restate, and DBOS. Temporal blog (Jul 30, 2025): "OpenAI and Temporal have teamed up to add Durable Execution to agents built using OpenAI's Agents SDK." Also Azure Durable Functions integration (Sep 2025). -- Docs: https://openai.github.io/openai-agents-python/running_agents/ | Temporal blog: https://temporal.io/blog/announcing-openai-agents-sdk-integration | DBOS: https://docs.dbos.dev/integrations/openai-agents
> [41] OpenAI Agents SDK: Human-in-the-loop documented as a key feature, but implemented via external durable workflow engines (Temporal, Restate, DBOS), not built-in. -- https://openai.github.io/openai-agents-python/running_agents/
> [42] Claude Agent SDK: No workflow orchestration found in official docs. SDK focuses on single-agent queries (`query()`) and multi-turn conversations (`ClaudeSDKClient`). Subagents provide parallelization but no pipeline/stage abstraction. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [43] Claude Agent SDK: Permission system: coarse-grained `permission_mode` setting + fine-grained `can_use_tool` callback. These operate at tool-call level, not workflow level. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [44] Google ADK: Workflow agents confirmed: `SequentialAgent` (runs sub-agents in order), `LoopAgent` (repeats until condition), `ParallelAgent` (concurrent execution). Plus `CustomAgent` for full programmatic control via `BaseAgent` inheritance. -- https://google.github.io/adk-docs/agents/
> [45] Google ADK: No formal "approval gate" abstraction found in docs. Callbacks (`before_tool_callback`, etc.) can intercept and block, but no built-in workflow-level pause-for-human-approval mechanism. -- https://google.github.io/adk-docs/callbacks/
> [46] Google ADK: Session state with rewind and migrate documented. Sessions support in-session state, persistent memory, and artifacts. -- **UNABLE TO FIND specific "rewind" doc page via web search.** Session docs: https://google.github.io/adk-docs/sessions/ -- recommend verifying rewind feature directly.
> [47] Gemini CLI: No declarative workflow layer found in docs. Extensions package prompts, MCP servers, commands, hooks -- but no multi-step pipeline or recipe abstraction. -- https://geminicli.com/docs/extensions/
> [48] Gemini CLI: Checkpointing and session save/resume documented. -- https://geminicli.com/docs/ (session management features)
> [49] Google ADK: Three workflow agent types (Sequential, Loop, Parallel) confirmed as genuine code-based workflow orchestration. Launch blog: "ADK is the same framework powering agents within Google products like Agentspace and CES." -- https://google.github.io/adk-docs/agents/ | https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/
> [50] Google ADK workflow agents are Python classes requiring testing, version control, and Python expertise. No "share a YAML file with a teammate" equivalent. -- https://google.github.io/adk-docs/agents/
> [50b] **Correction**: Google ADK introduced experimental "Agent Config" (YAML-based agent definitions, since v1.11.0): "The ADK Agent Config feature lets you build an ADK workflow without writing code." Currently only supports Gemini models and Python for custom tools. No approval gates or resumability in Agent Config. -- https://google.github.io/adk-docs/agents/config/
> [51] No vendor SDK provides declarative YAML workflows with built-in human approval gates AND automatic checkpointing for resumability. OpenAI Agents requires external infrastructure (Temporal/Restate/DBOS). ADK's new Agent Config is YAML but lacks approval gates. Gemini CLI has checkpointing but no workflow abstraction. -- **Synthesized from individual SDK documentation above.** No single comparison source found that verifies this claim across all SDKs simultaneously.

---

**5. What you build doesn't compose.**

You figured out a great setup: the right model, the right tools, the
right system prompt, a custom hook that enforces your team's commit
standards. Your teammate wants the same setup but with a different
model and an extra tool for their frontend work.

How each SDK handles configuration sharing and reuse:

| SDK | Configuration model | Composition support | Package/share as unit |
|-----|--------------------|--------------------|----------------------|
| Copilot SDK | `CopilotClient` config objects + Custom Agents + Skills (markdown) [52] | No inheritance, no merge rules [53] | No |
| OpenAI Agents | Agent objects in Python code [54] | No composition system [55] | No |
| Claude Agent SDK | `AgentDefinition` + `.claude/` project files [56] | No inheritance [57] | No |
| Google ADK | Agent objects + `sub_agents` lists in code [58] | Agent hierarchy (description-driven), but requires code [59] | No |
| Gemini CLI | Extensions package prompts, MCP servers, hooks, skills [60] | Extensions are closest to composition, but single-layer (no nesting/inheritance) [61] | Yes, via extensions (one-command install) [62] |

In every vendor SDK except Gemini CLI extensions, sharing a setup
means: copy the config, manually edit it, keep two copies in sync.
There's no inheritance, no override semantics, no way to say "start
from this setup, add this tool, swap that provider."

Gemini CLI's extension system is the most interesting competitor
here -- it packages prompts, MCP servers, hooks, and skills into
installable units [63]. But extensions are flat (no composition of
extensions from other extensions) and locked to the Gemini
ecosystem.

The framework landscape itself proves the composition problem:
as of early 2026, developers are choosing between OpenAI Agents,
Claude Agent SDK, Copilot SDK, Google ADK, LangGraph, PydanticAI,
Microsoft Agent Framework, CrewAI, AutoGen, Semantic Kernel,
SmolAgents, Strands Agents -- with no clear consensus emerging [64].
Each requires its own configuration model. Nothing is portable
between them. Armin Ronacher's assessment: "The differences between
models are significant enough that you will need to build your own
agent abstraction" [65] -- but there's no shared substrate for
those custom abstractions to compose on top of.

Software engineering solved this decades ago with package managers,
imports, and dependency composition. AI development tooling hasn't
caught up.

> **References (web-verified 2026-02-20):**
> [52] Copilot SDK: Configuration model is `CopilotClient` config objects + Custom Agents + Skills (markdown-defined behavior specs). Documented on PyPI README. -- https://pypi.org/project/github-copilot-sdk/
> [53] Copilot SDK: No composition system, no inheritance, no merge rules found in docs. Each session is configured independently. -- https://pypi.org/project/github-copilot-sdk/ | https://github.com/github/copilot-sdk
> [54] OpenAI Agents SDK: Agents are "LLMs configured with instructions, tools, and settings" per docs intro. Configured as Python objects. -- https://openai.github.io/openai-agents-python/
> [55] OpenAI Agents SDK: No bundle/composition/package system found in docs. Agent configurations are code objects, not declarative composable units. -- https://openai.github.io/openai-agents-python/
> [56] Claude Agent SDK: `AgentDefinition` type for subagent definitions with isolated contexts. Also `.claude/` project files for project-level configuration. -- https://platform.claude.com/docs/en/agent-sdk/subagents
> [57] Claude Agent SDK: No composition or inheritance system found in docs. Each agent/subagent configured independently. -- https://platform.claude.com/docs/en/agent-sdk/overview
> [58] Google ADK: `sub_agents=[...]` defines hierarchical agent relationships. LLM auto-routes by agent descriptions. -- https://google.github.io/adk-docs/agents/
> [59] Google ADK: Agent hierarchy is code-based (Python objects + sub_agents lists). Not declarative YAML composition with inheritance or override semantics. **Note**: new experimental Agent Config (YAML) exists but is flat, not composable. -- https://google.github.io/adk-docs/agents/ | https://google.github.io/adk-docs/agents/config/
> [60] Gemini CLI Extensions: Package prompts, MCP servers, custom commands. Extension spec (`gemini-extension.json`) supports `mcpServers`, `contextFileName`, `excludeTools`, and custom commands in `commands/` directory. Hooks in extensions added later with v0.26.0+ (Jan 2026). Skills came with v0.24.0+. -- Extensions docs: https://google-gemini.github.io/gemini-cli/docs/extensions/ | Changelog: https://geminicli.com/docs/changelogs/
> [61] Gemini CLI Extensions: Flat structure -- no composition of extensions from other extensions, no inheritance or override semantics. Each extension is an independent installable unit. -- https://google-gemini.github.io/gemini-cli/docs/extensions/
> [62] Gemini CLI Extensions: One-command install: `gemini extensions install https://github.com/...`. Gallery at geminicli.com/extensions. Launched v0.8.0 on Sept 29, 2025 (public blog Oct 8, 2025). -- Install docs: https://google-gemini.github.io/gemini-cli/docs/extensions/ | Launch blog: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-cli-extensions/
> [63] Gemini CLI Extensions are the closest thing to composition in vendor SDKs -- packaged, installable capability units. But locked to Gemini ecosystem and flat (no nesting). -- https://google-gemini.github.io/gemini-cli/docs/extensions/
> [64] Framework fragmentation confirmed by multiple sources. Langfuse comparison (Mar 2025, updated through 2026) lists 12+ frameworks: LangGraph, OpenAI Agents SDK, Google ADK, Smolagents, CrewAI, AutoGen, Semantic Kernel, Strands Agents, Pydantic AI, Agno, Mastra, Microsoft Agent Framework. LinkedIn article "Agents Assemble: The New Fragmentation in AI Agent Frameworks" (Apr 11, 2025): "a proliferation of agent SDKs and toolkits that feels eerily like the Javascript framework wars of the 2010s." Docker report (Feb 20, 2026): "Rather than a 'year of the agents,' the data points to a decade-long transformation." -- Langfuse: https://langfuse.com/blog/2025-03-19-ai-agent-comparison | LinkedIn: https://www.linkedin.com/pulse/agents-assemble-new-fragmentation-ai-agent-frameworks-ravishankar-xnw4e | Docker: https://www.docker.com/blog/state-of-agentic-ai-key-findings/
> [65] Ronacher: "The differences between models are significant enough that you will need to build your own agent abstraction. We have not found any of the solutions from these SDKs that build the right abstraction for an agent." And: "Because the right abstraction is not yet clear, using the original SDKs from the dedicated platforms keeps you fully in control." -- Exact quotes verified by fetching the page. -- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/

---

### Transition

These aren't edge cases. They're the daily reality of building AI
systems with current tools. They share a root cause: the frameworks
you're building on made architectural decisions for you, and those
decisions are load-bearing walls you can't move.

*What if the architecture made none of those decisions for you?*

[Next: How Amplifier is different -->]

---

## Slide 2: The Architecture

*Goal: Show the structural difference. Let the architecture speak.*
*Developers who get it will get it in 30 seconds from the diagram.*
*This is where trust is built -- through technical honesty, not marketing.*

---

### Headline

**A kernel, not a framework. Every layer is a module you own.**

### The core idea

Amplifier is modeled on the Linux kernel philosophy: a tiny, stable
center that provides mechanisms, with all policies living at the edges
as replaceable modules.

The kernel is 2,600 lines of Python. It does four things:
1. Loads and unloads modules
2. Manages session lifecycle (initialize, execute, cleanup)
3. Dispatches events
4. Resolves hook precedence

That's it. It makes **zero decisions** about which model to use, how
the agent loop works, what tools are available, what gets logged or
blocked, or how memory is managed. Those are all modules -- and
every one of them is yours to choose, replace, or write from scratch.

### The diagram

```
Vendor SDKs:
  Your App --> [Vendor SDK] --> [Agent Loop]  --> [Vendor's API]
                                (fixed/opaque)    (one vendor)
              You control          You don't          You don't
              your app code        control this        choose this

Amplifier:
  Your App --> [Kernel] --> [Orchestrator module]  --> [Provider module(s)]
               2,600        How the loop works          Which LLMs answer
               lines        (you choose or write)       (any, multiple, simultaneous)
                        --> [Tool modules]           --> [Hook modules]
                            What the agent can do        The control plane
                            (add, remove, write)         (block, modify, inject, approve)
                        --> [Context module]
                            How memory works
                            (swap like a database)
```

### The five module types

Each type has a Protocol contract -- a stable interface that the
kernel enforces. Implement the interface, and your module works
with every other module. This is how replaceability actually works
in practice: not "you can fork the framework" but "you can swap
any layer and the rest doesn't notice."

**Provider** -- `complete(request) -> response`
Which LLM answers. Not a configuration option -- a module. You can
run Anthropic, OpenAI, Ollama, Azure, or your own fine-tuned model.
You can run *multiple simultaneously* and route between them.
Switching from Claude to GPT means swapping one module reference.
Your tools, hooks, orchestrator, and context don't change because
they never knew which model was answering.

**Orchestrator** -- `execute(prompt, context, providers, tools, hooks)`
How the agent loop runs. This is the biggest architectural difference
from every other system. In vendor SDKs, the orchestrator is the
framework itself -- you can configure it but not replace it. In
Amplifier, it's a module. The default orchestrator runs a standard
agentic loop (prompt -> tool calls -> results -> re-prompt). But
you can replace it with a streaming orchestrator, an event-driven
one, one that consults multiple models and picks the best response,
or one you write from scratch. Same kernel, same tools, same hooks,
completely different execution behavior.

**Tool** -- `execute(input) -> result`
What the agent can do. File operations, shell commands, web search,
code analysis, database queries -- each is a module you add or
remove. Write your own by implementing the Protocol. Tools are
"LLM-decided" -- the model chooses when to call them.

**Hook** -- `__call__(event, data) -> HookResult`
This is where Amplifier diverges most from the "callbacks" pattern in
other frameworks. Hooks aren't just observers. They're a full
control plane with five possible actions:

| Action | What it does | Example |
|--------|-------------|---------|
| `continue` | Pass through (default) | Logging, metrics |
| `deny` | Block the operation entirely | "Don't execute rm -rf" |
| `ask_user` | Pause and ask for human approval | "This will modify 47 files. Proceed?" |
| `modify` | Transform the event data in-flight | Redact API keys from logs |
| `inject_context` | Add information to the agent's conversation | Feed linting errors back so the agent fixes them |

Multiple hooks compose with deterministic precedence -- blocking
actions always win. This means you can layer hooks independently:
one hook redacts secrets, another enforces cost limits, a third
injects CI results. They don't know about each other and they
don't conflict.

The `inject_context` action has no real equivalent in vendor SDKs.
Gemini CLI's `systemMessage` in BeforeTool hooks is the closest,
but it only operates at tool boundaries. Amplifier hooks can inject
context at any lifecycle event -- which means you can build things
like: "after every code edit, run the linter and feed the errors
back to the agent automatically."

**Context** -- `add/get/set_messages, compact`
How memory works. Most frameworks give you one memory implementation
and no way to change it. Amplifier treats context as a replaceable
module. Simple context that keeps everything in memory. Persistent
context that survives across sessions. Your own implementation that
stores conversation history in a database, summarizes aggressively,
or manages multiple conversation threads. Same interface, different
behavior.

### The design principle

*"Could two teams want different behavior? Then it's a module, not
the kernel."*

This is the litmus test. Should the kernel choose the default model?
No -- two teams want different models. Module. Should the kernel
decide how to handle long conversations? No -- one team wants
summarization, another wants truncation, a third wants external
storage. Module. Should the kernel define the agent loop? No --
different use cases need fundamentally different loop behaviors.
Module.

The kernel provides mechanisms. Modules decide policy. That's why
the kernel is 2,600 lines and stable, while modules move fast
and independently.

### How this maps to the problems from Slide 1

| Problem | Root cause in vendor SDKs | Amplifier's structural answer |
|---------|--------------------------|-------------------------------|
| Model you started with isn't the one you need | Provider is a structural dependency | Provider is a swappable module |
| Can't change how your agent thinks | Agent loop is framework-internal | Orchestrator is a replaceable module |
| Can't control what happens around the model | Callbacks observe but don't control | Hooks are a control plane (deny/modify/inject/approve) |
| Workflow is a conversation you restart | No workflow abstraction exists | Recipe system (declarative YAML, approval gates, resumable) |
| What you build doesn't compose | No composition model | Bundle system (inherit, override, compose, share) |

### Transition

Architecture is a claim until you can touch it. Here's how you go
from reading about it to building with it.

[Next: Understand it, use it, make it yours -->]

---

## Slide 3: Understand It, Use It, Extend It

*Goal: This is the experimental layer -- the part Brian wants made
accessible. The architecture is interesting; this is where it becomes
practical. Three stages that match how developers actually adopt
a new tool: first you want to understand how it works, then you
want to use it for something real, then you want to bend it to
your specific needs.*

*Each stage is a doorway. The developer goes as deep as they want.*

---

### Headline

**From reading the kernel to building your own modules. Go as deep as you want.**

---

### Stage 1: Understand It

*What a developer does in their first hour. The goal is comprehension,
not production use. They want to know: is this real? Is the
architecture actually clean? Can I trust this?*

**Read the kernel.**
The entire kernel is ~2,600 lines of Python. No magic, no
metaprogramming, no hidden behavior. A developer can read it start
to finish and understand every decision it makes -- because there
are only four: load modules, manage sessions, dispatch events,
resolve hooks. This is deliberately readable code that prioritizes
clarity over cleverness.

For comparison: the Copilot SDK and Claude Agent SDK wrap closed
binaries that are 55-72MB. You can't read them. The OpenAI Agents
SDK is transparent but large enough that understanding the full
system takes significant investment. Amplifier's kernel is small
enough to hold in your head.

**Inspect the module contracts.**
Each of the five module types has a Protocol -- a Python interface
that defines the contract between the kernel and the module. These
are stable, documented, and short:

```python
# The entire Provider contract:
class Provider(Protocol):
    @property
    def name(self) -> str: ...
    @property
    def model(self) -> str: ...
    async def complete(self, request: CompletionRequest) -> CompletionResponse: ...
```

That's what it takes to be a provider. Implement those three
things and the kernel treats your module identically to the
official Anthropic or OpenAI providers. Every module type has
a similarly small contract.

**Trace a request through the system.**
Follow a single prompt from input to output:
1. Your prompt enters a Session
2. The Session passes it to the Orchestrator module
3. The Orchestrator calls the Provider module to get a model response
4. If the model requests tool calls, the Orchestrator invokes Tool modules
5. At each step, Hook modules fire and can observe, block, modify, or inject
6. The Context module manages what the model sees in its conversation window
7. Every event is written to a single JSONL log (the source of truth)

Every step is a module boundary. Every boundary is a point where
you can replace the behavior. The kernel just connects the pieces.

**What you understand after this stage:**
- The kernel is genuinely tiny and stable
- Module contracts are clean and small
- Every interesting behavior lives in modules, not the kernel
- There are no hidden decisions -- if behavior exists, a module owns it

---

### Stage 2: Use It

*What a developer does when they're convinced the architecture is
sound and they want to build something. The goal is: get a real
setup running, compose existing pieces, see results.*

**Compose a bundle.**
A bundle is a declarative package that assembles modules, context,
and agents into a working setup. This is where "composable" stops
being abstract:

```yaml
# A working development setup. ~14 lines.
bundle:
  name: my-dev-setup
  version: 0.1.0

includes:
  - foundation           # base tools (file ops, shell, search, web)
  - recipes              # workflow engine (declarative YAML pipelines)
  - python-dev           # Python intelligence (linting, types, LSP)

providers:
  - module: provider-anthropic
    config:
      model: claude-sonnet-4-20250514

hooks:
  - module: hooks-approval       # ask before destructive operations
  - module: hooks-redaction      # strip secrets from logs
```

That's a complete, functional setup. The `includes` pull in other
bundles -- and those bundles pull in their own dependencies, their
own agents, their own context. The thin bundle pattern means most
bundles are this small because they inherit everything else.

Key: the developer isn't configuring a product. They're composing
a system from independent modules. Remove `python-dev`, add
`tool-database` and a custom analysis agent -- it's a different
system assembled from the same kernel.

**Run a recipe.**
Recipes are declarative workflows -- repeatable, version-controlled,
shareable. This is the "infrastructure as code" moment for AI
workflows:

```yaml
# A code review pipeline. Runs identically every time.
name: pr-review
stages:
  review:
    steps:
      - agent: python-dev
        prompt: "Review {repo_path} for code quality, correctness, and style"
      - agent: security-guardian
        prompt: "Audit {repo_path} for security vulnerabilities"

  approve:
    needs_approval: true
    # Execution pauses here. A human reviews the findings.
    # They approve or deny. The recipe resumes or stops.

  report:
    steps:
      - agent: technical-writer
        prompt: "Synthesize all findings into a structured report"
```

This is what no vendor SDK provides. It's not "run these agents" --
it's a declared pipeline with stages, approval gates, context that
accumulates across steps, error handling, and resumability if
interrupted. You commit it to your repo. Your teammate runs the
same recipe. The results are consistent.

Recipes also support `foreach` loops (iterate over a list of files),
`while` loops (iterate until convergence), conditional execution
(skip steps based on context), and sub-recipes (recipes that invoke
other recipes). These are composable workflow primitives, not a
rigid pipeline.

**Use agents as context sinks.**
Agents in Amplifier are bundles -- same format, same composition
model. When you delegate a task to an agent, it runs in its own
session with its own context window. The heavy work (reading 20
files, running analysis, tracing code paths) happens in the agent's
context, and only a summary returns to yours.

This is a practical architecture decision, not just convenience:
your session stays lean while specialist agents absorb the token
cost of deep work. You orchestrate; they execute.

**What you can do after this stage:**
- Compose a working setup from existing modules and bundles
- Run declarative workflows with approval gates
- Delegate deep work to specialist agents
- Share your bundle with teammates who modify it for their own needs

---

### Stage 3: Extend It

*What a developer does when the existing modules don't cover their
specific need. This is where Amplifier's platform nature pays off:
you don't leave the system to add to it. You implement a Protocol
and your module is a first-class citizen.*

**Write a custom hook.**
Hooks are the most common extension point because they're the
smallest and most immediately useful. A hook that enforces your
team's commit message convention:

```python
# ~30 lines. Implements the Hook protocol.
class CommitConventionHook:
    name = "hooks-commit-convention"

    async def __call__(self, event, data):
        if event != "tool_call" or data.get("tool") != "bash":
            return HookResult(action="continue")

        command = data.get("input", {}).get("command", "")
        if not command.startswith("git commit"):
            return HookResult(action="continue")

        # Check for conventional commit format
        if not re.match(r"^git commit -m ['\"]?(feat|fix|docs|refactor|test|chore)", command):
            return HookResult(
                action="inject_context",
                context="Commit messages must follow conventional format: "
                        "feat|fix|docs|refactor|test|chore: description"
            )

        return HookResult(action="continue")
```

This hook fires on every bash tool call. If the command is a git
commit that doesn't follow the convention, it doesn't block it --
it *injects context* back to the agent, teaching it the convention.
The agent then reformats the commit message and tries again. The
developer didn't change the agent's prompt or modify the orchestrator.
They added a 30-line module that composes with everything else.

Notice what this hook can do that a callback in other frameworks
can't: it doesn't just observe the tool call, it feeds information
back into the agent's reasoning. The `inject_context` action means
the hook participates in the conversation, not just the logging.

**Write a custom tool.**
A tool gives the agent a new capability. A tool that queries your
team's internal documentation:

```python
class InternalDocsSearchTool:
    name = "internal-docs"
    description = "Search internal team documentation and knowledge base"

    def parameters(self):
        return {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"}
            },
            "required": ["query"]
        }

    async def execute(self, input):
        results = your_internal_search_api(input["query"])
        return ToolResult(content=format_results(results))
```

The model now has access to your internal docs. It can search them
when it needs context about your team's architecture, conventions,
or past decisions. This tool composes with every other tool, every
hook, every orchestrator. You add it to your bundle and it's available.

**Write a custom provider.**
If you run a fine-tuned model or a self-hosted instance, you
implement the Provider protocol:

```python
class MyFineTunedProvider:
    name = "my-finetuned"
    model = "my-org/code-reviewer-v3"

    async def complete(self, request):
        response = await call_my_model_endpoint(request)
        return CompletionResponse(content=response.text, ...)
```

The kernel doesn't know or care that this is a fine-tuned model
running on your infrastructure. It implements `complete()`, so it's
a valid provider. You can run it alongside Anthropic and OpenAI,
route specific tasks to it, and switch back if it underperforms.

**Compose a bundle for your team.**
Once you've written custom modules, you package them:

```yaml
bundle:
  name: my-team-platform
  version: 1.0.0

includes:
  - foundation
  - recipes
  - python-dev

tools:
  - module: ./modules/internal-docs    # your custom tool

hooks:
  - module: ./modules/commit-convention  # your custom hook
  - module: hooks-redaction              # existing module

behaviors:
  - ./behaviors/team-standards.yaml     # your review standards
```

Your teammate clones this repo. They run with your bundle. They
get your tools, your hooks, your standards. They add their own
frontend-specific tools. They override the provider to use a
different model. The bundle composes -- it doesn't copy.

If your hook is useful beyond your team, you publish it. It
becomes available to anyone in the ecosystem. Someone building a
completely different kind of system -- a documentation pipeline,
a data analysis workflow -- can pull in your commit convention
hook because modules are independent of the context they're
used in.

**Replace the orchestrator.**
This is the deepest extension point and the one that makes
Amplifier fundamentally different from frameworks. If none of the
existing orchestrators match your needs, you write your own:

```python
class MyOrchestrator:
    name = "my-custom-loop"

    async def execute(self, prompt, context, providers, tools, hooks):
        # Your agent loop. Your rules.
        # Maybe you consult two models and pick the better response.
        # Maybe you implement a ReAct loop with explicit reasoning steps.
        # Maybe you add a verification pass after every tool call.
        # The kernel doesn't care -- it just calls execute().
        ...
```

Same tools, same hooks, same providers, same context --
completely different execution behavior. No other system in the
current landscape offers this. Google ADK's CustomAgent is the
closest, but it's a framework class, not a module with a stable
contract.

**What you can do after this stage:**
- Write hooks that control agent behavior (not just observe it)
- Create tools that connect to your internal systems
- Build providers for your own models or endpoints
- Package everything into a composable, shareable bundle
- Replace the orchestrator itself if you need fundamentally different agent behavior

---

## Design Notes

### The three-stage arc

The stages map to developer adoption psychology:

| Stage | Developer mindset | What they need | Time |
|-------|-------------------|----------------|------|
| Understand | "Is this real? Is the architecture clean?" | Read code, inspect contracts, trace a request | 1 hour |
| Use | "Can I build something useful with this?" | Compose a bundle, run a recipe, see results | 1 afternoon |
| Extend | "Can I make this do exactly what I need?" | Write a hook, a tool, a provider, a bundle | 1 day |

Each stage builds trust. You don't ask them to write a custom module
before they've read the kernel. You don't show them a recipe before
they understand what modules compose it.

### Tone
- Technical, not breathless. No "revolutionary" or "game-changing."
- Respect the reader's intelligence. They can evaluate architecture.
- Honest about what Amplifier is (a platform/kernel) and isn't (a batteries-included product).
- Confident but not combative. The comparison table speaks for itself.
- Show real code. Developers trust code more than prose.

### Visual direction
- Slide 1: Text-forward. The scenarios should feel like stories, not bullet points.
  Maybe a subtle visual for each: a model swap that breaks, a locked binary, a
  conversation that resets.
- Slide 2: The diagram is the hero. Module blocks with clean lines. The five module
  types as a visual system (icons or color-coded blocks). The comparison table as
  secondary proof (maybe a hover/expand element).
- Slide 3: Code is the hero. Real Python, real YAML. Syntax-highlighted,
  copy-able. Each stage could be a tab or accordion -- the developer clicks
  deeper as they're ready.

### What this does NOT cover (intentionally)

- The broader "anyone can create" vision (that's the retention/ecosystem story, not acquisition)
- Non-developer personas (teacher, podcast creator -- those come after the dev is bought in)
- The CLI itself (the platform is the story; the CLI is one way to access it)
- Exhaustive feature lists (three proof points per stage > twenty bullet points)

### Relationship to existing narrative

- `amplifier-showcase-narrative.md` = the vision document (identity, expression, ecosystem)
- This document = the developer acquisition document (problem, architecture, experimental layer)
- They serve different audiences at different stages:
  - Developer lands on site --> THIS (3 slides)
  - Developer is bought in, explores further --> narrative, personas, Maya's story
  - Developer is building, finds community --> ecosystem vision

### Open questions

1. **Slide 1 length**: Five scenarios is thorough but possibly too much for a
   landing screen. Could condense to three (lock-in, control, composition) and
   let the other two live in Slide 2 as "here's how Amplifier addresses this."
2. **Slide 3 depth**: The understand/use/extend stages could each be their own
   page rather than one long scroll. Depends on site architecture.
3. **The comparison table in Slide 2**: Include it or not? Powerful but risks
   feeling combative. Could be a "how we compare" expandable section.
4. **Entry point calibration**: "Read the kernel" is compelling for architecture-
   minded devs. Need a parallel CTA for outcome-minded devs: "Run a recipe in
   5 minutes" or "Compose your first bundle."
5. **Orchestrator example**: The custom orchestrator code is the deepest, most
   differentiating example. But it's also the most abstract. Need a concrete
   use case: "Here's why you'd replace the orchestrator" with a before/after.
