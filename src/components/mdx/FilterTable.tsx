'use client';

import { useState, useMemo } from 'react';

type Phase = 'Static' | 'Pattern' | 'Context';
type SortKey = 'id' | 'name' | 'phase' | 'latency' | 'scoreRange' | 'description';
type SortDir = 'asc' | 'desc';

interface Filter {
  id: number;
  name: string;
  phase: Phase;
  latency: string;
  latencyMs: number; // for sorting
  scoreRange: string;
  description: string;
}

const FILTERS: Filter[] = [
  { id: 1, name: 'Operation Risk', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '0 to +3', description: 'Base risk scoring by operation type' },
  { id: 2, name: 'Path Match', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '-1 to +5', description: 'Fast matching against profile paths and session allowlist entries' },
  { id: 3, name: 'Sensitive Path', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '+1 to +4', description: 'Checks known sensitive files and directories' },
  { id: 4, name: 'Allowlist', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '-1 to +3', description: 'Explicit allow/deny style policy adjustments' },
  { id: 5, name: 'Argument', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '0 to +2', description: 'Structure and size checks on command arguments' },
  { id: 6, name: 'Capability', phase: 'Static', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '+1 to +8', description: 'Checks for capabilities or privileges beyond the session grants' },
  { id: 7, name: 'Secret Scan', phase: 'Pattern', latency: '1-3ms', latencyMs: 2.0, scoreRange: '+3 to +5', description: '1,620 regex patterns for API keys, tokens, and credentials' },
  { id: 8, name: 'Command', phase: 'Pattern', latency: '0.5-1ms', latencyMs: 0.75, scoreRange: '+2 to +4', description: 'Shell structure analysis for pipes, eval, and injection patterns' },
  { id: 9, name: 'Egress Policy', phase: 'Pattern', latency: '<0.1ms', latencyMs: 0.05, scoreRange: '-1 to +5', description: 'Destination trust and outbound domain policy' },
  { id: 10, name: 'DLP Gate', phase: 'Pattern', latency: '1-3ms', latencyMs: 2.0, scoreRange: '+3 to +5', description: 'Outbound payload scanning for structured sensitive data' },
  { id: 11, name: 'Canary', phase: 'Pattern', latency: '0.5-1ms', latencyMs: 0.75, scoreRange: 'DENY', description: 'Tripwire token detection for exfiltration attempts' },
  { id: 12, name: 'Reputation', phase: 'Context', latency: '0.5-2ms', latencyMs: 1.25, scoreRange: '-1 to +4', description: 'Observed trust and destination reputation signals' },
  { id: 13, name: 'Behavioural', phase: 'Context', latency: '1-3ms', latencyMs: 2.0, scoreRange: '+1 to +3', description: 'Deviation from established session behavior' },
  { id: 14, name: 'Taint', phase: 'Context', latency: '0.1-0.5ms', latencyMs: 0.3, scoreRange: '+3 to +5', description: 'Sensitive data flow from reads into later sinks' },
  { id: 15, name: 'Session Containment', phase: 'Context', latency: '0.1ms', latencyMs: 0.1, scoreRange: '+2 to +4', description: 'Checks attempts to break expected project or session scope' },
  { id: 16, name: 'Rate Limit', phase: 'Context', latency: '0.1ms', latencyMs: 0.1, scoreRange: '+1 to +3', description: 'Burst and anomaly detection on call frequency' },
  { id: 17, name: 'Egress Rate', phase: 'Context', latency: '0.1ms', latencyMs: 0.1, scoreRange: '+1 to +3', description: 'Outbound traffic volume anomaly detection' },
];

const phaseOrder: Record<Phase, number> = { Static: 0, Pattern: 1, Context: 2 };

const phaseBadge: Record<Phase, string> = {
  Static: 'bg-info-light text-info',
  Pattern: 'bg-warning-light text-warning',
  Context: 'bg-[#f3e8ff] text-[#7c3aed]',
};

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" className="ml-1 inline text-text-dim/40">
        <path d="M3 4l2-2 2 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 6l2 2 2-2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="ml-1 inline text-green">
      {dir === 'asc' ? (
        <path d="M3 6l2-3 2 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M3 4l2 3 2-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

export default function FilterTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    const result = FILTERS.filter(
      (f) =>
        f.name.toLowerCase().includes(term) ||
        f.phase.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term)
    );

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'id':
          cmp = a.id - b.id;
          break;
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'phase':
          cmp = phaseOrder[a.phase] - phaseOrder[b.phase];
          break;
        case 'latency':
          cmp = a.latencyMs - b.latencyMs;
          break;
        case 'scoreRange':
          cmp = a.scoreRange.localeCompare(b.scoreRange);
          break;
        case 'description':
          cmp = a.description.localeCompare(b.description);
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, sortKey, sortDir]);

  const thClass = 'cursor-pointer select-none whitespace-nowrap pb-2 pr-3 text-left text-xs font-bold uppercase tracking-wider text-text-dim hover:text-text transition-colors';

  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-heading text-lg font-bold text-text">Security Filters</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search filters..."
          className="w-full rounded-md border border-border bg-bg px-3 py-2 font-code text-sm text-text placeholder:text-text-dim focus:border-green focus:outline-none sm:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} onClick={() => handleSort('id')}>
                # <SortIcon active={sortKey === 'id'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('name')}>
                Name <SortIcon active={sortKey === 'name'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('phase')}>
                Phase <SortIcon active={sortKey === 'phase'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('latency')}>
                Latency <SortIcon active={sortKey === 'latency'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('scoreRange')}>
                Score Range <SortIcon active={sortKey === 'scoreRange'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('description')}>
                Description <SortIcon active={sortKey === 'description'} dir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-b border-border/50 transition-colors hover:bg-bg/50">
                <td className="py-2.5 pr-3 font-code text-xs text-text-dim">{f.id}</td>
                <td className="py-2.5 pr-3 font-heading text-sm font-medium text-text">{f.name}</td>
                <td className="py-2.5 pr-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${phaseBadge[f.phase]}`}>
                    {f.phase}
                  </span>
                </td>
                <td className="py-2.5 pr-3 font-code text-xs text-text-secondary">{f.latency}</td>
                <td className="py-2.5 pr-3 font-code text-xs text-text-secondary">{f.scoreRange}</td>
                <td className="py-2.5 text-xs text-text-secondary">{f.description}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-text-dim">
                  No filters match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] text-text-dim">
        {filtered.length} of {FILTERS.length} filters shown. Filters execute in phase order; within each phase, all filters run in parallel.
      </p>
    </div>
  );
}
