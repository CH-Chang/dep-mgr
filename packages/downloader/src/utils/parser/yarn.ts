import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'

export const parsePackages: ParsePackagesFunction = (
  lockFile: LockFile,
  lockFilePath: string
): Package[] => {
  throw new ParserError(ParserErrorCode.NOT_IMPLEMENT)
}
