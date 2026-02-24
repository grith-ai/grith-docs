type CalloutType = 'tip' | 'info' | 'warning' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { border: string; bg: string; icon: string; title: string }> = {
  tip: {
    border: 'border-green/30',
    bg: 'bg-green-dim',
    icon: '💡',
    title: 'text-green',
  },
  info: {
    border: 'border-info/30',
    bg: 'bg-info-dim',
    icon: 'ℹ️',
    title: 'text-info',
  },
  warning: {
    border: 'border-warning/30',
    bg: 'bg-warning-dim',
    icon: '⚠️',
    title: 'text-warning',
  },
  danger: {
    border: 'border-danger/30',
    bg: 'bg-danger-dim',
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
