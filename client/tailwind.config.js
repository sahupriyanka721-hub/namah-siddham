/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Brand Palette (Master Prompt 1 & 2)
        royal: {
          50: '#F0F6FD',
          100: '#E0EEFA',
          200: '#BADBF6',
          300: '#7EBEF0',
          400: '#3A9CE8',
          500: '#0756B8', // Primary Action Royal Blue
          600: '#064AA0',
          700: '#053C83',
          800: '#06346C',
          900: '#0B2D59',
          950: '#071C38',
        },
        navy: {
          50: '#F4F6F8',
          100: '#E8ECF0',
          200: '#C7D1DC',
          300: '#A4B5C6',
          400: '#647D9B',
          500: '#3E5775',
          600: '#2F435C',
          700: '#253549',
          800: '#202B3C', // Dark Navy for Typography & Headers
          900: '#17202D',
          950: '#0F151F',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FFF9D1',
          200: '#FFF2A3',
          300: '#FFE666',
          400: '#FFD926',
          500: '#FFBE00', // Golden Yellow Accent
          600: '#E6A700',
          700: '#B88200',
          800: '#946600',
          900: '#7A5200',
          950: '#422A00',
        },
        orange: {
          50: '#FFF8F0',
          100: '#FFEFD6',
          200: '#FFDCAD',
          300: '#FFC27A',
          400: '#FFA142',
          500: '#F28C00', // Growth Accent Orange
          600: '#D97700',
          700: '#B35E00',
          800: '#8F4900',
          900: '#753C00',
          950: '#401E00',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F5F7FB', // Light Gray Background
          200: '#E9EEF6',
          300: '#D7E1EE',
          400: '#B5C4D8',
          500: '#8E9FB7',
        },
        // Backward-compatible alias mappings
        forest: {
          50: '#F0F6FD',
          100: '#E0EEFA',
          200: '#BADBF6',
          300: '#7EBEF0',
          400: '#3A9CE8',
          500: '#0756B8',
          600: '#064AA0',
          700: '#053C83',
          800: '#202B3C',
          900: '#17202D',
          950: '#0F151F',
        },
        sage: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
        charcoal: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(32, 43, 60, 0.05), 0 1px 2px rgba(32, 43, 60, 0.03)',
        'soft-md': '0 4px 12px rgba(32, 43, 60, 0.06), 0 2px 4px rgba(32, 43, 60, 0.04)',
        'soft-lg': '0 10px 25px rgba(32, 43, 60, 0.08), 0 4px 10px rgba(32, 43, 60, 0.05)',
        'soft-xl': '0 20px 40px rgba(32, 43, 60, 0.12), 0 8px 16px rgba(32, 43, 60, 0.06)',
      }
    },
  },
  plugins: [],
}
