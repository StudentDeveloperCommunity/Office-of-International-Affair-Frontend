#!/usr/bin/env bash
set -euo pipefail

# Helper to start frontend: prefer yarn if available, otherwise fall back to npm
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "Starting frontend in $ROOT_DIR"

if command -v yarn >/dev/null 2>&1; then
  echo "yarn detected — installing dependencies with yarn (if needed) and starting dev server..."
  yarn install --frozen-lockfile || yarn install
  yarn start
else
  echo "yarn not found — falling back to npm. Installing dependencies and starting via npm..."
  npm install
  npm run start
fi
