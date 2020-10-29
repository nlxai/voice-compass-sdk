import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        sourcemap: true,
        format: "cjs",
        dir: "lib",
      },
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript(),
    ],
  },
];
