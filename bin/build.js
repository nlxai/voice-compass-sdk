const browserify = require("browserify");
const fs = require("fs");

fs.mkdir("lib", () => {
  browserify({
    standalone: "voiceCompass",
  })
    .add("src/index.ts")
    .plugin("tsify")
    .transform("uglifyify", { global: true })
    .bundle()
    .on("error", (error) => {
      console.error(error.toString());
    })
    .pipe(fs.createWriteStream("lib/voice-compass.js"));
});
