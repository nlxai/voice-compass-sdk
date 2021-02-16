<script lang="ts">
  import { tw } from "twind";
  import type { RequestStatus } from "../utils";
  import LoaderDots from "./Internal/LoaderDots.svelte";

  export let status: RequestStatus = { type: "none" };

  export let disabled: boolean = false;

  $: showContent = status.type !== "pending";

  $: showAsDisabled = status.type === "pending" || disabled;
</script>

<style>
  .dots-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>

<button
  on:click
  class={tw('px-8', 'py-2', 'relative', 'rounded', 'block', 'w-full', 'max-w-sm', 'mx-auto', 'uppercase', 'tracking-wider', 'bg-brand', 'text-white', showAsDisabled ? 'opacity-50 cursor-auto' : 'opacity-1 hover:bg-brandLighter')}
  disabled={showAsDisabled}>
  {#if status.type === 'pending'}
    <div class="dots-container">
      <LoaderDots />
    </div>
  {/if}
  <div class={tw(showContent ? 'opacity-1' : 'opacity-0')}>
    <slot />
  </div>
</button>
