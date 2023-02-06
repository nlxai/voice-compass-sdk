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
    },
  },
  plugins: [],
};
