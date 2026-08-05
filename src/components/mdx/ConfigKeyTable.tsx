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
  if (value === null || value === undefined) return '-';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[${value.map((v) => (typeof v === 'string' ? `"${v}"` : String(v))).join(', ')}]`;
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
      <p className="text-danger-text my-4 text-sm">
        Config section <code className="font-code">[{section}]</code> not found in generated data.
        Run <code className="font-code">npm run gen:references</code>.
      </p>
    );
  }
  const heading = title ?? `[${data.path}]`;
  return (
    <div className="rounded-card border-border bg-surface my-6 overflow-hidden border">
      {!hideTitle && (
        <div className="border-border border-b px-4 py-3">
          <h3 className="font-code text-text text-sm font-semibold">{heading}</h3>
          {data.description && (
            <p className="text-text-secondary mt-1 text-xs">{data.description}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-surface-2/40 border-b">
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                Key
              </th>
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                Type
              </th>
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                Default
              </th>
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.keys.length === 0 && (
              <tr>
                <td colSpan={4} className="text-text-dim px-4 py-4 text-center text-xs">
                  This section only contains nested tables.
                </td>
              </tr>
            )}
            {data.keys.map((k) => (
              <tr key={k.name} className="border-border/40 border-b last:border-0">
                <td className="font-code text-text px-4 py-2 align-top text-xs">{k.name}</td>
                <td className="font-code text-text-dim px-4 py-2 align-top text-xs">{k.type}</td>
                <td className="font-code text-text-secondary px-4 py-2 align-top text-xs">
                  {formatDefault(k.default)}
                </td>
                <td className="text-text-secondary px-4 py-2 align-top text-xs">
                  {k.description ?? <span className="text-text-dim">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
