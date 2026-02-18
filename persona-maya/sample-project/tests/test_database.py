"""Tests for database operations (database.py).

Covers: init_db, get_tasks_for_user, create_task, search_tasks,
        delete_task, update_task_status, get_all_tasks, run_custom_query.
"""

import sqlite3

import pytest

from taskapi import database
from taskapi.models import Task


# ---------------------------------------------------------------------------
# init_db
# ---------------------------------------------------------------------------

class TestInitDb:
    def test_creates_tables(self, test_database):
        database.init_db()
        conn = sqlite3.connect(test_database)
        tables = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ).fetchall()
        conn.close()
        table_names = {t[0] for t in tables}
        assert "tasks" in table_names
        assert "users" in table_names

    def test_idempotent(self, test_database):
        """Calling init_db twice does not raise."""
        database.init_db()
        database.init_db()


# ---------------------------------------------------------------------------
# create_task / get_tasks_for_user
# ---------------------------------------------------------------------------

class TestCreateAndGetTasks:
    def test_create_and_retrieve(self, test_database):
        database.create_task("My task", "Details", "alice", priority=2)
        tasks = database.get_tasks_for_user("alice")
        assert len(tasks) == 1
        assert isinstance(tasks[0], Task)
        assert tasks[0].title == "My task"
        assert tasks[0].priority == 2

    def test_get_tasks_filters_by_owner(self, seed_tasks):
        alice_tasks = database.get_tasks_for_user("alice")
        bob_tasks = database.get_tasks_for_user("bob")
        assert len(alice_tasks) == 2
        assert len(bob_tasks) == 1

    def test_get_tasks_empty_for_unknown_user(self, test_database):
        assert database.get_tasks_for_user("nobody") == []

    def test_create_task_default_priority(self, test_database):
        database.create_task("Simple", "", "alice")
        tasks = database.get_tasks_for_user("alice")
        assert tasks[0].priority == 0


# ---------------------------------------------------------------------------
# search_tasks
# ---------------------------------------------------------------------------

class TestSearchTasks:
    def test_finds_by_title(self, seed_tasks):
        results = database.search_tasks("groceries")
        assert len(results) == 1

    def test_finds_by_description(self, seed_tasks):
        results = database.search_tasks("Q4 summary")
        assert len(results) == 1

    def test_returns_empty_for_no_match(self, seed_tasks):
        assert database.search_tasks("zzz_no_match") == []

    def test_empty_search_returns_all(self, seed_tasks):
        results = database.search_tasks("")
        assert len(results) == 3


# ---------------------------------------------------------------------------
# delete_task
# ---------------------------------------------------------------------------

class TestDeleteTask:
    def test_owner_can_delete(self, seed_tasks):
        tasks_before = database.get_tasks_for_user("alice")
        task_id = tasks_before[0].id
        database.delete_task(task_id, "alice")
        tasks_after = database.get_tasks_for_user("alice")
        assert len(tasks_after) == len(tasks_before) - 1

    def test_non_owner_cannot_delete(self, seed_tasks):
        alice_tasks = database.get_tasks_for_user("alice")
        task_id = alice_tasks[0].id
        database.delete_task(task_id, "bob")  # bob is not the owner
        # Task should still exist
        assert len(database.get_tasks_for_user("alice")) == len(alice_tasks)

    def test_delete_nonexistent_id(self, test_database):
        """Deleting a non-existent task should not raise."""
        database.delete_task(9999, "alice")


# ---------------------------------------------------------------------------
# update_task_status
# ---------------------------------------------------------------------------

class TestUpdateTaskStatus:
    def test_status_changes(self, seed_tasks):
        tasks = database.get_tasks_for_user("alice")
        task_id = tasks[0].id
        database.update_task_status(task_id, "done")
        updated = database.get_tasks_for_user("alice")
        found = [t for t in updated if t.id == task_id][0]
        assert found.status == "done"


# ---------------------------------------------------------------------------
# get_all_tasks
# ---------------------------------------------------------------------------

class TestGetAllTasks:
    def test_returns_all(self, seed_tasks):
        all_tasks = database.get_all_tasks()
        assert len(all_tasks) == 3

    def test_empty_db(self, test_database):
        assert database.get_all_tasks() == []


# ---------------------------------------------------------------------------
# run_custom_query
# ---------------------------------------------------------------------------

class TestRunCustomQuery:
    def test_select_query(self, seed_tasks):
        results = database.run_custom_query("SELECT COUNT(*) FROM tasks")
        assert results[0][0] == 3

    def test_invalid_query_raises(self, test_database):
        with pytest.raises(Exception):
            database.run_custom_query("INVALID SQL GARBAGE")
