import { initJsonFile, readJsonFile, writeJsonFile } from "./fileSystem.ts";
import type {WorkspaceConfig} from '../types';

export const workspaceBaseConfig: WorkspaceConfig = {
    workspaceTitle: 'My Workspace',
    workspaceDescription: 'Here is your personal workspace description. You can change the workspace title and description in the settings.'
}

export async function initConfig(workspaceHandle: FileSystemDirectoryHandle): Promise<boolean> {
    try {
        return await initJsonFile(workspaceHandle, '', 'grimoire.json', workspaceBaseConfig);
    } catch(error) {
        return false;
    }
}

export async function readConfig(workspaceHandle: FileSystemDirectoryHandle): Promise<false|WorkspaceConfig> {
    try {
        const config = await readJsonFile(workspaceHandle, '', 'grimoire.json');

        if (config) {
            return config as WorkspaceConfig;
        }

        return false;
    } catch(error) {
        return false;
    }
}

export async function writeConfig(workspaceHandle: FileSystemDirectoryHandle, config: WorkspaceConfig): Promise<boolean> {
    try {
        return await writeJsonFile(workspaceHandle, '', 'grimoire.json', config);
    } catch(error) {
        return false;
    }
}