<script lang="ts">
  import { tw } from "twind";
  import Checkbox from "./Checkbox.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let options: Array<{ value: string; label: string }> = [];
  export let value: Array<string> = [];

  const handleChange = (val: string) => () => {
    dispatch(
      "change",
      value.indexOf(val) === -1
        ? [...value, val]
        : value.filter((v) => v !== val)
    );
  };
</script>

<div class={tw`space-y-4`}>
  {#each options as option}
    <Checkbox
      checked={value.indexOf(option.value) > -1}
      label={option.label}
      on:change={handleChange(option.value)} />
  {/each}
</div>
