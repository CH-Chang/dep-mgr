import {
  type LockFile,
  DenMgr,
  DenMgrLockFileMap,
  LockFileNameMap
} from '../constants'
import { DetectorError, DetectorErrorCode } from '../error/detector-error'
import fs from 'fs'
import path from 'path'

export const detectDenMgr = (): DenMgr => {
  const mgrs = [DenMgr.Npm, DenMgr.Yarn, DenMgr.Yarn]

  for (const mgr of mgrs) {
    const lockFiles = DenMgrLockFileMap[mgr]
    for (const lockFile of lockFiles) {
      const lockFileNames = LockFileNameMap[lockFile]
      for (const lockFileName of lockFileNames) {
        const lockFilePath = path.resolve(process.cwd(), lockFileName)
        const lockFileExists = fs.existsSync(lockFilePath)
        if (lockFileExists) {
          return mgr
        }
      }
    }
  }

  throw new DetectorError(DetectorErrorCode.UNKNOWN_DEPENDENCY_MANAGER)
}

export const detectLockFile = (denMgr: DenMgr): LockFile => {
  const lockFiles = DenMgrLockFileMap[denMgr]
  for (const lockFile of lockFiles) {
    const lockFileNames = LockFileNameMap[lockFile]
    for (const lockFileName of lockFileNames) {
      const lockFilePath = path.resolve(process.cwd(), lockFileName)
      const lockFileExists = fs.existsSync(lockFilePath)
      if (lockFileExists) {
        return lockFile
      }
    }
  }

  throw new DetectorError(
    DetectorErrorCode.UNKNOWN_LOCK_FILE_FOR_SPECIFIC_DEPENDENCY_MANAGER
  )
}
