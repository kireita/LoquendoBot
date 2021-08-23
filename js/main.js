const { app, BrowserWindow } = require('electron')
const amazontts = require('extra-amazontts');

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    window.loadFile('index.html')
}

try {
    require('electron-reloader')(module)
} catch (_) {}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})