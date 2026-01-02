
import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', dot = false, pulse = false }) => {
  const styles: Record<BadgeVariant, string> = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    error: 'bg-rose-50 text-rose-600 border-rose-100',
    info: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    neutral: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  const dotStyles: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-indigo-500',
    neutral: 'bg-slate-400',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border ${styles[variant]}`}>
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotStyles[variant]} ${pulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
