/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#0A0A0A',
        surface: '#111111',
        raised: '#161616',
        line: '#242424',
        'line-soft': '#1B1B1B',
        paper: '#F5F5F5',
        mute: '#A1A1AA',
        dim: '#8F8F98',
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#FF8555',
          soft: 'rgba(255, 107, 53, 0.14)',
        },
      },
      maxWidth: {
        shell: '76rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '300ms',
        slow: '500ms',
        reveal: '800ms',
      },
      letterSpacing: {
        label: '0.18em',
        cta: '0.16em',
        brand: '0.2em',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
}
