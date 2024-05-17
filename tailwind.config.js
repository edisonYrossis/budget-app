/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,css,js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'custom-gold': '#ffbf00',
        'custom-platinum': '#e5e4e2'
      }
    },
  },
  plugins: [],
}

