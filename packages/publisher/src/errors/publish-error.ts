import { CustomError } from 'ts-custom-error'

export enum PublishErrorCode {
  INVALID_PACKAGE_TARBALL
}

const DefaultPublishErrorMessage: Record<PublishErrorCode, string> = {
  [PublishErrorCode.INVALID_PACKAGE_TARBALL]: 'Invalid package tarball'
}

export class PublishError extends CustomError {
  constructor (private readonly code: PublishErrorCode, message?: string) {
    message = message ?? DefaultPublishErrorMessage[code]
    super(message)
  }
}
