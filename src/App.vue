<template>
  <div id="opengrimoire" :class="{
    'sidenav-hidden': !showSidenav,
    'breadcrumbs-hidden': !showBreadcrumbs
  }">
    <SideNavigation v-if="showSidenav" />
    <BreadcrumbTabs v-if="showBreadcrumbs" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, computed} from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
import { useGrimoireStore } from "./stores/grimoire";
import SideNavigation from "./components/sidenavigation/SideNavigation.vue";
import BreadcrumbTabs from "./components/common/BreadcrumbTabs.vue";

const grimoireStore = useGrimoireStore();
const router = useRouter();
const route =  useRoute();

const showSidenav = computed(() => {
  switch (route.name) {
    case undefined:
    case '':
    case 'initialsetup':
    case 'workspaceselect':
      return false;
    default:
      return true;
  }
});

const showBreadcrumbs = computed(() => {
  switch (route.name) {
    case undefined:
    case '':
    case 'initialsetup':
    case 'workspaceselect':
      return false;
    default:
      return true;
  }
});

onBeforeMount(() => {
  if (!grimoireStore.isInitialSetupDone) {
    router.push('/setup');
  }
})
</script>

<style lang="scss">
#app,
#opengrimoire {
  width: 100dvw;
  max-width: unset;
  height: 100dvh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#opengrimoire {
  text-align: left;
  overflow: hidden;
  display: grid;
  grid-template-columns: calc(var(--closed-menu-width) + var(--base-spacing) * 2 + var(--base-border-width)) auto;
  grid-template-rows: 48px auto;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0;
  grid-auto-flow: row;
  grid-template-areas:
    "sidebar breadcrumbs"
    "sidebar routerview";
  transition: grid-template-columns 300ms ease-in-out;

  &.sidenav-hidden {
    grid-template-columns: 0 auto;
  }

  &.breadcrumbs-hidden {
    grid-template-rows: 0 auto;
  }

  &:has(> .sidenav:hover) {
    grid-template-columns: 300px auto;
  }
}
</style>
