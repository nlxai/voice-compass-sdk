# Voice Compass SDK

## Usage

```js
import { create } from "@nlx-voice-compass/core";

const c = voiceCompass.create({
  apiKey: "",
  botId: "",
  contactId: ""
});

c.updateStep({
  stepId: "",
  journeyId: "MyJourney"
});
```

See `src/index.ts` for all available options for the `updateStep` method.

## License

MIT.
