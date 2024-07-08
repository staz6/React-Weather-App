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
      keyframes: {
        glow: {
          "0%, 100%": {
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 50px rgba(255, 0, 0, 0.5), 0 0 60px rgba(255, 0, 0, 0.4), 0 0 70px rgba(255, 0, 0, 0.3)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 50px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.5), 0 0 70px rgba(255, 0, 0, 0.4), 0 0 80px rgba(255, 0, 0, 0.3)",
          },
        },
      },
      animation: {
        glow: "glow 1s infinite alternate",
      },
    },
  },
  plugins: [],
};
