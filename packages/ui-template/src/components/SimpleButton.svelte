<script lang="ts">
  import { tw } from "twind";
</script>

<div class={tw`text-center`}>
  <button on:click class={tw`text-brand font-bold`}>
    <slot />
  </button>
</div>
