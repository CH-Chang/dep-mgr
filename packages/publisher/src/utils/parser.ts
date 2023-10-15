import { type LocalPackage } from '../constants'
import { ParserError, ParserErrorCode } from '../errors/parser-error'
import { flatMap, join, last, map, size, slice, split } from 'lodash'
import path from 'path'
import fs from 'fs'

const parsePkgFilename = (
  filename: string
): { name: string, version: string } => {
  const parsedFilename = path.parse(filename)
  const filenameWithoutExtension = parsedFilename.name

  const array = split(filenameWithoutExtension, '-')

  return {
    name: join(slice(array, 0, size(array) - 1), '-'),
    version: last(array) as string
  }
}

export const parsePkgDir = (pkgDir: string): LocalPackage[] => {
  const pkgPath = !path.isAbsolute(pkgDir)
    ? path.resolve(process.cwd(), pkgDir)
    : pkgDir

  if (!fs.existsSync(pkgPath)) {
    throw new ParserError(ParserErrorCode.PACKAGE_DIRECTORY_NOT_EXISTS)
  }

  const files = fs.readdirSync(pkgPath)
  const localPackages = flatMap(files, (f) => {
    const stat = fs.statSync(f)

    const isDir = stat.isDirectory()
    if (isDir) {
      const organization = f

      const innerPkgPath = path.resolve(pkgPath, f)
      const innerFiles = fs.readdirSync(innerPkgPath)

      return map(innerFiles, (aIf) => {
        const { name, version } = parsePkgFilename(aIf)
        const location = path.resolve(innerPkgPath, aIf)

        return {
          organization,
          name,
          version,
          location
        }
      })
    }

    const { name, version } = parsePkgFilename(f)
    const location = path.resolve(pkgPath, f)

    return {
      name,
      version,
      location
    }
  })

  return localPackages
}
