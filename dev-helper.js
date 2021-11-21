// @ts-check

const fs = require('fs')
const path = require('path')
const glob = require('fast-glob').sync

function renameDotStartingFilesAtRoot() {
  const filePaths = glob('./todo-*/.*', {
    onlyFiles: true,
    dot: true
  })

  filePaths.forEach(filePath => {
    const toPath = filePath.replace(/^(.+(?<=\/))+(?:\.)(.+)/, '$1_$2')
    fs.renameSync(path.resolve(__dirname, filePath), path.resolve(__dirname, toPath))
  })
}

renameDotStartingFilesAtRoot()
