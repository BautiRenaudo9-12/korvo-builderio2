import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassPanel = ({ children, className, onClick }: GlassPanelProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-panel rounded-xl border border-white/5 p-4',
        className
      )}
    >
      {children}
    </div>
  );
};
