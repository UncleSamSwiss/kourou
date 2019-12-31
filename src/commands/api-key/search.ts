import { flags } from '@oclif/command'
import { Kommand, printCliName } from '../../common'
import { kuzzleFlags, KuzzleSDK } from '../../kuzzle'

class ApiKeySearch extends Kommand {
  static description = 'List an user API Keys'

  static flags = {
    help: flags.help(),
    user: flags.string({
      char: 'u',
      description: 'User kuid',
      required: true
    }),
    filter: flags.string({
      description: 'Filter to match the API Key descriptions'
    }),
    ...kuzzleFlags
  }

  async run() {
    this.log('')
    this.log(`${printCliName()} - ${ApiKeySearch.description}`)
    this.log('')

    const { flags } = this.parse(ApiKeySearch)

    const sdk = new KuzzleSDK(flags)
    await sdk.init()

    const request = {
      controller: 'security',
      action: 'searchApiKeys',
      userId: flags.user,
      body: {},
      from: 0,
      size: 100
    }

    if (flags.filter) {
      request.body = {
        match: {
          description: flags.filter
        }
      }
    }

    try {
      const { result } = await sdk.query(request)

      this.log(`${result.total} API Keys found for user ${flags.user}`)

      if (result.total !== 0) {
        this.log('');
        for (const { _id, _source } of result.hits) {
          this.log(` - Key "${_id}"`)
          this.log(`    Description: ${_source.description}`)
          this.log(`    Expires at: ${_source.expiresAt}`)
        }
      }
    }
    catch (error) {
      this.logError(error.message)
    }
  }
}

export default ApiKeySearch