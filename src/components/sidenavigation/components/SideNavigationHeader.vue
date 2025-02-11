<template>
  <div class="sidenav__header">
   <div class="sidenav__header-title">
     <SideNavigationMenuItem :iconName="headerIcon" :label="headerLabel" icon-size="large"/>
     <button v-if="hasExtra" class="sidenav__header-extra-toggle icon-question" @click.prevent="toggleExtra"></button>
   </div>
    <div v-if="hasExtra" class="sidenav__header-extra" :class="{ active: computedShowExtra }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNavigationMenuItem from "./SideNavigationMenuItem.vue";
import { defineProps, ref, inject, computed } from "vue";

defineProps<{
  headerIcon?: string;
  headerLabel?: string;
  hasExtra?: boolean;
}>();

const sidenavOpen = inject('sidenavOpen');
const showExtra = ref<boolean>(false);
const computedShowExtra = computed(() => {
  return showExtra.value && sidenavOpen.value;
});

const toggleExtra = () => {
  showExtra.value = !showExtra.value;
}
</script>

<style lang="scss">
.sidenav {
  &:hover {
    .sidenav__header-extra-toggle {
      opacity: .5;
    }
  }

  &:not(:hover) {
    .sidenav__header-extra-toggle {
      opacity: 0;
    }
  }

  &__header {
    margin-bottom: var(--base-spacing);
  }

  &__header-title {
    position: relative;
  }

  &__header-extra-toggle {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    opacity: 0;
    outline: none;
    border: none;
    transition: opacity var(--base-transition);

    &:hover,
    &:focus {
      outline: none;
      opacity: 1;
    }
  }

  &__header-extra {
    width: 100%;
    max-height: 0;
    opacity: 0;
    overflow-y: hidden;
    transition: all var(--base-transition);

    &.active {
      opacity: 1;
      max-height: 350px;
      overflow-y: auto;
    }
  }
}
</style>