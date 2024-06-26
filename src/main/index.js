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
  getOriginFontPath,
  getZipPath,
  runServer
} = require("./utils");

const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require("electron");

let outputName = "";

const isDev = process.env.NODE_ENV === "development";
isDev &&
  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, "../../node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });

const isMac =  process.platform === 'darwin'

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 470,
    minWidth: 470,
    height: 680,
    minHeight: 657,
    title: "",
    titleBarStyle: isMac ? 'hiddenInset' : 'default',
    frame: !isMac,
    transparent: isMac,
    backgroundColor: isMac ? "#00000000" : "#fff",
    vibrancy: 'light',
    visualEffectState: "active",
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      webviewTag: true,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      contextIsolation: true,
      devTools: isDev
    },
  });

  let renderUrl = "";

  try {
    const server = await runServer(path.join(__dirname, '../renderer/out/'))
    renderUrl = `http://localhost:${server.address().port}`
  } catch (error) { }

  // isDev && mainWindow.webContents.openDevTools();

  isDev ? mainWindow.loadURL("http://localhost:3001/") : renderUrl ? mainWindow.loadURL(renderUrl) : mainWindow.loadFile(path.resolve(__dirname, "../renderer/out/index.html"));

  setMenu()
  setGlobalShortcut(mainWindow)

  ipcMain.handle("font-tiny-compress", (event, chars) => {
    (async () => {
      extra.emptyDirSync(getFontPath());
      extra.emptyDirSync(getZipPath());

      // 复制源字体文件到字体处理目录
      extra.copySync(getOriginFontPath(`${outputName}.ttf`), getFontPath(`${outputName}.ttf`));

      // 写入html文件
      writeFile(chars, outputName);

      // 压缩字体
      const webFonts = await fontSpider.spider([getFontPath("index.html")], {
        silent: false,
      });
      await fontSpider.compressor(webFonts, {
        backup: false
      });

      // 压缩字体包
      await zipFile();

      // 保存
      downloadFile(mainWindow, outputName);
    })()
  });

  ipcMain.handle("font-tiny-upload", (event, path, name) => {
    extra.emptyDirSync(getOriginFontPath());
    const nameArr = name.split(".");
    nameArr.pop();
    outputName = nameArr.join("");
    extra.copy(path, getOriginFontPath(`${outputName}.ttf`), function () {
      console.log("===>>> Upload file success");
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
        { label: 'Products crafted @yy && @simmzl' },
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
  Menu.setApplicationMenu(isMac ? Menu.buildFromTemplate(template) : null)
}

function setGlobalShortcut(mainWindow) {
  mainWindow.on('focus', () => {
    if (process.platform === 'darwin') {
      const contents = mainWindow.webContents
      globalShortcut.register('CommandOrControl+C', () => {
        contents.copy()
      })
      globalShortcut.register('CommandOrControl+V', () => {
        contents.paste()
      })
      globalShortcut.register('CommandOrControl+X', () => {
        contents.cut()
      })
      globalShortcut.register('CommandOrControl+A', () => {
        contents.selectAll()
      })
    }
  })
  mainWindow.on('blur', () => {
    globalShortcut.unregisterAll()
  })
}