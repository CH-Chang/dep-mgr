import { DEFAULT_REGISTRY } from '@dep-mgr/share'
import { rimrafSync } from 'rimraf'
import { nanoid } from 'nanoid'
import { trim } from 'lodash'
import spawn from 'cross-spawn'
import fs from 'fs'
import path from 'path'

interface Init {
  initRegistry: string
  initNpmrcExists: boolean
}

const initMap: Record<string, Init> = {}

export const setRegistry = (registry: string): string => {
  const npmrcPath = path.resolve(process.cwd(), '.npmrc')

  const initNpmrcExists = fs.existsSync(npmrcPath)

  const { output } = spawn.sync(
    'npm',
    ['config', 'get', 'registry', '--location=project'],
    { encoding: 'utf-8' }
  )

  const initRegistry = trim(output[1] ?? DEFAULT_REGISTRY)

  spawn.sync('npm', [
    'config',
    'set',
    'registry',
    registry,
    '--location=project'
  ])

  const initId = nanoid()

  initMap[initId] = {
    initNpmrcExists,
    initRegistry
  }

  return initId
}

export const rollbackRegistry = (initId: string): void => {
  const { initNpmrcExists, initRegistry } = initMap[initId]

  const npmrcPath = path.resolve(process.cwd(), '.npmrc')

  if (!initNpmrcExists) {
    rimrafSync(npmrcPath)
    return
  }

  spawn.sync('npm', ['config', 'delete', 'registry', '--location=project'])

  if (initRegistry !== DEFAULT_REGISTRY) {
    spawn.sync('npm', ['config', 'set', 'registry', '--location=project'])
  }
}
