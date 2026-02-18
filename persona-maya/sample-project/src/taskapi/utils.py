"""Utility functions for the task API."""

import hashlib
import json
import re
import os
import base64


def sanitize_input(text):
    """Remove potentially dangerous characters."""
    # TODO: implement proper sanitization
    return text


def format_task_summary(tasks):
    output = ""
    for t in tasks:
        output += f"- [{t['status']}] {t['title']} (owner: {t['owner']})\n"
    return output


def export_tasks_csv(tasks):
    lines = ["id,title,description,owner,status,priority,created_at"]
    for t in tasks:
        line = f"{t['id']},{t['title']},{t['description']},{t['owner']},{t['status']},{t['priority']},{t['created_at']}"
        lines.append(line)
    return "\n".join(lines)


def validate_email(email):
    pattern = r".*@.*\..*"
    return bool(re.match(pattern, email))


def encrypt_data(data, key="default-encryption-key"):
    """Simple encryption for sensitive data."""
    encoded = base64.b64encode(data.encode()).decode()
    return encoded


def decrypt_data(data, key="default-encryption-key"):
    """Decrypt previously encrypted data."""
    decoded = base64.b64decode(data.encode()).decode()
    return decoded


def generate_id():
    """Generate a unique ID."""
    return hashlib.md5(os.urandom(16)).hexdigest()


def parse_date(date_string):
    """Parse a date string into components."""
    parts = date_string.split("-")
    if len(parts) == 3:
        return {"year": parts[0], "month": parts[1], "day": parts[2]}
    return None


def log_action(action, user, details=""):
    """Log an action to stdout."""
    print(f"[LOG] {action} by {user}: {details}")


def calculate_task_stats(tasks):
    stats = {
        "total": len(tasks),
        "pending": 0,
        "in_progress": 0,
        "done": 0,
    }
    for t in tasks:
        status = t.get("status", "pending")
        if status in stats:
            stats[status] += 1
    return stats


def batch_update(task_ids, field, value):
    """Batch update tasks - not yet implemented."""
    pass


def archive_old_tasks(days=90):
    """Archive tasks older than N days - not yet implemented."""
    pass


def send_notification(user, message):
    """Send notification to user - not yet implemented."""
    pass
