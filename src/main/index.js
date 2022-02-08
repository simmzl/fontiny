const path = require("path");
const devtools = require("electron-devtools-installer");
const fs = require("fs");
const extra = require("fs-extra");
const fontSpider = require("font-spider");

const { zipFile, writeFile, downloadFile, getAssetsPath, getFontPath } = require("./utils");

const { VUEJS3_DEVTOOLS } = devtools;
const { app, BrowserWindow, ipcMain } = require("electron");

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

  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL("http://localhost:3000/");

  ipcMain.handle("font-tiny", async (event, chars) => {
    // 写入html文件
    writeFile(chars);

    // 压缩字体
    const webFonts = await fontSpider.spider(
      [getAssetsPath("index.html")],
      {
        silent: false,
      }
    );
    await fontSpider.compressor(webFonts, {
      backup: false
    });

    // 压缩字体包
    await zipFile();

    // 保存
    downloadFile(mainWindow);
  });

  ipcMain.handle("font-tiny-upload", (event, path) => {
    console.warn(getFontPath())
    extra.emptyDirSync(getFontPath());
    extra.copy(path, getFontPath("source.ttf"), function (err) {
      console.log("copy success!");
    });
  });
}

app.on("ready", () => {
  setTimeout(() => {
    createWindow();
    devtools
      .default([VUEJS3_DEVTOOLS], {
        forceDownload: false,
      })
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("Added Extension Error: ", err));
  }, 0);
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
