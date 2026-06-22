import { type Package } from '@dep-mgr/share'
import { type LockFile } from '../../constants'
import { type ParsePackagesFunction } from './share'
import { ParserError, ParserErrorCode } from '../../error/parser-error'
import { isNull, isUndefined, chain, includes, split, parseInt } from 'lodash'
import { parse as dependencyPathParseV2 } from '@pnpm/dependency-path2'
import { parse as dependencyPathParseV5 } from '@pnpm/dependency-path5'
import path from 'path'
import fs from 'graceful-fs'
import yaml from 'yaml'

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
): Promise<Package[]> => {
  let lockfileVersion = '6.0'
  try {
    const content = fs.readFileSync(lockFilePath, 'utf8')
    const parsedYaml = yaml.parse(content)
    if (parsedYaml && parsedYaml.lockfileVersion) {
      lockfileVersion = String(parsedYaml.lockfileVersion)
    }
  } catch (err) {
    // Let the loader throw the error if file cannot be read
  }

  const isV5 = parseInt(lockfileVersion) < 6
  let parsed: any

  if (isV5) {
    const logger = require('@pnpm/logger')
    if (typeof logger.default !== 'function') {
      logger.default = () => () => {}
    }
    const { readWantedLockfile } = require('@pnpm/lockfile-file5')
    parsed = await readWantedLockfile(path.dirname(lockFilePath), { ignoreIncompatible: false })
  } else {
    const { readWantedLockfile } = require('@pnpm/lockfile-file9')
    parsed = await readWantedLockfile(path.dirname(lockFilePath), { ignoreIncompatible: false })
  }

  if (isNull(parsed)) {
    throw new ParserError(ParserErrorCode.PARSE_PNPM_LOCK_FILE_ERROR)
  }

  const { packages } = parsed
  if (isUndefined(packages)) {
    return []
  }

  // @pnpm/dependency-path after v2.1.7 drop support for pnpm lockfile version 5
  // https://github.com/pnpm/pnpm/blob/main/packages/dependency-path/CHANGELOG.md#217
  return isV5
    ? chain(packages)
      .keys()
      .map((k) => dependencyPathParseV2(k))
      .filter(
        ({ name, version }) => !isUndefined(name) && !isUndefined(version)
      )
      .map(({ host, name, version }) => {
        const hasOrg = includes(name, '@')
        return {
          organization: hasOrg ? split(name, '/', 2)[0] : host,
          name: hasOrg ? split(name, '/', 2)[1] : (name as string),
          version: version as string
        }
      })
      .value()
    : chain(packages)
      .keys()
      .map((k) => dependencyPathParseV5(k))
      .filter(
        ({ name, version }) => !isUndefined(name) && !isUndefined(version)
      )
      .map(({ name, version }) => {
        const hasOrg = includes(name, '@')
        return {
          organization: hasOrg ? split(name, '/', 2)[0] : undefined,
          name: hasOrg ? split(name, '/', 2)[1] : (name as string),
          version: version as string
        }
      })
      .value()
}
