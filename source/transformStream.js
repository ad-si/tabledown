import stream from 'stream'
import Tabledown from './index'

export default function (inputStream, outputStream) {
  inputStream
    .pipe(new stream.Transform({
      writableObjectMode: false,
      readableObjectMode: false,
      transform: function (chunk, encoding, done) {
        if (!this.buffer) {
          this.buffer = ''
        }
        this.buffer += chunk
        done()
      },
      flush: function (done) {
        const array = JSON.parse(this.buffer)
        this.push(new Tabledown({data: array}).toString())
        done()
      }
    }))
    .pipe(outputStream)
}
