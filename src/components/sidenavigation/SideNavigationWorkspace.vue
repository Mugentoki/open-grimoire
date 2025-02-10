<template>
  <SideNavigationContainer navigationName="workspace">
    <SideNavigationMenuItem iconName="icon-workspace" :label="workspaceDetails.workspaceTitle" icon-size="large"/>
    <SideNavigationMenuItem iconName="icon-workspace" icon-size="large"/>
    <SideNavigationTextblock>
      {{ workspaceDetails.workspaceDescription }}
    </SideNavigationTextblock>
  </SideNavigationContainer>
</template>

<script setup lang="ts">
import SideNavigationMenuItem from "./SideNavigationMenuItem.vue";
import SideNavigationTextblock from "./SideNavigationTextblock.vue";
import SideNavigationContainer from "./SideNavigationContainer.vue";
import {computed} from "vue";
import {useGrimoireStore} from "../../stores/grimoire.ts";

const grimoireStore = useGrimoireStore();
const workspaceDetails = computed(() => {
  return grimoireStore.getWorkspaceConfig;
})
</script>

<style lang="scss"></style>