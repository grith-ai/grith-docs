import cliData from '@/data/generated/cli.json';

interface CommandEntry {
  variant: string;
  name: string;
  description: string;
}

const COMMANDS = cliData.commands as CommandEntry[];

export default function CliCommandTable() {
  return (
    <div className="rounded-card border-border bg-surface my-6 overflow-hidden border">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-surface-2/40 border-b">
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                Command
              </th>
              <th className="font-label text-text-dim px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                What it does
              </th>
            </tr>
          </thead>
          <tbody>
            {COMMANDS.map((c) => (
              <tr key={c.name} className="border-border/40 border-b last:border-0">
                <td className="font-code text-text px-4 py-2 align-top text-xs">grith {c.name}</td>
                <td className="text-text-secondary px-4 py-2 align-top text-xs">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cliData.partial && (
        <p className="border-border bg-surface-2/40 text-text-dim border-t px-4 py-2 text-[10px]">
          Top-level command listing only. Per-command flag detail is rendered on the individual
          command pages.
        </p>
      )}
    </div>
  );
}
