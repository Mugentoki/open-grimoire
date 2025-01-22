<template>
  <div id="page-container" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  classes?: string;
}>();
</script>

<style lang="scss">
#page-container {
  width: 100%;
  height: 100%;

  &.center {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>