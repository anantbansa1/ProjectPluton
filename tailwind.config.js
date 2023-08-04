/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
        roboto: ["Roboto", "sans-serif"],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
