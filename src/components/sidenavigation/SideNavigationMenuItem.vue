<template>
  <div class="sidenav__menu-item">
    <i class="sidenav__menu-icon" :class="iconName"/>
    <span class="sidenav__menu-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconName?: string;
  label?: string;
}>();
</script>

<style lang="scss">
.sidenav {
  &:hover {
    .sidenav__menu-icon {
      opacity: 1;
    }

    .sidenav__menu-label {
      flex: 1;
    }
  }

  &__menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__menu-icon {
    opacity: .5;
    transition: opacity var(--base-transition);

    &:before {
      font-size: var(--closed-menu-width);
      line-height: var(--closed-menu-width);
    }
  }

  &__menu-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0;
    transition: flex var(--base-transition);
  }
}
</style>