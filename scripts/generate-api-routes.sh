#!/usr/bin/env bash
set -euo pipefail

# Force POSIX locale so `sort` orders bytes the same on every machine.
# Without this the script produces different output under en_US.UTF-8
# vs CI's POSIX locale and the docs-drift check fails on trivial sort
# reorderings (e.g. `/api/audit/:id` placement around `/api/audit/export`).
export LC_ALL=C

ROOT_DIR="${1:-../grith}"
ROUTES_MOD="$ROOT_DIR/crates/grith-server/src/routes/mod.rs"
SUPERVISOR_ROUTES="$ROOT_DIR/crates/grith-server/src/supervisor.rs"
WS_ROUTES="$ROOT_DIR/crates/grith-server/src/lib.rs"

if [[ ! -f "$ROUTES_MOD" ]]; then
  echo "missing file: $ROUTES_MOD" >&2
  exit 1
fi

if [[ ! -f "$SUPERVISOR_ROUTES" ]]; then
  echo "missing file: $SUPERVISOR_ROUTES" >&2
  exit 1
fi

if [[ ! -f "$WS_ROUTES" ]]; then
  echo "missing file: $WS_ROUTES" >&2
  exit 1
fi

extract_routes() {
  local file="$1"
  local prefix="$2"
  perl -0777 -ne '
    while (/\.route\(\s*"([^"]+)"\s*,\s*(?:[A-Za-z0-9_:]+::)?(get|post|put|delete)\(/g) {
      my ($path, $method) = ($1, uc($2));
      next if $path =~ m{^/ws/};
      print "$method $ENV{ROUTE_PREFIX}$path\n";
    }
  ' "$file"
}

{
  export ROUTE_PREFIX="/api"
  extract_routes "$ROUTES_MOD" "$ROUTE_PREFIX"

  export ROUTE_PREFIX="/api/supervisor"
  extract_routes "$SUPERVISOR_ROUTES" "$ROUTE_PREFIX"

  perl -0777 -ne '
    while (/\.route\(\s*"([^"]+)"\s*,\s*(?:[A-Za-z0-9_:]+::)?get\(/g) {
      my $path = $1;
      print "WS $path\n" if $path =~ m{^/ws/};
    }
  ' "$SUPERVISOR_ROUTES"

  perl -0777 -ne '
    while (/\.route\(\s*"([^"]+)"\s*,\s*(?:[A-Za-z0-9_:]+::)?get\(/g) {
      my $path = $1;
      print "WS $path\n" if $path =~ m{^/ws/};
    }
  ' "$WS_ROUTES"
} | grep -E '^(GET|POST|PUT|DELETE|WS) /' | sort -u | awk '
  BEGIN {
    print "# API Route Inventory (Generated)"
    print ""
    print "| Method | Path |"
    print "|---|---|"
  }
  {
    method = $1
    $1 = ""
    sub(/^ /, "", $0)
    print "| " method " | `" $0 "` |"
  }
'
