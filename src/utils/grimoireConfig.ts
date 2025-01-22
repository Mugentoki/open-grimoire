type GrimoireConfig = {
    test: string;
}

export async function readOrWriteConfig(workspaceHandle: FileSystemDirectoryHandle) {
    try {
        const configName = 'grimoire.json';
        let config: GrimoireConfig = {
            test: 'test'
        }
        const configFileHandle = await workspaceHandle.getFileHandle(configName, { create: true });
        const configFile = await configFileHandle.getFile();

        if (configFile.size > 0 && configFile.type === 'application/json') {
            // read content and check if the type is GrimoireConfig
            const configContent = await configFile.text();
            const loadedConfig = JSON.parse(configContent) as GrimoireConfig;
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

function mergeConfig(obj1: GrimoireConfig, obj2: GrimoireConfig): GrimoireConfig {
    return structuredClone({ ...obj1, ...obj2 });
}