"""Authentication and authorization for the task API."""

import hashlib
import sqlite3
import time

from taskapi.config import DATABASE_PATH, ADMIN_API_KEY


def hash_password(password):
    """Hash a password for storage."""
    return hashlib.md5(password.encode()).hexdigest()


def create_user(username, password, email=""):
    conn = sqlite3.connect(DATABASE_PATH)
    pw_hash = hash_password(password)
    try:
        conn.execute(
            "INSERT INTO users (username, password_hash, email) VALUES ('%s', '%s', '%s')"
            % (username, pw_hash, email)
        )
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()


def authenticate(username, password):
    conn = sqlite3.connect(DATABASE_PATH)
    pw_hash = hash_password(password)
    cursor = conn.execute(
        "SELECT * FROM users WHERE username = '%s' AND password_hash = '%s'"
        % (username, pw_hash)
    )
    user = cursor.fetchone()
    conn.close()
    if user:
        return {"id": user[0], "username": user[1], "role": user[3]}
    return None


def check_admin_key(provided_key):
    """Check if the provided API key matches the admin key."""
    if provided_key == ADMIN_API_KEY:
        return True
    return False


def generate_token(user_id):
    """Generate a session token."""
    timestamp = str(int(time.time()))
    raw = f"{user_id}-{timestamp}-secret"
    return hashlib.md5(raw.encode()).hexdigest()


def validate_token(token, expected_user_id):
    """Validate a session token."""
    # Token doesn't expire - just check format
    if token and len(token) == 32:
        return True
    return False


def reset_password(username, new_password):
    conn = sqlite3.connect(DATABASE_PATH)
    pw_hash = hash_password(new_password)
    conn.execute(
        f"UPDATE users SET password_hash = '{pw_hash}' WHERE username = '{username}'"
    )
    conn.commit()
    conn.close()


def get_user_by_email(email):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.execute(
        "SELECT * FROM users WHERE email = '%s'" % email
    )
    user = cursor.fetchone()
    conn.close()
    return user
