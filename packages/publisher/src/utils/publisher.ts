import { type LocalPackage } from '../constants'
import { map, isUndefined, isNull } from 'lodash'
import { PublishError, PublishErrorCode } from '../errors/publish-error'
import { retryAsync } from 'ts-retry'
import { extractPackageJsonFromTarball } from './extractor'
import pLimit from 'p-limit'
import fetch from 'node-fetch'
import urlJoin from 'url-join'
import spawn from 'cross-spawn'
import commonJson from 'comment-json'

interface PartialPackageJson {
  publishConfig?: {
    registry?: string
    tag?: string
    access?: string
  }
}

const isRegistryExistsPackage = async (
  localPackage: LocalPackage,
  registry: string
): Promise<boolean> => {
  const { organization, name, version } = localPackage

  const url = isUndefined(organization)
    ? urlJoin(registry, name, '-', `${name}-${version}.tgz`)
    : urlJoin(registry, organization, name, '-', `${name}-${version}.tgz`)

  const response = await retryAsync(
    async () => await fetch(url),
    { delay: 100, maxTry: 3 }
  )

  return response.status === 200
}

const isPackageExistsPublishConfig = async (
  localPackage: LocalPackage,
  registry: string
): Promise<boolean> => {
  const { location } = localPackage

  const packageJsonContent = await extractPackageJsonFromTarball(location)
  if (isNull(packageJsonContent)) {
    throw new PublishError(PublishErrorCode.INVALID_PACKAGE_TARBALL)
  }

  const packageJson = commonJson.parse(packageJsonContent) as PartialPackageJson

  const { publishConfig } = packageJson
  if (!isUndefined(publishConfig)) {
    const { registry: packagePublishConfigRegistry } = publishConfig
    if (registry !== packagePublishConfigRegistry) {
      return true
    }
  }

  return false
}

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
  const { status } = spawn.sync('npm', ['publish', location], { cwd: workspace })

  if (status !== 0) {
    publishPackageFail?.(localPackage)
    return
  }

  publishPackageSuccess?.(localPackage)
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
