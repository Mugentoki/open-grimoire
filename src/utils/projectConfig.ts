import {initJsonFile, readJsonFile, writeJsonFile, getNestedDirectoryHandle} from "./fileSystem.ts";
import
    type {ProjectConfig, ProjectEntry} from '../types';

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

export async function loadAllProjects(workspaceHandle: FileSystemDirectoryHandle): Promise<Array<ProjectEntry>> {
    try {
        const projects: Array<ProjectEntry> = [];
        const entries = await workspaceHandle.values();

        for await (const entry of entries) {
            if (entry.kind === 'directory') {
                const projectConfig: false|ProjectConfig = await readProjectConfig(workspaceHandle, entry.name);
                const projectDirectoryHandle: FileSystemDirectoryHandle = await getNestedDirectoryHandle(workspaceHandle, entry.name);
                if (projectConfig) {
                    projects.push({
                        projectConfig: projectConfig,
                        projectDirectoryHandle: projectDirectoryHandle
                    });
                }
            }
        }

        return projects;
    } catch(error) {
        return [];
    }
}