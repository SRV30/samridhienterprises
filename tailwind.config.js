/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-bg": "#f7fafc",
        "dark-bg": "#2d3748",
      },
      fontFamily: {
        custom: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"),
  require("@tailwindcss/typography")],
};
