const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

/**  @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  darkMode: 'class',

  theme: {
    extend: {
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
      container: {
        screens: {
          '3xl': '1920px',
        },
      },
    },
  },

  plugins: [forms, typography, lineClamp],
};

module.exports = config;
