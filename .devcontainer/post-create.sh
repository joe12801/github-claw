#!/usr/bin/env bash
# Post-create: install backend Python dependencies
set -e

echo "==> Installing backend dependencies..."
pip install --upgrade pip
pip install -r media-platform/backend/requirements.txt

echo "==> Environment ready!"
