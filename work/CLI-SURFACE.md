# CLI Surface Inventory (Generated)

## `grith --help`

```text
Zero Trust for AI Agents

Usage: grith [OPTIONS] [COMMAND]

Commands:
  run            Execute a single task non-interactively
  init           Create default configuration
  config         Show or modify configuration
  audit          Browse audit logs
  digest         Manage digest queue
  canary         Manage canary tokens used for exfiltration trap detection
  proxy          Security proxy commands
  exec           Supervise an external CLI tool with OS-level syscall interception
  supervisor     List or manage active supervisor sessions
  daemon         Manage the grith daemon (dashboard server + shared subsystems)
  pro            Manage Pro plan: login, status, sync, activate, logout
  notifications  Manage notification channels
  log            View audit-backed session logs
  reputation     Manage the reputation system
  help           Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
  -V, --version                Print version
```

## `grith run --help`

```text
Execute a single task non-interactively

Usage: grith run [OPTIONS] <TASK>

Arguments:
  <TASK>  The task to execute

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith init --help`

```text
Create default configuration

Usage: grith init [OPTIONS]

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith config --help`

```text
Show or modify configuration

Usage: grith config [OPTIONS] [COMMAND]

Commands:
  set   Set a configuration value
  help  Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith audit --help`

```text
Browse audit logs

Usage: grith audit [OPTIONS] [COMMAND]

Commands:
  export  Export audit logs as JSON or CSV
  help    Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith digest --help`

```text
Manage digest queue

Usage: grith digest [OPTIONS] [COMMAND]

Commands:
  review  Interactive digest review
  help    Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith canary --help`

```text
Manage canary tokens used for exfiltration trap detection

Usage: grith canary [OPTIONS] <COMMAND>

Commands:
  list    List registered canary tokens
  add     Add a canary token
  remove  Remove a canary token by ID
  rotate  Rotate a canary token by ID (keeps label, replaces value)
  help    Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith proxy --help`

```text
Security proxy commands

Usage: grith proxy [OPTIONS] <COMMAND>

Commands:
  test  Dry-run a tool call against the proxy
  help  Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith exec --help`

```text
Supervise an external CLI tool with OS-level syscall interception

Usage: grith exec [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  The command and arguments to supervise (after --)

Options:
      --config <CONFIG>
          Path to configuration file
      --profile <PROFILE>
          Tool profile to use (e.g., claude-code, codex, aider, generic)
      --attach <ATTACH>
          Attach to an existing process by PID instead of spawning
      --log-level <LOG_LEVEL>
          Log level (trace, debug, info, warn, error)
      --no-color
          Disable colored output
      --syscall-log <SYSCALL_LOG>
          Log every syscall request and decision to a file for post-session review
      --project <PROJECT>
          Override the project name (defaults to current directory name)
      --trace-syscalls-jsonl <TRACE_SYSCALLS_JSONL>
          Write raw pre-filter syscall forensics records to a JSONL file
  -h, --help
          Print help
```

## `grith supervisor --help`

```text
List or manage active supervisor sessions

Usage: grith supervisor [OPTIONS] [COMMAND]

Commands:
  list    List active supervisor sessions
  status  Show details of a specific session
  kill    Terminate a supervisor session and detach from the process
  help    Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith daemon --help`

```text
Manage the grith daemon (dashboard server + shared subsystems)

Usage: grith daemon [OPTIONS] <COMMAND>

Commands:
  start   Start the daemon (dashboard server + shared subsystems) as a background process
  stop    Stop the running daemon
  status  Check if the daemon is running
  help    Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith pro --help`

```text
Manage Pro plan: login, status, sync, activate, logout

Usage: grith pro [OPTIONS] <COMMAND>

Commands:
  login     Authenticate with grith.ai (device auth by default, API key optional)
  status    Show plan status, license expiry, team info
  activate  Fetch and activate a fresh license
  logout    Remove credentials and license
  sync      Upload audit records to cloud and pull team policies
  upgrade   Open the upgrade/pricing page in the default browser
  billing   Show current plan and billing details; open billing portal in browser
  help      Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith notifications --help`

```text
Manage notification channels

Usage: grith notifications [OPTIONS] <COMMAND>

Commands:
  status    Show notification channel status and health
  channels  List all available notification channels
  test      Send a test notification to a specific channel
  help      Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith log --help`

```text
View audit-backed session logs

Usage: grith log [OPTIONS]

Options:
      --config <CONFIG>        Path to configuration file
      --tail                   Follow new log entries (tail mode)
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --session <SESSION>      Session filter: UUID session_id or session name (task context)
      --limit <LIMIT>          Max records to read per poll / view [default: 100]
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```

## `grith reputation --help`

```text
Manage the reputation system

Usage: grith reputation [OPTIONS] <COMMAND>

Commands:
  show   Show the learned reputation table with trust scores
  reset  Reset all learned reputation data
  help   Print this message or the help of the given subcommand(s)

Options:
      --config <CONFIG>        Path to configuration file
      --log-level <LOG_LEVEL>  Log level (trace, debug, info, warn, error)
      --no-color               Disable colored output
      --project <PROJECT>      Override the project name (defaults to current directory name)
  -h, --help                   Print help
```
