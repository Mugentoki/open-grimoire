import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { showDirectoryPicker } from '../utils/fileSystem';
import { workspaceBaseConfig } from '../utils/grimoireConfig';

import type { Ref, ComputedRef } from 'vue';
import type { ViewType, WorkspaceConfig } from '../types';

export const useGrimoireStore = defineStore('grimoire', () => {
    // states
    const workspaceDirectoryHandle: Ref<FileSystemDirectoryHandle|null> = ref(null);
    const initialSetupDone: Ref<boolean> = ref(false);
    const currentViewType: Ref<ViewType> = ref('');
    const workspaceConfig: Ref<WorkspaceConfig> = ref(workspaceBaseConfig);

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);
    const getCurrentViewType: ComputedRef<ViewType> = computed(() => currentViewType.value);
    const getWorkspaceConfig: ComputedRef<WorkspaceConfig> = computed(() => workspaceConfig.value);

    // actions
    function selectWorkspacePath() {
        showDirectoryPicker().then((directoryHandle: FileSystemDirectoryHandle) => {
            workspaceDirectoryHandle.value = directoryHandle;
        });
    }

    function setInitialSetupDone() {
        initialSetupDone.value = true;
    }

    function resetInitialSetup() {
        initialSetupDone.value = false;
    }

    function setViewType(viewType: ViewType) {
        currentViewType.value = viewType;
    }

    function setWorkspaceConfig(config: WorkspaceConfig) {
        workspaceConfig.value = config;
    }

    return {
        workspaceDirectoryHandle,
        initialSetupDone,
        currentViewType,
        workspaceConfig,

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,
        getCurrentViewType,
        getWorkspaceConfig,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
        setViewType,
        setWorkspaceConfig
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle'
        ]
    }
});