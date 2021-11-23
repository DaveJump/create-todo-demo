#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const prompts = require('prompts')

const cwd = process.cwd()
const log = (msg = '') => {
  return console.log(msg)
}
log.error = (msg = '', exc = 1) => {
  console.log(chalk.red(msg))
  exc !== 0 && process.exit(exc)
}
log.success = (msg = '') => {
  return console.log(chalk.green(msg))
}

async function create() {
  let distDir = argv._[0] || ''

  const defaultProjectName = distDir || 'todo-demo'

  const templateDir = argv['template'] || argv['t']

  const result = await prompts(
    [
      {
        type: distDir ? null : 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: state => {
          distDir = state.value.trim() || defaultProjectName
        }
      },
      {
        type: () => {
          return !fs.existsSync(distDir) || dirIsEmpty(distDir)
            ? null
            : 'confirm'
        },
        name: 'overwrite',
        message: () =>
          `${
            !path.relative(cwd, distDir)
              ? 'Current directory'
              : `Target directory ${distDir}`
          } is not empty, clean the directory and continue?`
      },
      {
        type: (_, { overwrite } = {}) => {
          if (overwrite === false) {
            throw new Error('✖ ' + 'Operation cancelled')
          }
          return null
        },
        name: 'overwriteChecker'
      },
      {
        type: () => {
          if (
            templateDir &&
            defaultTemplates.includes(withTemplatePrefix(templateDir))
          ) {
            return null
          }
          return 'select'
        },
        name: 'template',
        message: () =>
          !templateDir
            ? 'Select a template:'
            : `Template "${templateDir}" is not exist, select one from below:`,
        choices: defaultTemplates.map(tpl => ({
          title: tpl.replace('todo-', ''),
          value: tpl
        }))
      }
    ],
    {
      onCancel(e) {
        throw new Error('✖ ' + 'Operation cancelled')
      }
    }
  )

  const { overwrite, template } = result

  const distPath = path.join(cwd, distDir)

  if (overwrite) {
    fs.emptyDirSync(distPath)
  } else {
    fs.ensureDir(distPath)
  }

  log(`\nScaffolding project in ${distPath} ...\n`)

  const templatePath = path.join(
    __dirname,
    template || withTemplatePrefix(templateDir)
  )
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
  pkg.name = path.basename(distPath)
  await fs.writeFile(
    path.join(distPath, 'package.json'),
    JSON.stringify(pkg, null, 2)
  )

  log.success(`Done, now run:\n`)

  const relativePath = path.relative(cwd, distDir)
  if (relativePath) {
    log.success(`  cd ${relativePath}`)
  }

  const pkgInfo = pkgFromUserAgent()

  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  const targetManifest = require(path.resolve(cwd, relativePath, 'package.json'))
  let startScript = 'dev'
  if (targetManifest.scripts.start) {
    startScript = 'start'
  }

  switch (pkgManager) {
    case 'yarn':
      log.success(`  yarn`)
      log.success(`  yarn ${startScript}`)
      break
    default:
      log.success(`  ${pkgManager} install`)
      log.success(`  ${pkgManager} run ${startScript}`)
      break
  }
  log()
}

const defaultTemplates = fs
  .readdirSync(path.join(__dirname, './'))
  .filter(file => file.startsWith('todo-'))

function withTemplatePrefix(dirname) {
  return `todo-${dirname}`
}

function dirIsEmpty(path) {
  return fs.readdirSync(path).length === 0
}

function pkgFromUserAgent() {
  const info = process.env.npm_config_user_agent

  if (!info) return

  const pkgSpec = info.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')

  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

create().catch(e => {
  log.error(e.message)
})
