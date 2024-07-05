import { type LocalPackage } from '../constants'
import { isPackageExistsPublishConfig, isRegistryExistsPackage } from './determin'
import { map } from 'lodash'
import { rimrafSync } from 'rimraf'
import pLimit from 'p-limit'
import spawn from 'cross-spawn'
import fs from 'graceful-fs'
import path from 'path'

const publishPackage = async (
  workspace: string,
  localPackage: LocalPackage,
  registry: string,
  publishPackageSkipped?: (localPackage: LocalPackage) => void,
  publishPackageSuccess?: (localPackage: LocalPackage) => void,
  publishPackageFail?: (LocalPackage: LocalPackage) => void
): Promise<void> => {
  const registryExists = await isRegistryExistsPackage(localPackage, registry)
  if (registryExists) {
    publishPackageSkipped?.(localPackage)
    return
  }

  const packageExistsPublishConfig = await isPackageExistsPublishConfig(
    localPackage,
    registry
  )
  if (packageExistsPublishConfig) {
    publishPackageSkipped?.(localPackage)
    return
  }

  const { location } = localPackage
  const workspaceLocation = path.resolve(workspace, path.basename(location))

  try {
    fs.cpSync(location, workspaceLocation)
    const { status } = spawn.sync('npm', ['publish', workspaceLocation], { cwd: workspace })

    if (status !== 0) {
      publishPackageFail?.(localPackage)
      return
    }

    publishPackageSuccess?.(localPackage)
  } finally {
    if (fs.existsSync(workspaceLocation)) {
      rimrafSync(workspaceLocation)
    }
  }
}

export const publish = async (
  workspace: string,
  localPackages: LocalPackage[],
  registry: string,
  publishPackageSkipped?: (localPackage: LocalPackage) => void,
  publishPackageSuccess?: (localPackage: LocalPackage) => void,
  publishPackageFail?: (LocalPackage: LocalPackage) => void
): Promise<void> => {
  const limit = pLimit(10)
  const tasks = map(localPackages, async (lp) => {
    await limit(async () => {
      await publishPackage(
        workspace,
        lp,
        registry,
        publishPackageSkipped,
        publishPackageSuccess,
        publishPackageFail
      )
    })
  })

  await Promise.all(tasks)
}
