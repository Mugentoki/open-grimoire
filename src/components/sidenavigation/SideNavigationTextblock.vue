<template>
  <div class="sidenav__textblock">
    <div class="sidenav__textblock-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.sidenav {
  &:hover {
    .sidenav__textblock-content {
      opacity: 1;
      transition-duration: var(--transition-speed-fast);
      transition-delay: var(--base-transition-speed);
    }
  }

  &__textblock-content {
    opacity: 0;
    overflow: hidden;
    transition: opacity var(--transition-speed-blink) ease-in;
    transition-delay: 0s;
  }
}
</style>