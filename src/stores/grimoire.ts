import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { showDirectoryPicker } from '../utils/fileSystem';
import { workspaceBaseConfig, writeConfig } from '../utils/grimoireConfig';

import type { Ref, ComputedRef } from 'vue';
import type { WorkspaceConfig } from '../types';

export const useGrimoireStore = defineStore('grimoire', () => {
    // states
    const workspaceDirectoryHandle: Ref<FileSystemDirectoryHandle|null> = ref(null);
    const initialSetupDone: Ref<boolean> = ref(false);
    const workspaceConfig: Ref<WorkspaceConfig> = ref(workspaceBaseConfig);
    const workspaceConfigPopupVisible: Ref<boolean> = ref(false);
    const isConfigSaving: Ref<boolean> = ref(false);

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);
    const getWorkspaceConfig: ComputedRef<WorkspaceConfig> = computed(() => workspaceConfig.value);
    const getWorkspaceConfigPopupVisible: ComputedRef<boolean> = computed(() => workspaceConfigPopupVisible.value);

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

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,
        getWorkspaceConfig,
        getWorkspaceConfigPopupVisible,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
        setWorkspaceConfig,
        showWorkspacePopup,
        hideWorkspacePopup,
        toggleWorkspacePopup
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle',
            'workspaceConfigPopupVisible'
        ]
    }
});