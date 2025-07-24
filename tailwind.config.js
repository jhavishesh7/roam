/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#E6FCF5',
          100: '#C3FAE8',
          200: '#96F2D7',
          300: '#63E6BE',
          400: '#38D9A9',
          500: '#10B981', // main teal
          600: '#059669', // accent teal
          700: '#047857',
          800: '#065F46',
          900: '#014F36',
        },
        blue: {
          50: '#F0F7FF',
          100: '#C3E0FF',
          200: '#90C2FF',
          300: '#64A6FF',
          400: '#368DFF',
          500: '#2563EB', // main blue
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        },
        dark: '#1C1C1C',
        light: '#F7F7F7',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.1)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        flicker: 'flicker 2.5s infinite linear',
        gradientSlow: 'gradient-slow 6s ease-in-out infinite',
        bgFade: 'bg-fade 4s ease-in-out infinite',
        buttonFlicker: 'button-flicker 2s ease-in-out infinite',
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
        flicker: {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.95' },
          '20%': { opacity: '0.97' },
          '30%': { opacity: '0.92' },
          '40%': { opacity: '0.98' },
          '50%': { opacity: '0.93' },
          '60%': { opacity: '1' },
          '70%': { opacity: '0.96' },
          '80%': { opacity: '0.99' },
          '90%': { opacity: '0.94' },
        },
        gradientSlow: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        bgFade: {
          '0%, 100%': { 'background-color': '#059669' }, // strong green
          '20%': { 'background-color': '#10B981' },      // emerald
          '40%': { 'background-color': '#22c55e' },      // green-500
          '60%': { 'background-color': '#16a34a' },      // green-600
          '80%': { 'background-color': '#166534' },      // deep green
        },
        buttonFlicker: {
          '0%, 100%': { 'background-color': '#059669' }, // strong green
          '25%': { 'background-color': '#10B981' },     // emerald
          '50%': { 'background-color': '#22c55e' },     // green-500
          '75%': { 'background-color': '#16a34a' },     // green-600
        },
      },
    },
  },
  plugins: [],
};