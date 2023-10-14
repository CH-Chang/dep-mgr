import { type RootParsePackages, type ParsePackages } from './share'
import { type Package, LockFile } from '../../constants'
import { readLockFile } from '../reader'
import { parsePackages as npmParsePackages } from './npm'
import { parsePackages as pnpmParsePackages } from './pnpm'
import { parsePackages as yarnParsePackages } from './yarn'

const lockFileParsePackagesMap: Record<LockFile, ParsePackages> = {
  [LockFile.NpmJsonLockFile]: npmParsePackages,
  [LockFile.YarnJsonLockFile]: yarnParsePackages,
  [LockFile.YarnYamlLockFile]: yarnParsePackages,
  [LockFile.PnpmYamlLockFile]: pnpmParsePackages
}

export const parsePackages: RootParsePackages = (
  lockFile: LockFile
): Package[] => {
  const lockFileContent = readLockFile(lockFile)
  const packages = lockFileParsePackagesMap[lockFile](lockFile, lockFileContent)
  return packages
}
