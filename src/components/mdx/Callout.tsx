type CalloutType = 'tip' | 'info' | 'warning' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { border: string; bg: string; icon: string; title: string }> = {
  tip: {
    border: 'border-green-border',
    bg: 'bg-green-light',
    icon: '💡',
    title: 'text-green-dark',
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
    title: 'text-warning',
  },
  danger: {
    border: 'border-danger-border',
    bg: 'bg-danger-light',
    icon: '🚨',
    title: 'text-danger',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`my-6 rounded-lg border ${s.border} ${s.bg} p-4`}>
      {title && (
        <p className={`mb-2 flex items-center gap-2 font-heading text-sm font-bold ${s.title}`}>
          <span>{s.icon}</span>
          {title}
        </p>
      )}
      <div className="text-sm text-text-secondary [&>p]:my-1">{children}</div>
    </div>
  );
}
