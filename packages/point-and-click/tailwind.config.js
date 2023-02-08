/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*"],
  theme: {
    extend: {
      keyframes: {
        firstlyTransparent: {
          '0%, 50%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        firstlyTransparent: 'firstlyTransparent .2s',
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
