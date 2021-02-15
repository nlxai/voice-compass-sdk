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

## Basic Usage

```js
import { create } from "@nlx-voice-compass/core";

// Create journey manager object
const compass = create({
  apiKey: "",
  botId: "",
  contactId: "",
  journeyId: "MyJourney",
  voice: "male-en-us"
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
* `escalate?: boolean` (optional): a boolean flag setting whether the flow is escalating to a human agent at this step.
* `end?: boolean` (optional): a boolean flag setting whether the flow is ending at this step.
* `payload?: object` (optional): a payload object with additional information.

### `trackDomAnnotations`

The simplest way to set up Voice Compass on the frontend is to annotate your markup with special tags specifying how journey steps should progress.

For example, a button `<button vc-click-step="NEW_STEP_ID">Continue</button>` automatically changes the journey step when this button is clicked.

> Tracking DOM annotations manually relies on event delegation. In order for it to work, you need to make sure events bubble up to `document.body` where they can be captured by a single global event listener set up internally by the SDK.

Below are the special attributes grouped by event types. Note that the syntax closely follows the object notation in the `updateStep` call above.

#### Click events

These attributes control how the Voice Compass agent should react to a click. They fire up a single request, accumulating all the data from these fields.

* `vc-click-stepid`: the step ID triggered by a click.
* `vc-click-journeyid`: the journey ID triggered by a click.
* `vc-click-escalate`: boolean attribute set when a click should escalate a journey.
* `vc-click-end`: boolean attribute set when a click should end a journey.
* `vc-click-payload`: a stringified object containing the payload at this step.

#### Invalid form field events

These attributes control how the Voice Compass agent should react to an invalid form field, when said form field loses focus.

* `vc-invalid-stepid`: the step ID triggered by an invalid form field.
* `vc-invalid-journeyid`: the journey ID triggered by an invalid form field.
* `vc-invalid-escalate`: boolean attribute set when an invalid form field should escalate a journey.
* `vc-invalid-end`: boolean attribute set when an invalid form field should end a journey.
* `vc-invalid-payload`: a stringified object containing the payload at this step.

Invalidity is determined holistically based on type and validation attributes set on the field. For instance, the following markup:

```html
<!-- Email addresse: step triggers if the supplied email is invalid and the field loses focus -->
<input type="email" vc-invalid-step="MY_INVALID_STEP" />

<!-- URL's validated with regex: step triggers if the supplied URL is invalid and the field loses focus -->
<input pattern="https?://.+" vc-invalid-step="MY_INVALID_STEP" />
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
      botId: "",
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
      <button vc-click-step="NEW_STEP">Continue</button>
    </div>
  );
}
```

## TypeScript

This SDK is written in TypeScript and includes type definitions.

## License

MIT.
