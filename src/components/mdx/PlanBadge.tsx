import Badge from '@/components/shared/Badge';

type Tier = 'community' | 'pro' | 'enterprise';

interface PlanBadgeProps {
  tier: Tier;
  planned?: boolean;
  className?: string;
}

const tierLabel: Record<Tier, string> = {
  community: 'Community',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

export default function PlanBadge({ tier, planned = false, className = '' }: PlanBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Badge variant={tier}>{tierLabel[tier]}</Badge>
      {planned && <Badge variant="roadmap">Planned</Badge>}
    </span>
  );
}
