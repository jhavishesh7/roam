/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cb',
          300: '#8fd1a8',
          400: '#5bb57e',
          500: '#2C6E49',
          600: '#25603f',
          700: '#1f4d33',
          800: '#1b3e2a',
          900: '#173323',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6B35',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e8f1e8',
          200: '#D9E5D6',
          300: '#b8d0b4',
          400: '#93b88d',
          500: '#719d6a',
          600: '#578152',
          700: '#476643',
          800: '#3b5337',
          900: '#33452f',
        },
        peach: {
          50: '#fef9f6',
          100: '#fdf2ec',
          200: '#FAE3D9',
          300: '#f6d0bb',
          400: '#f1b492',
          500: '#ea9469',
          600: '#dd7548',
          700: '#c85c37',
          800: '#a04b32',
          900: '#84412e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};