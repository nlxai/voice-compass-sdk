import App from "./App.svelte";
import TextInput from "./widgets/TextInput.svelte";
import ChoiceInput from "./widgets/ChoiceInput.svelte";
import { create } from "@voice-compass/core";
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
