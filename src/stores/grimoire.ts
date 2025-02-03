import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { showDirectoryPicker } from '../utils/fileSystem';

import type { Ref, ComputedRef } from 'vue';
import type { ViewType } from '../types';

export const useGrimoireStore = defineStore('grimoire', () => {
    // states
    const workspaceDirectoryHandle: Ref<FileSystemDirectoryHandle|null> = ref(null);
    const initialSetupDone: Ref<boolean> = ref(false);
    const currentViewType: Ref<ViewType> = ref('');

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);
    const getCurrentViewType: ComputedRef<ViewType> = computed(() => currentViewType.value);

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

    return {
        workspaceDirectoryHandle,
        initialSetupDone,
        currentViewType,

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,
        getCurrentViewType,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
        setViewType
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle'
        ]
    }
});