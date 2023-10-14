/* TODO: 解除因未開發而抑制的 eslint 警告 */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Package, type DenMgr, type LockFile } from './constants'
import { DEFAULT_OUT_DIR, DEFAULT_REGISTRY } from './defaults'
import { detectDenMgr, detectLockFile } from './utils/detector'
import { parsePackages } from './utils/parser'
import { download as innerDownload } from './utils/downloader'

interface Options {
  denMgr?: DenMgr
  registry?: string
  outDir?: string
  callbacks?: {
    denMgrDetected: (denMgr: DenMgr) => void
    lockFileDetected: (lockFile: LockFile) => void
    lockFileParsed: (packages: Package[]) => void
    packageDownloadSuccess: (aPackage: Package) => void
    packageDownloadFail: (aPackage: Package) => void
  }
}

export const download = async (options: Options): Promise<void> => {
  const callbacks = options.callbacks

  const registry = options.registry ?? DEFAULT_REGISTRY
  const outDir = options.outDir ?? DEFAULT_OUT_DIR

  const denMgr = options.denMgr ?? detectDenMgr()
  callbacks?.denMgrDetected?.(denMgr)

  const lockFile = detectLockFile(denMgr)
  callbacks?.lockFileDetected?.(lockFile)

  const packages = parsePackages(lockFile)
  callbacks?.lockFileParsed(packages)

  await innerDownload(packages, registry, outDir)
}
