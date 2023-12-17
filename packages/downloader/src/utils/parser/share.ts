import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'

export type RootParsePackagesFunction = (lockFile: LockFile) => Promise<Package[]>
export type ParsePackagesFunction = (
  lockFile: LockFile,
  lockFilePath: string
) => Promise<Package[]>
