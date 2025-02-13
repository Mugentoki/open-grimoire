<template>
  <PageContainer classes="center">
    <div class="select-panel">
      <p>Select an existing or new workspace<br>and start working on your project.</p>
      <button class="setup-step__button" @click.prevent="selectWorkspaceFolder">Select Workspace</button>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../components/common/PageContainer.vue";
import { useGrimoireStore } from "../stores/grimoire.ts";
import { useFinishSetup } from "../composables/workspace.ts";

const grimoireStore = useGrimoireStore();
const { finishSetup } = useFinishSetup();

async function selectWorkspaceFolder() {
  await grimoireStore.selectWorkspacePath();
  await finishSetup();
}
</script>

<style scoped>
.select-panel p {
  margin-bottom: var(--base-spacing);
}
</style>