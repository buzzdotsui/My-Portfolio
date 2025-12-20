import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'glow';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono";
  
  const variants = {
    default: "bg-surfaceHighlight text-text-main border border-border",
    outline: "bg-transparent text-text-muted border border-border",
    glow: "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </span>
  );
};