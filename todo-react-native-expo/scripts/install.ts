import { spawn } from 'child_process'
import path from 'path'

const pkgName = process.argv.slice(-1)[0]

function installPkgs() {
  if (pkgName === 'pods') {
    spawn('pod', ['install'], {
      stdio: 'inherit',
      cwd: path.resolve(process.cwd(), 'ios')
    })
  }
}

installPkgs()
