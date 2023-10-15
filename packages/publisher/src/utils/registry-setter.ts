import { DEFAULT_REGISTRY } from '@dep-mgr/share'
import { rimrafSync } from 'rimraf'
import { nanoid } from 'nanoid'
import childProcess, { spawnSync } from 'child_process'
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

  const { output } = spawnSync(
    'npm',
    ['config', 'get', 'registry', '--location=project'],
    { encoding: 'utf-8' }
  )

  const initRegistry = output[0] ?? DEFAULT_REGISTRY

  spawnSync('npm', [
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

  childProcess.spawnSync('npm', [
    'config',
    'delete',
    'registry',
    '--location=project'
  ])

  if (initRegistry !== DEFAULT_REGISTRY) {
    childProcess.spawnSync('npm', [
      'config',
      'set',
      'registry',
      '--location=project'
    ])
  }
}
