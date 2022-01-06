module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '128': '32rem',
        '160': '40rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
