import { flags } from '@oclif/command'
import * as _ from 'lodash'
import * as fs from 'fs'
import stripComments from 'strip-json-comments'

import { Kommand } from '../../common'

export class ConfigKeyDiff extends Kommand {
  static description = 'Returns differences between the keys of two Kuzzle configuration files (kuzzlerc)'

  static examples = [
    'kourou config:key-diff config/local/kuzzlerc config/production/kuzzlerc'
  ]

  static flags = {
    strict: flags.boolean({
      description: 'Exit with an error if differences are found',
      default: false
    }),
  }

  static args = [
    { name: 'first', description: 'First configuration file', required: true },
    { name: 'second', description: 'Second configuration file', required: true },
  ]

  async runSafe() {
    const { args, flags: userFlags } = this.parse(ConfigKeyDiff)

    if (!fs.existsSync(args.first)) {
      throw new Error(`File "${args.first}" does not exists`)
    }

    if (!fs.existsSync(args.second)) {
      throw new Error(`File "${args.second}" does not exists`)
    }

    const first = JSON.parse(stripComments(fs.readFileSync(args.first, 'utf8')))
    const second = JSON.parse(stripComments(fs.readFileSync(args.second, 'utf8')))

    const changes = this._keyChanges(first, second)

    if (_.isEmpty(changes)) {
      this.logOk('No differences between keys in the provided configurations')
      return
    }

    this.logInfo('Found differences between keys in the provided configurations. In the second file:')

    for (const [path, change] of Object.entries(changes)) {
      this.log(` - key "${path}" ${change}`)
    }

    if (userFlags.strict) {
      throw new Error('Provided configuration contains different keys')
    }
  }

  // Returns path who had changed between two objects (inspired by https://gist.github.com/Yimiprod/7ee176597fef230d1451)
  _keyChanges(base: any, object: any) {
    const changes: any = {};

    function walkObject(base: any, object: any, path = '') {
      for (const key of Object.keys(base)) {
        const currentPath = path === ''
          ? key
          : `${path}.${key}`;

        if (object[key] === undefined) {
          changes[currentPath] = 'was removed';
        }
      }

      for (const [key, value] of Object.entries(object)) {
        const currentPath = Array.isArray(object)
          ? path + `[${key}]`
          : path === ''
            ? key
            : `${path}.${key}`;

        if (base[key] === undefined) {
          changes[currentPath] = 'was added';
        }
        else if (value !== base[key]) {
          if (typeof value === 'object' && typeof base[key] === 'object') {
            walkObject(base[key], value, currentPath)
          }
          else {
            changes[currentPath] = `value is "${object[key]}" and was "${base[key]}"`;
          }
        }
      }
    }

    walkObject(base, object);

    return changes
  }
}
