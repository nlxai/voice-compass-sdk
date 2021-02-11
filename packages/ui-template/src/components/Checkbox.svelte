<script lang="ts">
  import { tw } from "twind";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let checked: boolean;
  export let label: string;

  const handleCheck = () => {
    dispatch("change", !checked);
  };
</script>

<label class={tw`block`}>
  <input
    class={tw`mr-2 leading-tight sr-only`}
    type="checkbox"
    {checked}
    on:input={handleCheck} />
  <div class={tw`flex items-start cursor-pointer space-x-3`}>
    <span
      class={tw`inline-flex items-center justify-center flex-none border border-gray-500`}>
      <div
        class={tw('inline-block', 'transition-opacity', 'duration-200', 'text-brand', checked ? 'opacity-1' : 'opacity-0')}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-check">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </span>
    <span>{label}</span>
  </div>
</label>
