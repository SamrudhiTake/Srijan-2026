/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#04060E",
        space: {
          950: "#04060E",
          900: "#070A18",
          850: "#0B1024",
          800: "#0F1631",
          700: "#17234A",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        solar: {
          400: "#FB923C",
          500: "#FF6B00",
          600: "#EA580C",
        },
        starlight: {
          400: "#38BDF8",
          500: "#06B6D4",
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
        'cosmic-gradient': 'linear-gradient(180deg, #04060E 0%, #070A18 50%, #0B1024 100%)',
      }
    },
  },
  plugins: [],
}
