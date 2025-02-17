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
    <div class="popup__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const {width = 350, height = 350} = defineProps<{
  title?: string;
  width?: number;
  height?: number;
}>();
</script>

<style lang="scss">
.popup {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--background-color);
  border-radius: var(--border-radius-large);
  border: 2px solid var(--base-border-color);
  box-shadow: var(--box-shadow);
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
    border-bottom: 2px solid var(--base-border-color);
    padding-bottom: var(--spacing-small);
  }

  &__header-title {
    flex-grow: 1;
  }

  &__content {
    flex-grow: 1;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 2px solid var(--base-border-color);
    margin-top: var(--base-spacing);
    padding-top: var(--base-spacing);
  }
}
</style>