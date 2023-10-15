import { CustomError } from 'ts-custom-error'

export enum ParserErrorCode {
  PACKAGE_DIRECTORY_NOT_EXISTS
}

const DefaultParserErrorMessage: Record<ParserErrorCode, string> = {
  [ParserErrorCode.PACKAGE_DIRECTORY_NOT_EXISTS]: 'Package directory not exists'
}

export class ParserError extends CustomError {
  constructor (private readonly code: ParserErrorCode, message?: string) {
    message = message ?? DefaultParserErrorMessage[code]
    super(message)
  }
}
