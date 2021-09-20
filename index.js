#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')
const argv = minimist(process.argv.slice(2))

const cwd = process.cwd()
const log = msg => {
  return console.log(msg)
}
log.error = (msg, exc = 1) => {
  console.log(chalk.red(msg))
  exc !== 0 && process.exit(exc)
}
log.success = msg => {
  return console.log(chalk.green(msg))
}

async function create() {
  const distDir = argv._[0] || '.'
  const distPath = path.join(cwd, distDir)
  const distBasename = path.basename(distPath)

  log(`\nScaffolding project in ${distPath} ...\n`)

  await fs.ensureDir(distDir)
  const existDirs = await fs.readdir(distPath)
  if (existDirs.length) {
    log.error(`Error: directory "${distBasename}" not empty`)
  }

  const defaultTemplate = 'vue3-vite'
  const templateDir = argv['template'] || argv['t'] || defaultTemplate
  const templatePath = path.join(__dirname, `todo-${templateDir}`)
  const templateFiles = await fs.readdir(templatePath)
  const preRenameFiles = templateFiles.filter(file => file.startsWith('_'))

  for (const file of templateFiles.filter(f => f !== 'package.json')) {
    let targetPath = path.join(distPath, file)
    if (preRenameFiles.includes(file)) {
      targetPath = path.join(distPath, file.replace(/^_/, '.'))
    }
    await fs.copy(path.join(templatePath, file), targetPath)
  }

  const pkg = require(path.join(templatePath, 'package.json'))
  pkg.name = distBasename
  await fs.writeFile(path.join(distPath, 'package.json'), JSON.stringify(pkg, null, 2))

  log.success(`Done, now run:\n`)
  if (cwd !== distPath) {
    log.success(`  cd ${path.relative(cwd, distDir)}`)
  }
  log.success(`  npm install (or \'yarn\')`)
  log.success(`  npm run dev (or \'yarn dev\')\n`)
}

create().catch(e => {
  log.error(e.message)
})
