/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        secondary: '#fbbf24',
      },
      // 可以在这里添加更多的主题色
    },
  },
  plugins: [],
}
