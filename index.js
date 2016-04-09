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

function padString (string, length, alignment) {
	string = String(string)

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
			return padString (
				field,
				this._maxFieldLengths[field],
				this._alignments[field]
			)
		})
		const tableDataSeparator = ' ' +
			styles[this._style].columnSeparator +
			' '

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

		tableString += paddedHeaderFields.join(tableDataSeparator)
		tableString += '\n'
		tableString += paddedHeaderFields
			.map((paddedField, index) => {
				const field = paddedField.trim()
				const alignment = this._alignments[field]
				let numberOfHyphens = paddedField.length + 2

				if (index === 0 || index === paddedHeaderFields.length - 1){
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
