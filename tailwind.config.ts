import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
      },
    },
  },
  plugins: [],
}

export default config
