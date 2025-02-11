<template>
  <div class="sidenav" v-if="viewType !== ''" @mouseenter="navOpen = true" @mouseleave="navOpen = false">
    <SideNavigationWorkspace v-if="viewType === 'workspace'"/>
  </div>
</template>

<script setup lang="ts">
import {computed, provide, ref} from "vue";
import {useGrimoireStore} from "../../stores/grimoire.ts";
import SideNavigationWorkspace from "./SideNavigationWorkspace.vue";

const grimoireStore = useGrimoireStore();

const viewType = computed(() => {
  return grimoireStore.getCurrentViewType;
});

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