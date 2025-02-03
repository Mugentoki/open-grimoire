<template>
  <SideNavigation />
  <BreadcrumbTabs />
  <RouterView />
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import { RouterView } from "vue-router";
import { useRouter } from 'vue-router';
import { useGrimoireStore } from "./stores/grimoire";
import SideNavigation from "./components/common/SideNavigation.vue";
import BreadcrumbTabs from "./components/common/BreadcrumbTabs.vue";

const grimoireStore = useGrimoireStore();
const router = useRouter();


onBeforeMount(() => {
  if (!grimoireStore.isInitialSetupDone) {
    router.push('/setup');
  }
})
</script>

<style lang="scss">
#app {
  width: 100dvw;
  max-width: unset;
  height: 100dvh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: left;
  display: grid;
  grid-template-columns: calc(48px + var(--base-spacing) * 2 + var(--base-border-width)) auto;
  grid-template-rows: 48px auto;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0;
  grid-auto-flow: row;
  grid-template-areas:
    "sidebar breadcrumbs"
    "sidebar routerview";
  transition: grid-template-columns 300ms ease-in-out;

  &:has(> .sidenav:hover) {
    grid-template-columns: 256px auto;
  }
}
</style>
