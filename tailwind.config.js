/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linearMain: " linear-gradient(135deg, #48355b, #8c6eab)",
        linearSide: " linear-gradient(135deg, #d2c3e1, #48355b)",
      },
      colors: {
        "custom-gray": "rgba(205, 205, 205, 0)",
      },
    },
  },
  plugins: [],
};
