import { size } from 'lodash'
import { LockFile } from '../../../constants'
import { parsePackages } from '../../../utils/parser/pnpm'
import path from 'path'

describe('測試 pnpm lockfile 解析器', (): void => {
  it('測試 pnpm lockfile 解析', async (): Promise<void> => {
    expect.assertions(1)

    const lockFile = LockFile.PnpmLockFile
    const lockFilePath = path.resolve(__dirname, 'cases', 'pnpm', 'case1', 'pnpm-lock.yaml')

    const packages = await parsePackages(lockFile, lockFilePath)

    expect(size(packages)).toBeGreaterThan(0)
  })

  it('測試解析舊版 (v5) pnpm-lock.yaml', async (): Promise<void> => {
    const lockFile = LockFile.PnpmLockFile
    const lockFilePath = path.resolve(__dirname, '../cases/detector/case4/pnpm-lock.yaml')

    const packages = await parsePackages(lockFile, lockFilePath)
    const withOrg = packages.filter(p => p.organization !== undefined)
    const withoutOrg = packages.filter(p => p.organization === undefined)

    expect(packages.length).toBeGreaterThan(0)
    expect(withOrg.length).toBeGreaterThan(0)
    expect(withoutOrg.length).toBeGreaterThan(0)
  })
})
