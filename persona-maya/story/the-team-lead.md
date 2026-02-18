# The Team Lead

*This is the first of three stories about people who used the same system to create completely different things. What they built reflects who they are -- because the system shaped itself around them.*

---

## Who She Is

Maya leads a four-person backend team. They ship Python services -- task queues, APIs, internal tools. The code moves fast. Most weeks, three or four PRs land. The problem isn't velocity. The problem is that reviews are inconsistent. Sometimes someone catches a SQL injection before it ships. Sometimes nobody does. Security review depends on who's online, how busy they are, and whether they remember to check.

Maya doesn't want to slow the team down. She wants a standard that runs the same way every time, catches what humans forget, and leaves a trail she can point to when someone asks "was this reviewed?"

She's technical. She's comfortable in a terminal. She doesn't have time to build a platform -- she needs something she can compose from parts that already exist and customize to her team's specific way of working.

---

## What She Composed

Maya's setup is a single file -- `team-review.md` -- that declares everything her workflow needs:

```yaml
bundle:
  name: team-review
  version: 1.0.0

includes:
  - bundle: git+https://github.com/microsoft/amplifier-foundation@main
  - bundle: git+https://github.com/microsoft/amplifier-bundle-recipes@main#subdirectory=behaviors/recipes.yaml
  - bundle: git+https://github.com/microsoft/amplifier-bundle-python-dev@main
  - bundle: team-review:behaviors/team-standards
```

Four lines of includes. That's the composition.

**What each line gives her:**

| Include | What It Adds | Why She Needs It |
|---------|-------------|------------------|
| `amplifier-foundation` | 16 specialist agents, streaming UI, session logging, file/search/web tools | The base everything else builds on |
| `amplifier-bundle-recipes` | Declarative multi-step workflows with approval gates | Her review runs as a repeatable recipe, not an ad-hoc chat |
| `amplifier-bundle-python-dev` | Pyright type checking, ruff linting, LSP-powered code intelligence | The agents understand Python semantically, not just as text |
| `team-review:behaviors/team-standards` | Approval hooks, log redaction, commit convention enforcement | Her team's specific standards encoded into the system |

The first three lines pull in existing ecosystem components. The fourth is hers -- a behavior she wrote that packages her team's standards as a reusable atom.

**What's NOT in the bundle is just as important.** No design agents. No style extraction. No voice strategy. No storytelling engine. Those exist in the ecosystem, but they're not her world. Her composition is subtractive -- it includes only what her team needs, which means the system feels like it was built for them, not adapted from something generic.

---

## How She Built It

Maya didn't write YAML by hand. She opened a terminal and described what she needed:

```
I lead a 4-person Python backend team. We ship 3-4 PRs a week and reviews
are inconsistent -- sometimes someone catches a SQL injection, sometimes
nobody does. I need:

- Consistent code review: quality, security, test coverage
- An approval gate before the security scan runs so I can see code quality
  findings first and decide whether to proceed
- Reports I can paste into Slack without leaking secrets
- Commit message enforcement: we use conventional commits
  (feat/fix/docs/refactor/test/chore: description)
```

That was it. One prompt.

The system already knows its own ecosystem -- what modules exist, what the hook protocol looks like, how recipes work, how bundles compose. It didn't need Maya to know any of that. From what she said, it derived everything:

- "Python backend team" meant include `python-dev` for Pyright, ruff, and LSP
- "code review, security, test coverage" meant include `foundation` with its specialist agents
- "approval gate" and "repeatable workflow" meant include `recipes` with staged execution
- "reports without leaking secrets" meant include `foundation:behaviors/redaction`
- "conventional commits" meant build a hook -- because no module existed for it yet

In one exchange, the system composed the bundle, wrote the behavior YAML with approval and redaction hooks, created the context file with her team's review priorities, built the 30-line commit convention hook, and drafted the three-stage recipe. Maya looked at the output, adjusted a few details, and it was done.

### Making Sure It Worked

Having the artifacts isn't the same as knowing they work. Maya activated her bundle, pointed the recipe at a codebase, and ran it:

```
run the recipe recipe/pr-review.yaml with project_path=./src
```

The first run is the real test. Does the bundle load? Do the hooks fire? Does the recipe pause at the approval gate? Does the security audit produce findings? Does the final report synthesize everything?

She watched it execute -- the code review stage ran, the recipe paused and showed her the findings, she approved, the security audit ran, and the report came out the other side. Then she had the system validate the results against what she'd originally asked for: did the recipe actually cover code quality, security, and test coverage? Did the approval gate work? Were the findings actionable?

A few things needed fixing on that first pass -- a module path that didn't resolve correctly, a reference that pointed to the wrong place. Normal first-run issues. She fixed them, ran it again, and it was clean.

