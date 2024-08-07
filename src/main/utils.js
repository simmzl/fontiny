const fs = require('fs')
const archiver = require('archiver')
const extra = require('fs-extra')
const fontSpider = require('font-spider')
const { dialog, shell } = require('electron')
const express = require('express');
const path = require('path')

const zipPath = getZipPath("fontiny.zip")

function getOriginFontPath(filename = "") {
  extra.ensureDir(`${__dirname}/../dist/origin-font/`)
  return `${__dirname}/../dist/origin-font/${filename}`
}

function getFontPath(filename = "") {
  extra.ensureDir(`${__dirname}/../dist/font/`)
  return `${__dirname}/../dist/font/${filename}` 
}

function getAssetsPath(filename = "") {
  extra.ensureDir(`${__dirname}/../dist/`)
  return `${__dirname}/../dist/${filename}`
}

function getZipPath(filename = "") {
  extra.ensureDir(`${__dirname}/../dist/zip/`)
  return `${__dirname}/../dist/zip/${filename}`
}

function getStorePath(filename = "") {
  extra.ensureDir(`${__dirname}/../dist/store/`)
  return `${__dirname}/../dist/store/${filename}`
}

// 写入保留字体
function writeFile(chars, outputName) {
  const data = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fontiny</title>
    <style>
      @font-face {
        font-family: "${outputName}";
        src: url('./${outputName}.eot');
        src:
          url('./${outputName}.eot') format('embedded-opentype'),
          url('./${outputName}.woff2') format('woff2'),
          url('./${outputName}.woff') format('woff'),
          url('./${outputName}.ttf') format('truetype'),
          url('./${outputName}.svg') format('svg');
        font-weight: normal;
        font-style: normal;
      }

      /*使用指定字体*/
      body {
        font-family: '${outputName}';
        white-space: pre-line;
      }
    </style>
  </head>
  <body>
  ${chars}
  </body>
</html>`

  fs.writeFileSync(getFontPath("index.html"), data, {
    encoding: 'utf8'
  })
  console.warn("===>>> Write file index.html success")
}

// 下载压缩包
async function downloadFile(win, outputName) {
  const res = await dialog.showSaveDialogSync(win, {
    filters: [],
    defaultPath: `${outputName}-fontiny.zip`
  })
  if (res) {
    extra.copyFileSync(zipPath, res)
    shell.openPath(path.dirname(res))
  }

  console.warn("===>>> Download file success")
}

// 生成压缩包
function zipFile() {
  return new Promise((resolve, reject) => {
    // 创建可写流来写入数据
    const output = fs.createWriteStream(zipPath);
    const archive = archiver.create('zip', { zlib: { level: 9 } }); // 设置压缩等级

    // 建立管道连接
    archive.pipe(output);

    // 压缩目录到压缩包中
    archive.directory(getFontPath(), false);

    output.on('finish', function() {
      console.warn("===>>> Zip file success")
      resolve()
    });

    output.on('error', function(err) {
      reject()
    });

    // 完成压缩
    archive.finalize();
  })
}

function runServer(filePath) {
  return new Promise((resolve, reject) => {
    const app = express();
    // 设置静态文件目录
    app.use(express.static(filePath));
    const server = app.listen(0, () => {
      console.log(`Local server is running on http://localhost:${server.address().port}`);
      resolve(server);
    });
  })
}

module.exports = {
  getAssetsPath,
  getFontPath,
  zipFile,
  writeFile,
  downloadFile,
  getOriginFontPath,
  getZipPath,
  runServer,
  getStorePath
}