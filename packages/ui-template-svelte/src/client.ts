import * as sapper from "@sapper/app";
import { setup } from "twind";
import theme from "./theme";

setup(theme);

sapper.start({
  target: document.querySelector("#sapper"),
});
