/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alpine: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
          night: '#081325',
          midnight: '#040d1a',
          spruce: '#064e3b',
          powder: '#f8fafc',
          glacier: '#e0f7fa'
        },
        patrol: {
          red: '#dc2626',
          darkRed: '#991b1b',
          brightRed: '#ef4444',
          gold: '#f59e0b',
          navy: '#0b192c',
          ice: '#e0f2fe',
          snow: '#ffffff',
          slate: '#334155'
        }
      },
      backgroundImage: {
        'winter-glow': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15), transparent 70%)',
        'alpine-mesh': 'linear-gradient(to bottom, #040d1a, #0c1e33)'
      }
    },
  },
  plugins: [],
}
