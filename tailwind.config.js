/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'custom': '0 6px 2px black',
      },
      colors: {
        'red': '#ff0000',
        'primeRed':'#e55952',
        'primWhite': '#e6e2dc',
        'PrimSilver':'#c4c6da',
        'PrimePurple':'#6c29b7',
        'primBlack': '#1d1d3b',
        'primeBlue':'#add8e6',
        'primeYellow':'#fffacd',
        'darkGoldenrod':'#a8770b',
        'primeGreen':'#90ee90',
        'darkGreen':'#006400'
      },
    },
  },
  plugins: [],
}