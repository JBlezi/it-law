/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        'main': '#1584EB',
        'grey': '#2E323D',
        'light': '#F1F5FF',
        'light-grey': '#495061'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
