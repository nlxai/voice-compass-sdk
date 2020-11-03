<script lang="ts">
  import type { RequestStatus } from "@voice-compass/logic";
  import { none } from "@voice-compass/logic";
  import Dots from "./Dots.svelte";

  export let disabled: boolean = false;

  export let requestStatus: RequestStatus = none;

  $: disabled_ = disabled || requestStatus.type === "pending";
  $: pending_ = requestStatus.type === "pending";
  $: error_ = requestStatus.type === "error" ? requestStatus.payload : undefined;
</script>

<button
  on:click
  class="relative inline-block w-full px-3 py-3 text-white bg-blue-600 border-none rounded transition duration-500 hover:bg-blue-700"
  class:opacity-50={disabled_}>
  <span class="tracking-wider uppercase" class:opacity-0={pending_}>
    <slot />
  </span>
  {#if pending_}
    <Dots />
  {/if}
</button>
