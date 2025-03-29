/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // add background image
      backgroundImage: {
        "main-bg": "url('/assets/cast/background.svg')",
      },
      // add custom fonts
      fontFamily: {
        playfair: ["Playfair Display", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#BF894C",
        secondary: "#8E734B",
        secondaryLight: "#EADFCF",
        secondary2: "#8E734B",
        secondary3: "#AB6D34",
        siblings: {
          father: "#BF894C",
          mother: "#DA4167",
          brother: "#6DB1BF",
          sister: "#871526",
          lastborn: "#AB6D34",
          gu: "#3D5A6C",
        },
      },
    },
  },
  plugins: [],
};
