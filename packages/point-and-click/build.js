const fs = require("fs");
const svelte = require("svelte/compiler");
const sveltePreprocess = require("svelte-preprocess");
const tailwindcss = require("tailwindcss");
const postcss = require("postcss");

const transform = async () => {
  const svelteScript = fs.readFileSync("./src/PointAndClick.svelte", "utf-8");

  const css = await postcss([tailwindcss])
    .process("@tailwind base;@tailwind components;@tailwind utilities;")
    .then((res) => {
      return res.css;
    });

  const { code } = await svelte.preprocess(
    svelteScript,
    sveltePreprocess({
      replace: [["/*TAILWIND*/", css]],
    }),
    {
      filename: "PointAndClick.svelte",
    }
  );

  const result = svelte.compile(code, {
    customElement: true,
  });

  fs.writeFileSync("./lib/index.js", result.js.code);
};

transform();
