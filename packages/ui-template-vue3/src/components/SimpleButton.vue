<template>
  <button
    class="mx-auto text-sm font-bold text-gray-800 hover:text-gray-700 block"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
