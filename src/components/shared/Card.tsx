interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 ${hover ? 'transition-colors hover:border-text-dim' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
