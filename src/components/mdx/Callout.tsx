type CalloutType = 'tip' | 'info' | 'warning' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

// Tint-fill admonitions on the token system: fills/borders use the theme's
// tint pairs, titles use the AA-safe *-text colours in both themes.
const styles: Record<CalloutType, { border: string; bg: string; icon: string; title: string }> = {
  tip: {
    border: 'border-green-border',
    bg: 'bg-green-light',
    icon: '💡',
    title: 'text-accent-text',
  },
  info: {
    border: 'border-info-border',
    bg: 'bg-info-light',
    icon: 'ℹ️',
    title: 'text-info',
  },
  warning: {
    border: 'border-warning-border',
    bg: 'bg-warning-light',
    icon: '⚠️',
    title: 'text-warning-text',
  },
  danger: {
    border: 'border-danger-border',
    bg: 'bg-danger-light',
    icon: '🚨',
    title: 'text-danger-text',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`rounded-card my-6 border ${s.border} ${s.bg} p-5`}>
      {title && (
        <p className={`font-heading mb-2 flex items-center gap-2 text-sm font-semibold ${s.title}`}>
          <span>{s.icon}</span>
          {title}
        </p>
      )}
      <div className="text-text-secondary text-sm [&>p]:my-1">{children}</div>
    </div>
  );
}
