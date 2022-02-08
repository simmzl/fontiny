const fs = require('fs')
const archiver = require('archiver')
const extra = require('fs-extra')
const fontSpider = require('font-spider')
const { dialog } = require('electron')

const zipPath = getFontPath("source.zip")

function getFontPath(filename = "") {
  return `${__dirname}/../assets/font/${filename}` 
}

function getAssetsPath(filename = "") {
  return `${__dirname}/../assets/${filename}`
}

function writeFile(chars) {
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
        font-family: 'source';
        src: url('./font/source.eot');
        src:
          url('./font/source.eot?#font-spider') format('embedded-opentype'),
          url('./font/source.woff2') format('woff2'),
          url('./font/source.woff') format('woff'),
          url('./font/source.ttf') format('truetype'),
          url('./font/source.svg') format('svg');
        font-weight: normal;
        font-style: normal;
      }
  
      /*使用指定字体*/
      body {
        font-family: 'source';
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

async function downloadFile(win) {
  const res = await dialog.showSaveDialogSync(win, {
    filters: [],
    defaultPath: "dddd.zip"
  })
  if (res) extra.copyFileSync(zipPath, res)
}

async function zipFile() {
  // 第二步，创建可写流来写入数据
  const output = fs.createWriteStream(zipPath);// 将压缩包保存到当前项目的目录下，并且压缩包名为test.zip
  const archive = archiver('zip', {zlib: {level: 9}});// 设置压缩等级

  // 第三步，建立管道连接
  archive.pipe(output);

  // 第四步，压缩目录到压缩包中
  archive.directory(getFontPath(), false);

  // 第五步，完成压缩
  await archive.finalize();
}

module.exports = {
  getAssetsPath,
  getFontPath,
  zipFile,
  writeFile,
  downloadFile
}