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
    const workspaceConfigPopupVisible: Ref<boolean> = ref(false);

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);
    const getCurrentViewType: ComputedRef<ViewType> = computed(() => currentViewType.value);
    const getWorkspaceConfig: ComputedRef<WorkspaceConfig> = computed(() => workspaceConfig.value);
    const getWorkspaceConfigPopupVisible: ComputedRef<boolean> = computed(() => workspaceConfigPopupVisible.value);

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

    function showWorkspacePopup() {
        workspaceConfigPopupVisible.value = true;
    }

    function hideWorkspacePopup() {
        workspaceConfigPopupVisible.value = false;
    }

    return {
        workspaceDirectoryHandle,
        initialSetupDone,
        currentViewType,
        workspaceConfig,
        workspaceConfigPopupVisible,

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,
        getCurrentViewType,
        getWorkspaceConfig,
        getWorkspaceConfigPopupVisible,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
        setViewType,
        setWorkspaceConfig,
        showWorkspacePopup,
        hideWorkspacePopup
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle',
            'workspaceConfigPopupVisible'
        ]
    }
});