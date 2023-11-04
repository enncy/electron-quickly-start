import { BrowserWindow, app, shell } from 'electron';
import path from 'path';
const ElectronRemote = require('@electron/remote/main') as typeof import('@electron/remote/main');
// 初始化 remote 模块
ElectronRemote.initialize();

// 设置应用名称
app.setName('electron-app');

// 防止软件崩溃以及兼容
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-gpu-rasterization');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('--no-sandbox');
app.disableHardwareAcceleration();

/** 获取单进程锁 */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
} else {
	bootstrap();
}

/** 启动渲染进程 */
async function bootstrap() {
	// 等待 app 准备完成
	await app.whenReady();
	// 创建窗口
	const window = createWindow();

	app.on('quit', (e) => {
		// 交给渲染层去关闭浏览器，可以实现关闭询问功能
		// e.preventDefault();
		// window.webContents.send('close');
	});

	window.on('close', (e) => {
		// 交给渲染层去关闭浏览器，可以实现关闭询问功能
		// e.preventDefault();
		// window.webContents.send('close');
	});

	if (app.isPackaged) {
		await window.loadFile('./public/index.html');
	} else {
		await window.loadURL('http://localhost:3000');
		window.webContents.openDevTools();
	}

	// 加载完成显示，解决一系列的显示/黑屏问题
	window.show();
}

export function createWindow() {
	const win = new BrowserWindow({
		title: 'electron-app',
		icon: path.resolve('./public/favicon.ico'),
		minHeight: 800,
		minWidth: 1200,
		width: 1200,
		height: 800,
		center: true,
		hasShadow: true,
		autoHideMenuBar: true,
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: 'white',
			symbolColor: 'black'
		},
		frame: false,
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
	// 启用 remote 模块
	ElectronRemote.enable(win.webContents);
	return win;
}
