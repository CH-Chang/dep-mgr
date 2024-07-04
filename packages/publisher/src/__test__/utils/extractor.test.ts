import { extractPackageJsonFromTarball } from '../../utils/extractor'
import path from 'path'

describe('測試解壓縮器', (): void => {
  it('測試自 tarball 解壓縮 package.json', async (): Promise<void> => {
    expect.assertions(1)

    const location = path.resolve(__dirname, 'cases', 'extractor', 'node-20.14.9.tgz')
    const packageJsonContent = await extractPackageJsonFromTarball(location)

    expect(packageJsonContent).not.toBe(true)
  })
})
