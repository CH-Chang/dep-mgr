import { CustomError } from 'ts-custom-error'

export enum IOErrorCode {
  LOCK_FILE_NOT_EXISTS
}

const DefaultIOErrorMessage: Record<IOErrorCode, string> = {
  [IOErrorCode.LOCK_FILE_NOT_EXISTS]: 'Cannot found the specific lock file'
}

export class IOError extends CustomError {
  constructor (private readonly code: IOErrorCode, message?: string) {
    message = message ?? DefaultIOErrorMessage[code]
    super(message)
  }
}
