<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../components/Button.svelte";
  import type { TextInput } from "../logic";

  const dispatch = createEventDispatcher();

  export let state = {};

  export let input: TextInput;

  const typeInInput = (ev) => {
    state = {
      ...state,
      [input.set]: ev.target.value,
    };
  };

  const continueText = () => {
    dispatch("next", input.next);
  };
</script>

<div class="space-y-4">
  <input
    class="block w-full p-1 border border-gray-300 rounded"
    value={state[input.set] || ''}
    on:input={typeInInput} />
  <Button on:click={continueText}>Continue</Button>
</div>
