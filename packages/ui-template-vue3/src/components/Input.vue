<template>
  <label class="block w-full">
    <input
      class="px-2 py-2 block w-full border rounded border-gray-300"
      :value="value"
      @input="
        (ev) => {
          $emit('change', ev.target.value);
        }
      "
    />
  </label>
</template>

<script>
export default {
  name: "Input",
  props: ["value"],
};
</script>
