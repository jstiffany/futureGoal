const path = require('path');

const { app, BrowserWindow } = require("electron");

try {
  require('electron-reloader')(module);
} catch (_) {}

const additionalData = { myKey: 'futureGoal' }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit() // If a second one tries to start, kill it immediately
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // If someone tries to run a second instance, focus on the main window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 470,
    height: 617,
    x: 1950,
    y: 225,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      zoomFactor: 1.0
    }
  });

  win.loadFile(path.join(__dirname, 'mainPage', 'index.html'));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

win.webContents.on('did-finish-load', () => {
  win.webContents.setVisualZoomLevelLimits(1, 1);
});