import { flags } from '@oclif/command'
import { Kommand } from '../../common'
import { kuzzleFlags, KuzzleSDK } from '../../support/kuzzle'
import cli from 'cli-ux'
import * as _ from 'lodash'

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
    'batch-size': flags.string({
      description: 'Maximum batch size (see limits.documentsWriteCount config)',
      default: '200'
    }),
    'dry-run': flags.boolean({
      description: 'Only print the number of matching documents and their IDs'
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

    const singleDelete = Boolean(args.id)

    const index = args.index
    const collection = args.collection

    // try to read stdin
    const stdin = await this.fromStdin()

    let rawQuery: any = stdin ? stdin : userFlags.query
    let query = this.parseJs(rawQuery)

    if (_.isEmpty(query) && !args.id) {
      throw new Error('You must either provide an ID as an argument ar the --query flag or a query from STDIN')
    }

    if (!singleDelete && !query.query) {
      query = { query }
    }

    if (userFlags['dry-run']) {
      if (singleDelete) {
        const exists = await this.sdk.document.exists(index, collection, args.id)

        this.logOk(`${exists ? 1 : 0} document matching`)
      }
      else {
        const count = await this.sdk.document.count(index, collection, query)

        this.logOk(`${count} documents matching`)
      }
    }
    else {
      if (singleDelete) {
        await this.sdk.document.delete(index, collection, args.id)

        this.logOk('Successfully deleted 1 document')
      }
      else {

        const options = {
          scroll: '10s',
          size: userFlags['batch-size']
        }

        let result = await this.sdk.document.search(index, collection, query, options)

        const progressBar = cli.progress({
          format: `Deleting matching documents |{bar}| {percentage}% || {value}/{total} documents`
        })
        progressBar.start(result.total, 0)

        let total;
        while (result) {
          const ids = result.hits.map((hit: any) => hit._id)

          await this.sdk.document.mDelete(index, collection, ids)

          progressBar.update(result.fetched)

          total = result.total

          result = await result.next()
        }

        progressBar.stop()

        this.logOk(`Successfully deleted ${total} documents`)
      }
    }
  }

}
