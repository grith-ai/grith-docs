type BadgeVariant = 'community' | 'pro' | 'enterprise' | 'roadmap' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

// Tint-system pills per the surface-extension spec (section 6). Plan badges:
// Pro = allow variant (green tint), Enterprise = purple. Roadmap = queue
// (warning tint). "info" is the neutral variant.
const variantStyles: Record<BadgeVariant, string> = {
  community: 'bg-green-light text-accent-text border-green-border',
  pro: 'bg-green-light text-accent-text border-green-border',
  enterprise: 'bg-purple-light text-purple border-purple-border',
  roadmap: 'bg-warning-light text-warning-text border-warning-border',
  info: 'bg-transparent text-text-secondary border-border',
};

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`rounded-pill font-label inline-flex items-center border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
