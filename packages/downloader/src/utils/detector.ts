import {
  type LockFile,
  DepMgr,
  DepMgrLockFileMap,
  LockFileNameMap
} from '../constants'
import { DetectorError, DetectorErrorCode } from '../error/detector-error'
import fs from 'graceful-fs'
import path from 'path'

export const detectDepMgr = (): DepMgr => {
  const mgrs = [DepMgr.Npm, DepMgr.Yarn, DepMgr.Pnpm]

  for (const mgr of mgrs) {
    const lockFile = DepMgrLockFileMap[mgr]
    const lockFileName = LockFileNameMap[lockFile]
    const lockFilePath = path.resolve(process.cwd(), lockFileName)
    const lockFileExists = fs.existsSync(lockFilePath)
    if (lockFileExists) {
      return mgr
    }
  }

  throw new DetectorError(DetectorErrorCode.UNKNOWN_DEPENDENCY_MANAGER)
}

export const detectLockFile = (depMgr: DepMgr): LockFile => {
  const lockFile = DepMgrLockFileMap[depMgr]
  const lockFileName = LockFileNameMap[lockFile]
  const lockFilePath = path.resolve(process.cwd(), lockFileName)
  const lockFileExists = fs.existsSync(lockFilePath)
  if (lockFileExists) {
    return lockFile
  }

  throw new DetectorError(
    DetectorErrorCode.UNKNOWN_LOCK_FILE_FOR_SPECIFIC_DEPENDENCY_MANAGER
  )
}
