const fs = require('fs')
const archiver = require('archiver')
const extra = require('fs-extra')
const fontSpider = require('font-spider')
const { dialog } = require('electron')

const zipPath = getZipPath("fontiny.zip")

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
  if (res) extra.copyFileSync(zipPath, res)
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

module.exports = {
  getAssetsPath,
  getFontPath,
  zipFile,
  writeFile,
  downloadFile
}