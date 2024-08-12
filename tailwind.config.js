/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        RadialSide:
          "radial-gradient(circle at top left, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
        linearBg:
          "linear-gradient(45deg, rgba(240,181,206,1) 0%, rgba(140,107,174,1) 100%)",
        DarklinearBg:
          "linear-gradient(45deg, rgba(72,53,91,1) 100%, rgba(145,190,243,1) 0%)",
      },
      inset: {
        "custom-super": "-3rem",
        "temp-top": "-1rem",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "8xl": "6rem",
        "9xl": "8rem",
        "10xl": "10rem",
      },
      colors: {
        "custom-gray": "rgba(205, 205, 205, 0)",
      },
      textShadow: {
        TemperaturShadow: "4.51px 2.26px 0.75px rgba(0, 0, 0, 0.15)",
        CustomShadow: "-1.51px 2.26px 0.75px rgba(0, 0, 0, 0.10)",
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
  plugins: [require("tailwindcss-textshadow")],
};
