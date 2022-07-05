const fs = require("fs");
const svelte = require("svelte/compiler");
const sveltePreprocess = require('svelte-preprocess')

const transform = async () => {
  const svelteScript = fs.readFileSync("./src/PointAndClick.svelte", "utf-8");

  const { code } = await svelte.preprocess(svelteScript, sveltePreprocess(), {
    filename: "PointAndClick.svelte"
  });

  const result = svelte.compile(code, {
    customElement: true,
  });

  fs.writeFileSync("./lib/index.js", result.js.code);
};

transform();
