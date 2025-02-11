<template>
  <div class="sidenav__container" :class="{
    navigationName,
    'with-header': withHeader
  }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { withHeader = false } = defineProps<{
  navigationName?: string;
  withHeader?: boolean
}>()
</script>

<style lang="scss">
.sidenav__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
  padding-top: 48px;

  &.with-header {
    padding-top: 0;
  }
}
</style>