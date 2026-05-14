import apiData from '@/data/generated/api.json';

interface Route {
  method: string;
  path: string;
  summary: string;
  tier?: string | null;
  ipc_only?: boolean;
  auth?: string | null;
  since?: string | null;
}

interface Group {
  name: string;
  description?: string | null;
  routes: Route[];
}

const GROUPS = apiData.groups as Group[];

const methodColour: Record<string, string> = {
  GET: 'bg-info-light text-info',
  POST: 'bg-green-light text-green-dark',
  PUT: 'bg-warning-light text-warning',
  DELETE: 'bg-danger-light text-danger',
  PATCH: 'bg-purple-light text-purple',
};

interface ApiRouteTableProps {
  /** Restrict to a single group name. If omitted, renders every group. */
  group?: string;
  /** Render group headings even when filtering. */
  showHeadings?: boolean;
}

export default function ApiRouteTable({ group, showHeadings = true }: ApiRouteTableProps) {
  const groups = group
    ? GROUPS.filter((g) => g.name.toLowerCase() === group.toLowerCase())
    : GROUPS;

  if (groups.length === 0) {
    return (
      <p className="my-4 text-sm text-danger">
        API group <code className="font-code">{group}</code> not found. Run{' '}
        <code className="font-code">npm run gen:references</code>.
      </p>
    );
  }

  return (
    <div className="my-6 space-y-6">
      {groups.map((g) => (
        <section key={g.name} className="overflow-hidden rounded-lg border border-border bg-surface">
          {showHeadings && (
            <div className="border-b border-border px-4 py-3">
              <h3 className="font-heading text-sm font-bold text-text">{g.name}</h3>
              {g.description && (
                <p className="mt-1 text-xs text-text-secondary">{g.description}</p>
              )}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/40">
                  <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                    Method
                  </th>
                  <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                    Path
                  </th>
                  <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                    Summary
                  </th>
                  <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                    Flags
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.routes.map((r) => (
                  <tr
                    key={`${r.method} ${r.path}`}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-4 py-2 align-top">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 font-code text-[10px] font-bold ${
                          methodColour[r.method] ?? 'bg-surface-2 text-text-secondary'
                        }`}
                      >
                        {r.method}
                      </span>
                    </td>
                    <td className="px-4 py-2 align-top font-code text-xs text-text">{r.path}</td>
                    <td className="px-4 py-2 align-top text-xs text-text-secondary">{r.summary}</td>
                    <td className="px-4 py-2 align-top">
                      <div className="flex flex-wrap gap-1">
                        {r.tier === 'pro' && (
                          <span className="inline-block rounded-full bg-info-light px-1.5 py-0.5 text-[9px] font-bold uppercase text-info">
                            Pro
                          </span>
                        )}
                        {r.tier === 'enterprise' && (
                          <span className="inline-block rounded-full bg-purple-light px-1.5 py-0.5 text-[9px] font-bold uppercase text-purple">
                            Ent
                          </span>
                        )}
                        {r.ipc_only && (
                          <span className="inline-block rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] font-bold uppercase text-text-secondary">
                            IPC
                          </span>
                        )}
                        {r.auth === 'local' && (
                          <span className="inline-block rounded-full bg-warning-light px-1.5 py-0.5 text-[9px] font-bold uppercase text-warning">
                            local
                          </span>
                        )}
                        {r.since && (
                          <span className="inline-block rounded border border-border bg-bg px-1.5 py-0.5 font-code text-[10px] text-text-dim">
                            since {r.since}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
