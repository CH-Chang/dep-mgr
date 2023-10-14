/* TODO: 解除因未開發而抑制的 eslint 警告 */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Status, type DenMgr } from '../constants'
import { DEFAULT_OUT_DIR, DEFAULT_REGISTRY } from '../defaults'
import { detectDenMgr, detectLockFile } from './detector'
import { parsePackages } from './parser'
import { download as innerDownload } from './downloader'

interface Options {
  denMgr?: DenMgr
  registry?: string
  outDir?: string
  callback?: (status: Status, extra: unknown) => void
}

export const download = async (options: Options): Promise<void> => {
  const callback = options.callback

  const registry = options.registry ?? DEFAULT_REGISTRY
  const outDir = options.outDir ?? DEFAULT_OUT_DIR

  const denMgr = options.denMgr ?? detectDenMgr()
  callback?.(Status.DependencyManagerDetected, denMgr)

  const lockFile = detectLockFile(denMgr)
  callback?.(Status.LockFileDetected, lockFile)

  const packages = parsePackages(lockFile)
  callback?.(Status.LockFileParsed, packages)

  await innerDownload(packages, registry, outDir)
}
