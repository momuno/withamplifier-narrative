# Amplifier Showcase: Your System, Your Way

This project demonstrates Amplifier's composability through real, functional artifacts. It tells the story of one person -- a team lead named Maya -- who composed a code review workflow from existing ecosystem pieces and built a custom module when one didn't exist. It's the first chapter of a larger narrative about how the same system becomes different things for different people.

## What's Here

```
persona-maya/
├── story/
│   └── the-team-lead.md              Maya's story -- the narrative
│
├── bundle/
│   ├── bundle.md                     The bundle -- 20 lines of YAML
│   ├── behaviors/
│   │   └── team-standards.yaml       Team-specific hooks and standards
│   ├── context/
│   │   └── team-instructions.md      Review priorities and conventions
│   └── modules/
│       └── hooks-commit-convention/  Custom hook -- 30 lines of Python
│
├── recipe/
│   └── pr-review.yaml                3-stage review workflow with approval gates
│
├── sample-project/                   A Python API with intentional issues
│   ├── src/taskapi/
│   │   ├── app.py                    Missing input validation, debug endpoint
│   │   ├── auth.py                   MD5 passwords, SQL injection
│   │   ├── database.py               SQL injection throughout
│   │   ├── config.py                 Hardcoded API key and secret
│   │   ├── models.py                 Data models (relatively clean)
│   │   └── utils.py                  Dead code, fake encryption
│   └── tests/
│       └── test_app.py               3 tests for an entire API
│
└── README.md
```

## The Composition

Maya's bundle includes four things:

| Include | What It Adds |
|---------|-------------|
| **amplifier-foundation** | 16 specialist agents, streaming UI, session logging, file/search/web tools |
| **amplifier-bundle-recipes** | Declarative workflows with approval gates |
| **amplifier-bundle-python-dev** | Pyright, ruff, LSP -- Python-specific code intelligence |
| **team-review:behaviors/team-standards** | Her team's standards: approval hooks, log redaction, commit convention |

The first three are ecosystem components. The fourth is hers.

## Running It

### Prerequisites

```bash
# Install Amplifier
uv tool install git+https://github.com/microsoft/amplifier

# Set up a provider (pick one)
amplifier provider use anthropic
# or: amplifier provider use openai
```

### Use the bundle

```bash
# Start an interactive session with Maya's bundle
amplifier bundle add file:///<bundle-path-to>/team-review.md
amplifier bundle use team-review
amplifier

# Then ask it to review the sample project:
> Review the code in sample-project/ for security issues and code quality
```

### Run the review recipe against the sample project

```bash
cd amplifier-showcase/persona-maya

amplifier run "run the recipe recipe/pr-review.yaml with project_path=./sample-project"
# OR
amplifier tool invoke recipes operation=execute recipe_path=recipe/pr-review.yaml context='{"project_path"="./sample-project"}'

# The recipe will:
# 1. Run code quality analysis (automatic)
# 2. Run test coverage analysis (automatic)
# 3. Pause at the approval gate -- show you findings, wait for your approval
# 4. Run security audit (after you approve)
# 5. Produce a final report
```



## What the Review Finds

The sample project (`sample-project/`) is a small Python task management API with intentionally planted issues across several categories:

**Security (Critical)**
- SQL injection in every database function (string formatting, not parameterized queries)
- Hardcoded API key and secret in `config.py`
- MD5 password hashing with no salt in `auth.py`
- Admin endpoint accepts raw SQL queries
- Debug endpoint exposes configuration including secrets
- Traceback details leaked in error responses

**Security (High)**
- No rate limiting on any endpoint
- Token validation doesn't actually validate anything
- String comparison for API key (timing attack)
- No CSRF protection
- Listening on 0.0.0.0 with debug mode enabled

**Code Quality**
- Missing type hints throughout
- Unused imports and dead code in `utils.py`
- Fake encryption (base64 encode, not encryption)
- Incomplete `sanitize_input()` function (TODO comment)
- Multiple unimplemented stub functions

**Test Coverage**
- 3 tests total for an entire API
- Only tests the `Task` model -- zero endpoint tests
- No security tests
- No database operation tests
- No auth flow tests

## The Custom Hook

When Maya's team needed commit convention enforcement and no module existed for it, she built one. The entire implementation is 30 lines of Python in `bundle/modules/hooks-commit-convention/`.

It intercepts `git commit` commands, validates the message against the pattern `type: description` (where type is feat/fix/docs/refactor/test/chore), and blocks non-conforming messages with guidance.

This is the "build what's missing" moment in the story. The hook implements the same protocol as the logging, redaction, and approval hooks that ship with the ecosystem. One module, one protocol, plugs into the same system.

## The Larger Story

This is chapter one. Maya is a developer. She composed existing pieces and built one new one.

The same system -- the same kernel, the same module protocol, the same composition model -- serves:

- **A podcast creator** who composes `tool-youtube-dl` + `tool-whisper` + `module-style-extraction` + `recipes` into a weekly production pipeline. Different modules. Different workflow. Same system.

- **A teacher** who composes `design-intelligence` + `module-style-extraction` + `stories` into a curriculum creation tool. No code tools at all. Same system.

The interesting thing isn't the technology. It's that the technology disappears into each person's specific need. What they create reflects who they are -- because the system shaped itself around them.

Read the full narrative: [story/the-team-lead.md](story/the-team-lead.md)

Read the showcase vision: see `amplifier-showcase-narrative.md` in the parent directory.
