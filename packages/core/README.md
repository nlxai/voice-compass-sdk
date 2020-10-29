# Voice Compass SDK

## Usage

```js
import { create } from "@voice-compass/core";

const c = voiceCompass.create({
  apiKey: "",
  botId: ""
});

c.updateStep({
  stepId: "",
  journeyId: "MyJourney"
});
```

See `src/index.ts` for all available options for the `updateStep` method.
