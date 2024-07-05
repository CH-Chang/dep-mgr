import { joinPackagePath } from '../../utils/join'

describe('測試合併工具', (): void => {
  it('測試合併不包含組織的包的路徑', (): void => {
    expect.assertions(1)

    const packagePath = joinPackagePath(undefined, 'cli', '0.0.0', 'c:\\')

    expect(packagePath).toBe('c:\\cli-0.0.0.tgz')
  })

  it('測試合併包含組織的包的路徑', (): void => {
    expect.assertions(1)

    const packagePath = joinPackagePath('@dep-mgr', 'cli', '0.0.0', 'c:\\')

    expect(packagePath).toBe('c:\\@dep-mgr\\cli-0.0.0.tgz')
  })
})
