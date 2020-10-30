<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { VoiceCompass } from "@voice-compass/core";
  import Button from "../components/Button.svelte";
  import type { TextInput, RequestStatus } from "@voice-compass/logic";
  import { none, pending, isNextPromise } from "@voice-compass/logic";

  const dispatch = createEventDispatcher();

  export let voiceCompass: VoiceCompass;
  export let state = {};
  export let input: TextInput;

  $: value = state[input.set] || '';

  let requestStatus: RequestStatus = none;

  const typeInInput = (ev) => {
    state = {
      ...state,
      [input.set]: ev.target.value,
    };
  };

  const handleBlur = () => {
    if (input.isValid && !input.isValid(value) && input.$invalid) {
      voiceCompass.updateStep(input.$invalid);
    }
  }

  const handleNext = () => {
    if (isNextPromise(input.next)) {
      requestStatus = pending;
      input.next(state).then((next) => {
        dispatch("next", next);
      });
    } else {
      dispatch("next", input.next);
    }
  };
</script>

<div class="space-y-4">
  <input
    class="block w-full p-1 border border-gray-300 rounded"
    value={value}
    on:input={typeInInput} />
  <Button on:click={handleNext} on:blur={handleBlur} requestStatus={requestStatus}>Continue</Button>
</div>
