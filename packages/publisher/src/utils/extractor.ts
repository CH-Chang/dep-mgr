import tar from 'tar-stream'
import fs from 'fs'
import { Gunzip } from 'minizlib'
import { endsWith, isNull } from 'lodash'

export const extractPackageJsonFromTarball = async (
  location: string
): Promise<string | null> => {
  return await new Promise((resolve, reject) => {
    const extract = tar.extract()

    let data: string | null = null
    extract.on('entry', (headers, stream, next) => {
      if (endsWith(headers.name, 'package.json')) {
        stream.on('data', (chunk) => {
          if (isNull(data)) {
            data = ''
          }

          data += chunk
        })

        stream.on('end', () => {
          next()
        })
      }

      stream.resume()
      next()
    })

    extract.on('finish', () => {
      resolve(data)
    })

    fs.createReadStream(location)
      .pipe(new Gunzip({}))
      .pipe(extract)
  })
}
