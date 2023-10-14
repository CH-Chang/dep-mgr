import { type LockFile, type Package } from '../../constants'

export type RootParsePackages = (lockFile: LockFile) => Package[]
export type ParsePackages = (
  lockFile: LockFile,
  lockFileContent: string
) => Package[]
