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
        presstart: ["Press Start 2P"],
      },
    },
  },
  plugins: [],
};
