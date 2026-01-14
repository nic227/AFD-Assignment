/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#f97316',
          secondary: '#fb923c',
          light: '#fdba74',
          lighter: '#fed7aa',
        },
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
        'gradient-gold': 'linear-gradient(to right, #e39a55, #f0c27b)',
        'gradient-radial': 'radial-gradient(circle at center, #0b0d2b, #050615)',
      },
      boxShadow: {
        'orange-glow': '0 4px 15px rgba(249, 115, 22, 0.4)',
        'orange-glow-lg': '0 6px 20px rgba(249, 115, 22, 0.6)',
        'circle-glow': '0 20px 40px -10px rgba(249, 115, 22, 0.4), 0 0 50px rgba(249, 115, 22, 0.2)',
      },
      spacing: {
        '68': '17rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}

