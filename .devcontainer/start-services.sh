#!/usr/bin/env bash
# Post-start: launch backend and frontend servers in the background
set -e

echo "==> Starting Flask backend on port 5000..."
cd media-platform/backend
nohup python app.py > /tmp/backend.log 2>&1 &

echo "==> Starting frontend static server on port 8080..."
cd ../frontend
nohup python -m http.server 8080 > /tmp/frontend.log 2>&1 &

echo "==> Services started. Backend: http://localhost:5000  Frontend: http://localhost:8080"
