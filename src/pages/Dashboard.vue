<template>
  <PageContainer>
Dashboard
   <Transition name="popup">
     <Popup v-if="showWorkspaceSettings" title="Workspace Settings" @close="hideWorkspaceSettings">
       <TextInput placeholder="Workspace Name" v-model="workspaceConfig.workspaceTitle"/>
       <TextAreaInput placeholder="Workspace Description" v-model="workspaceConfig.workspaceDescription"/>
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
import { computed } from "vue";
import TextAreaInput from "../components/form/TextAreaInput.vue";

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

</style>