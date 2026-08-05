interface SinceTagProps {
  version: string;
  className?: string;
}

// Inline marker for features introduced after the initial release.
// Renders as a small monospace pill: "Since 0.1.2"
export default function SinceTag({ version, className = '' }: SinceTagProps) {
  return (
    <span
      className={`rounded-pill border-border font-code text-text-secondary inline-flex items-center border bg-transparent px-2 py-0.5 align-middle text-[11px] ${className}`}
      title={`Available since grith ${version}`}
    >
      since&nbsp;{version}
    </span>
  );
}
