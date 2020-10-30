module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [{ content: ["./src/**/*.svelte"] }],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
