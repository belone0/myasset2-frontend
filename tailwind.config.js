/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Adjust paths based on your structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Tailwind's blue
        secondary: '#9333EA', // Tailwind's purple
      },
    },
  },
  plugins: [],
}

