"""Shared test fixtures for taskapi tests."""

import sqlite3

import pytest


@pytest.fixture(autouse=True)
def test_database(tmp_path, monkeypatch):
    """Create a fresh temp DB for every test."""
    db_path = str(tmp_path / "test_tasks.db")
    monkeypatch.setattr("taskapi.config.DATABASE_PATH", db_path)
    monkeypatch.setattr("taskapi.database.DATABASE_PATH", db_path)
    monkeypatch.setattr("taskapi.auth.DATABASE_PATH", db_path)

    # Initialize schema
    conn = sqlite3.connect(db_path)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            owner TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            priority INTEGER DEFAULT 0,
            created_at TEXT
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            email TEXT
        )
    """)
    conn.commit()
    conn.close()

    yield db_path


@pytest.fixture
def app_client(test_database):
    """Flask test client with isolated database."""
    from taskapi.app import app

    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def seed_user(test_database):
    """Insert a test user and return their info."""
    from taskapi.auth import hash_password

    conn = sqlite3.connect(test_database)
    pw_hash = hash_password("correct-password")
    conn.execute(
        "INSERT INTO users (username, password_hash, role, email) VALUES (?, ?, ?, ?)",
        ("alice", pw_hash, "user", "alice@example.com"),
    )
    conn.commit()
    conn.close()
    return {
        "username": "alice",
        "password": "correct-password",
        "email": "alice@example.com",
    }


@pytest.fixture
def seed_tasks(test_database):
    """Insert sample tasks and return them."""
    conn = sqlite3.connect(test_database)
    tasks = [
        ("Buy groceries", "Milk, eggs, bread", "alice", "pending", 1),
        ("Write report", "Q4 summary", "alice", "in_progress", 2),
        ("Fix bug", "Issue #42", "bob", "done", 3),
    ]
    conn.executemany(
        "INSERT INTO tasks (title, description, owner, status, priority, created_at) "
        "VALUES (?, ?, ?, ?, ?, datetime('now'))",
        tasks,
    )
    conn.commit()
    conn.close()
    return tasks
