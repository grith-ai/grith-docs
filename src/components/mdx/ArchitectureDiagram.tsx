'use client';

import { useState } from 'react';

interface NodeInfo {
  id: string;
  label: string;
  description: string;
}

const PATH1_NODES: NodeInfo[] = [
  {
    id: 'p1-user',
    label: 'User Prompt',
    description: 'User enters a task via the CLI REPL or web dashboard.',
  },
  {
    id: 'p1-llm',
    label: 'LLM Provider',
    description: 'Routes to Ollama, OpenAI, Anthropic, or OpenRouter via grith-llm.',
  },
  {
    id: 'p1-tool',
    label: 'Tool Call',
    description: 'LLM responds with a tool call (file read, shell exec, HTTP request, etc.).',
  },
];

const PATH2_NODES: NodeInfo[] = [
  {
    id: 'p2-exec',
    label: 'grith exec',
    description: 'Spawns an external tool (Claude Code, Codex, Aider) under supervision.',
  },
  {
    id: 'p2-tool',
    label: 'CLI Tool',
    description: 'The external AI tool runs normally, unaware it is being supervised.',
  },
  {
    id: 'p2-syscall',
    label: 'Syscall Intercept',
    description: 'Every file, network, and process syscall is intercepted via ptrace.',
  },
];

const SHARED_NODES: NodeInfo[] = [
  {
    id: 'proxy',
    label: 'Security Proxy',
    description:
      'Multi-phase filter pipeline: 18 filters across static, pattern, and context phases produce a composite risk score.',
  },
  {
    id: 'decision',
    label: 'Decision Engine',
    description: 'Score < 3.0 = Allow, 3.0-8.0 = Queue for human review, > 8.0 = Deny.',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    description: 'Every evaluation is logged with full context, scores, and decision rationale.',
  },
  {
    id: 'digest',
    label: 'Digest Queue',
    description: 'Queued items are batched for human review in the dashboard or CLI.',
  },
];

