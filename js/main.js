/* global path */
/* exported path */

import { app, BrowserWindow, ipcMain } from 'electron';
// eslint-disable-next-line no-unused-vars
import path from 'path';

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		titleBarStyle: 'hidden',
		frame: false,
		transparent: true,
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
			// enableRemoteModule: true
		},
	});

	mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// ipcMain.on('asynchronous-message', (event, arg) => {

// });

ipcMain.on('synchronous-message', (event, arg) => {
	if (arg === 'restart') {
		app.relaunch();
		app.exit();
	}
});

ipcMain.on('resize-window', (event, width, height) => {
	const browserWindow = BrowserWindow.fromWebContents(event.sender);
	browserWindow.setSize(width, height);
});

ipcMain.on('minimize-window', (event) => {
	const browserWindow = BrowserWindow.fromWebContents(event.sender);
	browserWindow.minimize();
});

ipcMain.on('maximize-window', (event) => {
	const browserWindow = BrowserWindow.fromWebContents(event.sender);

	if (!browserWindow.isMaximized()) {
		browserWindow.maximize();
	} else {
		browserWindow.unmaximize();
	}
});

ipcMain.on('close-window', (event) => {
	const browserWindow = BrowserWindow.fromWebContents(event.sender);
	browserWindow.close();
});

// TODO: thomas resolution suggestion!!!
