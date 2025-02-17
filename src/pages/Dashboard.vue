<template>
  <PageContainer>
    <div class="project-list">
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item"></div>
      <div class="project-item project-create" @click="showCreateProjectPopup">
        <span class="project-create__icon icon-square-plus"></span>
      </div>
    </div>
    <Transition name="popup">
      <Popup v-if="showWorkspaceSettings" title="Workspace Settings" @close="hideWorkspaceSettings">
       <TextInput placeholder="Workspace Name" v-model="workspaceConfig.workspaceTitle"/>
       <TextAreaInput placeholder="Workspace Description" v-model="workspaceConfig.workspaceDescription"/>
      </Popup>
    </Transition>
    <Transition name="popup">
      <Popup v-if="showCreateProject" title="New Project" @close="hideCreateProject">
        <template v-slot:default>
          <TextInput placeholder="Project Name" v-model="createProjectModel.projectName"/>
          <TextAreaInput placeholder="Project Description" v-model="createProjectModel.projectDescription"/>
        </template>
        <template v-slot:actions>
          <button @click.prevent="createProject">Create Project</button>
        </template>
      </Popup>
    </Transition>
  </PageContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGrimoireStore } from "../stores/grimoire.ts";
import { computed, ref } from "vue";
import PageContainer from "../components/common/PageContainer.vue";
import Popup from "../components/common/Popup.vue";
import TextAreaInput from "../components/form/TextAreaInput.vue";
import TextInput from "../components/form/TextInput.vue";
import { projectBaseConfig } from "../utils/projectConfig.ts";
import type { ProjectConfig } from "../types";

const grimoireStore = useGrimoireStore();

const showWorkspaceSettings = computed(() => {
  return grimoireStore.getWorkspaceConfigPopupVisible;
});

const showCreateProject = ref<boolean>(false);
const createProjectModel = ref<ProjectConfig>({...projectBaseConfig});

const { workspaceConfig } = storeToRefs(grimoireStore);

const hideWorkspaceSettings = () => {
  grimoireStore.hideWorkspacePopup();
}

const showCreateProjectPopup = () => {
  createProjectModel.value = {...projectBaseConfig};
  showCreateProject.value = true;
}

const hideCreateProject = () => {
  showCreateProject.value = false;
}

const createProject = ()  => {
  console.log(createProjectModel.value);
}
</script>

<style lang="scss">
.project-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--base-spacing);

  .project-item {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 2px solid var(--base-border-color);
    border-radius: var(--border-radius-medium);
    padding: var(--base-spacing);
    color: var(--font-color-inactive);
    transition: color var(--base-transition), border-color var(--base-transition);
    cursor: pointer;

    &:hover {
      color: inherit;
      border-color: var(--font-color-base);
    }
  }

  .project-create {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__icon {
      &:before {
        font-size: 4.8rem;
      }
    }
  }
}
</style>