import { size } from 'lodash'
import { LockFile } from '../../../constants'
import { parsePackages } from '../../../utils/parser/pnpm'
import path from 'path'

describe('測試 pnpm lockfile 解析器', (): void => {
  it('測試 pnpm lockfile 解析', async (): Promise<void> => {
    expect.assertions(1)

    const lockFile = LockFile.PnpmYamlLockFile
    const lockFilePath = path.resolve(__dirname, 'cases', 'pnpm', 'case1', 'pnpm-lock.yaml')

    const packages = await parsePackages(lockFile, lockFilePath)

    expect(size(packages)).toBeGreaterThan(0)
  })
})
