import { type LockFile, type Package } from '../../constants'

export type RootParsePackagesFunction = (lockFile: LockFile) => Package[]
export type ParsePackagesFunction = (
  lockFile: LockFile,
  lockFileContent: string
) => Package[]
