<script lang="ts">
  import { fade } from "svelte/transition";
  import { isTextInput, isChoiceInput } from "./model";
  import type { Choice, ChoiceInput, StepInput } from "./model";
  import Button from "./components/Button.svelte";
  import { pending } from "./utils";

  export let TextInput;
  export let ChoiceInput;

  export let logic = {};

  let stepId: string = "root";
  let state: Record<string, any> = {};

  $: step = logic[stepId];

  const interpolate = (str: string): string => {
    return str.replace(/{(.*?)}/g, (val: string) => {
      const key = val.slice(1, -1);
      const stateVal = state[key];
      return stateVal || val;
    });
  };
</script>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .selected {
    border: 1px solid black;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <div class="max-w-md mx-auto">
    {#if step}
      <div class="relative">
        {#key stepId}
          <div class="absolute left-0 right-0 space-y-4" transition:fade>
            <div class="text-center space-y-2">
              <h1 class="text-4xl font-bold">{step.title}</h1>
              <p>{interpolate(step.body)}</p>
            </div>
            {#if step.input}
              {#if isTextInput(step.input)}
                <svelte:component
                  this={TextInput}
                  bind:state
                  input={step.input}
                  on:next={(ev) => {
                    stepId = ev.detail;
                  }} />
              {/if}
              {#if isChoiceInput(step.input)}
                <svelte:component
                  this={ChoiceInput}
                  bind:state
                  input={step.input}
                  on:next={(ev) => {
                    stepId = ev.detail;
                  }} />
              {/if}
            {/if}
          </div>
        {/key}
      </div>
    {:else}
      <p>Step not found</p>
    {/if}
  </div>
</main>
