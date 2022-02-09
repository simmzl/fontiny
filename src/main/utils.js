const fs = require('fs')
const archiver = require('archiver')
const extra = require('fs-extra')
const fontSpider = require('font-spider')
const { dialog } = require('electron')

const zipPath = getAssetsPath("/zip/fontiny.zip")

function getFontPath(filename = "") {
  return `${__dirname}/../assets/font/${filename}` 
}

function getAssetsPath(filename = "") {
  return `${__dirname}/../assets/${filename}`
}

// 写入保留字体
function writeFile(chars, outputName) {
  // const file = path.resolve(__dirname, '../assets/index.html')
  const data = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
      @font-face {
        font-family: "${outputName}";
        src: url('./font/${outputName}.eot');
        src:
          url('./font/${outputName}.eot?#font-spider') format('embedded-opentype'),
          url('./font/${outputName}.woff2') format('woff2'),
          url('./font/${outputName}.woff') format('woff'),
          url('./font/${outputName}.ttf') format('truetype'),
          url('./font/${outputName}.svg') format('svg');
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

  fs.writeFileSync(getAssetsPath("index.html"), data, {
    encoding: 'utf8'
  })
  console.warn("writeFile done")
}

// 下载压缩包
async function downloadFile(win, outputName) {
  const res = await dialog.showSaveDialogSync(win, {
    filters: [],
    defaultPath: `${outputName}-fontiny.zip`
  })
  if (res) extra.copyFileSync(zipPath, res)
}

// 生成压缩包
function zipFile() {
  return new Promise((resolve, reject) => {
    // 创建可写流来写入数据
    const output = fs.createWriteStream(zipPath);// 将压缩包保存到当前项目的目录下
    const archive = archiver.create('zip', { zlib: { level: 9 } });// 设置压缩等级

    // 建立管道连接
    archive.pipe(output);

    // 压缩目录到压缩包中
    archive.directory(getFontPath(), false);

    output.on('finish', function() {
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