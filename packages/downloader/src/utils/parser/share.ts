import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'

export type RootParsePackagesFunction = (lockFile: LockFile) => Package[]
export type ParsePackagesFunction = (
  lockFile: LockFile,
  lockFilePath: string
) => Package[]
