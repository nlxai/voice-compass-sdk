import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: [
    {
      sourcemap: true,
      format: "umd",
      name: "voiceCompass",
      file: "lib/index.js",
      exports: "named",
    },
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
  ],
};
