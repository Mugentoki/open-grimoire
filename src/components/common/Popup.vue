<template>
  <div class="popup" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="popup__header">
      <div class="popup__header-title">{{ title }}</div>
      <div class="popup__header-close">
        <button @click="$emit('close')" class="icon-close"></button>
      </div>
    </div>
    <div class="popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const {width = 350, height = 350} = defineProps<{
  title?: string;
  width?: number;
  height?: number;
}>();
</script>

<style lang="scss">
.popup {
  position: absolute;
  background: green;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: var(--base-spacing);

  &__header {
    margin-bottom: var(--base-spacing);
    font-size: var(--font-size-menu);
    display: flex;
    align-items: flex-end;
  }
}
</style>