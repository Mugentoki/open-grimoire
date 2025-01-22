export async function readOrWriteConfig(workspaceHandle: FileSystemDirectoryHandle) {
    try {
        const configName = 'grimoire.json';
        let config = {
            test: 'test'
        }
        const configFileHandle = await workspaceHandle.getFileHandle(configName, { create: true });
        const configFile = await configFileHandle.getFile();

        if (configFile.size > 0 && configFile.type === 'application/json') {
            // read content and check if the type is GrimoireConfig
            const configContent = await configFile.text();
            const loadedConfig = JSON.parse(configContent);
            config = mergeConfig(config, loadedConfig);
        }

        // write the config
        const writable = await configFileHandle.createWritable();
        await writable.write(JSON.stringify(config, null, 2));
        await writable.close();

        return true;
    } catch(error) {
        return false;
    }
}

function mergeConfig(obj1, obj2) {
    const result = { ...obj1 }; // Create a shallow copy of obj1

    for (const key in obj2) {
        if (
            obj2[key] &&
            typeof obj2[key] === "object" &&
            !Array.isArray(obj2[key])
        ) {
            // Recursively merge objects
            result[key] = deepMerge(obj1[key] || {}, obj2[key]);
        } else {
            // Otherwise, assign value from obj2
            result[key] = obj2[key];
        }
    }

    return result;
}