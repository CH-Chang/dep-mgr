import { type LockFile, LockFileNameMap } from '../../constants'
import { IOError, IOErrorCode } from '../error/io-error'
import fs from 'fs'
import path from 'path'

export const readLockFile = (lockFile: LockFile): string => {
  const lockFileName = LockFileNameMap[lockFile]
  const lockFilePath = path.resolve(process.cwd(), lockFileName)

  const lockFileExists = fs.existsSync(lockFilePath)
  if (!lockFileExists) {
    throw new IOError(IOErrorCode.LOCK_FILE_NOT_EXISTS)
  }

  const lockFileContent = fs.readFileSync(lockFilePath, { encoding: 'utf-8' })

  return lockFileContent
}
