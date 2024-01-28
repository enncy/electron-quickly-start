import { BrowserWindow, ipcMain } from 'electron';

export function registerIpc() {
	ipcMain.on('create-window', (e, url) => {
		const win = new BrowserWindow({});
		console.log(url);
		win.loadURL(url);
	});
}
