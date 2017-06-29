import Tabledown from '../source/index'

const testConfig = {
  caption: 'Food',
  alignments: {
    name: 'left',
    color: 'right',
    price: 'decimal mark',
    quantity: 'center',
  },
  style: 'pipe',
}

const foodObjects = [
  {
    name: 'banana',
    color: 'yellow',
    price: 3.23,
    quantity: 2,
  },
  {
    name: 'tomato',
    color: 'red',
    price: 2.5,
    quantity: 6,
  },
  {
    name: 'cucumber',
    color: 'green',
    price: 5.82,
    quantity: 4,
  },
  {
    name: 'carrot',
    color: 'orange',
    price: 12,
    quantity: 9,
  }
]

const foodArrays = [
  ['name',     'color', 'price', 'quantity'],
  ['banana',   'yellow',  3.23,      2     ],
  ['tomato',   'red',     2.5 ,      6     ],
  ['cucumber', 'green',   5.82,      4     ],
  ['carrot',   'orange', 12,         9     ],
]

const expectedTable =
`Table: Food

name     |  color | price | quantity
:--------|-------:|-------|:-------:
banana   | yellow | 3.23  |    2
tomato   |    red | 2.5   |    6
cucumber |  green | 5.82  |    4
carrot   | orange | 12    |    9
`

const tableWithCustomHeaders =
`The Fruit | The Color | The Price in Euro | The Quantity
:---------|----------:|-------------------|:-----------:
banana    |    yellow | 3.23              |      2
tomato    |       red | 2.5               |      6
cucumber  |     green | 5.82              |      4
carrot    |    orange | 12                |      9
`

{
  const expection = 'Creates a table from an array of objects\n\n' +
    'Expect\n%s\nto equal\n%s'
  const config = Object.assign({}, testConfig, {data: foodObjects})
  const pipeTableFromObjects = new Tabledown(config).toString()
  console.assert(
    pipeTableFromObjects === expectedTable,
    expection,
    pipeTableFromObjects,
    expectedTable
  )
}

{
  const expection = 'Creates a table from an array of arrays\n\n' +
    'Expect\n%s\nto equal\n%s'
  const config = Object.assign({}, testConfig, {data: foodArrays})
  const pipeTableFromArrays = new Tabledown(config).toString()
  console.assert(
    pipeTableFromArrays === expectedTable,
    expection,
    pipeTableFromArrays,
    expectedTable
  )
}

{
  const expection = 'Capitalizes the table headers\n\n' +
    'Expect\n%s\nto equal\n%s'
  const config = Object.assign({}, testConfig, {
    data: foodObjects,
    capitalizeHeaders: true,
  })
  const tableString = new Tabledown(config).toString()
  const capitalizedTable = expectedTable.replace(
    'name     |  color | price | quantity',
    'Name     |  Color | Price | Quantity'
  )
  console.assert(
    tableString === capitalizedTable,
    expection,
    tableString,
    capitalizedTable
  )
}

{
  const expection = 'Rename the table headers\n\n' +
    'Expect\n%s\nto equal\n%s'
  const config = Object.assign({}, testConfig, {
    data: foodObjects,
    caption: null,
    headerTexts: {
      name: 'The Fruit',
      color: 'The Color',
      price: 'The Price in Euro',
      quantity: 'The Quantity',
    },
  })
  const tableString = new Tabledown(config).toString()
  console.assert(
    tableString === tableWithCustomHeaders,
    expection,
    tableString,
    tableWithCustomHeaders
  )
}

console.log('Core tests passed ✔')
