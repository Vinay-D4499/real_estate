/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      fontFamily: {
        condensed: ['"Roboto Condensed"', 'sans-serif'], // Add condensed font
      },
    },
  },
  plugins: [],
}

