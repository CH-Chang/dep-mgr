import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { isNull, isUndefined, chain, includes, split } from 'lodash'
import { readWantedLockfile } from '@pnpm/lockfile-file'
import { parse } from '@pnpm/dependency-path'
import path from 'path'

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
): Promise<Package[]> => {
  const parsed = await readWantedLockfile(path.dirname(lockFilePath), {
    ignoreIncompatible: false
  })

  if (isNull(parsed)) {
    throw new ParserError(ParserErrorCode.PARSE_PNPM_LOCK_FILE_ERROR)
  }

  const { packages } = parsed
  if (isUndefined(packages)) {
    return []
  }

  return chain(packages)
    .keys()
    .map((k) => parse(k))
    .filter(({ name, version }) => !isUndefined(name) && !isUndefined(version))
    .map(({ name, version }) => ({
      organization: includes(name, '@') ? split(name, '/', 2)[0] : undefined,
      name: includes(name, '@') ? split(name, '/', 2)[1] : (name as string),
      version: version as string
    }))
    .value()
}
