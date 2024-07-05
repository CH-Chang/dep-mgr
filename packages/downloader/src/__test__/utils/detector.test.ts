import { detectDepMgr, detectLockFile } from '../../utils/detector'
import { DepMgr, LockFile } from '../../constants'
import path from 'path'

describe('測試偵測器', (): void => {
  it('偵測 npm 包管理工具', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case1'))

    const depMgr = detectDepMgr()
    expect(depMgr).toBe(DepMgr.Npm)
  })

  it('偵測 yarn 包管理工具', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case2'))

    const depMgr = detectDepMgr()
    expect(depMgr).toBe(DepMgr.Yarn)
  })

  it('偵測 pnpm 包管理工具', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case3'))

    const depMgr = detectDepMgr()
    expect(depMgr).toBe(DepMgr.Pnpm)
  })

  it('偵測 npm 包管理工具的依賴鎖定檔', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case1'))

    const lockFile = detectLockFile(DepMgr.Npm)
    expect(lockFile).toBe(LockFile.NpmLockFile)
  })

  it('偵測 yarn 包管理工具的依賴鎖定檔', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case2'))

    const lockFile = detectLockFile(DepMgr.Yarn)
    expect(lockFile).toBe(LockFile.YarnLockFile)
  })

  it('偵測 pnpm 包管理工具的依賴鎖定檔', (): void => {
    expect.assertions(1)

    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(path.resolve(__dirname, 'cases', 'detector', 'case3'))

    const lockFile = detectLockFile(DepMgr.Pnpm)
    expect(lockFile).toBe(LockFile.PnpmLockFile)
  })
})
