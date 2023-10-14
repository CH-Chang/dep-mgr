import { LockFile } from '../../../constants'
import { parsePackages } from '../../../utils/parser/pnpm'
import { size } from 'lodash'

describe('測試 pnpm lockfile 解析器', (): void => {
  it('測試解析無組織的依賴包', (): void => {
    expect.assertions(4)

    const lockFileContent = `
    lockfileVersion: '6.0'
    packages:
      /yocto-queue@0.1.0:
        resolution: {integrity: sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==}
        engines: {node: '>=10'}
        dev: true
    `

    const packages = parsePackages(LockFile.PnpmYamlLockFile, lockFileContent)

    expect(size(packages)).toBe(1)
    expect(packages[0].name).toBe('yocto-queue')
    expect(packages[0].version).toBe('0.1.0')
    expect(packages[0].organization).toBeUndefined()
  })

  it('測試解析有組織的依賴包', (): void => {
    expect.assertions(4)

    const lockFileContent = `
    lockfileVersion: '6.0'
    packages:
      /@types/yargs-parser@21.0.1:
        resolution: {integrity: sha512-axdPBuLuEJt0c4yI5OZssC19K2Mq1uKdrfZBzuxLvaztgqUtFYZUNw7lETExPYJR9jdEoIg4mb7RQKRQzOkeGQ==}
        dev: true
    `

    const packages = parsePackages(LockFile.PnpmYamlLockFile, lockFileContent)

    expect(size(packages)).toBe(1)
    expect(packages[0].name).toBe('yargs-parser')
    expect(packages[0].version).toBe('21.0.1')
    expect(packages[0].organization).toBe('@types')
  })
})
