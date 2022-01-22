const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './index.html'
  ],

  theme: {
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
