# Industry & Developer Opinions - AI Agent SDKs

## Key Theme 1: "Do You Even Need a Framework?"
Loudest counter-narrative. Armin Ronacher (Flask creator, Sentry CTO):
> "We would not make that choice again. The differences between models are significant enough that you will need to build your own agent abstraction."

He advocates targeting raw provider SDKs directly.

## Key Theme 2: Vendor Lock-in Is Primary Concern
- OpenAI Agents: Mitigates with 100+ providers via LiteLLM
- Claude Agent SDK: Deeply tied to Anthropic
- GitHub Copilot SDK: Most locked-in (Microsoft ecosystem)
- MCP seen as escape valve

## Key Theme 3: Claude Models Win the Agentic Loop
Remarkable convergence:
- GitHub's own Copilot coding agent uses Claude 3.7 Sonnet under the hood
- Ronacher: "Haiku and Sonnet are still the best tool callers available"
- Multiple practitioners prefer Claude for multi-turn tool use

## Key Theme 4: "Right Abstraction" Not Found Yet
- Ronacher: "SDK abstractions break once you hit real tool use"
- Testing/evals called "the hardest problem" with no convinced solutions
- Each SDK's abstractions considered leaky under real conditions

## Key Theme 5: Framework Landscape Fragmenting
As of early 2026: OpenAI Agents, Claude Agent SDK, Copilot SDK, LangGraph, PydanticAI, Google ADK, Microsoft Agent Framework, CrewAI, AutoGen, Semantic Kernel, SmolAgents, Strands Agents...
No clear consensus emerging.

## Per-SDK Sentiment

### GitHub Copilot SDK
- Praised: GitHub ecosystem integration, existing subscription
- Criticized: Vendor lock-in, management-driven adoption, too new
- Position: Platform play for Microsoft ecosystem

### OpenAI Agents SDK
- Praised: Simplicity, low barrier, provider-agnostic, clean handoffs
- Criticized: Not great for complex orchestration, GPT not best for agentic loops
- Position: Solid starting point, outgrown quickly by advanced users

### Claude Agent SDK
- Praised: Battle-tested (Claude Code heritage), best tool-calling models, MCP
- Criticized: Subprocess wrapper, latency concerns, Claude-only
- Position: Most production-mature of the three

## Practitioner Decision Framework
| Need | Recommendation |
|---|---|
| Quick multi-agent prototype | OpenAI Agents SDK |
| Production single-agent | Claude Agent SDK |
| Complex workflows + HITL | LangGraph |
| Microsoft enterprise | GitHub Copilot SDK |
| Maximum control | Raw provider SDKs directly |
| Simple single LLM call | No framework |
