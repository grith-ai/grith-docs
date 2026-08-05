interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-card border-border bg-surface border p-6 ${hover ? 'hover:border-border-dark transition-colors duration-150' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
