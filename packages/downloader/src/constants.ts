export enum DepMgr {
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

export const LockFileNameMap: Record<LockFile, string> = {
  [LockFile.NpmJsonLockFile]: 'package-lock.json',
  [LockFile.YarnJsonLockFile]: 'yarn.lock',
  [LockFile.YarnYamlLockFile]: 'yarn.lock',
  [LockFile.PnpmYamlLockFile]: 'pnpm-lock.yaml'
}

export const DepMgrLockFileMap: Record<DepMgr, LockFile[]> = {
  [DepMgr.Npm]: [LockFile.NpmJsonLockFile],
  [DepMgr.Yarn]: [LockFile.YarnJsonLockFile, LockFile.YarnYamlLockFile],
  [DepMgr.Pnpm]: [LockFile.PnpmYamlLockFile]
}
