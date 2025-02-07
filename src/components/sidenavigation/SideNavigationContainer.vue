<template>
  <div class="sidenav__container" :class="navigationName">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  navigationName?: string;
}>()
</script>

<style lang="scss">
.sidenav__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}
</style>