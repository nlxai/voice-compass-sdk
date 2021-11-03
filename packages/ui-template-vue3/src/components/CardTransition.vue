<template>
  <div class="container">
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
.container {
  max-width: 600px;
  margin: auto;
  position: relative;
}

.container > * {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transform: translate3d(0, 0, 0);
}
.fade-enter {
  transform: translate3d(6px, 0, 0);
  position: relative;
  opacity: 0;
}
.fade-leave-to {
  transform: translate3d(-6px, 0, 0);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
