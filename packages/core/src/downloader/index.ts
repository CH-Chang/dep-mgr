/* TODO: 解除因未開發而抑制的 eslint 警告 */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DenMgr, type Status } from '../constants'
import { DEFAULT_REGISTRY } from '../defaults'
import { detectDenMgr, detectLockFile } from './detector'
import { parsePackages } from './parser'

interface Options {
  denMgr?: DenMgr
  registry?: string
  callback?: (status: Status) => void
}

export const download = async (options: Options): Promise<void> => {
  const registry = options.registry ?? DEFAULT_REGISTRY
  const denMgr = options.denMgr ?? detectDenMgr()

  const lockFile = detectLockFile(denMgr)
  const packages = parsePackages(lockFile)
}
