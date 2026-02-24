interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-bg p-6 ${hover ? 'transition-all hover:border-border-dark hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
