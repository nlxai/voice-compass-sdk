import App from "./App.svelte";
import TextInput from "./widgets/TextInput.svelte";
import ChoiceInput from "./widgets/ChoiceInput.svelte";
import { VoiceCompass, create } from "@voice-compass/core";
import { logic } from "./logic";

const voiceCompass: VoiceCompass = create({
  apiKey: "",
  botId: "",
  journeyId: "",
});

const app = new App({
  target: document.body,
  props: {
    logic,
    voiceCompass,
    TextInput,
    ChoiceInput,
  },
});

export default app;
