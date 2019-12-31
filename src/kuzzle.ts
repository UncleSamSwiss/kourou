import { Kuzzle, Http } from 'kuzzle-sdk'
import { flags } from '@oclif/command'

export const kuzzleFlags = {
  host: flags.string({
    char: 'h',
    description: 'Kuzzle server host',
    default: process.env.KUZZLE_HOST || 'localhost'
  }),
  port: flags.string({
    char: 'p',
    description: 'Kuzzle server port',
    default: process.env.KUZZLE_PORT || '7512'
  }),
  ssl: flags.boolean({
    description: 'Use SSL to connect to Kuzzle',
    default: Boolean(process.env.KUZZLE_SSL) || undefined
  }),
  username: flags.string({
    description: 'Kuzzle user',
    default: process.env.KUZZLE_USER || 'anonymous'
  }),
  password: flags.string({
    description: 'Kuzzle user password',
    default: process.env.KUZZLE_PASSWORD || undefined
  })
}
export class KuzzleSDK {
  private host: string
  private port: number
  private ssl: boolean
  private username: string
  private password: string
  public sdk: Kuzzle

  constructor(options: any) {
    this.host = options.host
    this.port = parseInt(options.port, 10)
    this.ssl = options.ssl || this.port === 443
    this.username = options.username
    this.password = options.password
  }

  public async init() {
    this.sdk = new Kuzzle(new Http(this.host, {
      port: this.port,
      sslConnection: this.ssl
    }))

    await this.sdk.connect();

    if (this.username !== 'anonymous') {
      await this.sdk.auth.login('local', {
        username: this.username,
        password: this.password
      })
    }
  }

  public query(request: any) {
    return this.sdk.query(request);
  }
}