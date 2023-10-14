/* TODO: 解除因未開發而抑制的 eslint 警告 */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Package, type DepMgr, type LockFile } from './constants'
import { DEFAULT_OUT_DIR, DEFAULT_REGISTRY } from './defaults'
import { detectDepMgr, detectLockFile } from './utils/detector'
import { parsePackages } from './utils/parser'
import { download as innerDownload } from './utils/downloader'

interface Options {
  depMgr?: DepMgr
  registry?: string
  outDir?: string
  callbacks?: {
    depMgrDetected?: (denMgr: DepMgr) => void
    lockFileDetected?: (lockFile: LockFile) => void
    lockFileParsed?: (packages: Package[]) => void
    packageDownloadSuccess?: (aPackage: Package) => void
    packageDownloadFail?: (aPackage: Package) => void
  }
}

export const download = async (options: Options): Promise<void> => {
  const callbacks = options.callbacks

  const registry = options.registry ?? DEFAULT_REGISTRY
  const outDir = options.outDir ?? DEFAULT_OUT_DIR

  const depMgr = options.depMgr ?? detectDepMgr()
  callbacks?.depMgrDetected?.(depMgr)

  const lockFile = detectLockFile(depMgr)
  callbacks?.lockFileDetected?.(lockFile)

  const packages = parsePackages(lockFile)
  callbacks?.lockFileParsed?.(packages)

  await innerDownload(
    packages,
    registry,
    outDir,
    callbacks?.packageDownloadSuccess,
    callbacks?.packageDownloadFail
  )
}

export * from './defaults'
export * from './constants'
