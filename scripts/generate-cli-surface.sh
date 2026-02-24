#!/usr/bin/env bash
set -euo pipefail

GRITH_ROOT="${1:-../grith}"
DEFAULT_BIN="$GRITH_ROOT/target/release/grith"

if [[ -x "$DEFAULT_BIN" ]]; then
  BIN="$DEFAULT_BIN"
elif command -v grith >/dev/null 2>&1; then
  BIN="$(command -v grith)"
elif command -v cargo >/dev/null 2>&1 && [[ -f "$GRITH_ROOT/Cargo.toml" ]]; then
  cargo build --release --manifest-path "$GRITH_ROOT/Cargo.toml" -p grith-core >/dev/null
  if [[ -x "$DEFAULT_BIN" ]]; then
    BIN="$DEFAULT_BIN"
  else
    echo "failed to build grith binary at $DEFAULT_BIN" >&2
    exit 1
  fi
else
  echo "grith binary not found at $DEFAULT_BIN and not present in PATH" >&2
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