That validation loop -- create, run, verify, fix, run again -- is how the artifacts go from "generated" to "reliable." The system creates the scaffolding. The first real execution proves it. And because the recipe is declarative and the bundle is composable, once it works, it works the same way every time.

---

## What It Produced

Maya wrote a recipe -- `pr-review.yaml` -- that defines her team's review workflow as three stages:

**Stage 1: Code Review** (runs automatically)
- `zen-architect` agent reads every source file and flags code quality issues -- dead code, missing type hints, poor error handling, naming problems
- `test-coverage` agent identifies which critical code paths have no tests and suggests specific test cases to add

**Stage 2: Security Audit** (requires human approval)
- After the code review finishes, the recipe pauses and shows Maya the findings
- She reads them, decides whether to proceed with the security audit or stop and fix code quality first
- If she approves, `security-guardian` agent performs a comprehensive security scan -- SQL injection, hardcoded secrets, authentication flaws, OWASP Top 10 categorization

**Stage 3: Report** (runs automatically after security audit)
- Synthesizes everything into a structured report: executive summary, critical findings, priority ranking, test gaps, and a clear ship / ship-with-changes / do-not-ship recommendation

She runs it with one command:

```
amplifier recipe run pr-review.yaml project_path=./src
```

The recipe runs Stage 1, pauses at the approval gate, shows her the code review findings, waits for her to approve, runs the security audit, and produces the final report. Every run is logged. The logs are redacted -- no API keys or secrets appear in the output, so she can paste the report into the team's Slack channel.

---

## The Missing Piece

Three weeks in, Maya hits a friction point. Her team has a commit message convention -- `type: description` where type is one of `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. The AI assistant writes good commits, but sometimes it forgets the format. There's no module in the ecosystem for this.

So she builds one.

The entire hook is one file -- 30 lines of Python:

```python
def mount(coordinator, config):
    pattern = re.compile(config.get("pattern", r"^(feat|fix|docs|refactor|test|chore): .+"))
    team_name = config.get("team_name", "the team")

    async def check_commit_message(event):
        tool_name = event.get("tool_name", "")
        arguments = event.get("arguments", {})

        if tool_name != "bash":
            return None

        command = arguments.get("command", "")
        if "git commit" not in command:
            return None

        match = re.search(r'-m\s+["\'](.+?)["\']', command)
        if not match:
            return None

        message = match.group(1)
        if pattern.match(message):
            return None

        return {
            "action": "block",
            "message": f"Commit message does not follow {team_name}'s convention.\n"
                       f"Expected: type: description\n"
                       f"Got: {message!r}\n"
                       f"Please rewrite the commit message.",
        }

    coordinator.hooks.on("pre_tool_call", check_commit_message)
```

It intercepts git commit commands, checks the message against the team's pattern, and blocks non-conforming messages with clear guidance. She adds it to her behavior YAML:

```yaml
hooks:
  - module: hooks-commit-convention
    source: ../modules/hooks-commit-convention
    config:
      pattern: "^(feat|fix|docs|refactor|test|chore): .+"
      team_name: "Backend Team"
```

Now it's part of her bundle. When a teammate pulls her setup, they get the commit convention enforcement automatically.

Maya didn't file a feature request. She didn't wait for a vendor to add commit convention support. She described what she needed, the system -- which understands its own architecture -- helped her build a 30-line module that plugs into the same hook system that powers the logging, redaction, and approval gates she's already using.

---

## What's Hers

Maya's complete setup:

```
team-review/
├── team-review.md          20 lines   The bundle declaration
├── behaviors/
│   └── team-standards.yaml 18 lines   Approval + redaction + commit hook
├── context/
│   └── team-instructions.md           Her team's review priorities
├── modules/
│   └── hooks-commit-convention/       30 lines of Python
└── recipe/
    └── pr-review.yaml                 The 3-stage review workflow
```

It's a file she can read, version, and share. It encodes how her team works -- their review priorities, their security standards, their commit convention. Another team would compose differently, because they work differently. That's the point.

---

## What This Story Is Really About

Maya is a developer. She's comfortable with YAML and Python. She composed existing pieces and built one new one.

But the system she used -- the kernel, the module protocol, the composition model -- doesn't know that she's a developer. It doesn't assume she writes code. It provides mechanisms: providers connect to models, tools give agents capabilities, hooks observe and control, recipes orchestrate workflows, bundles compose it all together.

A podcast creator uses the same mechanisms to build a production pipeline. A teacher uses them to create curriculum materials. They compose different pieces. They build different things. They don't touch YAML or Python -- they describe who they are and what they need, and the system shapes itself around their answers.

Maya's story is the first chapter. The system is the same. The people are different. What they create is theirs.

---

*Next: A podcast creator who turned six hours of weekly post-production into a one-command recipe. And a teacher who built curriculum materials in her own voice without writing a line of code.*
