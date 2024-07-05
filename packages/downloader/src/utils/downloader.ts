import { type Package } from '@dep-mgr/share'
import { isNull, isUndefined, map } from 'lodash'
import { retryAsync } from 'ts-retry'
import pLimit from 'p-limit'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import urlJoin from 'url-join'

const joinPackageUrl = (registry: string, organization: string | undefined, name: string, version: string): string => {
  const url = isUndefined(organization)
    ? urlJoin(registry, name, '-', `${name}-${version}.tgz`)
    : urlJoin(registry, organization, name, '-', `${name}-${version}.tgz`)
  return url
}

const joinPackagePath = (organization: string | undefined, name: string, version: string, outDir: string): string => {
  const safeOutDir = path.isAbsolute(outDir)
    ? outDir
    : path.resolve(process.cwd(), outDir)

  const fullSafeOutDir = isUndefined(organization)
    ? safeOutDir
    : path.resolve(safeOutDir, organization)

  const fullSafeOutPath = path.resolve(fullSafeOutDir, `${name}-${version}.tgz`)

  return fullSafeOutPath
}

const requestPackage = async (url: string): Promise<Buffer | null> => {
  const response = await retryAsync(
    async () => await fetch(url),
    { delay: 100, maxTry: 3 }
  )

  const { status } = response

  if (status === 200) {
    const packageArrayBuffer = await response.arrayBuffer()
    const packageBuffer = Buffer.from(packageArrayBuffer)
    return packageBuffer
  }

  return null
}

const savePackage = (location: string, packageBuffer: Buffer): void => {
  const dir = path.dirname(location)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(location, packageBuffer)
}

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
