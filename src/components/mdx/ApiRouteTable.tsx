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

// Auth vocabulary is defined in api.json under `auth_levels`.
const authColour: Record<string, string> = {
  open: 'bg-surface-2 text-text-secondary',
  dashboard: 'bg-info-light text-info',
  csrf: 'bg-warning-light text-warning-text',
  nonce: 'bg-warning-light text-warning-text',
  'pair-code': 'bg-warning-light text-warning-text',
  ipc: 'bg-purple-light text-purple',
  ws: 'bg-info-light text-info',
};

const methodColour: Record<string, string> = {
  GET: 'bg-info-light text-info',
  POST: 'bg-green-light text-accent-text',
  PUT: 'bg-warning-light text-warning-text',
  DELETE: 'bg-danger-light text-danger-text',
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
      <p className="text-danger-text my-4 text-sm">
        API group <code className="font-code">{group}</code> not found. Run{' '}
        <code className="font-code">npm run gen:references</code>.
      </p>
    );
  }

  return (
    <div className="my-6 space-y-6">
      {groups.map((g) => (
        <section
          key={g.name}
          className="rounded-card border-border bg-surface overflow-hidden border"
        >
          {showHeadings && (
            <div className="border-border border-b px-4 py-3">
              <h3 className="font-heading text-text text-sm font-semibold">{g.name}</h3>
              {g.description && <p className="text-text-secondary mt-1 text-xs">{g.description}</p>}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-border bg-surface-2/40 border-b">
                  <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                    Method
                  </th>
                  <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                    Path
                  </th>
                  <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                    Summary
                  </th>
                  <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                    Flags
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.routes.map((r) => (
                  <tr
                    key={`${r.method} ${r.path}`}
                    className="border-border/40 border-b last:border-0"
                  >
                    <td className="px-4 py-2 align-top">
                      <span
                        className={`font-code inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          methodColour[r.method] ?? 'bg-surface-2 text-text-secondary'
                        }`}
                      >
                        {r.method}
                      </span>
                    </td>
                    <td className="font-code text-text px-4 py-2 align-top text-xs">{r.path}</td>
                    <td className="text-text-secondary px-4 py-2 align-top text-xs">{r.summary}</td>
                    <td className="px-4 py-2 align-top">
                      <div className="flex flex-wrap gap-1">
                        {r.tier === 'pro' && (
                          <span className="rounded-pill bg-green-light font-label text-accent-text inline-block px-1.5 py-0.5 text-[9px] font-medium uppercase">
                            Pro
                          </span>
                        )}
                        {r.tier === 'enterprise' && (
                          <span className="rounded-pill bg-purple-light font-label text-purple inline-block px-1.5 py-0.5 text-[9px] font-medium uppercase">
                            Ent
                          </span>
                        )}
                        {r.auth && (
                          <span
                            className={`rounded-pill font-label inline-block px-1.5 py-0.5 text-[9px] font-medium uppercase ${
                              authColour[r.auth] ?? 'bg-surface-2 text-text-secondary'
                            }`}
                          >
                            {r.auth}
                          </span>
                        )}
                        {r.since && (
                          <span className="border-border bg-bg font-code text-text-dim inline-block rounded border px-1.5 py-0.5 text-[10px]">
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
