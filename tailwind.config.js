/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    `./src/components/**/*.{vue,js}`,
    `./src/views/**/*.vue`,
    `./src/plugins/**/*.{js,ts}`,
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: 'url(./src/assets/images/bg-login.png)'
      },
      colors: {
        primary: '#27A376'
      },
      fontFamily:{
        'primary': ['Manrope']
      }
    },
  },
  plugins: [
    require("autoprefixer"),
  ],
}
