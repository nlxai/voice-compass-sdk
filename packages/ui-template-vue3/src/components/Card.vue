<template>
  <div class="content">
    <h2>{{ title }}</h2>
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

<style scoped>
.progress {
  position: absolute;
  height: 6px;
  width: calc(100% - 12px);
  transition: width 0.3s ease-in-out;
  top: 0px;
  left: 6px;
}

.content {
  font-size: 1rem;
}

.content > * + * {
  margin-top: 30px;
}

h2 {
  margin: 0;
  font-size: 3rem;
  padding: 30px 0;
}
</style>
