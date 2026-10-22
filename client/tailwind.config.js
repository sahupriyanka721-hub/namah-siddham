/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F6F3',
          100: '#DCE8E2',
          200: '#BCD3C6',
          300: '#94B7A5',
          400: '#64957E',
          500: '#3D755D',
          600: '#2A5C47',
          700: '#1D4937',
          800: '#153C2D',
          900: '#0F2C21',
          950: '#081A13',
        },
        gold: {
          50: '#FAF8F0',
          100: '#F4EEDC',
          200: '#E8DDB8',
          300: '#D9C78E',
          400: '#CBB269',
          500: '#C5A059',
          600: '#AC8740',
          700: '#8C6C30',
          800: '#73572A',
          900: '#5F4725',
          950: '#382812',
        },
        sage: {
          50: '#F7FAF8',
          100: '#EDF4F0',
          200: '#DAE7DF',
          300: '#C0D5C9',
          400: '#A1BFAEFF',
          500: '#83A693',
        },
        charcoal: {
          50: '#F6F6F7',
          100: '#E7E8EA',
          200: '#CFD1D5',
          300: '#ACB0B7',
          400: '#818692',
          500: '#626875',
          600: '#4D525D',
          700: '#3F434C',
          800: '#27292F',
          900: '#1A1B1F',
          950: '#0E0F11',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(15, 44, 33, 0.05), 0 1px 2px rgba(15, 44, 33, 0.03)',
        'soft-md': '0 4px 12px rgba(15, 44, 33, 0.06), 0 2px 4px rgba(15, 44, 33, 0.04)',
        'soft-lg': '0 10px 25px rgba(15, 44, 33, 0.08), 0 4px 10px rgba(15, 44, 33, 0.05)',
        'soft-xl': '0 20px 40px rgba(15, 44, 33, 0.12), 0 8px 16px rgba(15, 44, 33, 0.06)',
      }
    },
  },
  plugins: [],
}
