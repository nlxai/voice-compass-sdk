<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { fade } from "svelte/transition";
  import type { VoiceCompass } from "@voice-compass/core";
  import { isTextInput, isChoiceInput, interpolate } from "@voice-compass/logic";
  import type { State, Logic } from "@voice-compass/logic";

  export let TextInput: SvelteComponent;
  export let ChoiceInput: SvelteComponent;

  export let voiceCompass: VoiceCompass;

  export let logic: Logic = {};

  let stepId: string = "root";
  let state: State = {};

  $: step = logic[stepId];
</script>

<style global lang="postcss">
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
  @tailwind utilities;
</style>

<main>
  <div class="max-w-md mx-auto">
    {#if step}
      <div class="relative">
        {#key stepId}
          <div class="absolute left-0 right-0 space-y-4" transition:fade>
            <div class="text-center space-y-2">
              <h1 class="text-4xl font-bold">{step.title}</h1>
              <p>{interpolate(step.body, state, logic)}</p>
            </div>
            {#if step.input}
              {#if isTextInput(step.input)}
                <svelte:component
                  this={TextInput}
                  bind:state
                  voiceCompass={voiceCompass}
                  input={step.input}
                  on:next={(ev) => {
                    stepId = ev.detail;
                  }} />
              {/if}
              {#if isChoiceInput(step.input)}
                <svelte:component
                  this={ChoiceInput}
                  bind:state
                  voiceCompass={voiceCompass}
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
