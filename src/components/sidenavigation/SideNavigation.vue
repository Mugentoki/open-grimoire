<template>
  <div class="sidenav" @mouseenter="navOpen = true" @mouseleave="navOpen = false">
    <SideNavigationWorkspace v-if="route.name === 'dashboard'"/>
  </div>
</template>

<script setup lang="ts">
import { provide, ref} from "vue";
import SideNavigationWorkspace from "./SideNavigationWorkspace.vue";
import { useRoute } from 'vue-router';

const route =  useRoute();

const navOpen = ref<boolean>(false);
provide('sidenavOpen', navOpen);
</script>

<style lang="scss">
.sidenav {
  grid-area: sidebar;
  padding: var(--base-spacing);
  border-right: var(--base-border-width) solid var(--base-border-color);
  overflow: hidden;
}
</style>