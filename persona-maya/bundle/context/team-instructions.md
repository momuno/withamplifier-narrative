# Team Review Standards

## Code Review Priorities

When reviewing code for this team, evaluate in this order:

1. **Security** -- SQL injection, hardcoded secrets, input validation, authentication flaws
2. **Correctness** -- Does the code do what it claims? Are edge cases handled?
3. **Test coverage** -- Are critical paths tested? Are there gaps?
4. **Code quality** -- Type hints, dead code, naming, documentation
5. **Maintainability** -- Is this code easy for the next person to understand?

## Commit Convention

This team uses conventional commits. Every commit message must follow:

```
type: short description
```

Where `type` is one of: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Examples:
- `feat: add rate limiting to task creation endpoint`
- `fix: use parameterized queries in database layer`
- `docs: add API endpoint documentation`

## Review Output Format

When producing a review report, structure it as:

### Summary
One paragraph overview of the change and its risk level.

### Security Findings
List each finding with severity (critical/high/medium/low), location (file:line), description, and recommended fix.

### Code Quality Issues
List each issue with category, location, and recommendation.

### Test Coverage Gaps
List untested critical paths and suggest specific test cases.

### Recommendation
Ship / Ship with changes / Do not ship -- with clear reasoning.
