import { app, BrowserWindow, shell } from 'electron';
import path from 'path';

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: false
        },
    });

    mainWindow.loadFile(path.join(app.getAppPath(), '..', 'dist', 'index.html'));

    // Prevent any external navigation (i.e., block opening external links)
    mainWindow.webContents.setWindowOpenHandler((details) => {
        const url = details.url;

        if (url.startsWith('http')) {
            // Block navigation to any external HTTP(S) URLs and open default browser instead
            shell.openExternal(url);
            return { action: 'deny' };
        }
        // Allow local navigation
        return { action: 'allow' };
    });

    mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
