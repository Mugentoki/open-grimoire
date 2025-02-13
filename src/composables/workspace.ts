import { useGrimoireStore } from "../stores/grimoire.ts";
import { initConfig } from "../utils/grimoireConfig.ts";
import { useRouter } from "vue-router";

export function useFinishSetup() {
    const router = useRouter();
    const grimoireStore = useGrimoireStore();

    const finishSetup = async () => {
        const workspaceHandle = grimoireStore.getWorkspaceDirectoryHandle;

        if (workspaceHandle) {
            const configCreatedSuccessfully = await initConfig(grimoireStore.getWorkspaceDirectoryHandle);
            if (configCreatedSuccessfully) {
                grimoireStore.setInitialSetupDone();

                console.log(router);

                await router.push({ name: 'dashboard' });
            }
        }
    };

    return { finishSetup };
}