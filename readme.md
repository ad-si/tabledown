# Tabledown

Easily create markdown tables in your Javascript applications.


## Features

- Input data format agnostic
	- Array of arrays
	- Array of objects
- Support for several markdown flavors
	- Simple tables
	- Multiline tables
	- Grid tables
	- Pipe tables
- Column alignment
- Custom headers
- Optional caption


## Installation

```shell
npm install --save tabledown
```


## Usage

### Simple

```js
import Tabledown from 'tabledown'
const food = [
	{
		name: 'banana',
		color: 'yellow',
		price: 3.23,
		quantity: 2,
	},
	{
		name: 'tomato',
		color: 'red',
		price: 2.67,
		quantity: 6,
	}
]

const table = new Tabledown({data: food})

console.log(table.toString())
```

yields

```
name   |  color | price | quantity
-------|--------|-------|---------
banana | yellow | 3.23  |    2
tomato |    red | 2.67  |    6
```


### Extended

```js
import Tabledown from 'tabledown'
const food = [
	{
		name: 'banana',
		color: 'yellow',
		price: 3.23,
		quantity: 2,
	},
	{
		name: 'tomato',
		color: 'red',
		price: 2.67,
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
		price: 3,
		quantity: 9,
	}
]

const table = new Tabledown({
	caption: 'Food',
	data: food,
	alignments: {
		name: 'left',
		color: 'right',
		price: 'decimal mark', // Not yet implemented
		quantity: 'center',
	},
	headerTexts: {
		name: 'the Fruit',
		color: 'the Color',
		price: 'the Price (€)',
		quantity: 'the Quantity',
	},
	style: 'pipe', // or simple, multiline, grid (not yet implemented)
	capitalizeHeaders: true,
})

console.log(table.toString())
```

yields

```md
Table: Food

The Fruit | The Color | The Price (€) | The Quantity
:---------|----------:|---------------|:-----------:
banana    |    yellow | 3.23          |      2
tomato    |       red | 2.5           |      6
cucumber  |     green | 5.82          |      4
carrot    |    orange | 12            |      9
```

The data can also be provided as an array.
The first sub-array must contain the headers.

```js
const food = [
	['name',     'color', 'price', 'quantity'],
	['banana',   'yellow',  3.23,      2     ],
	['tomato',   'red',     2.5 ,      6     ],
	['cucumber', 'green',   5.82,      4     ],
	['carrot',   'orange', 12,         9     ],
]

const table = new Tabledown({data: food})
```
