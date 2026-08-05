'use client';

import { useState, useMemo } from 'react';
import filtersData from '@/data/generated/filters.json';

type SortKey = 'ordinal' | 'name' | 'phase' | 'score';
type SortDir = 'asc' | 'desc';

interface FilterEntry {
  ordinal: number;
  module: string;
  name: string;
  phase: string;
  score_range: [number, number];
  config_file?: string | null;
  summary: string;
  unmapped?: boolean;
  missing_source?: boolean;
}

const FILTERS: FilterEntry[] = (filtersData.filters as FilterEntry[]).filter(
  (f) => !f.unmapped && !f.missing_source,
);

const phaseOrder: Record<string, number> = {
  static: 0,
  pattern: 1,
  context: 2,
  unknown: 3,
};

const phaseBadge: Record<string, string> = {
  static: 'bg-info-light text-info',
  pattern: 'bg-warning-light text-warning-text',
  context: 'bg-purple-light text-purple',
  unknown: 'bg-surface-2 text-text-dim',
};

const phaseLatency: Record<string, string> = {
  static: '<1ms',
  pattern: '~3ms',
  context: '~5ms',
  unknown: '-',
};

function formatScore([lo, hi]: [number, number]): string {
  if (lo === 99 && hi === 99) return 'DENY';
  if (lo === 0 && hi === 0) return '-';
  if (hi === 99) return 'DENY';
  const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
  return lo === hi ? sign(lo) : `${sign(lo)} to ${sign(hi)}`;
}

function titlePhase(p: string): string {
  return p ? p.charAt(0).toUpperCase() + p.slice(1) : '-';
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-text-dim/40 ml-1 inline">
        <path d="M3 4l2-2 2 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 6l2 2 2-2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="text-green ml-1 inline">
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
  const [sortKey, setSortKey] = useState<SortKey>('ordinal');
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
        f.module.toLowerCase().includes(term) ||
        f.summary.toLowerCase().includes(term),
    );
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'ordinal':
          cmp = a.ordinal - b.ordinal;
          break;
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'phase':
          cmp = (phaseOrder[a.phase] ?? 99) - (phaseOrder[b.phase] ?? 99);
          break;
        case 'score':
          cmp = a.score_range[1] - b.score_range[1];
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, sortKey, sortDir]);

  const thClass =
    'cursor-pointer select-none whitespace-nowrap pb-2 pr-3 text-left font-label text-[11px] font-medium uppercase tracking-[0.08em] text-text-dim hover:text-text transition-colors';

  return (
    <div className="rounded-card border-border bg-surface my-6 border p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-heading text-text text-lg font-semibold">Security filters</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search filters..."
          className="rounded-btn border-border bg-bg font-code text-text placeholder:text-text-dim focus:border-green focus:shadow-glow w-full border px-3 py-2 text-sm focus:outline-none sm:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border border-b">
              <th className={thClass} onClick={() => handleSort('ordinal')}>
                # <SortIcon active={sortKey === 'ordinal'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('name')}>
                Name <SortIcon active={sortKey === 'name'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('phase')}>
                Phase <SortIcon active={sortKey === 'phase'} dir={sortDir} />
              </th>
              <th className={`${thClass} cursor-default`}>Latency budget</th>
              <th className={thClass} onClick={() => handleSort('score')}>
                Score <SortIcon active={sortKey === 'score'} dir={sortDir} />
              </th>
              <th className={`${thClass} cursor-default`}>Summary</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr
                key={f.module}
                className="border-border/50 hover:bg-bg/50 border-b transition-colors"
              >
                <td className="font-code text-text-dim py-2.5 pr-3 text-xs">
                  {f.ordinal === 0 ? '-' : f.ordinal}
                </td>
                <td className="font-code text-text py-2.5 pr-3 text-[12.5px]">{f.name}</td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`rounded-pill font-label inline-block px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase ${
                      phaseBadge[f.phase] ?? phaseBadge.unknown
                    }`}
                  >
                    {titlePhase(f.phase)}
                  </span>
                </td>
                <td className="font-code text-text-secondary py-2.5 pr-3 text-xs">
                  {phaseLatency[f.phase] ?? '-'}
                </td>
                <td className="font-code text-text-secondary py-2.5 pr-3 text-xs">
                  {formatScore(f.score_range)}
                </td>
                <td className="text-text-secondary py-2.5 text-xs">{f.summary}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-text-dim py-8 text-center text-sm">
                  No filters match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-text-dim mt-3 text-[10px]">
        {filtered.length} of {FILTERS.length} filters shown. Within each phase, filters run in
        parallel; phase order is static → pattern → context.
      </p>
    </div>
  );
}
