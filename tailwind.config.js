/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: "transparent",
        black: "#000000",
        gray: "#607D8B",
        purple: "#7C4DFF",
      },
    },
  },
  plugins: [],
};
