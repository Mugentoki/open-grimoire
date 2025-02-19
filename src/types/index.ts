export type WorkspaceConfig = {
    workspaceTitle: string,
    workspaceDescription: string
}

export type ProjectConfig = {
    projectName: string,
    projectDescription: string
}

export type ProjectEntry = {
    projectConfig: ProjectConfig,
    projectDirectoryHandle: FileSystemDirectoryHandle
}