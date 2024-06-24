/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linearMain: " linear-gradient(135deg, #48355b, #8c6eab)",
        linearSide: " linear-gradient(135deg, #d2c3e1, #48355b)",
      },
      inset: {
        "custom-super": "-3rem",
        "temp-top": "-1rem",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "8xl": "6rem",
        "9xl": "8rem",
        "10xl": "10rem",
      },
      colors: {
        "custom-gray": "rgba(205, 205, 205, 0)",
      },
    },
  },
  plugins: [],
};
