<template>
  <div class="breadcrumbs">

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.breadcrumbs {
  grid-area: breadcrumbs;
  display: flex;
  height: 100%;
  background-color: var(--background-color-darken);
}

.breadcrumb {
  display: flex;
  align-items: flex-end;
  background-color: transparent;
  border-right: var(--base-border-width) solid var(--base-border-color-darken);
  border-bottom: var(--base-border-width) solid var(--base-border-color-darken);
  padding: var(--base-spacing) var(--base-spacing) var(--spacing-small) var(--base-spacing);
  transition: background-color var(--base-transition), border-color var(--base-transition);

  &:last-child,
  &.active {
    border-top-right-radius: var(--border-radius-large);
  }

  &.active {
    background-color: var(--background-color);
    border-bottom-color: transparent;
  }
}
</style>