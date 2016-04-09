const styles = {
	pipe: {
		columnSeparator: '|',
	},
}

function createHeaderFields (data) {
	return Object.keys(
		data.reduce(
			(object, current) => {
				Object.keys(current)
					.forEach(key => object[key] = true)
				return object
			},
			{}
		)
	)
}

export default class Tabledown {
	constructor (
		{
			data = [],
			style = 'pipe',
			caption,
			alignments = {},
		} = {}
	) {
		this._headerFields = createHeaderFields(data)
		this._maxFieldLengths = data.reduce(
			(maxFieldLengths, task) => {
				this._headerFields.forEach(field => {
					if (task.hasOwnProperty(field)) {
						let fieldLength = String(task[field]).length

						if (!maxFieldLengths[field])
							maxFieldLengths[field] = 0

						if (fieldLength > maxFieldLengths[field]) {
							maxFieldLengths[field] = fieldLength
						}
					}
				})
				return maxFieldLengths
			},
			this._headerFields.reduce(
				(headerFieldLength, field) => {
					headerFieldLength[field] = String(field).length
					return headerFieldLength
				},
				{}
			)
		)
		this._data = data
		this._style = style
		this._alignments = alignments
		this.caption = caption
	}

	get string () {
		let tableString = ''

		if (this.caption) {
			tableString += `Table: ${this.caption}\n`
		}

		const paddedHeaderFields = this._headerFields.map(field => {
			const padding = ' '
				.repeat(this._maxFieldLengths[field] - String(field).length)
			return field + padding
		})
		const tableDataSeparator = ' ' +
			styles[this._style].columnSeparator +
			' '

		this._data = this._data.map(task => {
			this._headerFields.forEach((field, index) => {
				if (task.hasOwnProperty(field)) {
					let fieldLength = String(task[field]).length
					task[field] += ' '
						.repeat(this._maxFieldLengths[field] - fieldLength)
				}
			})
			return task
		})

		tableString += paddedHeaderFields.join(tableDataSeparator)
		tableString += '\n'
		tableString += paddedHeaderFields
			.map(field => '-'.repeat(field.length))
			.join('-' + styles[this._style].columnSeparator + '-')
		tableString += '\n'
		tableString += this._data
			.map(entry => this._headerFields
				.map(field => entry[field])
				.join(' ' + styles[this._style].columnSeparator + ' ')
			)
			.join('\n')

		return tableString
	}

	toString () { return this.string }

	toJSON () { return this.string }
}
