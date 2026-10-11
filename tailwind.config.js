/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base (60%) - Crema / Panna
        base: {
          DEFAULT: '#F8F5EE',
          card: '#FFFFFF',
          'card-alt': '#FDFBF7',
          dark: '#EBE5D8',
        },
        // Secondario (30%) - Tonalità #713600
        secondary: {
          DEFAULT: '#713600',
          muted: '#8A4500',
          light: '#A35500',
        },
        // Accento (10%) - Verde Bosco / Oliva & Terracotta
        accent: {
          DEFAULT: '#44553C',
          hover: '#33412D',
          light: '#5E7353',
          terracotta: '#B85D43',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
