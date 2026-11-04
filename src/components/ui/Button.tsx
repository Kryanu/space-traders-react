import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Button({ active, className = '', ...props }: ButtonProps) {
  const tone = active
    ? 'bg-primary text-black border-primary'
    : 'bg-active-secondary text-primary border-secondary-gray enabled:hover:border-primary';

  return (
    <button
      type='button'
      className={`px-4 py-2 border border-solid text-sm uppercase tracking-wide cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${tone} ${className}`}
      {...props}
    />
  );
}
