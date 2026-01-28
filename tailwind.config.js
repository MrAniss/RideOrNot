/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#046865',
        'bg-secondary': '#035553',
        'bg-tertiary': '#21A0A0',
        'text-primary': '#FCFFF7',
        'accent': '#21A0A0',
        'accent-secondary': '#FFE900',
        'accent-hover': '#1a8080',
        'verdict-go': '#21A0A0',
        'verdict-risky': '#FFE900',
        'verdict-nogo': '#E53D00',
      },
      fontFamily: {
        'heading': ['Outfit', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
