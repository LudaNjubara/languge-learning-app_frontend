import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "fade-in": {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        "fade-out": {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        }
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "fade-out": "fade-out 1s ease-out"
      }
    },
    plugins: [],
  }
}
export default config
