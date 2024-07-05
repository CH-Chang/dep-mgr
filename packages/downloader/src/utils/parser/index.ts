import {
  type RootParsePackagesFunction,
  type ParsePackagesFunction
} from './share'
import { type Package } from '@dep-mgr/share'
import { LockFile } from '../../constants'
import { readLockFilePath } from '../reader'
import { parsePackages as npmParsePackages } from './npm'
import { parsePackages as pnpmParsePackages } from './pnpm'
import { parsePackages as yarnParsePackages } from './yarn'

const lockFileParsePackagesMap: Record<LockFile, ParsePackagesFunction> = {
  [LockFile.NpmLockFile]: npmParsePackages,
  [LockFile.YarnLockFile]: yarnParsePackages,
  [LockFile.PnpmLockFile]: pnpmParsePackages
}

export const parsePackages: RootParsePackagesFunction = async (
  lockFile: LockFile
): Promise<Package[]> => {
  const lockFilePath = readLockFilePath(lockFile)
  const packages = await lockFileParsePackagesMap[lockFile](lockFile, lockFilePath)
  return packages
}
