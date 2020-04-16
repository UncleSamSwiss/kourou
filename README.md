# kourou

The CLI that helps you manage your Kuzzle instances.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/kourou.svg)](https://npmjs.org/package/kourou)
[![Downloads/week](https://img.shields.io/npm/dw/kourou.svg)](https://npmjs.org/package/kourou)
[![License](https://img.shields.io/npm/l/kourou.svg)](https://github.com/kuzzleio/kourou/blob/master/package.json)

<!-- toc -->
* [kourou](#kourou)
* [Usage](#usage)
* [Commands](#commands)
* [Where does this weird name comes from?](#where-does-this-weird-name-comes-from)
<!-- tocstop -->

:warning: This project is currently in beta and breaking changes may occur until the 1.0.0

# Usage

<!-- usage -->
```sh-session
$ npm install -g kourou
$ kourou COMMAND
running command...
$ kourou (-v|--version|version)
kourou/0.11.0 linux-x64 node-v12.16.0
$ kourou --help [COMMAND]
USAGE
  $ kourou COMMAND
...
```
<!-- usagestop -->

## Connect and authenticate to Kuzzle API

Commands that needs to send requests to Kuzzle API can specify the Kuzzle server address and authentication informations.

By command line:
```
  -h, --host=host                [default: localhost] Kuzzle server host
  -p, --port=port                [default: 7512] Kuzzle server port
  --username=username            [default: anonymous] Kuzzle user
  --password=password            Kuzzle user password
  --ssl                          [default: true for port 443] Use SSL to connect to Kuzzle
```

By environment variables:
```
  KUZZLE_HOST                [default: localhost] Kuzzle server host
  KUZZLE_PORT                [default: 7512] Kuzzle server port
  KUZZLE_USERNAME            [default: anonymous] Kuzzle user
  KUZZLE_PASSWORD            Kuzzle user password
  KUZZLE_SSL                 Use SSL to connect to Kuzzle
```

# Commands

<!-- commands -->
* [`kourou api-key:check TOKEN`](#kourou-api-keycheck-token)
* [`kourou api-key:create USER`](#kourou-api-keycreate-user)
* [`kourou api-key:delete USER ID`](#kourou-api-keydelete-user-id)
* [`kourou api-key:search USER`](#kourou-api-keysearch-user)
* [`kourou collection:create INDEX COLLECTION`](#kourou-collectioncreate-index-collection)
* [`kourou collection:export INDEX COLLECTION`](#kourou-collectionexport-index-collection)
* [`kourou collection:import PATH`](#kourou-collectionimport-path)
* [`kourou document:create INDEX COLLECTION`](#kourou-documentcreate-index-collection)
* [`kourou document:get INDEX COLLECTION ID`](#kourou-documentget-index-collection-id)
* [`kourou document:search INDEX COLLECTION`](#kourou-documentsearch-index-collection)
* [`kourou es:get INDEX ID`](#kourou-esget-index-id)
* [`kourou es:insert INDEX`](#kourou-esinsert-index)
* [`kourou es:list-index`](#kourou-eslist-index)
* [`kourou file:decrypt FILE`](#kourou-filedecrypt-file)
* [`kourou file:encrypt FILE`](#kourou-fileencrypt-file)
* [`kourou file:test FILE`](#kourou-filetest-file)
* [`kourou help [COMMAND]`](#kourou-help-command)
* [`kourou import PATH`](#kourou-import-path)
* [`kourou index:export INDEX`](#kourou-indexexport-index)
* [`kourou index:import PATH`](#kourou-indeximport-path)
* [`kourou instance:logs`](#kourou-instancelogs)
* [`kourou instance:spawn`](#kourou-instancespawn)
* [`kourou profile:export`](#kourou-profileexport)
* [`kourou profile:import PATH`](#kourou-profileimport-path)
* [`kourou query CONTROLLER:ACTION`](#kourou-query-controlleraction)
* [`kourou role:export`](#kourou-roleexport)
* [`kourou role:import PATH`](#kourou-roleimport-path)
* [`kourou vault:add SECRETS-FILE KEY VALUE`](#kourou-vaultadd-secrets-file-key-value)
* [`kourou vault:decrypt FILE`](#kourou-vaultdecrypt-file)
* [`kourou vault:encrypt FILE`](#kourou-vaultencrypt-file)
* [`kourou vault:show SECRETS-FILE KEY`](#kourou-vaultshow-secrets-file-key)
* [`kourou vault:test SECRETS-FILE`](#kourou-vaulttest-secrets-file)

## `kourou api-key:check TOKEN`

Checks an API key validity

```
USAGE
  $ kourou api-key:check TOKEN

ARGUMENTS
  TOKEN  API key token

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)

EXAMPLE
  kourou api-key:check eyJhbG...QxfQrc
```

_See code: [src/commands/api-key/check.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/api-key/check.ts)_

## `kourou api-key:create USER`

Creates a new API Key for a user

```
USAGE
  $ kourou api-key:create USER

ARGUMENTS
  USER  User kuid

OPTIONS
  -d, --description=description  (required) API Key description
  -h, --host=host                [default: localhost] Kuzzle server host
  -p, --port=port                [default: 7512] Kuzzle server port
  --expire=expire                [default: -1] API Key validity
  --help                         show CLI help
  --id=id                        API Key unique ID
  --password=password            Kuzzle user password
  --ssl                          Use SSL to connect to Kuzzle
  --username=username            [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/api-key/create.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/api-key/create.ts)_

## `kourou api-key:delete USER ID`

Deletes an API key.

```
USAGE
  $ kourou api-key:delete USER ID

ARGUMENTS
  USER  User kuid
  ID    API Key unique ID

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)

EXAMPLE
  kourou vault:delete sigfox-gateway 1k-BF3EBjsXdvA2PR8x
```

_See code: [src/commands/api-key/delete.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/api-key/delete.ts)_

## `kourou api-key:search USER`

Lists a user's API Keys.

```
USAGE
  $ kourou api-key:search USER

ARGUMENTS
  USER  User kuid

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --filter=filter      Filter to match the API Key descriptions
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/api-key/search.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/api-key/search.ts)_

## `kourou collection:create INDEX COLLECTION`

Creates a collection

```
USAGE
  $ kourou collection:create INDEX COLLECTION

ARGUMENTS
  INDEX       Index name
  COLLECTION  Collection name

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port

  --body=body          [default: {}] Collection mappings and settings in JS or JSON format. Will be read from STDIN if
                       available

  --help               show CLI help

  --password=password  Kuzzle user password

  --ssl                Use SSL to connect to Kuzzle

  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/collection/create.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/collection/create.ts)_

## `kourou collection:export INDEX COLLECTION`

Exports a collection (JSONL format)

```
USAGE
  $ kourou collection:export INDEX COLLECTION

ARGUMENTS
  INDEX       Index name
  COLLECTION  Collection name

OPTIONS
  -h, --host=host          [default: localhost] Kuzzle server host
  -p, --port=port          [default: 7512] Kuzzle server port
  --batch-size=batch-size  [default: 2000] Maximum batch size (see limits.documentsFetchCount config)
  --editor                 Open an editor (EDITOR env variable) to edit the query before sending
  --help                   show CLI help
  --password=password      Kuzzle user password
  --path=path              Dump root directory
  --query=query            [default: {}] Only dump documents matching the query (JS or JSON format)
  --ssl                    Use SSL to connect to Kuzzle
  --username=username      [default: anonymous] Kuzzle username (local strategy)

EXAMPLES
  kourou collection:export nyc-open-data yellow-taxi
  kourou collection:export nyc-open-data yellow-taxi --query '{ term: { city: "Saigon" } }'
```

_See code: [src/commands/collection/export.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/collection/export.ts)_

## `kourou collection:import PATH`

Imports a collection

```
USAGE
  $ kourou collection:import PATH

ARGUMENTS
  PATH  Dump directory path

OPTIONS
  -h, --host=host          [default: localhost] Kuzzle server host
  -p, --port=port          [default: 7512] Kuzzle server port
  --batch-size=batch-size  [default: 200] Maximum batch size (see limits.documentsWriteCount config)
  --collection=collection  If set, override the collection destination name
  --help                   show CLI help
  --index=index            If set, override the index destination name
  --no-mappings            Skip collection mappings
  --password=password      Kuzzle user password
  --ssl                    Use SSL to connect to Kuzzle
  --username=username      [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/collection/import.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/collection/import.ts)_

## `kourou document:create INDEX COLLECTION`

Creates a document

```
USAGE
  $ kourou document:create INDEX COLLECTION

ARGUMENTS
  INDEX       Index name
  COLLECTION  Collection name

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --body=body          [default: {}] Document body in JS or JSON format. Will be read from STDIN if available
  --help               show CLI help
  --id=id              Optional document ID
  --password=password  Kuzzle user password
  --replace            Replaces the document if it already exists
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)

EXAMPLES
  kourou document:create iot sensors --body '{network: "sigfox"}'
  kourou document:create iot sensors < document.json
```

_See code: [src/commands/document/create.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/document/create.ts)_

## `kourou document:get INDEX COLLECTION ID`

Gets a document

```
USAGE
  $ kourou document:get INDEX COLLECTION ID

ARGUMENTS
  INDEX       Index name
  COLLECTION  Collection name
  ID          Document ID

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/document/get.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/document/get.ts)_

## `kourou document:search INDEX COLLECTION`

Searches for documents

```
USAGE
  $ kourou document:search INDEX COLLECTION

ARGUMENTS
  INDEX       Index name
  COLLECTION  Collection name

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --editor             Open an editor (EDITOR env variable) to edit the request before sending
  --from=from          Optional offset
  --help               show CLI help
  --password=password  Kuzzle user password
  --query=query        [default: {}] Query in JS or JSON format.
  --scroll=scroll      Optional scroll TTL
  --size=size          Optional page size
  --sort=sort          [default: {}] Sort in JS or JSON format.
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)

EXAMPLES
  kourou document:search iot sensors --query '{ term: { name: "corona" } }'
  kourou document:search iot sensors --editor
```

_See code: [src/commands/document/search.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/document/search.ts)_

## `kourou es:get INDEX ID`

Gets a document from ES

```
USAGE
  $ kourou es:get INDEX ID

ARGUMENTS
  INDEX  ES Index name
  ID     Document ID

OPTIONS
  -h, --host=host  [default: localhost] Elasticsearch server host
  -p, --port=port  [default: 9200] Elasticsearch server port
  --help           show CLI help
```

_See code: [src/commands/es/get.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/es/get.ts)_

## `kourou es:insert INDEX`

Inserts a document directly into ES (will replace if exists)

```
USAGE
  $ kourou es:insert INDEX

ARGUMENTS
  INDEX  ES Index name

OPTIONS
  -h, --host=host  [default: localhost] Elasticsearch server host
  -p, --port=port  [default: 9200] Elasticsearch server port
  --body=body      [default: {}] Document body in JSON
  --help           show CLI help
  --id=id          Document ID
```

_See code: [src/commands/es/insert.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/es/insert.ts)_

## `kourou es:list-index`

Lists available ES indexes

```
USAGE
  $ kourou es:list-index

OPTIONS
  -g, --grep=grep  Match output with pattern
  -h, --host=host  [default: localhost] Elasticsearch server host
  -p, --port=port  [default: 9200] Elasticsearch server port
  --help           show CLI help
```

_See code: [src/commands/es/list-index.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/es/list-index.ts)_

## `kourou file:decrypt FILE`

Decrypts an encrypted file.

```
USAGE
  $ kourou file:decrypt FILE

ARGUMENTS
  FILE  Encrypted file

OPTIONS
  -f, --force                    Overwrite the output file if it already exists
  -o, --output-file=output-file  Output file (default: remove ".enc")
  --vault-key=vault-key          Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLES
  kourou file:decrypt books/cryptonomicon.txt.enc --vault-key <vault-key>
  kourou file:decrypt books/cryptonomicon.txt.enc -o books/cryptonomicon.txt --vault-key <vault-key>
```

_See code: [src/commands/file/decrypt.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/file/decrypt.ts)_

## `kourou file:encrypt FILE`

Encrypts an entire file.

```
USAGE
  $ kourou file:encrypt FILE

ARGUMENTS
  FILE  Filename

OPTIONS
  -f, --force                    Overwrite the output file if it already exists
  -o, --output-file=output-file  Output file (default: <filename>.enc)
  --vault-key=vault-key          Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLES
  kourou file:encrypt books/cryptonomicon.txt --vault-key <vault-key>
  kourou file:encrypt books/cryptonomicon.txt -o books/cryptonomicon.txt.enc --vault-key <vault-key>
```

_See code: [src/commands/file/encrypt.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/file/encrypt.ts)_

## `kourou file:test FILE`

Tests if an encrypted file can be decrypted.

```
USAGE
  $ kourou file:test FILE

ARGUMENTS
  FILE  Encrypted file

OPTIONS
  --vault-key=vault-key  Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLE
  kourou file:test books/cryptonomicon.txt.enc --vault-key <vault-key>
```

_See code: [src/commands/file/test.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/file/test.ts)_

## `kourou help [COMMAND]`

display help for kourou

```
USAGE
  $ kourou help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `kourou import PATH`

Recursively imports dump files from a root directory

```
USAGE
  $ kourou import PATH

ARGUMENTS
  PATH  Root directory containing dumps

OPTIONS
  -h, --host=host          [default: localhost] Kuzzle server host
  -p, --port=port          [default: 7512] Kuzzle server port
  --batch-size=batch-size  [default: 200] Maximum batch size (see limits.documentsWriteCount config)
  --help                   show CLI help
  --password=password      Kuzzle user password
  --ssl                    Use SSL to connect to Kuzzle
  --username=username      [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/import.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/import.ts)_

## `kourou index:export INDEX`

Exports an index (JSONL format)

```
USAGE
  $ kourou index:export INDEX

ARGUMENTS
  INDEX  Index name

OPTIONS
  -h, --host=host          [default: localhost] Kuzzle server host
  -p, --port=port          [default: 7512] Kuzzle server port
  --batch-size=batch-size  [default: 2000] Maximum batch size (see limits.documentsFetchCount config)
  --help                   show CLI help
  --password=password      Kuzzle user password
  --path=path              Dump root directory
  --ssl                    Use SSL to connect to Kuzzle
  --username=username      [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/index/export.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/index/export.ts)_

## `kourou index:import PATH`

Imports an index

```
USAGE
  $ kourou index:import PATH

ARGUMENTS
  PATH  Dump directory or file

OPTIONS
  -h, --host=host          [default: localhost] Kuzzle server host
  -p, --port=port          [default: 7512] Kuzzle server port
  --batch-size=batch-size  [default: 200] Maximum batch size (see limits.documentsWriteCount config)
  --help                   show CLI help
  --index=index            If set, override the index destination name
  --no-mappings            Skip collections mappings
  --password=password      Kuzzle user password
  --ssl                    Use SSL to connect to Kuzzle
  --username=username      [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/index/import.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/index/import.ts)_

## `kourou instance:logs`

Displays the logs of a running Kuzzle

```
USAGE
  $ kourou instance:logs

OPTIONS
  -f, --follow             Follow log output
  -i, --instance=instance  Kuzzle instance name
```

_See code: [src/commands/instance/logs.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/instance/logs.ts)_

## `kourou instance:spawn`

Spawn a new Kuzzle instance

```
USAGE
  $ kourou instance:spawn

OPTIONS
  -v, --version=version  [default: 2] Core-version of the instance to spawn
  --check                Check prerequisite before running Kuzzle
  --help                 show CLI help
```

_See code: [src/commands/instance/spawn.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/instance/spawn.ts)_

## `kourou profile:export`

Exports profiles

```
USAGE
  $ kourou profile:export

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --path=path          [default: profiles] Dump directory
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/profile/export.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/profile/export.ts)_

## `kourou profile:import PATH`

Imports profiles

```
USAGE
  $ kourou profile:import PATH

ARGUMENTS
  PATH  Dump file

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/profile/import.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/profile/import.ts)_

## `kourou query CONTROLLER:ACTION`

Executes an API query

```
USAGE
  $ kourou query CONTROLLER:ACTION

ARGUMENTS
  CONTROLLER:ACTION  Controller and action (eg: "server:now")

OPTIONS
  -a, --arg=arg        Additional argument. Repeatable. (e.g. "-a refresh=wait_for")
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --body=body          [default: {}] Request body in JS or JSON format. Will be read from STDIN if available.
  --editor             Open an editor (EDITOR env variable) to edit the request before sending
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)

EXAMPLES
  kourou query document:get --arg index=iot --arg collection=sensors --arg _id=sigfox-42
  kourou query collection:create --arg index=iot --arg collection=sensors --body '{dynamic: "strict"}'
  kourou query admin:loadMappings < mappings.json
  echo '{name: "Aschen"}' | kourou query document:create --arg index=iot --arg collection=sensors
```

_See code: [src/commands/query.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/query.ts)_

## `kourou role:export`

Exports roles

```
USAGE
  $ kourou role:export

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --path=path          [default: roles] Dump directory
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/role/export.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/role/export.ts)_

## `kourou role:import PATH`

Import roles

```
USAGE
  $ kourou role:import PATH

ARGUMENTS
  PATH  Dump file

OPTIONS
  -h, --host=host      [default: localhost] Kuzzle server host
  -p, --port=port      [default: 7512] Kuzzle server port
  --help               show CLI help
  --password=password  Kuzzle user password
  --ssl                Use SSL to connect to Kuzzle
  --username=username  [default: anonymous] Kuzzle username (local strategy)
```

_See code: [src/commands/role/import.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/role/import.ts)_

## `kourou vault:add SECRETS-FILE KEY VALUE`

Adds an encrypted key to a secrets file (See: https://github.com/kuzzleio/kuzzle-vault/)

```
USAGE
  $ kourou vault:add SECRETS-FILE KEY VALUE

ARGUMENTS
  SECRETS-FILE  Encrypted secrets file
  KEY           Path to the key (lodash style)
  VALUE         Value to encrypt

OPTIONS
  --vault-key=vault-key  Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLE
  kourou vault:add config/secrets.enc.json aws.s3.keyId b61e267676660c314b006b06 --vault-key <vault-key>
```

_See code: [src/commands/vault/add.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/vault/add.ts)_

## `kourou vault:decrypt FILE`

Decrypts an entire secrets file. (see https://github.com/kuzzleio/kuzzle-vault/)

```
USAGE
  $ kourou vault:decrypt FILE

ARGUMENTS
  FILE  File containing encrypted secrets

OPTIONS
  -f, --force                    Overwrite the output file if it already exists
  -o, --output-file=output-file  Output file (default: remove ".enc")
  --vault-key=vault-key          Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLES
  kourou vault:decrypt config/secrets.enc.json --vault-key <vault-key>
  kourou vault:decrypt config/secrets.enc.json -o config/secrets.json --vault-key <vault-key>
```

_See code: [src/commands/vault/decrypt.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/vault/decrypt.ts)_

## `kourou vault:encrypt FILE`

Encrypts an entire secrets file. (see https://github.com/kuzzleio/kuzzle-vault/)

```
USAGE
  $ kourou vault:encrypt FILE

ARGUMENTS
  FILE  File containing unencrypted secrets

OPTIONS
  -f, --force                    Overwrite the output file if it already exists
  -o, --output-file=output-file  Output file (default: <file>.enc.json)
  --vault-key=vault-key          Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLES
  kourou vault:encrypt config/secrets.json --vault-key <vault-key>
  kourou vault:encrypt config/secrets.json -o config/secrets_prod.enc.json --vault-key <vault-key>
```

_See code: [src/commands/vault/encrypt.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/vault/encrypt.ts)_

## `kourou vault:show SECRETS-FILE KEY`

Prints an encrypted key from a secrets file. (see https://github.com/kuzzleio/kuzzle-vault/)

```
USAGE
  $ kourou vault:show SECRETS-FILE KEY

ARGUMENTS
  SECRETS-FILE  Encrypted secrets file
  KEY           Path to the key (lodash style)

OPTIONS
  --vault-key=vault-key  Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLE
  kourou vault:show config/secrets.enc.json aws.s3.secretKey --vault-key <vault-key>
```

_See code: [src/commands/vault/show.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/vault/show.ts)_

## `kourou vault:test SECRETS-FILE`

Tests if an encrypted secrets file can be decrypted. (see https://github.com/kuzzleio/kuzzle-vault/)

```
USAGE
  $ kourou vault:test SECRETS-FILE

ARGUMENTS
  SECRETS-FILE  Encrypted secrets file

OPTIONS
  --vault-key=vault-key  Kuzzle Vault Key (or KUZZLE_VAULT_KEY)

EXAMPLE
  kourou vault:test config/secrets.enc.json --vault-key <vault-key>
```

_See code: [src/commands/vault/test.ts](https://github.com/kuzzleio/kourou/blob/v0.11.0/src/commands/vault/test.ts)_
<!-- commandsstop -->

# Where does this weird name comes from?

We liked the idea that this CLI is like a launchpad for the Kuzzle rocket. The place where you launch and pilot your Kuzzle instance. The place where the European Space Agency launches their rockets is in the country near the city of [Kourou](https://www.wikiwand.com/en/Kourou), in French Guiana, so we liked the idea that the Kuzzle rockets would take off from there.
