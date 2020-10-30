<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { VoiceCompass } from "@voice-compass/core";
  import Button from "../components/Button.svelte";
  import type { ChoiceInput, Choice, RequestStatus, Next } from "@voice-compass/logic";
  import { pending, none, isNextPromise } from "@voice-compass/logic";

  const dispatch = createEventDispatcher();

  export let input: ChoiceInput;
  export let voiceCompass: VoiceCompass;
  export let state = {};

  let requestStatus: RequestStatus = none;

  $: selectedChoice = input.choices.find(
    (choice) => choice.value === state[input.set]
  );

  const handleNext = (next: Next) => {
    if (isNextPromise(next)) {
      requestStatus = pending;
      next(state).then((stepId) => {
        dispatch("next", stepId);
      });
    } else {
      dispatch("next", next);
    }
  }

  const selectChoice = (choice: Choice) => {
    if (choice.$select) {
      voiceCompass.updateStep(choice.$select);
    }
    if (input.set) {
      state = {
        ...state,
        [input.set]: choice.value,
      };
    }
    if (input.immediate) {
      handleNext(choice.next);
    }
  };

  const handleButtonClick = () => {
    if (selectedChoice) {
      handleNext(selectedChoice.next);
    }
  };
</script>

<ul class="space-y-4">
  {#each input.choices as choice}
    <li
      on:click={() => {
        selectChoice(choice);
      }}
      class="p-2 border border-transparent rounded shadow cursor-pointer hover:bg-gray-100"
      class:border-green-600={state[input.set] === choice.value}>
      {choice.label}
    </li>
  {/each}
</ul>
{#if !input.immediate}
  <Button disabled={!state[input.set]} on:click={handleButtonClick} requestStatus={requestStatus}>
    Continue
  </Button>
{/if}
