<template>
  <div>
    <div id="container">
      <div class="setup-step" v-if="initialSetupStep === 1">
        <div class="setup-step__title">Thank you for using Open Grimoire<br>(or Grimoire for short)</div>
        <p class="setup-step__description">With this following wizard 🧙 we'll guide you through the setup, to make sure everything is working like it should.</p>
        <button class="setup-step__button" @click.prevent="nextStep">Let's begin</button>
      </div>
      <div class="setup-step" v-if="initialSetupStep === 2">
        <div class="setup-step__title">Select workspace folder</div>
        <p class="setup-step__description">This folder will contain all your projects.<br>Tip: You can also select a cloud folder (for example Google Cloud) to get automatic file synchronisation.</p>
        <button class="setup-step__button" @click.prevent="selectWorkspaceFolder" v-if="!workspaceSelected">Select Workspace</button>
        <button class="setup-step__button" @click.prevent="nextStep" v-else>Next Step</button>
      </div>
      <div class="setup-step" v-if="initialSetupStep === 3">
        <div class="setup-step__title">You are all set!</div>
        <p class="setup-step__description">That's it!<br>-- add some "need help" stuff here --</p>
        <button class="setup-step__button" @click.prevent="finishSetup">Finish Setup</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGrimoireStore } from "../stores/grimoire";
import { readOrWriteConfig } from "../utils/grimoireConfig.ts";

import type { Ref, ComputedRef } from 'vue';

const router = useRouter();
const grimoireStore = useGrimoireStore();
const initialSetupStep: Ref<number> = ref(1);
const workspaceSelected: ComputedRef<boolean> = computed(() => grimoireStore.getWorkspaceDirectoryHandle !== null);

function selectWorkspaceFolder() {
  grimoireStore.selectWorkspacePath();
}

function nextStep() {
  initialSetupStep.value++;
}

async function finishSetup() {
  const workspaceHandle = grimoireStore.getWorkspaceDirectoryHandle;

  if (workspaceHandle) {
    const configCreatedSuccessfully = await readOrWriteConfig(grimoireStore.getWorkspaceDirectoryHandle);
    if (configCreatedSuccessfully) {
      grimoireStore.setInitialSetupDone();
      router.push('/');
    }
  }
}
</script>

<style lang="scss">
#container {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - 56px);
}

.setup-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>