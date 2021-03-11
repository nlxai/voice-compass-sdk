module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./eslint.tsconfig.json"],
    extraFileExtensions: ['.html']
  },
  rules: {
    "import/no-mutable-exports": 0,
    "no-labels": 0,
    "no-restricted-syntax": 0,
  },
  plugins: ["@typescript-eslint", "svelte3"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "prettier"
  ],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
};
