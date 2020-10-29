import App from "./App.svelte";
import { create } from "@voice-compass/core";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
