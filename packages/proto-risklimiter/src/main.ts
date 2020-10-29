import { create } from "@voice-compass/core";
import { App, TextInput, ChoiceInput } from "@voice-compass/ui";
import "@voice-compass/ui/bundle.css";
import { logic } from "./logic";

const app = new App({
  target: document.body,
  props: {
    logic,
    TextInput,
    ChoiceInput,
  },
});

export default app;
