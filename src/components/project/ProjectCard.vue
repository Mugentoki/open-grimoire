<template>
  <div class="project-item">
    <div class="project-item__title">{{ projectConfig.projectName }}</div>
    <div class="project-item__description">{{ truncateProjectDescription(projectConfig.projectDescription) }}</div>
    <div class="project-item__actions">
      <button type="button"
              class="project-item__settings icon-gear"
              aria-label="Project Settings"
              @click="openProjectSettings">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectConfig } from "../../types";

const { projectConfig } = defineProps<{
  projectConfig: ProjectConfig;
}>()

const truncateProjectDescription = (description: string) => {
  return description.length > 120 ? description.substring(0, 120) + "..." : description;
}

const openProjectSettings = () => {
  console.log("open settings");
}
</script>

<style lang="scss">
.project-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--base-border-color);
  border-radius: var(--border-radius-medium);
  padding: var(--base-spacing);
  color: var(--font-color-inactive);
  transition: all var(--base-transition);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  &:hover {
    color: inherit;
    border-color: var(--font-color-base);

    .project-item__settings {
      color: var(--font-color-base);
      border-color: var(--font-color-base);
    }
  }

  &__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    hyphens: auto;
    font-size: var(--font-size-large);
    line-height: 1em;
    margin-bottom: var(--spacing-small);
    min-height: 57px;
  }

  &__description {
    flex-grow: 1;
    overflow: hidden;
  }
  &__settings {
    padding: 0;
    border-top: none;
    border-right: none;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
    width: 34px;
    height: 34px;
    background-color: transparent;
    transition: all var(--base-transition);
    position: absolute;
    top: 0;
    right: 0;

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>