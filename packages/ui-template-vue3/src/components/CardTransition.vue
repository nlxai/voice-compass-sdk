<template>
  <div class="container max-w-lg mx-auto relative">
    <transition-group name="fade" mode="out-in">
      <slot />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "CardTransition",
};
</script>

<style>
.container > * {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from {
  transform: translate3d(12px, 0, 0);
  position: relative;
  opacity: 0;
}

.fade-leave-to {
  transform: translate3d(-12px, 0, 0);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
