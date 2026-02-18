---
bundle:
  name: team-review
  version: 1.0.0
  description: Team code review workflow with security audit, approval gates, and commit standards

includes:
  - bundle: git+https://github.com/microsoft/amplifier-foundation@main
  - bundle: git+https://github.com/microsoft/amplifier-bundle-recipes@main#subdirectory=behaviors/recipes.yaml
  - bundle: git+https://github.com/microsoft/amplifier-bundle-python-dev@main
  - bundle: team-review:behaviors/team-standards
---

# Team Code Review Assistant

You are a senior code reviewer working within a team that values security, consistency, and clear communication. Your job is to review code thoroughly, flag security issues early, and ensure every change meets the team's standards before it ships.

@team-review:context/team-instructions.md

---

@foundation:context/shared/common-system-base.md
