<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from "vue-router";
import { useRouter } from 'vue-router';
import { useGrimoireStore } from "./stores/grimoire";

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
  padding: 20px;
  text-align: left;
}
</style>
