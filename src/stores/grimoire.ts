import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
import {showDirectoryPicker} from '../utils/fileSystem';
import {workspaceBaseConfig, writeConfig} from '../utils/grimoireConfig';
import {loadAllProjects} from '../utils/projectConfig';

import type { Ref, ComputedRef } from 'vue';
import type {WorkspaceConfig, ProjectEntry} from '../types';

export const useGrimoireStore = defineStore('grimoire', () => {
    // states
    const workspaceDirectoryHandle: Ref<FileSystemDirectoryHandle|null> = ref(null);
    const initialSetupDone: Ref<boolean> = ref(false);
    const workspaceConfig: Ref<WorkspaceConfig> = ref(workspaceBaseConfig);
    const workspaceConfigPopupVisible: Ref<boolean> = ref(false);
    const isConfigSaving: Ref<boolean> = ref(false);
    const projects: Ref<Array<ProjectEntry>> = ref([]);

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);
    const getWorkspaceConfig: ComputedRef<WorkspaceConfig> = computed(() => workspaceConfig.value);
    const getWorkspaceConfigPopupVisible: ComputedRef<boolean> = computed(() => workspaceConfigPopupVisible.value);
    const getIsConfigSaving: ComputedRef<boolean> = computed(() => isConfigSaving.value);
    const getProjects: ComputedRef<Array<ProjectEntry>> = computed(() => projects.value);

    // actions
    async function selectWorkspacePath() {
        const directoryHandle: FileSystemDirectoryHandle = await showDirectoryPicker()
        if (directoryHandle) {
            workspaceDirectoryHandle.value = directoryHandle;
        }
    }

    function setInitialSetupDone() {
        initialSetupDone.value = true;
    }

    function resetInitialSetup() {
        initialSetupDone.value = false;
    }

    function setWorkspaceConfig(config: WorkspaceConfig) {
        workspaceConfig.value = config;
    }

    function showWorkspacePopup() {
        workspaceConfigPopupVisible.value = true;
    }

    function hideWorkspacePopup() {
        workspaceConfigPopupVisible.value = false;
    }

    function toggleWorkspacePopup() {
        workspaceConfigPopupVisible.value = !workspaceConfigPopupVisible.value;
    }

    function setIsConfigSaving(value: boolean) {
        isConfigSaving.value = value;
    }

    async function loadProjects() {
        if (workspaceDirectoryHandle.value) {
            const newProjects = await loadAllProjects(workspaceDirectoryHandle.value);

            // Get the set of new project names
            const newProjectNames = new Set(newProjects.map(p => p.projectConfig.projectName));

            // Remove projects that are no longer in newProjects
            projects.value = projects.value.filter(p => newProjectNames.has(p.projectConfig.projectName));

            // Add only new projects
            const existingProjectNames = new Set(projects.value.map(p => p.projectConfig.projectName));
            const uniqueNewProjects = newProjects.filter(p => !existingProjectNames.has(p.projectConfig.projectName));

            projects.value.push(...uniqueNewProjects);
        }
    }

    // watchers
    let configWatchTimer: undefined | number = undefined;
    watch(workspaceConfig, (newConfig) => {
        clearTimeout(configWatchTimer);
        configWatchTimer = setTimeout(async () => {

            if (workspaceDirectoryHandle.value) {
                isConfigSaving.value = true;
                await writeConfig(workspaceDirectoryHandle.value, newConfig);
                isConfigSaving.value = false;
            }
        }, 500);
    },{deep: true});

    return {
        workspaceDirectoryHandle,
        initialSetupDone,
        workspaceConfig,
        workspaceConfigPopupVisible,
        isConfigSaving,
        projects,

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,
        getWorkspaceConfig,
        getWorkspaceConfigPopupVisible,
        getIsConfigSaving,
        getProjects,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
        setWorkspaceConfig,
        showWorkspacePopup,
        hideWorkspacePopup,
        toggleWorkspacePopup,
        setIsConfigSaving,
        loadProjects
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle',
            'workspaceConfigPopupVisible',
            'projects'
        ]
    }
});