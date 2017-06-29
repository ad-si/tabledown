import assert from 'assert'

const childProcess = require('child_process')
const command =
  `echo '[{"name": "John", "age": 32}, {"name": "Anna", "age": 27}]' \\
    | cli/cli.js`

const expectedTable =
`name | age
-----|----
John | 32
Anna | 27
`
const table = childProcess.execSync(command)
  .toString()

assert(
  table === expectedTable,
  'Expected\n%s\nto be equal to\n%s\n',
  table,
  expectedTable
)

console.info('Command line interface test passed ✔')
