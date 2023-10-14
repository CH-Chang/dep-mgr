import { type LockFile } from '../../constants'
import { type ParsePackages, type Package } from './share'
import { ParserError, ParserErrorCode } from '../error/parser-error'
import { map, keys, split, size } from 'lodash-es'
import YAML from 'yaml'

interface PartialPnpmLockFileObject {
  lockfileVersion: string
}

interface PartialV6PnpmLockFileObject extends PartialPnpmLockFileObject {
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

const parseVersion6 = (
  lockFileObject: PartialV6PnpmLockFileObject
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

export const parsePackages: ParsePackages = (
  lockFile: LockFile,
  lockFileContent: string
): Package[] => {
  const lockFileObject = YAML.parse(
    lockFileContent
  ) as PartialPnpmLockFileObject

  const { lockfileVersion } = lockFileObject

  if (lockfileVersion === '6.0') {
    return parseVersion6(lockFileObject as PartialV6PnpmLockFileObject)
  }

  throw new ParserError(ParserErrorCode.UNSUPPORTED_PNPM_LOCK_FILE_VERSION)
}
