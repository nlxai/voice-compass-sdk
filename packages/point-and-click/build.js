const fs = require("fs");
const cssnano = require("cssnano");
const tailwindcss = require("tailwindcss");
const postcss = require("postcss");

const transform = async () => {
  const lib = fs.readFileSync("./lib/index.js", "utf-8");

  const css = await postcss([tailwindcss, cssnano])
    .process(`
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `)
    .then((res) => {
      return res.css;
    });

  fs.writeFileSync("./lib/index.js", lib.replace("TAILWIND", css));
};

transform();
