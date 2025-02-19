<template>
  <PageContainer>
    <div class="project-list">
      <TransitionGroup name="project">
        <div v-for="project in availableProjects" :key="project.projectConfig.projectName" class="project-item">
          <div class="project-item__title">{{ project.projectConfig.projectName }}</div>
          <div class="project-item__description">{{ truncateProjectDescription(project.projectConfig.projectDescription) }}</div>
        </div>
      </TransitionGroup>
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
import {computed, ref} from "vue";
import PageContainer from "../components/common/PageContainer.vue";
import Popup from "../components/common/Popup.vue";
import TextAreaInput from "../components/form/TextAreaInput.vue";
import TextInput from "../components/form/TextInput.vue";
import { projectBaseConfig, initProjectConfig } from "../utils/projectConfig.ts";
import type { ProjectConfig } from "../types";

const grimoireStore = useGrimoireStore();
grimoireStore.loadProjects();

const showWorkspaceSettings = computed(() => {
  return grimoireStore.getWorkspaceConfigPopupVisible;
});

const availableProjects = computed(() => {
  return grimoireStore.getProjects;
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

const createProject = async ()  => {
  const workspaceHandle = grimoireStore.getWorkspaceDirectoryHandle;
  if (workspaceHandle) {
    await initProjectConfig(workspaceHandle, createProjectModel.value);
    await grimoireStore.loadProjects();
  }

  hideCreateProject();
}

const truncateProjectDescription = (description: string) => {
  return description.length > 120 ? description.substring(0, 120) + "..." : description;
}

async function monitorFileChanges() {
  requestIdleCallback(async () => {
       setTimeout(async () => {
         console.log("Checking for file changes");
         await grimoireStore.loadProjects();
         await monitorFileChanges();
       }, 10000);
  });
}
monitorFileChanges();
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
    transition: all var(--base-transition);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:hover {
      color: inherit;
      border-color: var(--font-color-base);
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