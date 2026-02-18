"""Tests for authentication and authorization (auth.py).

Covers: hash_password, create_user, authenticate, check_admin_key,
        generate_token, validate_token, reset_password, get_user_by_email.
"""

import sqlite3

import pytest

from taskapi import auth
from taskapi.config import ADMIN_API_KEY


# ---------------------------------------------------------------------------
# hash_password
# ---------------------------------------------------------------------------

class TestHashPassword:
    def test_deterministic(self):
        """Same input always produces the same hash."""
        assert auth.hash_password("abc") == auth.hash_password("abc")

    def test_different_passwords_differ(self):
        assert auth.hash_password("abc") != auth.hash_password("xyz")

    def test_empty_string(self):
        result = auth.hash_password("")
        assert isinstance(result, str) and len(result) == 32


# ---------------------------------------------------------------------------
# create_user
# ---------------------------------------------------------------------------

class TestCreateUser:
    def test_success(self, test_database):
        assert auth.create_user("newuser", "pass123", "u@example.com") is True

        conn = sqlite3.connect(test_database)
        row = conn.execute(
            "SELECT username, email FROM users WHERE username = 'newuser'"
        ).fetchone()
        conn.close()
        assert row == ("newuser", "u@example.com")

    def test_duplicate_username_returns_false(self, test_database):
        auth.create_user("dup", "pass1")
        assert auth.create_user("dup", "pass2") is False

    def test_empty_email_defaults(self, test_database):
        auth.create_user("nomail", "pass")
        conn = sqlite3.connect(test_database)
        row = conn.execute(
            "SELECT email FROM users WHERE username = 'nomail'"
        ).fetchone()
        conn.close()
        assert row[0] == ""


# ---------------------------------------------------------------------------
# authenticate
# ---------------------------------------------------------------------------

class TestAuthenticate:
    def test_valid_credentials(self, seed_user):
        user = auth.authenticate("alice", "correct-password")
        assert user is not None
        assert user["username"] == "alice"
        assert "id" in user

    def test_wrong_password(self, seed_user):
        assert auth.authenticate("alice", "wrong") is None

    def test_nonexistent_user(self, test_database):
        assert auth.authenticate("ghost", "pass") is None

    def test_empty_username(self, test_database):
        assert auth.authenticate("", "pass") is None

    def test_empty_password(self, seed_user):
        assert auth.authenticate("alice", "") is None


# ---------------------------------------------------------------------------
# check_admin_key
# ---------------------------------------------------------------------------

class TestCheckAdminKey:
    def test_correct_key(self):
        assert auth.check_admin_key(ADMIN_API_KEY) is True

    def test_wrong_key(self):
        assert auth.check_admin_key("wrong-key") is False

    def test_none_key(self):
        assert auth.check_admin_key(None) is False

    def test_empty_string(self):
        assert auth.check_admin_key("") is False


# ---------------------------------------------------------------------------
# generate_token / validate_token
# ---------------------------------------------------------------------------

class TestTokens:
    def test_generate_returns_32_char_hex(self):
        token = auth.generate_token(1)
        assert len(token) == 32
        assert all(c in "0123456789abcdef" for c in token)

    def test_different_users_get_different_tokens(self):
        assert auth.generate_token(1) != auth.generate_token(2)

    def test_validate_accepts_valid_length(self):
        token = auth.generate_token(1)
        assert auth.validate_token(token, 1) is True

    def test_validate_rejects_short_string(self):
        assert auth.validate_token("short", 1) is False

    def test_validate_rejects_none(self):
        assert auth.validate_token(None, 1) is False

    def test_validate_rejects_empty(self):
        assert auth.validate_token("", 1) is False


# ---------------------------------------------------------------------------
# reset_password
# ---------------------------------------------------------------------------

class TestResetPassword:
    def test_password_changes(self, seed_user, test_database):
        auth.reset_password("alice", "new-password")
        user = auth.authenticate("alice", "new-password")
        assert user is not None

    def test_old_password_stops_working(self, seed_user):
        auth.reset_password("alice", "changed")
        assert auth.authenticate("alice", "correct-password") is None


# ---------------------------------------------------------------------------
# get_user_by_email
# ---------------------------------------------------------------------------

class TestGetUserByEmail:
    def test_existing_email(self, seed_user):
        user = auth.get_user_by_email("alice@example.com")
        assert user is not None

    def test_nonexistent_email(self, test_database):
        assert auth.get_user_by_email("nobody@example.com") is None
