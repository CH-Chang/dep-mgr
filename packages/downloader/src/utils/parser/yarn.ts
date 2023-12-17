import { type Package } from '@dep-mgr/share'
import { type ParsePackagesFunction } from './share'
import { LockFile } from '../../constants'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { readFileSync } from 'fs'

const parseYarnV1Packages = (lockFileContent: string): Package[] => {
  throw new ParserError(ParserErrorCode.NOT_IMPLEMENT)
}

const parseYarnV2Packages = (lockFileContent: string): Package[] => {
  throw new ParserError(ParserErrorCode.NOT_IMPLEMENT)
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
