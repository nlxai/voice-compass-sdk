import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { setup } from "twind";

setup({
  theme: {
    fontFamily: {
      sans: ["'Source Sans Pro'", "sans-serif"],
      serif: ["Times", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      colors: {
        brand: "#094D92",
        brandLighter: "#0A55A1",
        voiceCompassPurple: "rgb(74, 102, 240)",
        voiceCompassPurpleDarker: "rgb(67, 93, 219)",
      },
    },
  },
});

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka()
  .use(
    (compression as any)({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: () => ({
        dev: process.env.NODE_ENV === "development",
        BOT_ID: process.env.BOT_ID,
        SDK_API_KEY: process.env.SDK_API_KEY,
      }),
    })
  )
  .listen(PORT, () => {});
