"""Tests for utility functions (utils.py).

Covers: sanitize_input, format_task_summary, export_tasks_csv,
        validate_email, encrypt_data/decrypt_data, generate_id,
        parse_date, calculate_task_stats.
"""

import pytest

from taskapi.utils import (
    calculate_task_stats,
    decrypt_data,
    encrypt_data,
    export_tasks_csv,
    format_task_summary,
    generate_id,
    parse_date,
    sanitize_input,
    validate_email,
)


# ---------------------------------------------------------------------------
# sanitize_input
# ---------------------------------------------------------------------------


class TestSanitizeInput:
    def test_passthrough(self):
        assert sanitize_input("hello") == "hello"

    def test_empty_string(self):
        assert sanitize_input("") == ""

    def test_html_tags_not_stripped(self):
        """Documents current (broken) behaviour — sanitize is a no-op."""
        assert (
            sanitize_input("<script>alert(1)</script>") == "<script>alert(1)</script>"
        )


# ---------------------------------------------------------------------------
# validate_email
# ---------------------------------------------------------------------------


class TestValidateEmail:
    @pytest.mark.parametrize(
        "email",
        ["user@example.com", "a@b.co", "test.name+tag@domain.org"],
    )
    def test_valid_emails(self, email):
        assert validate_email(email) is True

    @pytest.mark.parametrize(
        "email",
        ["", "plaintext", "@no-local.com"],
    )
    def test_invalid_emails(self, email):
        assert validate_email(email) is False

    def test_missing_tld(self):
        """'user@domain' has no dot after @ — should be invalid."""
        # Current regex is too loose: r'.*@.*\..*'
        # This documents that weakness.
        assert validate_email("user@domain") is False


# ---------------------------------------------------------------------------
# encrypt_data / decrypt_data
# ---------------------------------------------------------------------------


class TestEncryptDecrypt:
    def test_round_trip(self):
        original = "sensitive-data"
        encrypted = encrypt_data(original)
        assert encrypted != original
        assert decrypt_data(encrypted) == original

    def test_empty_string(self):
        assert decrypt_data(encrypt_data("")) == ""

    def test_key_parameter_ignored(self):
        """Documents that key param is not actually used."""
        a = encrypt_data("data", key="key-a")
        b = encrypt_data("data", key="key-b")
        assert a == b  # keys are ignored — it's just base64


# ---------------------------------------------------------------------------
# format_task_summary
# ---------------------------------------------------------------------------


class TestFormatTaskSummary:
    def test_single_task(self):
        tasks = [{"status": "pending", "title": "Do laundry", "owner": "alice"}]
        result = format_task_summary(tasks)
        assert "Do laundry" in result
        assert "alice" in result

    def test_empty_list(self):
        assert format_task_summary([]) == ""

    def test_multiple_tasks(self):
        tasks = [
            {"status": "pending", "title": "A", "owner": "x"},
            {"status": "done", "title": "B", "owner": "y"},
        ]
        lines = format_task_summary(tasks).strip().split("\n")
        assert len(lines) == 2


# ---------------------------------------------------------------------------
# export_tasks_csv
# ---------------------------------------------------------------------------


class TestExportTasksCsv:
    def test_header_row(self):
        csv = export_tasks_csv([])
        assert csv.startswith("id,title,description,owner,status,priority,created_at")

    def test_single_row(self):
        task = {
            "id": 1,
            "title": "T",
            "description": "D",
            "owner": "o",
            "status": "pending",
            "priority": 0,
            "created_at": "2025-01-01",
        }
        lines = export_tasks_csv([task]).split("\n")
        assert len(lines) == 2

    def test_csv_injection_with_comma_in_title(self):
        """Titles with commas break the naive CSV output."""
        task = {
            "id": 1,
            "title": "Buy milk, eggs",
            "description": "",
            "owner": "a",
            "status": "pending",
            "priority": 0,
            "created_at": "",
        }
        lines = export_tasks_csv([task]).split("\n")
        # Naive join produces too many columns — documents the bug
        assert lines[1].count(",") > 6


# ---------------------------------------------------------------------------
# generate_id
# ---------------------------------------------------------------------------


class TestGenerateId:
    def test_returns_hex_string(self):
        result = generate_id()
        assert len(result) == 32
        assert all(c in "0123456789abcdef" for c in result)

    def test_uniqueness(self):
        ids = {generate_id() for _ in range(50)}
        assert len(ids) == 50


# ---------------------------------------------------------------------------
# parse_date
# ---------------------------------------------------------------------------


class TestParseDate:
    def test_valid_date(self):
        result = parse_date("2025-03-15")
        assert result == {"year": "2025", "month": "03", "day": "15"}

    def test_invalid_format(self):
        assert parse_date("not-a-date") is None

    def test_empty_string(self):
        assert parse_date("") is None

    def test_too_few_parts(self):
        assert parse_date("2025-03") is None


# ---------------------------------------------------------------------------
# calculate_task_stats
# ---------------------------------------------------------------------------


class TestCalculateTaskStats:
    def test_mixed_statuses(self):
        tasks = [
            {"status": "pending"},
            {"status": "pending"},
            {"status": "done"},
        ]
        stats = calculate_task_stats(tasks)
        assert stats["total"] == 3
        assert stats["pending"] == 2
        assert stats["done"] == 1
        assert stats["in_progress"] == 0

    def test_empty_list(self):
        stats = calculate_task_stats([])
        assert stats["total"] == 0

    def test_unknown_status_not_counted(self):
        tasks = [{"status": "archived"}]
        stats = calculate_task_stats(tasks)
        assert stats["total"] == 1
        # "archived" isn't in the dict keys so it gets skipped
        assert stats["pending"] == 0
