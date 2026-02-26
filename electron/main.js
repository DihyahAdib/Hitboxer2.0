import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

let appMenu = null;

function createMenu(mainWindow) {
	const template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Home',
					click: () => {
						mainWindow.webContents.send('menu:go-home');
					}
				},
				{ type: 'separator' },
				{
					label: 'Add Image',
					accelerator: 'CmdOrCtrl+O',
					click: () => {
						mainWindow.webContents.send('menu:add-image');
					}
				},
				{
					label: 'Remove Image',
					accelerator: 'CmdOrCtrl+W',
					click: () => {
						mainWindow.webContents.send('menu:remove-image');
					}
				},
				{ type: 'separator' },
				{ role: 'reload' },
				{ role: 'quit' }
			]
		},
		{
			label: 'Window',
			submenu: [
				{
					label: 'Home',
					click: () => {
						mainWindow.webContents.send('menu:go-home');
					}
				},
				{
					label: 'Hitbox Editor',
					accelerator: 'CmdOrCtrl+1',
					click: () => {
						mainWindow.webContents.send('menu:go-hitbox-editor');
					}
				},
				{
					label: 'JSON configs',
					accelerator: 'CmdOrCtrl+2',
					click: () => {
						mainWindow.webContents.send('menu:go-json-editor');
					}
				}
			]
		},
		{
			label: 'Settings',
			submenu: [
				{
					label: 'Toggle Fullscreen',
					accelerator: 'F11',
					click: () => {
						const isFullscreen = mainWindow.isFullScreen();
						mainWindow.setFullScreen(!isFullscreen);
						mainWindow.webContents.send('menu:fullscreen-changed', !isFullscreen);
					}
				}
			]
		},
		{
			label: 'Help',
			submenu: []
		}
	];

	appMenu = Menu.buildFromTemplate(template);
	return appMenu;
}

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			sandbox: false,
			preload: path.join(__dirname, 'preload.cjs')
		}
	});

	if (isDev) {
		mainWindow.loadURL('http://localhost:5174');
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
	}

	const menu = createMenu(mainWindow);

	Menu.setApplicationMenu(null);

	ipcMain.on('set-menu-visible', (event, visible) => {
		if (visible) {
			Menu.setApplicationMenu(menu);
		} else {
			Menu.setApplicationMenu(null);
		}
	});

	ipcMain.on('toggle-fullscreen', () => {
		const isFullscreen = mainWindow.isFullScreen();
		mainWindow.setFullScreen(!isFullscreen);
		mainWindow.webContents.send('menu:fullscreen-changed', !isFullscreen);
	});

	mainWindow.on('enter-full-screen', () => {
		mainWindow.webContents.send('menu:fullscreen-changed', true);
	});

	mainWindow.on('leave-full-screen', () => {
		mainWindow.webContents.send('menu:fullscreen-changed', false);
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// IPC Handlers
ipcMain.handle('open-image-dialog', async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }]
	});

	if (result.canceled) return null;
	return result.filePaths[0];
});
