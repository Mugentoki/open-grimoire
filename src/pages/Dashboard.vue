<template>
  <PageContainer>
Dashboard
   <Transition name="popup">
     <Popup v-if="showWorkspaceSettings" title="Workspace Settings" @close="hideWorkspaceSettings">
       <TextInput placeholder="Workspace Name" v-model="workspaceConfig.workspaceTitle"/>
     </Popup>
   </Transition>
  </PageContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import PageContainer from "../components/common/PageContainer.vue";
import Popup from "../components/common/Popup.vue";
import TextInput from "../components/form/TextInput.vue";
import {useGrimoireStore} from "../stores/grimoire.ts";
import { computed, ref } from "vue";

const grimoireStore = useGrimoireStore();

const showWorkspaceSettings = computed(() => {
  return grimoireStore.getWorkspaceConfigPopupVisible;
});

const { workspaceConfig } = storeToRefs(grimoireStore);

const hideWorkspaceSettings = () => {
  grimoireStore.hideWorkspacePopup();
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>