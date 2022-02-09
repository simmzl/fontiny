const path = require("path");
const devtools = require("electron-devtools-installer");
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

const { VUEJS3_DEVTOOLS } = devtools;
const { app, BrowserWindow, ipcMain } = require("electron");

// const isDev = process.argv.slice(1).some(val => val === '--dev');
const isDev = false;
let outputName = "";

// console.warn("=====>>>>", isDev, process.argv.slice(1))

isDev &&
  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, "../../node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      webviewTag: true,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      contextIsolation: true,
    },
  });

  isDev && mainWindow.webContents.openDevTools();

  isDev
    ? mainWindow.loadURL("http://localhost:3000/")
    : mainWindow.loadFile(
        path.resolve(__dirname, "../renderer/fontiny-app/dist/index.html")
      );

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
    isDev && devtools.default([VUEJS3_DEVTOOLS], {
      forceDownload: false,
    });
  }, 0);
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
