"""Integration tests for Flask API endpoints (app.py).

Covers: all routes including auth, task CRUD, admin, and error handling.
"""

from taskapi.config import ADMIN_API_KEY


# ---------------------------------------------------------------------------
# GET /tasks
# ---------------------------------------------------------------------------


class TestListTasks:
    def test_returns_tasks_for_user(self, app_client, seed_tasks):
        resp = app_client.get("/tasks?user=alice")
        assert resp.status_code == 200
        data = resp.get_json()
        assert len(data) == 2

    def test_missing_user_param_returns_400(self, app_client):
        resp = app_client.get("/tasks")
        assert resp.status_code == 400
        assert "user parameter required" in resp.get_json()["error"]

    def test_empty_user_param_returns_400(self, app_client):
        resp = app_client.get("/tasks?user=")
        assert resp.status_code == 400

    def test_unknown_user_returns_empty_list(self, app_client):
        resp = app_client.get("/tasks?user=nobody")
        assert resp.status_code == 200
        assert resp.get_json() == []


# ---------------------------------------------------------------------------
# POST /tasks
# ---------------------------------------------------------------------------


class TestCreateTask:
    def test_success(self, app_client):
        resp = app_client.post(
            "/tasks",
            json={"title": "New task", "owner": "alice"},
        )
        assert resp.status_code == 201
        assert resp.get_json()["status"] == "created"

    def test_missing_title_returns_400(self, app_client):
        resp = app_client.post("/tasks", json={"owner": "alice"})
        assert resp.status_code == 400

    def test_missing_owner_returns_400(self, app_client):
        resp = app_client.post("/tasks", json={"title": "No owner"})
        assert resp.status_code == 400

    def test_empty_body_returns_error(self, app_client):
        resp = app_client.post(
            "/tasks",
            data="",
            content_type="application/json",
        )
        # Flask returns 415 or 400 for malformed JSON
        assert resp.status_code >= 400

    def test_optional_fields_default(self, app_client):
        resp = app_client.post(
            "/tasks",
            json={"title": "Minimal", "owner": "bob"},
        )
        assert resp.status_code == 201
        # Verify defaults were applied
        tasks = app_client.get("/tasks?user=bob").get_json()
        assert len(tasks) == 1
        assert tasks[0]["priority"] == 0
        assert tasks[0]["description"] == ""


# ---------------------------------------------------------------------------
# GET /tasks/search
# ---------------------------------------------------------------------------


class TestSearchTasks:
    def test_finds_matching(self, app_client, seed_tasks):
        resp = app_client.get("/tasks/search?q=groceries")
        assert resp.status_code == 200
        assert len(resp.get_json()) == 1

    def test_empty_query_returns_all(self, app_client, seed_tasks):
        resp = app_client.get("/tasks/search")
        assert resp.status_code == 200
        assert len(resp.get_json()) == 3

    def test_no_results(self, app_client, seed_tasks):
        resp = app_client.get("/tasks/search?q=zzz_nothing")
        assert resp.status_code == 200
        assert resp.get_json() == []


# ---------------------------------------------------------------------------
# DELETE /tasks/<id>
# ---------------------------------------------------------------------------


class TestDeleteTask:
    def test_owner_deletes(self, app_client, seed_tasks):
        tasks = app_client.get("/tasks?user=alice").get_json()
        task_id = tasks[0]["id"]
        resp = app_client.delete(f"/tasks/{task_id}?user=alice")
        assert resp.status_code == 200

    def test_always_returns_200(self, app_client):
        """Even deleting a non-existent task returns 200 (no verification)."""
        resp = app_client.delete("/tasks/9999?user=alice")
        assert resp.status_code == 200


# ---------------------------------------------------------------------------
# PUT /tasks/<id>/status
# ---------------------------------------------------------------------------


