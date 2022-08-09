# Voice Compass SDK - Core

Framework-agnostic core SDK managing the web frontend of a Voice Compass journey.

## Installation

If you are bundling your JavaScript, you can get the package from `npm`:

`npm install @nlx-voice-compass/core`

Alternatively, you can get a standalone script:

```html
<script src="https://unpkg.com/@nlx-voice-compass/standalone/lib/index.js"></script>
<script>
  // All named exports from the package are now included in the `voiceCompass` global
  console.log(window.voiceCompass);
</script>
```

## Creating an SDK client

```js
import { create } from "@nlx-voice-compass/core";

// Extract contact ID from the 'cid' URL query parameter
const contactId = new URLSearchParams(window.location.search).get("cid");

// Create journey manager object
const compass = create({
  contactId,
  apiVersion: "v2", // Specify "v1" for legacy Voice Compass journeys. Ommitting this parameter defaults it to "v2"
  apiKey: "",
  journeyAssistantId: "",
  journeyId: "MyJourney",
  debug: true, // turn on debug mode
  // Specify a timeout such that if no steps are triggered for e.g. 90 seconds,
  // the call ends with a user-defined end step.
  timeoutSettings: {
    seconds: 90,
    stepId: "abcd-1234-efgh-5678",
  },
  // Other optional fields:
  // languageOverride: "es-US",
  // voiceOverride: "",
  // preventRepeats: true,
});

// Update a journey step
compass.updateStep({
  stepId: "abcd-1234-efgh-5678",
  journeyId: "MyOtherJourney"
});
```

## API

The `compass` object created by the SDK has the following methods:

### `updateStep`

Manually updates the step in the journey, taking the following parameters:

* `stepId: string` (required): the new step ID.
* `journeyId?: string` (optional): a journey ID that is different from the one supplied when the instance was created.
* `forceEscalate?: boolean` (optional): a boolean flag setting whether the flow is escalating to a human agent at this step.
* `forceEnd?: boolean` (optional): a boolean flag setting whether the flow is ending at this step.
* `forceAutomate?: boolean` (optional): a boolean flag setting whether the flow is marked as automated at this step.
* `bidirectional?: boolean` (optional): this flag turns on bidirectional mode in the journey. This is an advanced feature.
* `payload?: object` (optional): a payload object with additional information.

### `trackDomAnnotations`

The simplest way to set up Voice Compass on the frontend is to annotate your markup with special tags specifying how journey steps should progress.

For example, a button `<button vc-click-stepid="NEW_STEP_ID">Continue</button>` automatically changes the journey step when this button is clicked.

> Tracking DOM annotations manually relies on event delegation. In order for it to work, you need to make sure events bubble up to `document.body` where they can be captured by a single global event listener set up internally by the SDK.

Below are the special attributes grouped by event types. Note that the syntax closely follows the object notation in the `updateStep` call above.

#### Click events

These attributes control how the Voice Compass agent should react to a click. They fire up a single request, accumulating all the data from these fields.

* `vc-click-stepid`: the step ID triggered by a click.
* `vc-click-journeyid`: the journey ID triggered by a click.
* `vc-click-force-escalate`: boolean attribute set when a click should escalate a journey.
* `vc-click-force-end`: boolean attribute set when a click should end a journey.
* `vc-click-force-automate`: boolean attribute set when a click should mark a journey as automated.
* `vc-click-bidirectional`: boolean attribute that turns on bidirectional mode on click.
* `vc-click-payload`: a stringified object containing the payload at this step.

#### Invalid form field events

These attributes control how the Voice Compass agent should react to an invalid form field, when said form field loses focus.

* `vc-invalid-stepid`: the step ID triggered by an invalid form field.
* `vc-invalid-journeyid`: the journey ID triggered by an invalid form field.
* `vc-invalid-force-escalate`: boolean attribute set when an invalid form field should escalate a journey.
* `vc-invalid-force-end`: boolean attribute set when an invalid form field should end a journey.
* `vc-invalid-force-automate`: boolean attribute set when an invalid form field should mark a journey as automated.
* `vc-invalid-bidirectional`: boolean attribute that turns on bidirectional mode when a form field is invalid.
* `vc-invalid-payload`: a stringified object containing the payload at this step.

Invalidity is determined holistically based on type and validation attributes set on the field. For instance, the following markup:

```html
<!-- Email addresse: step triggers if the supplied email is invalid and the field loses focus -->
<input type="email" vc-invalid-stepid="MY_INVALID_STEP" />

<!-- URL's validated with regex: step triggers if the supplied URL is invalid and the field loses focus -->
<input pattern="https?://.+" vc-invalid-stepid="MY_INVALID_STEP" />
```

#### Focus on form fields

These attributes control how the Voice Compass agent should react to an invalid form field, when said form field loses focus.

* `vc-focus-stepid`: the step ID triggered when focusing a form field.
* `vc-focus-journeyid`: the journey ID triggered when focusing a form field.
* `vc-focus-escalate`: boolean attribute set when focusing a form field should escalate a journey.
* `vc-focus-end`: boolean attribute set when focusing a form field should end a journey.
* `vc-focus-payload`: a stringified object containing the payload at this step.

### `stopTrackingDomAnnotations`

Tracking DOM annotations sets up global click handlers that you might want to clean up if your journey is running e.g. in a single-page application.

If for instance your journey is managed by a React component, you can write the following:

```tsx
import React, { useEffect } from "react";
import { create } from "@nlx-voice-compass/core";

const JourneyManager = () => {
  useEffect(() => {
    const compass = create({
      apiKey: "",
      journeyAssistantId: "",
      contactId: "",
      journeyId: "MyJourney"
    });
    compass.trackDomAnnotations();

    return () => {
      compass.stopTrackingDomAnnotations();
    };
  }, []);

  return (
    <div>
      <button vc-click-stepid="NEW_STEP">Continue</button>
    </div>
  );
}
```

## TypeScript

This SDK is written in TypeScript and includes type definitions.

## HTTP Alternative

Using the SDK is not mandatory - you can run a Voice Compass experience using HTTP calls in the programming language and framework of your choice (e.g. mobile apps).

* url: `https://journeys.voicecompass.ai/v1/track`
* method: `POST`
* request headers:
  * `x-api-key`: the API key obtained from the setup code snippet
  * `content-type: application/json`
* as request body, send a JSON object with the following fields:
  * `contactId: string`: extracted from the `cid` query parameter on your webpage or using tools like https://branch.io
  * `journeyId: string`: journey ID obtained from the setup code snippet
  * `journeyAssistantId: string`: assistant ID obtained from the setup code snippet
  * `stepId: string`: the step ID
  * `end: boolean` (optional): override the default step behavior and end the call
  * `escalate: boolean` (optional): override the default step behavior and initiate handoff
  * `automate: boolean` (optional): override the default step behavior and mark the journey as automated

For subsequent step ID's, it is important that you maintain `contactId`, `journeyId` and `journeyAssistantId` properties the same from previous calls.

## License

MIT.
