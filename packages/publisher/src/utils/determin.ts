import { type LocalPackage } from '../constants'
import { joinPackageUrl } from '@dep-mgr/share'
import { isUndefined, isNull } from 'lodash'
import { retryAsync } from 'ts-retry'
import { PublishError, PublishErrorCode } from '../errors/publish-error'
import { extractPackageJsonFromTarball } from './extractor'
import fetch from 'node-fetch'
import commonJson from 'comment-json'

interface PartialPackageJson {
  publishConfig?: {
    registry?: string
    tag?: string
    access?: string
  }
}

export const isRegistryExistsPackage = async (
  localPackage: LocalPackage,
  registry: string
): Promise<boolean> => {
  const { organization, name, version } = localPackage

  const url = joinPackageUrl(registry, organization, name, version)

  const response = await retryAsync(
    async () => await fetch(url),
    { delay: 100, maxTry: 3 }
  )

  return response.status === 200
}

export const isPackageExistsPublishConfig = async (
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
