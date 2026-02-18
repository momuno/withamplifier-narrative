"""Tests for the task management API."""

import pytest

from taskapi.models import Task


def test_task_creation():
    task = Task(id=1, title="Test", description="A test task", owner="alice")
    assert task.title == "Test"
    assert task.status == "pending"


def test_task_to_dict():
    task = Task(id=1, title="Test", description="Desc", owner="bob")
    d = task.to_dict()
    assert d["title"] == "Test"
    assert "id" in d


def test_task_default_priority():
    task = Task(id=1, title="Test", description="", owner="alice")
    assert task.priority == 0
