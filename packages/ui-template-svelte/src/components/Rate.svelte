<script lang="ts">
  import { tw } from "twind";
  import SmileIcon from "./Icons/SmileIcon.svelte";
  import FrownIcon from "./Icons/FrownIcon.svelte";
  import MehIcon from "./Icons/MehIcon.svelte";

  export let value: undefined | 1 | 2 | 3 = undefined;
  export let label: string = "Please rate your experience";

  const size = "36";
</script>

<div class={tw`space-y-2`}>
  <p class={tw`text-center`}>{label}</p>
  <div class={tw`flex items-center justify-center space-x-2`}>
    <button
      on:click={() => {
        value = 1;
      }}
      class={tw(value === 1 ? 'text-brand' : 'text-gray-200 hover:text-gray-300')}><FrownIcon
        {size} /></button>
    <button
      on:click={() => {
        value = 2;
      }}
      class={tw(value === 2 ? 'text-brand' : 'text-gray-200 hover:text-gray-300')}>
      <MehIcon {size} />
    </button>
    <button
      on:click={() => {
        value = 3;
      }}
      class={tw(value === 3 ? 'text-brand' : 'text-gray-200 hover:text-gray-300')}>
      <SmileIcon {size} />
    </button>
  </div>
</div>
