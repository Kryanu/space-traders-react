import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Panel({ title, action, className = '', children }: PanelProps) {
  return (
    <section
      className={`flex flex-col gap-3 p-4 min-h-0 bg-secondary border border-solid border-secondary-gray ${className}`}
    >
      {(title || action) && (
        <header className='flex items-center justify-between'>
          <h2 className='m-0 text-base font-medium text-primary'>{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
