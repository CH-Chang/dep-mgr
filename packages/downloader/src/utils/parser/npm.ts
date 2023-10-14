import { type LockFile, type Package } from '../../constants'
import { type ParsePackagesFunction } from './share'

export const parsePackages: ParsePackagesFunction = (
  lockFile: LockFile,
  lockFileContent: string
): Package[] => {
  return []
}
