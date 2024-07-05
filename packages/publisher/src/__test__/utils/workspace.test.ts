import { createWorkspace, removeWorkspace } from '../../utils/workspace'
import { includes } from 'lodash'
import { nanoid } from 'nanoid'
import fs from 'graceful-fs'
import path from 'path'
import os from 'os'

describe('測試工作空間', (): void => {
  it('測試建立工作空間', (): void => {
    expect.assertions(3)

    const workspace = createWorkspace('https://registry.npmjs.org')

    const existsWorkspace = fs.existsSync(workspace)
    expect(existsWorkspace).toBe(true)

    const workspaceNpmRc = path.resolve(workspace, '.npmrc')

    const existsWorkspaceNpmRc = fs.existsSync(workspaceNpmRc)
    expect(existsWorkspaceNpmRc).toBe(true)

    const workspaceNpmRcContent = fs.readFileSync(workspaceNpmRc, { encoding: 'utf-8' })
    const workspaceNpmRcExistsRegistry = includes(workspaceNpmRcContent, 'registry=https://registry.npmjs.org')
    expect(workspaceNpmRcExistsRegistry).toBe(true)
  })

  it('測試移除工作空間', (): void => {
    expect.assertions(2)

    const workspace = path.resolve(os.tmpdir(), nanoid())
    const workspaceNpmRc = path.resolve(workspace, '.npmrc')
    fs.mkdirSync(workspace, { recursive: true })
    fs.writeFileSync(workspaceNpmRc, 'registry=https://registry.npmjs.org')

    removeWorkspace(workspace)

    const existsWorkspaceNpmRc = fs.existsSync(workspaceNpmRc)
    const existsWorkspace = fs.existsSync(workspace)

    expect(existsWorkspaceNpmRc).toBe(false)
    expect(existsWorkspace).toBe(false)
  })
})
