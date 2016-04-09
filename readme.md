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
		quantity: 'right',
	},
	style: 'pipe', // other options: simple, multiline, grid,
	capitalizeHeader: true,
})

console.log(table.toString())
```
