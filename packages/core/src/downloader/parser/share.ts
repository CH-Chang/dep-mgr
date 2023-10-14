import { type LockFile } from '../../constants'

export interface Package {
  organization?: string
  name: string
  version: string
}

export type RootParsePackages = (lockFile: LockFile) => Package[]
export type ParsePackages = (
  lockFile: LockFile,
  lockFileContent: string
) => Package[]
