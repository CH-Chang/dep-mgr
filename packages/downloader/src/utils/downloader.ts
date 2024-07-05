import { type Package, joinPackageUrl } from '@dep-mgr/share'
import { isNull, map } from 'lodash'
import { requestPackage } from './requestor'
import { joinPackagePath } from './join'
import { savePackage } from './saver'
import pLimit from 'p-limit'

const downloadPackage = async (
  registry: string,
  aPackage: Package,
  outDir: string,
  successCallback?: (aPackage: Package) => void,
  failCallback?: (aPackage: Package) => void
): Promise<void> => {
  const { organization, name, version } = aPackage

  const url = joinPackageUrl(registry, organization, name, version)
  const packageBuffer = await requestPackage(url)
  if (isNull(packageBuffer)) {
    failCallback?.(aPackage)
    return
  }

  const location = joinPackagePath(organization, name, version, outDir)
  savePackage(location, packageBuffer)

  successCallback?.(aPackage)
}

export const download = async (
  packages: Package[],
  registry: string,
  outDir: string,
  successCallback?: (aPackage: Package) => void,
  failCallback?: (aPackage: Package) => void
): Promise<void> => {
  const limit = pLimit(10)
  const tasks = map(packages, async (aPackage) => {
    await limit(async () => {
      await downloadPackage(
        registry,
        aPackage,
        outDir,
        successCallback,
        failCallback
      )
    })
  })

  await Promise.all(tasks)
}
