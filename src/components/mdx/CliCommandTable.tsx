import cliData from '@/data/generated/cli.json';

interface CommandEntry {
  variant: string;
  name: string;
  description: string;
}

const COMMANDS = cliData.commands as CommandEntry[];

export default function CliCommandTable() {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/40">
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                Command
              </th>
              <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-dim">
                What it does
              </th>
            </tr>
          </thead>
          <tbody>
            {COMMANDS.map((c) => (
              <tr key={c.name} className="border-b border-border/40 last:border-0">
                <td className="px-4 py-2 align-top font-code text-xs text-text">grith {c.name}</td>
                <td className="px-4 py-2 align-top text-xs text-text-secondary">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cliData.partial && (
        <p className="border-t border-border bg-surface-2/40 px-4 py-2 text-[10px] text-text-dim">
          Top-level command listing only. Per-command flag detail is rendered on the individual command pages.
        </p>
      )}
    </div>
  );
}
