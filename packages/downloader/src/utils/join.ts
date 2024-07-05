import { isUndefined } from 'lodash'
import path from 'path'

export const joinPackagePath = (organization: string | undefined, name: string, version: string, outDir: string): string => {
  const safeOutDir = path.isAbsolute(outDir)
    ? outDir
    : path.resolve(process.cwd(), outDir)

  const fullSafeOutDir = isUndefined(organization)
    ? safeOutDir
    : path.resolve(safeOutDir, organization)

  const fullSafeOutPath = path.resolve(fullSafeOutDir, `${name}-${version}.tgz`)

  return fullSafeOutPath
}
