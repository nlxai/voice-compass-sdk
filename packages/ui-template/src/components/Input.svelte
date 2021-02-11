<script lang="ts">
  import { tw } from "twind";
  import { Kind } from "./Input";
  import { onMount } from "svelte";

  let inputRef: HTMLInputElement | undefined;

  export let kind: Kind = Kind.Text;
  export let label: string | undefined;
  export let value: string = "";
  export let placeholder: string | undefined;
  export let focusOnMount: boolean = false;

  onMount(() => {
    if (focusOnMount && inputRef) {
      inputRef.focus();
    }
  });

  $: inputProps = (() => {
    switch (kind) {
      case Kind.Text:
        return {
          type: "text",
        };
      case Kind.Email:
        return {
          type: "email",
        };
      case Kind.Number:
        return {
          type: "number",
        };
      case Kind.NewPassword:
        return {
          type: "password",
        };
      case Kind.Password:
        return {
          type: "password",
        };
      case Kind.OneTimeCode:
        return {
          autocomplete: "one-time-code",
          type: "number",
          inputmode: "numeric",
          pattern: "[0-9]*",
        };
      default:
        return {};
    }
  })();
</script>

<div class={tw``}>
  <label class={tw`space-y-1`}>
    {#if label}
      <p class={tw`uppercase tracking-wider text-sm`}>{label}</p>
    {/if}
    <input
      class={tw`block w-full border border-gray-200 rounded px-2 py-1 text-base`}
      bind:this={inputRef}
      on:focus
      on:blur
      {...inputProps}
      {placeholder}
      bind:value />
  </label>
</div>
