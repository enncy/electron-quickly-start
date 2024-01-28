import { BrowserWindow, shell } from 'electron';
const ElectronRemote = require('@electron/remote/main') as typeof import('@electron/remote/main');

export function createMainWindow(options: {
	hideTitleBar?: boolean;
	title: string;
	icon: string;
	handleOpenExternal: boolean;
	enableRemoteModule: boolean;
}) {
	const win = new BrowserWindow({
		title: options.title,
		icon: options.icon,
		minHeight: 800,
		minWidth: 1200,
		width: 1200,
		height: 800,
		center: true,
		hasShadow: true,
		...(options.hideTitleBar
			? {
					autoHideMenuBar: true,
					titleBarStyle: 'hidden',
					titleBarOverlay: {
						color: 'white',
						symbolColor: 'black'
					},
					frame: false
			  }
			: {}),
		show: false,
		webPreferences: {
			zoomFactor: 1,
			// 关闭拼写矫正
			spellcheck: false,
			webSecurity: true,
			// 开启node
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	if (options.handleOpenExternal) {
		win.webContents.on('will-navigate', (event, url) => {
			event.preventDefault();
			shell.openExternal(url);
		});

		win.webContents.setWindowOpenHandler((detail) => {
			shell.openExternal(detail.url);
			return {
				action: 'deny'
			};
		});
	}

	if (options.enableRemoteModule) {
		// 启用 remote 模块
		ElectronRemote.enable(win.webContents);
	}

	return win;
}

export function createCustomWindow() {}
