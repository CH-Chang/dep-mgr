import { size } from 'lodash'
import { LockFile } from '../../../constants'
import { parsePackages } from '../../../utils/parser/yarn'
import path from 'path'

describe('測試 yarn lockfile 解析器', (): void => {
  it('測試 yarn lockfile 解析', async (): Promise<void> => {
    expect.assertions(1)

    const lockFile = LockFile.YarnLockFile
    const lockFilePath = path.resolve(__dirname, 'cases', 'yarn', 'case1', 'yarn.lock')

    const packages = await parsePackages(lockFile, lockFilePath)

    expect(size(packages)).toBeGreaterThan(0)
  })
})
