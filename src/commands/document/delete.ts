import { flags } from '@oclif/command'
import { Kommand } from '../../common'
import { kuzzleFlags, KuzzleSDK } from '../../support/kuzzle'

export default class DocumentGet extends Kommand {
  static description = 'Deletes one or multiple documents'

  static examples = [
    'kourou document:delete iot sensors g8GHEBDYO6CK4PxaDt',
    'kourou document:delete iot sensors --query \'{term: {type: "sigfox"}}\'',
  ]

  static flags = {
    help: flags.help(),
    query: flags.string({
      description: 'Query to delete matching documents (JS or JSON format)'
    }),
    editor: flags.boolean({
      description: 'Open an editor (EDITOR env variable) to edit the request before sending'
    }),
    ...kuzzleFlags
  }

  static args = [
    { name: 'index', description: 'Index name', required: true },
    { name: 'collection', description: 'Collection name', required: true },
    { name: 'id', description: 'Document ID' }
  ]

  async runSafe() {
    this.printCommand()

    const { args, flags: userFlags } = this.parse(DocumentGet)

    this.sdk = new KuzzleSDK(userFlags)
    await this.sdk.init(this.log)

    let request: any = {
      controller: 'document',
      index: args.index,
      collection: args.collection,
    }

    if (userFlags.query) {
      request.action = 'deleteByQuery'
    }
    else if (args.id) {
      request.action = 'delete'
      request.id = args.id
    }
    else if (userFlags.editor) {
      request.action = 'deleteByQuery'
      request.body = { query: {} }

      request = this.fromEditor(request, { json: true })
    }
    else {
      throw new Error('You must either provide an ID as an argument, the --query flag or the --editor flag')
    }

    const { result } = await this.sdk.query(request)

    if (request.action === 'delete') {
      this.logOk(`Successefully deleted ${args.id} document`)
    }
    else {
      this.logOk(`Successefully deleted ${result.ids.length} documents`)
    }
  }
}
