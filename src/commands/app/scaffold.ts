import path from 'path'
import fs from 'fs'

import { flags } from '@oclif/command'
import _ from 'lodash'

import { Kommand } from '../../common'
import { execute } from '../../support/execute'

const templatesDir = path.join(__dirname, '..', '..', 'templates');

export default class AppScaffold extends Kommand {
  static initSdk = false

  static description = 'Scaffold a new Kuzzle application'

  static flags = {
    help: flags.help(),
  }

  static args = [
    { name: 'name', description: 'Application name', required: true },
  ]

  async runSafe() {
    this.logInfo(`Scaffold a new Kuzzle application in ${this.args.name}/`)
    await execute('rm', '-rf', this.args.name)
    await execute('mkdir', this.args.name)

    await this.renderTemplates(`${templatesDir}/app-scaffold/ts`)

    this.logInfo('Installing latest Kuzzle version via NPM...')

    await execute('npm', 'install', 'kuzzle', { cwd: this.args.name })
    await execute('npm', 'install', { cwd: this.args.name })

    this.logOk(`Scaffolding complete. Start to develop you application in ./${this.args.name}/`)
  }

  async renderTemplates(directory: string) {
    const entries = fs.readdirSync(directory);

    for (const entry of entries) {
      const entryPath = `${directory}/${entry}`
      const entryDir = path.dirname(`${this.args.name}/${entryPath}`)
      const entryInfo = fs.statSync(entryPath)

      if (entryInfo.isDirectory()) {
        fs.mkdirSync(entryDir.replace(templatesDir, ''), { recursive: true })

        await this.renderTemplates(entryPath)
      }
      else if (entryInfo.isFile() || entryInfo.isSymbolicLink()) {
        const content = fs.readFileSync(entryPath, 'utf8')

        const compiled = _.template(content)
        const rendered = compiled({ appName: this.args.name })

        fs.writeFileSync(`${this.args.name}/${entryPath.replace(templatesDir, '')}`, rendered);
      }
      else {
        this.logInfo(`Skipped ${entryPath} because it's not a regular file`)
      }
    }
  }
}
