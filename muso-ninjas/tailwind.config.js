module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#4f515a',
        secondary: '#ebebeb',
        warning: '#da0f41',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
