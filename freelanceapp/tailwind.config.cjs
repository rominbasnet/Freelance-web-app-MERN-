/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        dark_purple: "#000235",
        btn_primary: "#7e7ee3",
        laracast_mainbg: "#151f32",
        posted_txt: "#526884",
        laracast_bg: "#17243c",
        laracast_hoverbg: "#1d2d4a",
        skill_border: "#8cd362",
        skill_bg: "#18273f",
        btn_secondary: "#fe7bd4",
        btn_div: "#ecf2fe",
        btn_div2: "#f6f6f7",
        btn_text: "#8b98aa",
        btn_yellow: "#ce9005",
        lightBlue: colors.lightBlue,
        cyan: "#2dfbff"
      }
    },
  },
  plugins: [
    require('daisyui'),      
    require('@tailwindcss/forms'),
          
  ],

}
