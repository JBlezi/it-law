/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        'main': '#1584EB',
        'grey': '#2E323D',
        'light': '#F1F5FF'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
