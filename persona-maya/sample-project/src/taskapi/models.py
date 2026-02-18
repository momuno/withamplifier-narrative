"""Data models for the task management API."""

from dataclasses import dataclass
from datetime import datetime


@dataclass
class Task:
    id: int
    title: str
    description: str
    owner: str
    status: str = "pending"
    priority: int = 0
    created_at: str = ""

    def __post_init__(self):
        if not self.created_at:
            self.created_at = datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "owner": self.owner,
            "status": self.status,
            "priority": self.priority,
            "created_at": self.created_at,
        }


@dataclass
class User:
    id: int
    username: str
    password_hash: str
    role: str = "user"
    email: str = ""
