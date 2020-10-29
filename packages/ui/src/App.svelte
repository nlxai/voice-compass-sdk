<script lang="ts">
  import { fade } from "svelte/transition";
  import { logic } from "./content";
  import { isTextInput, isChoiceInput } from "./logic";
  import type { Choice, ChoiceInput, StepInput } from "./logic";
  import Button from "./Button.svelte";
  import { pending } from "./utils";

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

  const selectChoice = (choice: Choice, choiceInput: StepInput) => {
    if (isChoiceInput(choiceInput)) {
      if (choiceInput.set) {
        state = {
          ...state,
          [choiceInput.set]: choice.value,
        };
      }
      if (choiceInput.immediate) {
        stepId = choice.next;
      }
    }
  };

  const continueChoice = (choiceInput: StepInput) => {
    if (isChoiceInput(choiceInput)) {
      const selected = choiceInput.choices.find(
        (choice) => choice.value === state[choiceInput.set]
      );
      if (selected) {
        stepId = selected.next;
      }
    }
  };

  const typeInInput = (textInput: StepInput) => (ev: any) => {
    if (isTextInput(textInput)) {
      state = {
        ...state,
        [textInput.set]: ev.target.value,
      };
    }
  };

  const continueText = (textInput: StepInput) => {
    if (isTextInput(textInput)) {
      stepId = textInput.next;
    }
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
                <div class="space-y-4">
                  <input
                    class="block w-full p-1 border border-gray-300 rounded"
                    value={state[step.input.set] || ''}
                    on:input={typeInInput(step.input)} />
                  <Button
                    on:click={() => {
                      continueText(step.input);
                    }}>
                    Continue
                  </Button>
                </div>
              {/if}
              {#if isChoiceInput(step.input)}
                <ul class="space-y-4">
                  {#each step.input.choices as choice}
                    <li
                      on:click={() => {
                        selectChoice(choice, step.input);
                      }}
                      class="p-2 border border-transparent rounded shadow cursor-pointer hover:bg-gray-100"
                      class:border-green-600={state[step.input.set] === choice.value}>
                      {choice.label}
                    </li>
                  {/each}
                </ul>
                {#if isChoiceInput(step.input) && !step.input.immediate}
                  <Button
                    disabled={!state[step.input.set]}
                    on:click={() => {
                      continueChoice(step.input);
                    }}>
                    Continue
                  </Button>
                {/if}
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
