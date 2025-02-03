<template>
  <div class="sidenav" v-if="viewType !== ''">
    <p>{{ viewType }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useGrimoireStore} from "../../stores/grimoire.ts";

const grimoireStore = useGrimoireStore();
const viewType = computed(() => {
  return grimoireStore.getCurrentViewType;
});
</script>

<style lang="scss">
.sidenav {
  grid-area: sidebar;
  padding: var(--base-spacing);
  border-right: var(--base-border-width) solid var(--base-border-color);
}
</style>