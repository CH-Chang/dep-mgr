import { CustomError } from 'ts-custom-error'

export enum ParserErrorCode {
  PARSE_PNPM_LOCK_FILE_ERROR,
  UNSUPPORTED_YARN_LOCK_FILE,
  UNSUPPORTED_NPM_LOCK_FILE,
  NOT_IMPLEMENT
}

const DefaultParserErrorMessage: Record<ParserErrorCode, string> = {
  [ParserErrorCode.PARSE_PNPM_LOCK_FILE_ERROR]: 'Parse pnpm lock file error',
  [ParserErrorCode.UNSUPPORTED_YARN_LOCK_FILE]: 'Unsupported yarn lockfile',
  [ParserErrorCode.UNSUPPORTED_NPM_LOCK_FILE]: 'Unsupported npm lockfile',
  [ParserErrorCode.NOT_IMPLEMENT]: 'Specific lock file parser not implement yet'
}

export class ParserError extends CustomError {
  constructor (private readonly code: ParserErrorCode, message?: string) {
    message = message ?? DefaultParserErrorMessage[code]
    super(message)
  }
}
