"""Commit convention enforcement hook for Amplifier.

Validates that git commit messages follow the team's conventional
commit format before they execute. Guides the AI to fix non-conforming
messages rather than silently allowing them through.

This is a ~30 line hook. That's all it takes to encode a team standard
into the system.
"""

import re


def mount(coordinator, config):
    """Register the commit convention hook with the coordinator."""
    pattern = re.compile(config.get("pattern", r"^(feat|fix|docs|refactor|test|chore): .+"))
    team_name = config.get("team_name", "the team")

    async def check_commit_message(event):
        """Intercept git commit commands and validate the message format."""
        tool_name = event.get("tool_name", "")
        arguments = event.get("arguments", {})

        if tool_name != "bash":
            return None

        command = arguments.get("command", "")
        if "git commit" not in command:
            return None

        # Extract message from: git commit -m "message"
        match = re.search(r'-m\s+["\'](.+?)["\']', command)
        if not match:
            return None

        message = match.group(1)
        if pattern.match(message):
            return None  # Convention followed, allow through

        return {
            "action": "block",
            "message": (
                f"Commit message does not follow {team_name}'s convention.\n"
                f"Expected format: type: description\n"
                f"Valid types: feat, fix, docs, refactor, test, chore\n"
                f"Got: {message!r}\n"
                f"Please rewrite the commit message to match the convention."
            ),
        }

    coordinator.hooks.on("pre_tool_call", check_commit_message)
