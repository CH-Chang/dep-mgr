import { type LocalPackage } from './constants'
import { DEFAULT_PKG_DIR, DEFAULT_REGISTRY } from '@dep-mgr/share'
import { parsePkgDir } from './utils/parser'
import { publish as innerPublish } from './utils/publisher'
import { createWorkspace, removeWorkspace } from './utils/workspace'

interface Options {
  registry?: string
  pkgDir?: string
  callbacks?: {
    pkgDirParsed?: (localPackages: LocalPackage[]) => void
    publishPackageSkipped?: (localPackage: LocalPackage) => void
    publishPackageSuccess?: (localPackage: LocalPackage) => void
    publishPackageFail?: (LocalPackage: LocalPackage) => void
  }
}

export const publish = async (options: Options): Promise<void> => {
  const callbacks = options.callbacks
  const registry = options.registry ?? DEFAULT_REGISTRY
  const pkgDir = options.pkgDir ?? DEFAULT_PKG_DIR

  const localPackages = parsePkgDir(pkgDir)
  callbacks?.pkgDirParsed?.(localPackages)

  const workspace = createWorkspace(registry)

  try {
    await innerPublish(
      workspace,
      localPackages,
      registry,
      callbacks?.publishPackageSkipped,
      callbacks?.publishPackageSuccess,
      callbacks?.publishPackageFail
    )
  } finally {
    removeWorkspace(workspace)
  }
}

export * from './constants'