class TestUpdateStatus:
    def test_update_succeeds(self, app_client, seed_tasks):
        tasks = app_client.get("/tasks?user=alice").get_json()
        task_id = tasks[0]["id"]
        resp = app_client.put(
            f"/tasks/{task_id}/status",
            json={"status": "done"},
        )
        assert resp.status_code == 200

        updated = app_client.get("/tasks?user=alice").get_json()
        found = [t for t in updated if t["id"] == task_id][0]
        assert found["status"] == "done"


# ---------------------------------------------------------------------------
# POST /register
# ---------------------------------------------------------------------------


class TestRegister:
    def test_success(self, app_client):
        resp = app_client.post(
            "/register",
            json={"username": "newuser", "password": "secret"},
        )
        assert resp.status_code == 201

    def test_duplicate_username_returns_400(self, app_client, seed_user):
        resp = app_client.post(
            "/register",
            json={"username": "alice", "password": "other"},
        )
        assert resp.status_code == 400
        assert "failed" in resp.get_json()["error"]


# ---------------------------------------------------------------------------
# POST /login
# ---------------------------------------------------------------------------


class TestLogin:
    def test_valid_credentials(self, app_client, seed_user):
        resp = app_client.post(
            "/login",
            json={"username": "alice", "password": "correct-password"},
        )
        assert resp.status_code == 200
        data = resp.get_json()
        assert "token" in data
        assert data["user"]["username"] == "alice"

    def test_wrong_password(self, app_client, seed_user):
        resp = app_client.post(
            "/login",
            json={"username": "alice", "password": "wrong"},
        )
        assert resp.status_code == 401
        assert "invalid credentials" in resp.get_json()["error"]

    def test_nonexistent_user(self, app_client):
        resp = app_client.post(
            "/login",
            json={"username": "ghost", "password": "any"},
        )
        assert resp.status_code == 401


# ---------------------------------------------------------------------------
# GET /admin/tasks
# ---------------------------------------------------------------------------


class TestAdminListTasks:
    def test_with_valid_key(self, app_client, seed_tasks):
        resp = app_client.get(
            "/admin/tasks",
            headers={"X-API-Key": ADMIN_API_KEY},
        )
        assert resp.status_code == 200
        assert len(resp.get_json()) == 3

    def test_missing_key_returns_403(self, app_client):
        resp = app_client.get("/admin/tasks")
        assert resp.status_code == 403

    def test_wrong_key_returns_403(self, app_client):
        resp = app_client.get(
            "/admin/tasks",
            headers={"X-API-Key": "wrong-key"},
        )
        assert resp.status_code == 403


# ---------------------------------------------------------------------------
# POST /admin/query
# ---------------------------------------------------------------------------


class TestAdminQuery:
    def test_valid_query(self, app_client, seed_tasks):
        resp = app_client.post(
            "/admin/query",
            json={"query": "SELECT COUNT(*) FROM tasks"},
            headers={"X-API-Key": ADMIN_API_KEY},
        )
        assert resp.status_code == 200
        assert resp.get_json()["results"][0][0] == 3

    def test_missing_key_returns_403(self, app_client):
        resp = app_client.post(
            "/admin/query",
            json={"query": "SELECT 1"},
        )
        assert resp.status_code == 403

    def test_invalid_sql_returns_500(self, app_client):
        resp = app_client.post(
            "/admin/query",
            json={"query": "NOT VALID SQL"},
            headers={"X-API-Key": ADMIN_API_KEY},
        )
        assert resp.status_code == 500


# ---------------------------------------------------------------------------
# GET /debug/config
# ---------------------------------------------------------------------------


class TestDebugConfig:
    def test_returns_config_in_debug_mode(self, app_client, monkeypatch):
        monkeypatch.setattr("taskapi.app.DEBUG", True)
        resp = app_client.get("/debug/config")
        assert resp.status_code == 200
        data = resp.get_json()
        assert "host" in data
        assert "secret_key" in data

    def test_hidden_when_debug_off(self, app_client, monkeypatch):
        monkeypatch.setattr("taskapi.app.DEBUG", False)
        resp = app_client.get("/debug/config")
        assert resp.status_code == 404
