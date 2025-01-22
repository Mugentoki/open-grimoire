import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { showDirectoryPicker } from '../utils/fileSystem';

import type { Ref, ComputedRef } from 'vue';

export const useGrimoireStore = defineStore('grimoire', () => {
    // states
    const workspaceDirectoryHandle: Ref<FileSystemDirectoryHandle|null> = ref(null);
    const initialSetupDone: Ref<boolean> = ref(false);

    // getters
    const getWorkspaceDirectoryHandle: ComputedRef<FileSystemDirectoryHandle|null> = computed(() => workspaceDirectoryHandle.value);
    const isInitialSetupDone: ComputedRef<boolean> = computed(() => initialSetupDone.value);

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

    return {
        workspaceDirectoryHandle,
        initialSetupDone,

        getWorkspaceDirectoryHandle,
        isInitialSetupDone,

        selectWorkspacePath,
        setInitialSetupDone,
        resetInitialSetup,
    };
}, {
    persist: {
        omit: [
            'workspaceDirectoryHandle'
        ]
    }
});