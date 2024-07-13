import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { readFileSync } from 'graceful-fs'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import nameFromFolder from '@npmcli/name-from-folder'
import { chain, split, startsWith } from 'lodash'

interface PartialNpmLockFile {
  lockfileVersion: number
}

interface PartialNpmLockFileV2 {
  lockfileVersion: number
  packages: Record<
  string,
  {
    version: string
  }
  >
}

const parseNpmLockFileV2 = (parsed: PartialNpmLockFileV2): Package[] => {
  return chain(parsed.packages)
    .keys()
    .map((key) => {
      const fullname = nameFromFolder(key)
      const organization = startsWith(fullname, '@')
        ? split(fullname, '/', 2)[0]
        : undefined
      const name = startsWith(fullname, '@')
        ? split(fullname, '/', 2)[1]
        : fullname
      const version = parsed.packages[key].version

      return {
        organization,
        name,
        version
      }
    })
    .value()
}

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<Package[]> => {
  const lockFileContent = readFileSync(lockFilePath, { encoding: 'utf-8' })
  const parsed = JSON.parse(lockFileContent) as PartialNpmLockFile

  const version = parsed.lockfileVersion
  if (version === 2) {
    return parseNpmLockFileV2(parsed as PartialNpmLockFileV2)
  }

  throw new ParserError(ParserErrorCode.UNSUPPORTED_NPM_LOCK_FILE)
}
