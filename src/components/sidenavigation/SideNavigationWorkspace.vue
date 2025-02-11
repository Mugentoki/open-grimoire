<template>
  <SideNavigationContainer navigationName="workspace" :with-header="true">
    <SideNavigationHeader :header-label="workspaceDetails.workspaceTitle" :hasExtra="true">
      <p>{{ workspaceDetails.workspaceDescription }}</p>
    </SideNavigationHeader>
    <SideNavigationMenuItem iconName="icon-gear" label="Workspace Settings" icon-size="large" @click="showWorkspaceSettings"/>
  </SideNavigationContainer>
</template>

<script setup lang="ts">
import SideNavigationMenuItem from "./components/SideNavigationMenuItem.vue";
import SideNavigationContainer from "./components/SideNavigationContainer.vue";
import SideNavigationHeader from "./components/SideNavigationHeader.vue";
import {computed} from "vue";
import {useGrimoireStore} from "../../stores/grimoire.ts";

const grimoireStore = useGrimoireStore();
const workspaceDetails = computed(() => {
  return grimoireStore.getWorkspaceConfig;
});

const showWorkspaceSettings = () => {
  console.log("show workspace settings");
  grimoireStore.showWorkspacePopup();
}
</script>

<style lang="scss"></style>