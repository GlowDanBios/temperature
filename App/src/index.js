import {
  app,
  BrowserWindow
} from 'electron';

const pth = app.getAppPath();

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 500,
    autoHideMenuBar: true,
    icon: `${pth}/res/100.png`,
  });

  mainWindow.loadFile(`${pth}/src/index.html`);

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});