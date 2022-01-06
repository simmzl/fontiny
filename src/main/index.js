const path = require('path')
const ttt = require('electron-devtools-installer')
console.warn(ttt)
const { VUEJS_DEVTOOLS, VUEJS3_DEVTOOLS, REACT_DEVELOPER_TOOLS } = ttt
// import installExtension, { VUEJS_DEVTOOLS, VUEJS3_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  globalShortcut
} = require('electron')

// const electronReload = require('electron-reload')

// require('electron-reload')(__dirname, {
//   electron: require(path.join(__dirname, '/../../node_modules/electron'))
// });
require('electron-reload')(__dirname, {
  electron: path.resolve(__dirname, '../../node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
})


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      contextIsolation: true
    }
  })

  mainWindow.webContents.openDevTools()

  // mainWindow.loadFile(path.resolve(__dirname, '../renderer/index.html'))

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })

  globalShortcut.register('CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
    // mainWindow.webContents.toggleDevTools()
    setTimeout(() => {
      mainWindow.webContents.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', { enabled: true }).catch(err => {
        console.log('set fail')
      })
    }, 1000)
  })
  mainWindow.loadURL("http://localhost:3000/")

  // const contents = mainWindow.webContents
  // console.log(contents)

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })


}

app.on('ready', () => {
  setTimeout(() => {
    createWindow()
    ttt.default([VUEJS3_DEVTOOLS], { forceDownload: false })
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('Added Extension Error: ', err));
  }, 0)
})


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})