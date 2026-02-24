type BadgeVariant = 'community' | 'pro' | 'enterprise' | 'roadmap' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  community: 'bg-green-dim text-green border-green/20',
  pro: 'bg-info-dim text-info border-info/20',
  enterprise: 'bg-[rgba(167,139,250,0.15)] text-purple border-purple/20',
  roadmap: 'bg-warning-dim text-warning border-warning/20',
  info: 'bg-surface-2 text-text-secondary border-border',
};

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-label text-[10px] uppercase tracking-[0.08em] ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
