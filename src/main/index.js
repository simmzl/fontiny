const path = require("path");
const fs = require("fs");
const extra = require("fs-extra");
const fontSpider = require("font-spider");

const {
  zipFile,
  writeFile,
  downloadFile,
  getAssetsPath,
  getFontPath,
} = require("./utils");

const { app, BrowserWindow, ipcMain, Menu } = require("electron");

// const isDev = process.argv.slice(1).some(val => val === '--dev');
const isDev = false;
let outputName = "";

// console.warn("=====>>>>", isDev, process.argv.slice(1))

// isDev &&
//   require("electron-reload")(__dirname, {
//     electron: path.resolve(__dirname, "../../node_modules", ".bin", "electron"),
//     hardResetMethod: "exit",
//   });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 680,
    title: "",
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      webviewTag: true,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      contextIsolation: true,
      devTools: false
    },
  });

  isDev && mainWindow.webContents.openDevTools();

  // isDev
  //   ? mainWindow.loadURL("http://localhost:3000/")
  //   : 
    mainWindow.loadFile(
        path.resolve(__dirname, "../renderer/fontiny-app/dist/index.html")
      );
  
  setMenu()

  ipcMain.handle("font-tiny-compress", async (event, chars) => {
    // 写入html文件
    writeFile(chars, outputName);

    // 压缩字体
    const webFonts = await fontSpider.spider([getAssetsPath("index.html")], {
      silent: false,
    });
    await fontSpider.compressor(webFonts, {
      backup: false,
    });

    // 压缩字体包
    await zipFile();

    // 保存
    downloadFile(mainWindow, outputName);
  });

  ipcMain.handle("font-tiny-upload", (event, path, name) => {
    extra.emptyDirSync(getFontPath());
    const nameArr = name.split(".");
    nameArr.pop();
    outputName = nameArr.join("");
    extra.copy(path, getFontPath(`${outputName}.ttf`), function (err) {
      console.log("copy success!");
    });
  });
}

app.on("ready", () => {
  setTimeout(() => {
    createWindow();
  }, 0);
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function setMenu() {
  // 菜单模板设置
  const template = [
    {
      label: app.name,
      submenu: [
        { label: 'Code by @yy @simmzl' },
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ]

  // 加载菜单
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}