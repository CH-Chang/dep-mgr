import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { isNull, isUndefined, chain, includes, split, parseInt } from 'lodash'
import { readWantedLockfile } from '@pnpm/lockfile-file'
import { parse as dependencyPathParseV2 } from '@pnpm/dependency-path2'
import { parse as dependencyPathParseV5 } from '@pnpm/dependency-path5'
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

  const { packages, lockfileVersion } = parsed
  if (isUndefined(packages)) {
    return []
  }

  // @pnpm/dependency-path after v2.1.7 drop support for pnpm lockfile version 5
  // https://github.com/pnpm/pnpm/blob/main/packages/dependency-path/CHANGELOG.md#217
  return parseInt(lockfileVersion) < 6
    ? chain(packages)
      .keys()
      .map((k) => dependencyPathParseV2(k))
      .filter(
        ({ name, version }) => !isUndefined(name) && !isUndefined(version)
      )
      .map(({ host, name, version }) => ({
        organization: host,
        name: name as string,
        version: version as string
      }))
      .value()
    : chain(packages)
      .keys()
      .map((k) => dependencyPathParseV5(k))
      .filter(
        ({ name, version }) => !isUndefined(name) && !isUndefined(version)
      )
      .map(({ name, version }) => ({
        organization: includes(name, '@')
          ? split(name, '/', 2)[0]
          : undefined,
        name: includes(name, '@') ? split(name, '/', 2)[1] : (name as string),
        version: version as string
      }))
      .value()
}
