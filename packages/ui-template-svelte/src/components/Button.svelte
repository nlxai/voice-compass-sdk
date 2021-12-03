<script lang="ts">
  import { tw } from "twind";
  import type { RequestStatus } from "../utils";
  import { noRequest } from "../utils";
  import LoaderDots from "./Internal/LoaderDots.svelte";

  export let status: RequestStatus = noRequest;

  export let disabled: boolean = false;
  export let outline: boolean = false;

  export let href: string | undefined;
  export let target:
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | string
    | undefined = "_self";

  let customClass = "";
  export { customClass as class };

  $: showContent = status.type !== "pending";

  $: showAsDisabled = status.type === "pending" || disabled;

  $: className = tw(
    "px-8",
    "py-3",
    "relative",
    "text-center",
    "rounded-sm",
    "block",
    "w-full",
    "max-w-xs",
    "mx-auto",
    "transition",
    "duration-300",
    "uppercase",
    "tracking-wider",
    "text-sm",
    outline ? "border border-brand text-brand" : "bg-brand text-white",
    !showAsDisabled
      ? outline
        ? "hover:text-brandDarker"
        : "hover:bg-brandDarker"
      : "",
    showAsDisabled ? "opacity-50 cursor-not-allowed" : "opacity-1 cursor-point",
    customClass
  );
</script>

<style>
  .dots-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>

{#if href}
  <a class={className} {href} {target}>
    <slot />
  </a>
{:else}
  <button on:click class={className} disabled={showAsDisabled}>
    {#if status.type === 'pending'}
      <div class="dots-container">
        <LoaderDots />
      </div>
    {/if}
    <div class={tw(showContent ? 'opacity-1' : 'opacity-0')}>
      <slot />
    </div>
  </button>
{/if}
