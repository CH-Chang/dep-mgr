import { type Package } from '@dep-mgr/share'
import { type ParsePackagesFunction } from './share'
import { LockFile } from '../../constants'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { extractPkgsFromYarnLockV1 } from 'snyk-nodejs-lockfile-parser'
import { readFileSync } from 'fs'

const parseYarnV1Packages = (lockFileContent: string): Package[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parsed = extractPkgsFromYarnLockV1(lockFileContent)
  return []
}

const parseYarnV2Packages = (lockFileContent: string): Package[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parsed = extractPkgsFromYarnLockV1(lockFileContent)
  return []
}

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<Package[]> => {
  const lockFileContent = readFileSync(lockFilePath, { encoding: 'utf-8' })

  switch (lockFile) {
    case LockFile.YarnJsonLockFile:
      return parseYarnV1Packages(lockFileContent)
    case LockFile.YarnYamlLockFile:
      return parseYarnV2Packages(lockFileContent)
    default:
      throw new ParserError(ParserErrorCode.UNSUPPORTED_YARN_LOCK_FILE)
  }
}
