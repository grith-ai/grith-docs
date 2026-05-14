import configData from '@/data/generated/config.json';

interface ConfigKey {
  name: string;
  type: string;
  default: unknown;
  description: string | null;
}

interface ConfigSection {
  path: string;
  description: string | null;
  keys: ConfigKey[];
}

const SECTIONS = configData.sections as ConfigSection[];

function formatDefault(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[${value
      .map((v) => (typeof v === 'string' ? `"${v}"` : String(v)))
      .join(', ')}]`;
  }
  return JSON.stringify(value);
}

interface ConfigKeyTableProps {
  /** Dotted section path, e.g. "proxy" or "proxy.filters.rate_limit". */
  section: string;
  /** Override the rendered heading. Defaults to "[section]". */
  title?: string;
  /** Hide the heading entirely. */
  hideTitle?: boolean;
}

export default function ConfigKeyTable({ section, title, hideTitle = false }: ConfigKeyTableProps) {
  const data = SECTIONS.find((s) => s.path === section);
  if (!data) {
    return (
      <p className="my-4 text-sm text-danger">
        Config section <code className="font-code">[{section}]</code> not found in generated data.
        Run <code className="font-code">npm run gen:references</code>.
      </p>
    );
  }
  const heading = title ?? `[${data.path}]`;
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-surface">
      {!hideTitle && (
        <div className="border-b border-border px-4 py-3">
          <h3 className="font-code text-sm font-bold text-text">{heading}</h3>
          {data.description && (
            <p className="mt-1 text-xs text-text-secondary">{data.description}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/40">
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                Key
              </th>
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                Type
              </th>
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                Default
              </th>
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.keys.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-xs text-text-dim">
                  This section only contains nested tables.
                </td>
              </tr>
            )}
            {data.keys.map((k) => (
              <tr key={k.name} className="border-b border-border/40 last:border-0">
                <td className="px-4 py-2 align-top font-code text-xs text-text">{k.name}</td>
                <td className="px-4 py-2 align-top font-code text-xs text-text-dim">{k.type}</td>
                <td className="px-4 py-2 align-top font-code text-xs text-text-secondary">
                  {formatDefault(k.default)}
                </td>
                <td className="px-4 py-2 align-top text-xs text-text-secondary">
                  {k.description ?? <span className="text-text-dim">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
