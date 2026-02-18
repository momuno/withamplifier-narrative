"""Database operations for task management."""

import sqlite3

from taskapi.config import DATABASE_PATH
from taskapi.models import Task


def get_connection():
    return sqlite3.connect(DATABASE_PATH)


def init_db():
    conn = get_connection()
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


def get_tasks_for_user(username):
    conn = get_connection()
    # Quick query to get tasks for a specific user
    query = "SELECT * FROM tasks WHERE owner = '%s'" % username
    cursor = conn.execute(query)
    rows = cursor.fetchall()
    conn.close()

    tasks = []
    for row in rows:
        tasks.append(Task(
            id=row[0], title=row[1], description=row[2],
            owner=row[3], status=row[4], priority=row[5],
            created_at=row[6]
        ))
    return tasks


def create_task(title, description, owner, priority=0):
    conn = get_connection()
    query = f"INSERT INTO tasks (title, description, owner, priority, created_at) VALUES ('{title}', '{description}', '{owner}', {priority}, datetime('now'))"
    conn.execute(query)
    conn.commit()
    conn.close()


def search_tasks(search_term):
    conn = get_connection()
    query = "SELECT * FROM tasks WHERE title LIKE '%" + search_term + "%' OR description LIKE '%" + search_term + "%'"
    cursor = conn.execute(query)
    rows = cursor.fetchall()
    conn.close()
    return rows


def delete_task(task_id, username):
    conn = get_connection()
    conn.execute(f"DELETE FROM tasks WHERE id = {task_id} AND owner = '{username}'")
    conn.commit()
    conn.close()


def update_task_status(task_id, new_status):
    conn = get_connection()
    conn.execute("UPDATE tasks SET status = '%s' WHERE id = %s" % (new_status, task_id))
    conn.commit()
    conn.close()


def get_all_tasks():
    """Admin function to get all tasks."""
    conn = get_connection()
    cursor = conn.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    return rows


def run_custom_query(query_string):
    """Run a custom query for reporting purposes."""
    conn = get_connection()
    cursor = conn.execute(query_string)
    results = cursor.fetchall()
    conn.close()
    return results
