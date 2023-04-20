/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*"],
  theme: {
    extend: {
      keyframes: {
        firstlyTransparent: {
          "0%, 50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        firstlyTransparent: "firstlyTransparent .2s",
      },
      colors: {
        voiceCompassPurple: "rgb(74, 102, 240)",
        voiceCompassPurple05: "rgba(74, 102, 240, 0.05)",
        voiceCompassPurpleDarker: "rgb(67, 93, 219)",
      },
      fontFamily: {
        system: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          '"Helvetica Neue"',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
};
