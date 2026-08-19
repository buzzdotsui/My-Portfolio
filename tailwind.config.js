/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,index}.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceHighlight: 'var(--color-surface-highlight)',
        border: 'var(--color-border)',
        borderSubtle: 'var(--color-border-subtle)',

        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
        },

        primary: {
          DEFAULT: '#0ea5e9',
          hover: '#0284c7',
          glow: 'rgba(14, 165, 233, 0.35)',
          light: '#38bdf8',
          dim: 'rgba(14, 165, 233, 0.12)',
        },
        secondary: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#34d399',
          dim: 'rgba(16, 185, 129, 0.12)',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
          dim: 'rgba(245, 158, 11, 0.12)',
        },

        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '3px',
        DEFAULT: '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 16px rgba(14, 165, 233, 0.2)',
        'glow-md': '0 0 30px rgba(14, 165, 233, 0.25)',
        'glow-lg': '0 0 60px rgba(14, 165, 233, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
