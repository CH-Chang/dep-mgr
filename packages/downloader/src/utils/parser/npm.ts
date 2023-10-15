import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'

export const parsePackages: ParsePackagesFunction = (
  lockFile: LockFile,
  lockFileContent: string
): Package[] => {
  return []
}
