# Voice Compass SDK - Core

Framework-agnostic core SDK managing the web frontend of a Voice Compass journey.

## Installation

`npm install @nlx-voice-compass/core`

## Basic Usage

```js
import { create } from "@nlx-voice-compass/core";

const compass = create({
  apiKey: "",
  botId: "",
  contactId: "",
  journeyId: "MyJourney"
});

compass.updateStep({
  stepId: "abcd-1234-efgh-5678",
  journeyId: "MyOtherJourney"
});
```

See `src/index.ts` for all available options for the `updateStep` method.

## API

The `compass` object created by the SDK has the following methods:

### `updateStep`

Manually updates the step in the journey, taking the following parameters:

* `stepId` // string, required // the new step ID.
* `journeyId` // string, optional // a journey ID that is different from the one supplied when the conversation was created.

## License

MIT.
