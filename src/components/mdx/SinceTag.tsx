interface SinceTagProps {
  version: string;
  className?: string;
}

// Inline marker for features introduced after the initial release.
// Renders as a small monospace pill: "Since 0.1.2"
export default function SinceTag({ version, className = '' }: SinceTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-surface px-1.5 py-0.5 align-middle font-code text-[11px] text-text-secondary ${className}`}
      title={`Available since grith ${version}`}
    >
      since&nbsp;{version}
    </span>
  );
}
