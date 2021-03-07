const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1520,
    minHeight: 800,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.setMenuBarVisibility(false);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
