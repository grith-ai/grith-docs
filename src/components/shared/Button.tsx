'use client';

import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-green text-accent-ink font-heading font-semibold hover:bg-green-dark focus-visible:outline-text',
  secondary:
    'border border-border bg-transparent text-text font-heading font-semibold hover:border-border-dark hover:bg-surface focus-visible:outline-green',
  ghost:
    'text-text-secondary font-medium hover:text-text hover:bg-surface-2 focus-visible:outline-green',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-4 py-[9px] text-sm',
  lg: 'px-6 py-3.5 text-base',
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
}: ButtonProps) {
  const styles = `inline-flex items-center justify-center rounded-btn transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
