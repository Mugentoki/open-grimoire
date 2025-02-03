<template>
  <div class="sidenav" v-if="viewType !== ''">
    <SideNavigationWorkspace v-if="viewType === 'workspace'"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useGrimoireStore} from "../../stores/grimoire.ts";
import SideNavigationWorkspace from "./SideNavigationWorkspace.vue";

const grimoireStore = useGrimoireStore();
const viewType = computed(() => {
  return grimoireStore.getCurrentViewType;
});
</script>

<style lang="scss">
.sidenav {
  grid-area: sidebar;
  padding: 68px var(--base-spacing) var(--base-spacing) var(--base-spacing);
  border-right: var(--base-border-width) solid var(--base-border-color);
}
</style>