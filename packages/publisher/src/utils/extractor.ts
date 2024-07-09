import tar from 'tar-stream'
import fs from 'graceful-fs'
import { Gunzip } from 'minizlib'
import { endsWith, isEmpty, size, split } from 'lodash'

export const extractPackageJsonFromTarball = async (
  location: string
): Promise<string | null> => {
  return await new Promise((resolve, reject) => {
    const extract = tar.extract()

    let data: string = ''
    let level: number = Number.MAX_SAFE_INTEGER
    extract.on('entry', (headers, stream, next) => {
      if (endsWith(headers.name, 'package.json')) {
        const entrySplit = split(headers.name, '/')
        const entryLevel = size(entrySplit)

        if (entryLevel < level) {
          data = ''

          stream.on('data', (chunk) => {
            data += chunk
          })

          stream.on('end', () => {
            level = entryLevel
            next()
          })
        }
      }

      stream.resume()
      next()
    })

    extract.on('finish', () => {
      if (isEmpty(data)) {
        resolve(null)
      }

      resolve(data)
    })

    fs.createReadStream(location).pipe(new Gunzip({})).pipe(extract)
  })
}
