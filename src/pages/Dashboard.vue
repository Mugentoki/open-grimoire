<template>
  <PageContainer>
Dashboard
   <transition name="popup">
     <Popup v-if="showWorkspaceSettings" title="Workspace Settings">
       some content
     </Popup>
   </transition>
  </PageContainer>
</template>

<script setup lang="ts">
 import PageContainer from "../components/common/PageContainer.vue";
 import Popup from "../components/common/Popup.vue";
 import {useGrimoireStore} from "../stores/grimoire.ts";
 import { computed } from "vue";

 const grimoireStore = useGrimoireStore();

 const showWorkspaceSettings = computed(() => {
   return grimoireStore.getWorkspaceConfigPopupVisible;
 });
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