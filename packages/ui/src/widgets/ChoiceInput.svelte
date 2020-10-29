<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../components/Button.svelte";
  import type { ChoiceInput } from "../logic";

  export let input: ChoiceInput;

  export let state = {};

  $: selectedChoice = input.choices.find(
    (choice) => choice.value === state[input.set]
  );

  const dispatch = createEventDispatcher();

  const selectChoice = (choice: Choice) => {
    if (input.set) {
      state = {
        ...state,
        [input.set]: choice.value,
      };
    }
    if (input.immediate) {
      dispatch("next", choice.next);
    }
  };

  const handleButtonClick = () => {
    if (selectedChoice) {
      dispatch("next", selectedChoice.next);
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
  <Button disabled={!state[input.set]} on:click={handleButtonClick}>
    Continue
  </Button>
{/if}
