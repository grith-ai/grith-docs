#!/usr/bin/env bash
set -euo pipefail

# Force POSIX locale so any internal sort orders bytes deterministically
# across user locales (otherwise the docs-drift CI flags trivial
# locale-collation reorderings).
export LC_ALL=C

GRITH_ROOT="${1:-../grith}"
MANIFEST_PATH="$GRITH_ROOT/Cargo.toml"
DEBUG_BIN="$GRITH_ROOT/target/debug/grith"

if [[ -n "${GRITH_BIN:-}" ]]; then
  if [[ ! -x "$GRITH_BIN" ]]; then
    echo "GRITH_BIN is not executable: $GRITH_BIN" >&2
    exit 1
  fi
  BIN="$GRITH_BIN"
elif command -v cargo >/dev/null 2>&1 && [[ -f "$MANIFEST_PATH" ]]; then
  # Build from source to avoid stale binary help output in docs snapshots.
  cargo build --manifest-path "$MANIFEST_PATH" -p grith-core >/dev/null
  if [[ -x "$DEBUG_BIN" ]]; then
    BIN="$DEBUG_BIN"
  else
    echo "failed to build grith binary at $DEBUG_BIN" >&2
    exit 1
  fi
else
  echo "missing cargo or manifest path: $MANIFEST_PATH" >&2
  exit 1
fi

TOP_HELP="$("$BIN" --help)"

COMMANDS=$(
  awk '
    /^Commands:/ { in_cmd = 1; next }
    /^Options:/ { in_cmd = 0 }
    in_cmd && NF > 0 {
      cmd = $1
      if (cmd != "help") print cmd
    }
  ' <<<"$TOP_HELP"
)

{
  echo "# CLI Surface Inventory (Generated)"
  echo ""
  echo "## \`grith --help\`"
  echo ""
  echo '```text'
  printf '%s\n' "$TOP_HELP"
  echo '```'

  while IFS= read -r cmd; do
    [[ -z "$cmd" ]] && continue
    echo ""
    echo "## \`grith $cmd --help\`"
    echo ""
    echo '```text'
    "$BIN" "$cmd" --help
    echo '```'
  done <<<"$COMMANDS"
}
