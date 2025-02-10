import type { WorkspaceConfig } from '../types';

export const workspaceBaseConfig: WorkspaceConfig = {
    workspaceTitle: 'My Workspace',
    workspaceDescription: 'Here is your personal workspace description. You can change the workspace title and description in the settings.'
}

export async function initConfig(workspaceHandle: FileSystemDirectoryHandle): Promise<boolean> {
    try {
        const loadedConfig = await readConfig(workspaceHandle);
        let config: WorkspaceConfig = workspaceBaseConfig;

        if (loadedConfig) {
            config = mergeConfig(config, loadedConfig);
        }

        // write the config
        await writeConfig(workspaceHandle, config);

        return true;
    } catch(error) {
        return false;
    }
}

export async function readConfig(workspaceHandle: FileSystemDirectoryHandle): Promise<false|WorkspaceConfig> {
    try {
        const configName = 'grimoire.json';
        const configFileHandle = await workspaceHandle.getFileHandle(configName, { create: true });
        const configFile = await configFileHandle.getFile();

        if (configFile.size > 0 && configFile.type === 'application/json') {
            const configContent = await configFile.text();
            return JSON.parse(configContent) as WorkspaceConfig;
        }

        return false;
    } catch(error) {
        return false;
    }
}

export async function writeConfig(workspaceHandle: FileSystemDirectoryHandle, config: WorkspaceConfig): Promise<boolean> {
    try {
        const configName = 'grimoire.json';
        const configFileHandle = await workspaceHandle.getFileHandle(configName, { create: true });
        const writable = await configFileHandle.createWritable();
        await writable.write(JSON.stringify(config, null, 2));
        await writable.close();

        return true;
    } catch(error) {
        return false;
    }
}

function mergeConfig(obj1: WorkspaceConfig, obj2: WorkspaceConfig): WorkspaceConfig {
    return structuredClone({ ...obj1, ...obj2 });
}