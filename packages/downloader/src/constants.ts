export enum DepMgr {
  Pnpm,
  Npm,
  Yarn
}

export enum LockFile {
  NpmLockFile,
  YarnLockFile,
  PnpmLockFile
}

export const LockFileNameMap: Record<LockFile, string> = {
  [LockFile.NpmLockFile]: 'package-lock.json',
  [LockFile.YarnLockFile]: 'yarn.lock',
  [LockFile.PnpmLockFile]: 'pnpm-lock.yaml'
}

export const DepMgrLockFileMap: Record<DepMgr, LockFile> = {
  [DepMgr.Npm]: LockFile.NpmLockFile,
  [DepMgr.Yarn]: LockFile.YarnLockFile,
  [DepMgr.Pnpm]: LockFile.PnpmLockFile
}