function Node({
  node,
  active,
  onHover,
  variant = 'default',
}: {
  node: NodeInfo;
  active: boolean;
  onHover: (id: string | null) => void;
  variant?: 'default' | 'proxy' | 'allow' | 'queue' | 'deny';
}) {
  const base =
    'relative rounded-btn border px-4 py-3 text-center transition-colors duration-200 cursor-default';
  const variants: Record<string, string> = {
    default: `border-border bg-surface-2 hover:border-border-dark ${active ? 'border-green' : ''}`,
    proxy: `border-green bg-green-light ${active ? 'shadow-glow' : ''}`,
    allow: `border-green-border bg-green-light ${active ? 'border-green' : ''}`,
    queue: `border-warning-border bg-warning-light ${active ? 'border-warning' : ''}`,
    deny: `border-danger-border bg-danger-light ${active ? 'border-danger' : ''}`,
  };

  return (
    <div
      className={`${base} ${variants[variant]}`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="font-heading text-text text-sm font-semibold">{node.label}</span>
      {active && (
        <div className="rounded-btn border-border bg-surface absolute top-full left-1/2 z-10 mt-2 w-56 -translate-x-1/2 border p-3">
          <p className="text-text-secondary text-left text-xs">{node.description}</p>
        </div>
      )}
    </div>
  );
}

function Arrow({
  direction = 'down',
  color = 'border-border',
}: {
  direction?: 'down' | 'right';
  color?: string;
}) {
  if (direction === 'right') {
    return (
      <div className="flex items-center px-1">
        <div className={`h-0 w-6 border-t-2 border-dashed ${color}`} />
        <div
          className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent ${color.replace('border-', 'border-l-')}`}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-1">
      <div className={`h-5 w-0 border-l-2 border-dashed ${color}`} />
      <div
        className={`h-0 w-0 border-x-4 border-t-[6px] border-x-transparent ${color.replace('border-', 'border-t-')}`}
      />
    </div>
  );
}

function FlowLine() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="border-green/40 relative h-6 w-0 border-l-2 border-dashed">
        <div className="animate-flow bg-green absolute top-0 left-[-3px] h-2 w-2 rounded-full" />
      </div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="rounded-card border-border bg-surface my-6 border p-5">
      <h3 className="font-heading text-text mb-1 text-lg font-semibold">Dual-Path Architecture</h3>
      <p className="text-text-dim mb-5 text-xs">
        Hover over any node to see details. Both paths converge on the same security proxy.
      </p>

      {/* Two paths side by side */}
      <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Path 1: Built-in Agent */}
        <div className="flex flex-col items-center">
          <span className="rounded-pill bg-info-light font-label text-info mb-3 px-3 py-1 text-[10px] font-medium tracking-[0.08em] uppercase">
            Path 1 - Built-in Agent
          </span>
          <div className="flex w-full flex-col items-center gap-0">
            {PATH1_NODES.map((node, i) => (
              <div key={node.id} className="flex w-full flex-col items-center">
                <div className="w-full max-w-[220px]">
                  <Node node={node} active={hoveredId === node.id} onHover={setHoveredId} />
                </div>
                {i < PATH1_NODES.length - 1 && <FlowLine />}
              </div>
            ))}
          </div>
        </div>

        {/* Path 2: CLI Supervisor */}
        <div className="flex flex-col items-center">
          <span className="rounded-pill bg-purple-light font-label text-purple mb-3 px-3 py-1 text-[10px] font-medium tracking-[0.08em] uppercase">
            Path 2 - CLI Supervisor
          </span>
          <div className="flex w-full flex-col items-center gap-0">
            {PATH2_NODES.map((node, i) => (
              <div key={node.id} className="flex w-full flex-col items-center">
                <div className="w-full max-w-[220px]">
                  <Node node={node} active={hoveredId === node.id} onHover={setHoveredId} />
                </div>
                {i < PATH2_NODES.length - 1 && <FlowLine />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Convergence arrows */}
      <div className="mb-1 flex items-center justify-center gap-2">
        <div className="border-green/40 h-0 w-12 border-t-2 border-dashed sm:w-24" />
        <svg width="12" height="12" className="text-green/60" fill="currentColor">
          <polygon points="6,12 0,0 12,0" />
        </svg>
        <div className="border-green/40 h-0 w-12 border-t-2 border-dashed sm:w-24" />
      </div>

      {/* Shared nodes */}
      <div className="flex flex-col items-center gap-0">
        {SHARED_NODES.map((node, i) => {
          let variant: 'proxy' | 'allow' | 'queue' | 'deny' | 'default' = 'default';
          if (node.id === 'proxy') variant = 'proxy';
          return (
            <div key={node.id} className="flex flex-col items-center">
              <div className="w-full max-w-[280px]">
                <Node
                  node={node}
                  active={hoveredId === node.id}
                  onHover={setHoveredId}
                  variant={variant}
                />
              </div>
              {i < SHARED_NODES.length - 1 && <FlowLine />}
            </div>
          );
        })}
      </div>

      {/* Decision outcomes */}
      <div className="mt-2 flex items-center justify-center">
        <Arrow direction="down" color="border-green/40" />
      </div>
      <div className="mt-1 flex justify-center gap-3">
        <div className="rounded-btn border-green-border bg-green-light border px-4 py-2 text-center">
          <span className="font-label text-accent-text text-xs font-medium">✓ ALLOW</span>
          <p className="text-text-dim text-[10px]">&lt; 3.0</p>
        </div>
        <div className="rounded-btn border-warning-border bg-warning-light border px-4 py-2 text-center">
          <span className="font-label text-warning-text text-xs font-medium">⏸ QUEUE</span>
          <p className="text-text-dim text-[10px]">3.0 - 8.0</p>
        </div>
        <div className="rounded-btn border-danger-border bg-danger-light border px-4 py-2 text-center">
          <span className="font-label text-danger-text text-xs font-medium">⛔ DENY</span>
          <p className="text-text-dim text-[10px]">&gt; 8.0</p>
        </div>
      </div>

      {/* CSS animation for flow dots */}
      <style>{`
        @keyframes flow-down {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: calc(100% - 8px); opacity: 0; }
        }
        .animate-flow {
          animation: flow-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
