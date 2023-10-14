import { type Package } from '../constants'
import { isUndefined, map } from 'lodash'
import pLimit from 'p-limit'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import urlJoin from 'url-join'

const downloadPackage = async (
  registry: string,
  aPackage: Package,
  outDir: string,
  successCallback?: (aPackage: Package) => void,
  failCallback?: (aPackage: Package) => void
): Promise<void> => {
  const { organization, name, version } = aPackage

  const url = isUndefined(organization)
    ? urlJoin(registry, name, '-', `${name}-${version}.tgz`)
    : urlJoin(registry, organization, name, '-', `${name}-${version}.tgz`)

  const response = await fetch(url)

  // 失敗
  if (response.status !== 200) {
    failCallback?.(aPackage)
    return
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const safeOutDir = path.isAbsolute(outDir)
    ? outDir
    : path.resolve(process.cwd(), outDir)

  const fullSafeOutDir = isUndefined(organization)
    ? safeOutDir
    : path.resolve(safeOutDir, organization)

  const fullSafeOutPath = path.resolve(fullSafeOutDir, `${name}-${version}.tgz`)

  if (!fs.existsSync(fullSafeOutDir)) {
    fs.mkdirSync(fullSafeOutDir, { recursive: true })
  }

  fs.writeFileSync(fullSafeOutPath, buffer)

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
