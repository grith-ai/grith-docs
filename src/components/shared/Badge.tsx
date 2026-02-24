type BadgeVariant = 'community' | 'pro' | 'enterprise' | 'roadmap' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  community: 'bg-green-light text-green-dark border-green-border',
  pro: 'bg-info-light text-info border-info-border',
  enterprise: 'bg-purple-light text-purple border-purple/20',
  roadmap: 'bg-warning-light text-warning border-warning-border',
  info: 'bg-surface text-text-secondary border-border',
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
