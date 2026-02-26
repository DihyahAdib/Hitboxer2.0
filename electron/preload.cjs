// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require("electron");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");

contextBridge.exposeInMainWorld('electronAPI', {
  openImageDialog: () => ipcRenderer.invoke('open-image-dialog'),

  onAddImage: (callback) => ipcRenderer.on('menu:add-image', callback),
  offAddImage: (callback) => ipcRenderer.removeListener('menu:add-image', callback),
  onRemoveImage: (callback) => ipcRenderer.on('menu:remove-image', callback),
  offRemoveImage: (callback) => ipcRenderer.removeListener('menu:remove-image', callback),

  onGoHome: (callback) => ipcRenderer.on('menu:go-home', callback),
  offGoHome: (callback) => ipcRenderer.removeListener('menu:go-home', callback),
  onGoHitboxEditor: (callback) => ipcRenderer.on('menu:go-hitbox-editor', callback),
  offGoHitboxEditor: (callback) => ipcRenderer.removeListener('menu:go-hitbox-editor', callback),

  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  onFullscreenChanged: (callback) => ipcRenderer.on('menu:fullscreen-changed', callback),
  offFullscreenChanged: (callback) => ipcRenderer.removeListener('menu:fullscreen-changed', callback),

  setMenuVisible: (visible) => ipcRenderer.send('set-menu-visible', visible),
  loadImage: (filePath) => {
    const data = fs.readFileSync(filePath);
    const blob = new Blob([data], { type: 'image/*' });
    return URL.createObjectURL(blob);
  },
});
