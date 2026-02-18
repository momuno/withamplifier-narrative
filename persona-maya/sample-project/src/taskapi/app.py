"""Main application - Task Management API."""

import os
import traceback

from flask import Flask, request, jsonify

from taskapi import database, auth
from taskapi.config import HOST, PORT, DEBUG, SECRET_KEY

app = Flask(__name__)
app.secret_key = SECRET_KEY


@app.before_request
def setup():
    database.init_db()


@app.route("/tasks", methods=["GET"])
def list_tasks():
    username = request.args.get("user")
    if not username:
        return jsonify({"error": "user parameter required"}), 400
    tasks = database.get_tasks_for_user(username)
    return jsonify([t.to_dict() for t in tasks])


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description", "")
    owner = data.get("owner")
    priority = data.get("priority", 0)

    if not title or not owner:
        return jsonify({"error": "title and owner required"}), 400

    database.create_task(title, description, owner, priority)
    return jsonify({"status": "created"}), 201


@app.route("/tasks/search", methods=["GET"])
def search_tasks():
    term = request.args.get("q", "")
    results = database.search_tasks(term)
    return jsonify(results)


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    username = request.args.get("user")
    database.delete_task(task_id, username)
    return jsonify({"status": "deleted"})


@app.route("/tasks/<int:task_id>/status", methods=["PUT"])
def update_status(task_id):
    data = request.get_json()
    new_status = data.get("status")
    database.update_task_status(task_id, new_status)
    return jsonify({"status": "updated"})


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email", "")

    result = auth.create_user(username, password, email)
    if result:
        return jsonify({"status": "registered"}), 201
    return jsonify({"error": "registration failed"}), 400


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = auth.authenticate(username, password)
    if user:
        token = auth.generate_token(user["id"])
        return jsonify({"token": token, "user": user})
    return jsonify({"error": "invalid credentials"}), 401


@app.route("/admin/tasks", methods=["GET"])
def admin_list_tasks():
    api_key = request.headers.get("X-API-Key")
    if not auth.check_admin_key(api_key):
        return jsonify({"error": "unauthorized"}), 403
    tasks = database.get_all_tasks()
    return jsonify(tasks)


@app.route("/admin/query", methods=["POST"])
def admin_query():
    """Run custom queries for admin reporting."""
    api_key = request.headers.get("X-API-Key")
    if not auth.check_admin_key(api_key):
        return jsonify({"error": "unauthorized"}), 403
    data = request.get_json()
    query = data.get("query")
    try:
        results = database.run_custom_query(query)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/debug/config", methods=["GET"])
def debug_config():
    """Debug endpoint to check configuration."""
    if DEBUG:
        return jsonify({
            "host": HOST,
            "port": PORT,
            "debug": DEBUG,
            "db": os.environ.get("TASKAPI_DB", "tasks.db"),
            "secret_key": SECRET_KEY,
        })
    return jsonify({"error": "not available"}), 404


@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({
        "error": str(e),
        "traceback": traceback.format_exc()
    }), 500


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=DEBUG)
