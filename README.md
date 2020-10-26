# Voice Compass SDK

## Usage

Build the project by running `npm install` and `npm run build`.

Your packaged script is now in `lib/voice-compass.js`. Include it on your page, and then:

```js
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
