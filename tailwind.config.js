/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts,tsx,jsx}",
    "./layouts/**/*.{vue,js,ts,tsx,jsx}",
    "./pages/**/*.{vue,js,ts,tsx,jsx}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.{vue,js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: 'url(@/assets/images/bg-login.png)'
      },
      colors: {
        primary: '#27A376'
      },
      fontFamily:{
        'primary': ['Manrope']
      }
    },
  },
  plugins: [],
}