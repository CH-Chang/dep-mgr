import { type LocalPackage } from '../constants'
import { map, isUndefined } from 'lodash'
import { nanoid } from 'nanoid'
import { rimrafSync } from 'rimraf'
import compressing from 'compressing'
import pLimit from 'p-limit'
import fetch from 'node-fetch'
import urlJoin from 'url-join'
import path from 'path'
import childProcess from 'child_process'
import fs from 'fs'
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

  const response = await fetch(url)

  return response.status === 200
}

const isPackageExistsPublishConfig = async (
  localPackage: LocalPackage,
  registry: string
): Promise<boolean> => {
  const { location } = localPackage

  const tempDirName = nanoid()
  const tempDirPath = path.resolve(process.cwd(), tempDirName)

  await compressing.tgz.decompress(location, tempDirPath)

  const packageJsonPath = path.resolve(tempDirPath, 'package.json')
  const packageJsonContent = fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8'
  })
  const packageJson = commonJson.parse(packageJsonContent) as PartialPackageJson

  rimrafSync(tempDirPath)

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
  const { status } = childProcess.spawnSync('npm', ['publish', location])

  if (status !== 0) {
    publishPackageFail?.(localPackage)
    return
  }

  publishPackageSuccess?.(localPackage)
}

export const publish = async (
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
