import { CustomError } from 'ts-custom-error'

export enum DetectorErrorCode {
  UNKNOWN_DEPENDENCY_MANAGER,
  UNKNOWN_LOCK_FILE_FOR_SPECIFIC_DEPENDENCY_MANAGER
}

const DefaultDetectErrorMessage: Record<DetectorErrorCode, string> = {
  [DetectorErrorCode.UNKNOWN_DEPENDENCY_MANAGER]:
    'Could not detect the dependency manager',
  [DetectorErrorCode.UNKNOWN_LOCK_FILE_FOR_SPECIFIC_DEPENDENCY_MANAGER]:
    'Could not detect the lock file for specific dependency manager'
}

export class DetectorError extends CustomError {
  constructor (private readonly code: DetectorErrorCode, message?: string) {
    message = message ?? DefaultDetectErrorMessage[code]
    super(message)
  }
}
