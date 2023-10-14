import { type LockFile, type Package } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { map, keys } from 'lodash'
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
    let organization
    let version
    let name

    let temp = ''
    for (let idx = 1; idx < rp.length; idx++) {
      if (rp[idx] === '@' && name === undefined && idx !== 1) {
        name = temp
        temp = ''
        continue
      }

      if (rp[idx] === '/' && name === undefined && organization === undefined) {
        organization = temp
        temp = ''
        continue
      }

      if (rp[idx] === '(' && version === undefined) {
        version = temp
        temp = ''
        break
      }

      if (idx === rp.length - 1 && version === undefined) {
        version = temp + rp[idx]
        temp = ''
        break
      }

      temp += rp[idx]
    }

    return {
      organization,
      name: name as string,
      version: version as string
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
