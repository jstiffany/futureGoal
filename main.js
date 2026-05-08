const path = require('path');

const { app, BrowserWindow } = require("electron");

app.commandLine.appendSwitch('enable-features', 'OverlayScrollbar')

try {
  require('electron-reloader')(module);
} catch (_) {}

const additionalData = { myKey: 'futureGoal' }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
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

  mainWindow.loadFile(path.join(__dirname, 'mainPage', 'index.html'));
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
