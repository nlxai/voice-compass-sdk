<script lang="ts">
  import { tw } from "twind";

  export let progress: number | undefined = undefined;
</script>

<div class={tw`p-4`}>
  <div class={tw`fixed top-0 left-0 right-0`} style="height: 6px">
    <div
      class={tw`h-full bg-brand rounded`}
      style={`width: ${(progress || 0) * 100}%; transition: width 0.5s ease-in-out;`} />
  </div>
  <div class={tw`relative max-w-screen-sm mx-auto`}>
    <slot />
  </div>
</div>
