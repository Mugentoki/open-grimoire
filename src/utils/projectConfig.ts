import type {ProjectConfig} from '../types';
import {initJsonFile, readJsonFile, writeJsonFile} from "./fileSystem.ts";

export const projectBaseConfig: ProjectConfig = {
    projectName: "",
    projectDescription: "",
}

export async function initProjectConfig(workspaceHandle: FileSystemDirectoryHandle, projectConfig: ProjectConfig): Promise<boolean> {
    try {
        const filePath = projectConfig.projectName.replace(/[^a-z0-9_\-]/gi, '_');
        return await initJsonFile(workspaceHandle, filePath, 'project.json', projectConfig);
    } catch(error) {
        return false;
    }
}

export async function readProjectConfig(workspaceHandle: FileSystemDirectoryHandle, filePath: string): Promise<false|ProjectConfig> {
    try {
        const config = await readJsonFile(workspaceHandle, filePath,  'project.json');

        if (config) {
            return config as ProjectConfig;
        }

        return false;
    } catch(error) {
        return false;
    }
}

export async function writeProjectConfig(workspaceHandle: FileSystemDirectoryHandle, filePath: string, config: ProjectConfig): Promise<boolean> {
    try {
        return await writeJsonFile(workspaceHandle, filePath, 'project.json', config);
    } catch(error) {
        return false;
    }
}