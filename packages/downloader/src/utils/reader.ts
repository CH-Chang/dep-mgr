import { type LockFile, LockFileNameMap } from '../constants'
import path from 'path'

export const readLockFilePath = (lockFile: LockFile): string => {
  const lockFileName = LockFileNameMap[lockFile]
  const lockFilePath = path.resolve(process.cwd(), lockFileName)
  return lockFilePath
}
