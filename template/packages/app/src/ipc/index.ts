import { BrowserWindow, ipcMain } from 'electron';

export function registerIpc() {
	ipcMain.on('create-window', (e, url) => {
		const win = new BrowserWindow({});
		console.log(url);
		win.loadURL(url);
	});


	// 显示复制粘贴菜单栏
	ipcMain.on('show-context-menu', (event) => {
		const template: MenuItemConstructorOptions[] = [
			{
				label: '复制',
				accelerator: 'CmdOrCtrl+C',
				click(menuItem, browserWindow, event) {
					browserWindow?.webContents.copy();
				}
			},
			{
				label: '粘贴',
				accelerator: 'CmdOrCtrl+V',
				click(menuItem, browserWindow, event) {
					browserWindow?.webContents.paste();
				}
			},
			{
				label: '剪切',
				accelerator: 'CmdOrCtrl+X',
				click(menuItem, browserWindow, event) {
					browserWindow?.webContents.cut();
				}
			},
			{
				label: '全选',
				accelerator: 'CmdOrCtrl+A',
				click(menuItem, browserWindow, event) {
					browserWindow?.webContents.selectAll();
				}
			},
			{
				type: 'separator'
			},
			{
				label: '重新加载',
				accelerator: 'CmdOrCtrl+R',
				click(menuItem, browserWindow, event) {
					browserWindow?.webContents.reload();
				}
			}
		];
		const menu = Menu.buildFromTemplate(template);
		menu.popup({ window: BrowserWindow.fromWebContents(event.sender) || undefined });
	});
}
