#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GRITH_ROOT="${1:-../grith}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

API_OUT="$TMP_DIR/API-ROUTES.md"
CLI_OUT="$TMP_DIR/CLI-SURFACE.md"

"$REPO_ROOT/scripts/generate-api-routes.sh" "$GRITH_ROOT" >"$API_OUT"
"$REPO_ROOT/scripts/generate-cli-surface.sh" "$GRITH_ROOT" >"$CLI_OUT"

echo "Checking API route drift..."
diff -u "$REPO_ROOT/work/API-ROUTES.md" "$API_OUT"

echo "Checking CLI surface drift..."
diff -u "$REPO_ROOT/work/CLI-SURFACE.md" "$CLI_OUT"

echo "No docs drift detected."
