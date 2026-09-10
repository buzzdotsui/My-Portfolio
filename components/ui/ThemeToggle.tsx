import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-surface/50 border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: theme === 'light' ? 1 : 0,
            transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
          }}
        >
          <Sun size={20} className="text-warning" />
        </span>

        {/* Moon icon */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: theme === 'dark' ? 1 : 0,
            transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
          }}
        >
          <Moon size={20} className="text-primary" />
        </span>
      </div>
    </button>
  );
};

