import { type Package } from '@dep-mgr/share'
import { type ParsePackagesFunction } from './share'
import { type LockFile } from '../../constants'
import { readFileSync } from 'graceful-fs'
import { chain, includes, split } from 'lodash'
import * as yarnParser from '@yarnpkg/lockfile'
import * as packageNameParser from 'parse-package-name'

export const parsePackages: ParsePackagesFunction = async (
  lockFile: LockFile,
  lockFilePath: string
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<Package[]> => {
  const lockFileContent = readFileSync(lockFilePath, { encoding: 'utf-8' })
  const parsed = yarnParser.parse(lockFileContent)
  return chain(parsed.object)
    .map((o, k) => ({ ...packageNameParser.parse(k), version: o.version }))
    .map(({ name, version }) => ({
      organization: includes(name, '@') ? split(name, '/', 2)[0] : undefined,
      name: includes(name, '@') ? split(name, '/', 2)[1] : name,
      version
    }))
    .value()
}
