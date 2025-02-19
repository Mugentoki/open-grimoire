export function showDirectoryPicker() {
    return window.showDirectoryPicker();
}

export async function initJsonFile(workspaceHandle: FileSystemDirectoryHandle, filePath: string, fileName: string, fileObject: object): Promise<boolean> {
    try {
        let newFile = fileObject;
        let loadedFile = await readJsonFile(workspaceHandle, filePath, filePath);

        if (loadedFile) {
            newFile = mergeObjects(fileObject, loadedFile);
        }

        return await writeJsonFile(workspaceHandle, filePath, fileName, newFile);
    } catch(error) {
        return false;
    }
}

export async function readJsonFile(workspaceHandle: FileSystemDirectoryHandle, filePath: string, fileName: string): Promise<false|object> {
    try {
        const directoryHandle = await getNestedDirectoryHandle(workspaceHandle, filePath);
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: false });
        const loadedFile = await fileHandle.getFile();

        if (loadedFile.size > 0 && loadedFile.type === 'application/json') {
            const fileContent = await loadedFile.text();
            return JSON.parse(fileContent);
        }

        return false;
    } catch(error) {
        return false;
    }
}

export async function writeJsonFile(workspaceHandle: FileSystemDirectoryHandle, filePath: string, fileName: string, fileObject: object): Promise<boolean> {
    try {
        const directoryHandle = await getNestedDirectoryHandle(workspaceHandle, filePath);
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();

        await writable.write(JSON.stringify(fileObject, null, 2));
        await writable.close();

        return true;
    } catch(error) {
        return false;
    }
}

export async function getNestedDirectoryHandle(rootHandle: FileSystemDirectoryHandle, path: string): Promise<FileSystemDirectoryHandle> {
    const folders = path.split('/'); // Split the path into parts
    let currentHandle = rootHandle;

    for (const folder of folders) {
        if (folder !== '') {
            currentHandle = await currentHandle.getDirectoryHandle(folder, { create: true });
        }
    }

    return currentHandle;
}

function mergeObjects(obj1: object, obj2: object): object {
    return structuredClone({ ...obj1, ...obj2 });
}
