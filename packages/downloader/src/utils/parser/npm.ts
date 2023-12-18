import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
// eslint-disable-next-line @typescript-eslint/require-await
): Promise<Package[]> => {
  throw new ParserError(ParserErrorCode.NOT_IMPLEMENT)
}
