<script lang="ts">
  import { tw } from "twind";
</script>

<button on:click class={tw`text-brand font-bold`}>
  <slot />
</button>
