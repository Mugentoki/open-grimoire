<template>
    <input type="text" :placeholder="placeholder" v-model="value" />
</template>

<script setup lang="ts">
defineProps<{
    placeholder?: string
}>();

const value = defineModel<string>();
</script>

<style lang="scss"></style>