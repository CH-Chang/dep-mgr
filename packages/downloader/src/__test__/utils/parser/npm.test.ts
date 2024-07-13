import { size } from 'lodash'
import { LockFile } from '../../../constants'
import { parsePackages } from '../../../utils/parser/npm'
import path from 'path'

describe('測試 npm lockfile 解析器', (): void => {
  it('測試 pnpm lockfile 解析', async (): Promise<void> => {
    expect.assertions(1)

    const lockFile = LockFile.NpmLockFile
    const lockFilePath = path.resolve(
      __dirname,
      'cases',
      'npm',
      'case1',
      'package-lock.json'
    )

    const packages = await parsePackages(lockFile, lockFilePath)

    console.log(packages)

    expect(size(packages)).toBeGreaterThan(0)
  })
})
