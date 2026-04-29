/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007aff',
          light: '#e6f2ff',
          dark: '#0056b3',
        },
        secondary: {
          DEFAULT: '#00bb94',
        }
      }
    },
  },
  plugins: [],
}
