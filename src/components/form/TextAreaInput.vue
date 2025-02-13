<template>
    <textarea :placeholder="placeholder" v-model="value"></textarea>
</template>

<script setup lang="ts">
defineProps<{
    placeholder?: string
}>();

const value = defineModel<string>();
</script>

<style lang="scss"></style>