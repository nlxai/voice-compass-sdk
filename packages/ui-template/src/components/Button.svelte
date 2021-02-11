<script lang="ts">
  import { tw } from "twind";
  import type { Status } from "./Button";
  import { StatusType } from "./Button";
  import LoaderDots from "./Internal/LoaderDots.svelte";

  export let status: Status = { type: StatusType.Active };

  $: showContent = status.type !== StatusType.Pending;

  $: disabled =
    status.type === StatusType.Pending || status.type === StatusType.Disabled;
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
  class={tw('px-8', 'py-2', 'relative', 'rounded', 'block', 'w-full', 'max-w-sm', 'mx-auto', 'uppercase', 'tracking-wider', 'bg-brand', 'text-white', disabled ? 'opacity-50 cursor-auto' : 'opacity-1 hover:bg-brandLighter')}
  {disabled}>
  {#if status.type === StatusType.Pending}
    <div class="dots-container">
      <LoaderDots />
    </div>
  {/if}
  <div class={tw(showContent ? 'opacity-1' : 'opacity-0')}>
    <slot />
  </div>
</button>
