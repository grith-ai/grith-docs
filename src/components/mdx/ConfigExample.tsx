'use client';

import CodeBlock from './CodeBlock';

interface ConfigExampleProps {
  code: string;
  title?: string;
  description?: string;
}

export default function ConfigExample({ code, title, description }: ConfigExampleProps) {
  return (
    <div className="my-6">
      {(title || description) && (
        <div className="mb-2">
          {title && <p className="font-heading text-text text-sm font-semibold">{title}</p>}
          {description && <p className="text-text-secondary text-sm">{description}</p>}
        </div>
      )}
      <CodeBlock code={code} language="toml" />
    </div>
  );
}
