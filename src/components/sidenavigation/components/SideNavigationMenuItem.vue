<template>
  <div class="sidenav__menu-item" :class="iconSize">
    <i v-if="iconName" class="sidenav__menu-icon" :class="iconName"/>
    <span class="sidenav__menu-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconSize?: 'small'|'large';
  iconName?: string;
  label?: string;
}>();
</script>

<style lang="scss">
.sidenav {
  &:hover {
    .sidenav__menu-icon {
      opacity: 1;

      &:before {
        font-size: var(--closed-menu-width);
        line-height: var(--closed-menu-width);
      }
    }

    .sidenav__menu-label {
      flex: 1;
    }
  }

  &__menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &.small {
      .sidenav__menu-icon {
        &:before {
          font-size: calc(var(--closed-menu-width) / 2);
          line-height: calc(var(--closed-menu-width) / 2);
          width: var(--closed-menu-width);
        }
      }
    }
  }

  &__menu-icon {
    opacity: .5;
    transition: opacity var(--base-transition);
    width: var(--closed-menu-width);
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      font-size: calc(var(--closed-menu-width) / 2);
      line-height: calc(var(--closed-menu-width) / 2);
      transition: all var(--base-transition);
    }
  }

  &__menu-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0;
    font-size: var(--font-size-menu);
    transition: flex var(--base-transition);
  }
}
</style>