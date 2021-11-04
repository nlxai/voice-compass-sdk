<template>
  <div class="space-y-8 text-center py-8 px-4 font-sans">
    <h2 class="text-4xl font-bold">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
