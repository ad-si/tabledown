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
- Configuration options
	- Alignment


## Installation

```shell
npm install --save tabledown
```


## Usage

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
		price: 'decimal mark',
		quantity: 'center',
	},
	style: 'pipe', // other options: simple, multiline, grid,
	capitalizeHeader: true,
})

console.log(table.toString())
```

yields

```md
Table: Food
name     |  color | price | quantity
:--------|-------:|-------|:-------:
banana   | yellow | 3.23  |    2    
tomato   |    red | 2.67  |    6    
cucumber |  green | 5.82  |    4    
carrot   | orange | 3     |    9    
```