<template>
  <button @click="$emit('click')"><slot /></button>
</template>

<style scoped>
button {
  padding: 8px 24px;
  background-color: #000;
  border: 0;
  color: #fff;
  font-size: 1rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.25px;
}

button:hover {
  background-color: #232323;
}
</style>
