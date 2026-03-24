'use client';

import { useState } from 'react';

interface NodeInfo {
  id: string;
  label: string;
  description: string;
}

const PATH1_NODES: NodeInfo[] = [
  { id: 'p1-user', label: 'User Prompt', description: 'User enters a task via the CLI REPL or web dashboard.' },
  { id: 'p1-llm', label: 'LLM Provider', description: 'Routes to Ollama, OpenAI, Anthropic, or OpenRouter via grith-llm.' },
  { id: 'p1-tool', label: 'Tool Call', description: 'LLM responds with a tool call (file read, shell exec, HTTP request, etc.).' },
];

const PATH2_NODES: NodeInfo[] = [
  { id: 'p2-exec', label: 'grith exec', description: 'Spawns an external tool (Claude Code, Codex, Aider) under supervision.' },
  { id: 'p2-tool', label: 'CLI Tool', description: 'The external AI tool runs normally, unaware it is being supervised.' },
  { id: 'p2-syscall', label: 'Syscall Intercept', description: 'Every file, network, and process syscall is intercepted via ptrace.' },
];

const SHARED_NODES: NodeInfo[] = [
  { id: 'proxy', label: 'Security Proxy', description: 'Multi-phase filter pipeline: 6 Static, 5 Pattern, 6 Context filters. Produces a composite risk score.' },
  { id: 'decision', label: 'Decision Engine', description: 'Score < 3.0 = Allow, 3.0-8.0 = Queue for human review, > 8.0 = Deny.' },
  { id: 'audit', label: 'Audit Log', description: 'Every evaluation is logged with full context, scores, and decision rationale.' },
  { id: 'digest', label: 'Digest Queue', description: 'Queued items are batched for human review in the dashboard or CLI.' },
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
  const base = 'relative rounded-lg border px-4 py-3 text-center transition-all duration-200 cursor-default';
  const variants: Record<string, string> = {
    default: `border-border bg-surface hover:border-green/50 ${active ? 'border-green shadow-[0_0_12px_rgba(0,168,90,0.15)]' : ''}`,
    proxy: `border-green bg-green-light hover:border-green ${active ? 'shadow-[0_0_16px_rgba(0,168,90,0.25)]' : ''}`,
    allow: `border-green/50 bg-green-light ${active ? 'border-green shadow-[0_0_12px_rgba(0,168,90,0.15)]' : ''}`,
    queue: `border-warning/50 bg-warning-light ${active ? 'border-warning shadow-[0_0_12px_rgba(234,179,8,0.15)]' : ''}`,
    deny: `border-danger/50 bg-danger-light ${active ? 'border-danger shadow-[0_0_12px_rgba(239,68,68,0.15)]' : ''}`,
  };

  return (
    <div
      className={`${base} ${variants[variant]}`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="font-heading text-sm font-bold text-text">{node.label}</span>
      {active && (
        <div className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-surface p-3 shadow-lg">
          <p className="text-left text-xs text-text-secondary">{node.description}</p>
        </div>
      )}
    </div>
  );
}

function Arrow({ direction = 'down', color = 'border-border' }: { direction?: 'down' | 'right'; color?: string }) {
  if (direction === 'right') {
    return (
      <div className="flex items-center px-1">
        <div className={`h-0 w-6 border-t-2 border-dashed ${color}`} />
        <div className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent ${color.replace('border-', 'border-l-')}`} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-1">
      <div className={`h-5 w-0 border-l-2 border-dashed ${color}`} />
      <div className={`h-0 w-0 border-x-4 border-t-[6px] border-x-transparent ${color.replace('border-', 'border-t-')}`} />
    </div>
  );
}

function FlowLine() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="relative h-6 w-0 border-l-2 border-dashed border-green/40">
        <div className="animate-flow absolute left-[-3px] top-0 h-2 w-2 rounded-full bg-green" />
      </div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <h3 className="mb-1 font-heading text-lg font-bold text-text">Dual-Path Architecture</h3>
      <p className="mb-5 text-xs text-text-dim">
        Hover over any node to see details. Both paths converge on the same security proxy.
      </p>

      {/* Two paths side by side */}
      <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Path 1: Built-in Agent */}
        <div className="flex flex-col items-center">
          <span className="mb-3 rounded-full bg-info-light px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-info">
            Path 1 — Built-in Agent
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
          <span className="mb-3 rounded-full bg-[#f3e8ff] px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-[#7c3aed]">
            Path 2 — CLI Supervisor
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
        <div className="h-0 w-12 border-t-2 border-dashed border-green/40 sm:w-24" />
        <svg width="12" height="12" className="text-green/60" fill="currentColor">
          <polygon points="6,12 0,0 12,0" />
        </svg>
        <div className="h-0 w-12 border-t-2 border-dashed border-green/40 sm:w-24" />
      </div>

      {/* Shared nodes */}
      <div className="flex flex-col items-center gap-0">
        {SHARED_NODES.map((node, i) => {
          let variant: 'proxy' | 'allow' | 'queue' | 'deny' | 'default' = 'default';
          if (node.id === 'proxy') variant = 'proxy';
          return (
            <div key={node.id} className="flex flex-col items-center">
              <div className="w-full max-w-[280px]">
                <Node node={node} active={hoveredId === node.id} onHover={setHoveredId} variant={variant} />
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
        <div className="rounded-lg border border-green/50 bg-green-light px-4 py-2 text-center">
          <span className="font-heading text-xs font-bold text-green-dark">ALLOW</span>
          <p className="text-[10px] text-text-dim">&lt; 3.0</p>
        </div>
        <div className="rounded-lg border border-warning/50 bg-warning-light px-4 py-2 text-center">
          <span className="font-heading text-xs font-bold text-warning">QUEUE</span>
          <p className="text-[10px] text-text-dim">3.0 - 8.0</p>
        </div>
        <div className="rounded-lg border border-danger/50 bg-danger-light px-4 py-2 text-center">
          <span className="font-heading text-xs font-bold text-danger">DENY</span>
          <p className="text-[10px] text-text-dim">&gt; 8.0</p>
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
