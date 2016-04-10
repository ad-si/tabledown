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

function padString (string, length, alignment, capitalize) {
	string = String(string)

	if (capitalize) {
		string = string.slice(0, 1).toUpperCase() + string.slice(1)
	}

	const padding = ' '.repeat(length - string.length)

	if (alignment === 'left') {
		return string + padding
	}
	if (alignment === 'right') {
		return padding + string
	}
	if (alignment === 'center') {
		const paddingStart = ' '.repeat(padding.length / 2)
		const paddingEnd = ' '
			.repeat(padding.length - paddingStart.length)
		return paddingStart + string + paddingEnd
	}

	// Default is left aligned
	return string + padding
}

export default class Tabledown {
	constructor (
		{
			caption,
			data = [],
			style = 'pipe',
			alignments = {},
			capitalizeHeaders = false,
		} = {}
	) {
		if (!Array.isArray(data) || !data.length) {
			throw new Error('Data must be an array or object and not ' + data)
		}

		if (Array.isArray(data[0])) {
			this._headerFields = data[0]
			data = data
				.slice(1)
				.map(row => row.reduce(
					returnObject => {
						this._headerFields.forEach((field, fieldIndex) => {
							returnObject[field] = row[fieldIndex]
						})
						return returnObject
					},
					{}
				))
		}
		else if (typeof data[0] === 'object') {
			this._headerFields = createHeaderFields(data)
		}

		this._headerFieldLengths = this._headerFields.reduce(
			(headerFieldLengths, field) => {
				headerFieldLengths[field] = String(field).length
				return headerFieldLengths
			},
			{}
		)

		this._maxFieldLengths = data.reduce(
			(maxFieldLengths, task) => {
				this._headerFields.forEach(field => {
					if (!task.hasOwnProperty(field)) {
						return
					}

					let fieldLength = String(task[field]).length

					if (!maxFieldLengths[field]) {
						maxFieldLengths[field] = 0
					}

					if (fieldLength > maxFieldLengths[field]) {
						maxFieldLengths[field] = fieldLength
					}
				})
				return maxFieldLengths
			},
			this._headerFieldLengths
		)

		this._data = data
		this._style = style
		this._alignments = alignments
		this._capitalizeHeaders = capitalizeHeaders
		this.caption = caption
	}

	get string () {
		let tableString = ''

		if (this.caption) {
			tableString += `Table: ${this.caption}\n`
		}

		const paddedHeaderFields = this._headerFields.map(field => {
			return padString (
				field,
				this._maxFieldLengths[field],
				this._alignments[field],
				this._capitalizeHeaders
			)
		})
		const tableDataSeparator = ' ' +
			styles[this._style].columnSeparator +
			' '

		// Pad table body content
		this._data = this._data.map(task => {
			this._headerFields.forEach((field, index) => {
				if (!task.hasOwnProperty(field)) { return }

				task[field] = padString(
					task[field],
					this._maxFieldLengths[field],
					this._alignments[field]
				)
			})
			return task
		})

		// Table head
		tableString += paddedHeaderFields
			.join(tableDataSeparator)
			.replace(/\s+$/, '')
		tableString += '\n'

		// Separation line
		tableString += paddedHeaderFields
			.map((paddedField, index) => {
				const field = this._headerFields[index]
				const alignment = this._alignments[field]
				let numberOfHyphens = paddedField.length + 2

				if (index === 0 || index === paddedHeaderFields.length - 1) {
					numberOfHyphens--
				}

				let verticalSeparator = '-'.repeat(numberOfHyphens)

				if (alignment === 'left' || alignment === 'center') {
					verticalSeparator = verticalSeparator.replace('-', ':')
				}
				if (alignment === 'right' || alignment === 'center') {
					verticalSeparator = verticalSeparator.replace(/-$/, ':')
				}
				return verticalSeparator
			})
			.join(styles[this._style].columnSeparator)
		tableString += '\n'

		// Table body
		tableString += this._data
			.map(entry => this._headerFields
				.map(field => entry[field])
				.join(' ' + styles[this._style].columnSeparator + ' ')
				.replace(/\s+$/, '')
			)
			.join('\n')

		return tableString + '\n'
	}

	toString () { return this.string }

	toJSON () { return this.string }
}
