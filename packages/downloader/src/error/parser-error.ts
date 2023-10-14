import { CustomError } from 'ts-custom-error'

export enum ParserErrorCode {
  UNSUPPORTED_PNPM_LOCK_FILE_VERSION
}

const DefaultParserErrorMessage: Record<ParserErrorCode, string> = {
  [ParserErrorCode.UNSUPPORTED_PNPM_LOCK_FILE_VERSION]:
    'Unsupported pnpm lock file version'
}

export class ParserError extends CustomError {
  constructor (private readonly code: ParserErrorCode, message?: string) {
    message = message ?? DefaultParserErrorMessage[code]
    super(message)
  }
}