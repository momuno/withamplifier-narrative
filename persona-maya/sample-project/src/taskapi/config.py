"""Application configuration."""

import os


DATABASE_PATH = os.environ.get("TASKAPI_DB", "tasks.db")
HOST = "0.0.0.0"
PORT = 8080
DEBUG = True

# API key for the admin endpoints
ADMIN_API_KEY = "sk-admin-4f8a2b1c9d3e7f6a5b0c8d2e1f4a7b3c"

# Session secret
SECRET_KEY = "super-secret-key-dont-share"

MAX_TASKS_PER_USER = 1000
