import { type LockFile, type Package } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { map, keys, split, size } from 'lodash-es'
import YAML from 'yaml'

interface PartialPnpmLockFileObject {
  lockfileVersion: string
}

interface PartialV6DownPnpmLockFileObject extends PartialPnpmLockFileObject {
  packages: Record<
  string,
  {
    resolution: {
      integrity: string
    }
    engines: {
      node: string
    }
    dependencies?: Array<Record<string, string>>
    dev: boolean
  }
  >
}

const parsePackagesVersion6Down = (
  lockFileObject: PartialV6DownPnpmLockFileObject
): Package[] => {
  return map(keys(lockFileObject.packages), (rp) => {
    const array = split(rp, '/')
    if (size(array) > 2) {
      const innerArray = split(array[2], '@')
      return {
        organization: array[1],
        name: innerArray[0],
        version: innerArray[1]
      }
    }

    const innerArray = split(array[1], '@')
    return {
      name: innerArray[0],
      version: innerArray[1]
    }
  })
}

export const parsePackages: ParsePackagesFunction = (
  lockFile: LockFile,
  lockFileContent: string
): Package[] => {
  const lockFileObject = YAML.parse(
    lockFileContent
  ) as PartialPnpmLockFileObject

  const { lockfileVersion } = lockFileObject

  // TODO: 確認其他版本的解析支援
  if (lockfileVersion === '6.0' || lockfileVersion === '5.4') {
    return parsePackagesVersion6Down(
      lockFileObject as PartialV6DownPnpmLockFileObject
    )
  }

  throw new ParserError(ParserErrorCode.UNSUPPORTED_PNPM_LOCK_FILE_VERSION)
}
