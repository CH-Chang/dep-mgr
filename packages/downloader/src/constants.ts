export enum DenMgr {
  Pnpm,
  Npm,
  Yarn
}

export enum LockFile {
  NpmJsonLockFile,
  YarnJsonLockFile,
  YarnYamlLockFile,
  PnpmYamlLockFile
}

export enum Status {
  DependencyManagerDetected,
  LockFileDetected,
  LockFileParsed,
  PackageDownloaded,
  AllPackageDownloaded
}

export interface Package {
  organization?: string
  name: string
  version: string
}

export const LockFileNameMap: Record<LockFile, string> = {
  [LockFile.NpmJsonLockFile]: 'package-lock.json',
  [LockFile.YarnJsonLockFile]: 'yarn.lock',
  [LockFile.YarnYamlLockFile]: 'yarn.lock',
  [LockFile.PnpmYamlLockFile]: 'pnpm-lock.yaml'
}

export const DenMgrLockFileMap: Record<DenMgr, LockFile[]> = {
  [DenMgr.Npm]: [LockFile.NpmJsonLockFile],
  [DenMgr.Yarn]: [LockFile.YarnJsonLockFile, LockFile.YarnYamlLockFile],
  [DenMgr.Pnpm]: [LockFile.PnpmYamlLockFile]
}
