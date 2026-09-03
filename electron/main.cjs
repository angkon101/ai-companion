const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let isAlwaysOnTop = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 640,
    minWidth: 320,
    minHeight: 450,
    frame: false,
    transparent: false,
    backgroundColor: '#070a0f',
    alwaysOnTop: isAlwaysOnTop,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const devUrl = 'http://localhost:3333';
  const prodPath = path.join(__dirname, '..', 'dist', 'index.html');

  // Check if Vite server is running or fallback to production build
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL(devUrl).catch(() => {
      mainWindow.loadFile(prodPath);
    });
  } else {
    mainWindow.loadFile(prodPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window-toggle-always-on-top', () => {
  if (!mainWindow) return isAlwaysOnTop;
  isAlwaysOnTop = !isAlwaysOnTop;
  mainWindow.setAlwaysOnTop(isAlwaysOnTop, 'screen-saver');
  return isAlwaysOnTop;
});

ipcMain.handle('window-get-always-on-top', () => {
  return isAlwaysOnTop;
});

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
